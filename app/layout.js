import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata = {
  title: "Izak Hyllested — CV",
  description: "Operations leader and systems-oriented professional based in Copenhagen.",
  appleWebApp: { capable: true, title: "Izak Hyllested", statusBarStyle: "black-translucent" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  );
}
