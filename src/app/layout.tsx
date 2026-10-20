import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "درسیار من | کمک درسی متوسطه اول",
  description:
    "همراه تحصیلی پایه‌های هفتم، هشتم و نهم: جواب سوالات، نکات مهم، سوالات امتحانی و دستیار هوشمند درسی",
  keywords: ["کمک درسی", "متوسطه اول", "هفتم", "هشتم", "نهم", "درسیار", "امتحان"],
  icons: {
    icon: "/images/robot-helper.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
