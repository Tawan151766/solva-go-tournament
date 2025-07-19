import { Geist, Geist_Mono, Rajdhani, Inter } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import "../styles/valorant-custom.css";
import ValorantThemeProvider from "../components/ValorantThemeProvider";
import NavigationBar from "../components/NavigationBar";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} ${inter.variable} antialiased valorant-layout`}
      >
        <ValorantThemeProvider>
          <App>
            <Layout className="valorant-layout" style={{ minHeight: "100vh" }}>
              <NavigationBar />
           
                {children}
            </Layout>
          </App>
        </ValorantThemeProvider>
      </body>
    </html>
  );
}
