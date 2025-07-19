"use client";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import MobileHeader from "./MobileHeader";

const { Content } = Layout;

export default function MobileLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) {
    return children;
  }

  return (
    <Layout className="mobile-layout" style={{ minHeight: "100vh", background: "var(--valorant-dark-bg)" }}>
      <MobileHeader />
      <Content style={{ 
        background: "var(--valorant-dark-bg)",
        minHeight: "calc(100vh - 56px)"
      }}>
        {children}
      </Content>
    </Layout>
  );
}