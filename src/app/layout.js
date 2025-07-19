import { Geist, Geist_Mono, Rajdhani, Inter } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import "../styles/valorant-custom.css";
import ValorantThemeProvider from "../components/ValorantThemeProvider";
import NavigationBar from "../components/NavigationBar";
import MobileLayout from "../components/Mobile/MobileLayout";
import PWAInstallButton from "../components/Mobile/PWAInstallButton";
import { App, Layout } from "antd";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Valorant Tournament System",
  description: "Professional esports tournament management system",
  manifest: "/manifest.json",
  themeColor: "#ff4655",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VALORANT Tournament"
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "VALORANT Tournament",
    "application-name": "VALORANT Tournament",
    "msapplication-TileColor": "#ff4655",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} ${inter.variable} antialiased valorant-layout`}
      >
        <ValorantThemeProvider>
          <App>
            <MobileLayout>
              <Layout className="valorant-layout" style={{ minHeight: "100vh" }}>
                <NavigationBar />
                <div style={{ 
                  marginTop: "64px", 
                  background: "var(--valorant-dark-bg)",
                  minHeight: "calc(100vh - 64px)"
                }}>
                  {children}
                </div>
              </Layout>
              <PWAInstallButton />
            </MobileLayout>
          </App>
        </ValorantThemeProvider>
      </body>
    </html>
  );
}
