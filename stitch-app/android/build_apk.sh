#!/bin/bash
# Build Darsyar APK: aapt2 -> javac -> d8 -> package -> zipalign -> sign
set -e
BT=/home/z/my-project/work/sdk/bt/android-14
AJ=/home/z/my-project/work/sdk/pf/android-34/android.jar
APK=/home/z/my-project/work/apk
B=$APK/build
cd $APK

echo "== 1) aapt2 compile"
$BT/aapt2 compile --dir res -o $B/res.zip

echo "== 2) aapt2 link"
$BT/aapt2 link -o $B/base.apk -I $AJ --manifest AndroidManifest.xml \
  -R $B/res.zip --java $B/gen --auto-add-overlay

echo "== 3) ecj compile"
mkdir -p $B/classes
java -jar /home/z/my-project/work/sdk/ecj.jar -nowarn -encoding UTF-8 \
  -source 8 -target 8 -proc:none \
  -classpath $AJ \
  -d $B/classes \
  $B/gen/com/darsyar/app/R.java \
  src/com/darsyar/app/MainActivity.java 2>&1 | grep -v "^WARNING" || true

echo "== 4) d8"
mkdir -p $B/dex
$BT/d8 --release --min-api 24 --lib $AJ \
  --output $B/dex \
  $(find $B/classes -name '*.class')

echo "== 5) package"
cp $B/base.apk $B/unsigned.apk
cd $B/dex && zip -q -u $B/unsigned.apk classes.dex && cd $APK
zip -q -r $B/unsigned.apk assets -x 'build/*'

echo "== 6) zipalign"
$BT/zipalign -f -p 4 $B/unsigned.apk $B/aligned.apk

echo "== 7) keystore"
if [ ! -f $B/darsyar.keystore ]; then
  keytool -genkeypair -keystore $B/darsyar.keystore -alias darsyar \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass darsyar2026 -keypass darsyar2026 \
    -dname "CN=Darsyar, OU=Education, O=Darsyar, L=Tehran, C=IR"
fi

echo "== 8) sign"
$BT/apksigner sign --ks $B/darsyar.keystore \
  --ks-pass pass:darsyar2026 --key-pass pass:darsyar2026 \
  --out $B/Darsyar.apk $B/aligned.apk

echo "== verify"
$BT/apksigner verify --print-certs $B/Darsyar.apk | head -6
ls -la $B/Darsyar.apk
