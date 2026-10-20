#!/usr/bin/env bash
# ساخت APK اپلیکیشن «درسیار من» بدون نیاز به Gradle/Android Studio
# پیش‌نیاز: جاوا + Android build-tools 34 و platform-34 (مسیرها با متغیرهای زیر قابل تغییرند)
# استفاده: bash apk/build.sh
set -euo pipefail
cd "$(dirname "$0")"

# ---------- مسیر ابزارها ----------
BUILD_TOOLS_ZIP="${BUILD_TOOLS_ZIP:-/tmp/android-sdk/build-tools.zip}"
PLATFORM_ZIP="${PLATFORM_ZIP:-/tmp/android-sdk/platform.zip}"

if [ ! -f "$BUILD_TOOLS_ZIP" ]; then
  echo "در حال دانلود build-tools..."
  curl -sL -o "$BUILD_TOOLS_ZIP" https://dl.google.com/android/repository/build-tools_r34-linux.zip
fi
if [ ! -f "$PLATFORM_ZIP" ]; then
  echo "در حال دانلود platform-34..."
  curl -sL -o "$PLATFORM_ZIP" https://dl.google.com/android/repository/platform-34-ext7_r03.zip
fi

SDK_PARENT=$(dirname "$BUILD_TOOLS_ZIP")
BT_DIR=$(find "$SDK_PARENT" -maxdepth 2 -type d -name "android-14*" 2>/dev/null | head -1)
if [ -z "${BT_DIR:-}" ] || [ ! -d "$BT_DIR" ]; then
  unzip -qo "$BUILD_TOOLS_ZIP" -d "$SDK_PARENT"
  BT_DIR=$(find "$SDK_PARENT" -maxdepth 2 -type d -name "android-14*" | head -1)
fi
PLAT_PARENT=$(dirname "$PLATFORM_ZIP")
if ! find "$PLAT_PARENT" -maxdepth 2 -type d -name "android-34*" | grep -q .; then
  unzip -qo "$PLATFORM_ZIP" -d "$PLAT_PARENT"
fi
PLAT_DIR=$(find "$PLAT_PARENT" -maxdepth 2 -type d -name "android-34*" | head -1)

AAPT2="$BT_DIR/aapt2"
D8="$BT_DIR/d8"
ZIPALIGN="$BT_DIR/zipalign"
APKSIGNER="$BT_DIR/apksigner"
ANDROID_JAR="$PLAT_DIR/android.jar"

echo "build-tools: $BT_DIR"
echo "platform:    $PLAT_DIR"

# ---------- ۰) ساخت صفحه آفلاین و آیکون‌ها (در صورت نیاز) ----------
if [ ! -f assets/www/index.html ]; then
  echo "در حال ساخت صفحه آفلاین..."
  (cd .. && bun scripts/generate-offline.ts)
fi
if [ ! -f res/mipmap-xxxhdpi/ic_launcher.png ]; then
  echo "در حال ساخت آیکون‌ها..."
  (cd .. && bun scripts/generate-icons.ts)
fi

# ---------- ۱) کامپایل منابع ----------
rm -rf build
mkdir -p build/gen build/classes build/dex

"$AAPT2" compile --dir res -o build/res.zip
"$AAPT2" link -o build/base.apk \
  -I "$ANDROID_JAR" \
  --manifest AndroidManifest.xml \
  --min-sdk-version 24 --target-sdk-version 34 \
  --java build/gen \
  -A assets \
  build/res.zip

# ---------- ۲) کامپایل جاوا (با ecj چون javac در JRE نیست) ----------
ECJ_JAR="${ECJ_JAR:-/tmp/android-sdk/ecj.jar}"
if [ ! -f "$ECJ_JAR" ]; then
  echo "در حال دانلود کامپایلر ecj..."
  curl -sL -o "$ECJ_JAR" https://repo1.maven.org/maven2/org/eclipse/jdt/ecj/3.36.0/ecj-3.36.0.jar
fi
java -jar "$ECJ_JAR" -11 -nowarn \
  -classpath "$ANDROID_JAR" \
  -d build/classes \
  build/gen/ir/darsyar/app/R.java \
  java/ir/darsyar/app/MainActivity.java

# ---------- ۳) تبدیل به DEX ----------
find build/classes -name "*.class" > build/classlist.txt
"$D8" --release --lib "$ANDROID_JAR" --output build/dex $(cat build/classlist.txt)

# ---------- ۴) افزودن classes.dex به APK ----------
(cd build/dex && zip -q ../base.apk classes.dex)

# ---------- ۵) هم‌ترازی و امضا ----------
"$ZIPALIGN" -f 4 build/base.apk build/aligned.apk

if [ ! -f darsyar.keystore ]; then
  echo "در حال ساخت کلید امضا..."
  keytool -genkeypair \
    -keystore darsyar.keystore \
    -alias darsyar \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass darsyar123 -keypass darsyar123 \
    -dname "CN=Darsyar,O=Darsyar,C=IR"
fi

"$APKSIGNER" sign \
  --ks darsyar.keystore \
  --ks-pass pass:darsyar123 \
  --key-pass pass:darsyar123 \
  --out darsyar.apk \
  build/aligned.apk

echo ""
echo "✔ APK ساخته شد: apk/darsyar.apk"
ls -lh darsyar.apk | awk '{print "حجم:", $5}'
