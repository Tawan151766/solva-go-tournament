"use client";
import { useState, useEffect } from "react";
import { Button, Modal, Card, Typography, Space, Alert } from "antd";
import { 
  DownloadOutlined, 
  MobileOutlined, 
  CheckCircleOutlined,
  WifiOutlined,
  NotificationOutlined,
  ShareAltOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function PWAInstallButton() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone ||
                        document.referrer.includes('android-app://');
    
    setIsInstalled(isStandalone);
    setIsOnline(navigator.onLine);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowModal(false);
    };

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'VALORANT Tournament System',
      text: 'Professional esports tournament management platform',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        // Show success message
      }
    }
  };

  // Don't show button if already installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable && (
        <Button
          id="pwa-install-button"
          type="primary"
          icon={<DownloadOutlined />}
          className="valorant-button-primary"
          onClick={() => setShowModal(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            borderRadius: "50px",
            height: 56,
            width: 56,
            boxShadow: "var(--valorant-glow-strong)"
          }}
        />
      )}

      <Modal
        title={null}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="valorant-modal"
        width={360}
        centered
      >
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          {/* App Icon */}
          <div style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, var(--valorant-red), var(--valorant-teal))",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "var(--valorant-glow-strong)"
          }}>
            <MobileOutlined style={{ fontSize: 40, color: "white" }} />
          </div>

          <Title level={3} className="valorant-title" style={{ margin: "0 0 8px 0", fontSize: 20 }}>
            ติดตั้งแอป
          </Title>
          
          <Text className="valorant-text-secondary" style={{ fontSize: 14 }}>
            VALORANT Tournament System
          </Text>

          <Paragraph className="valorant-text-primary" style={{ margin: "16px 0", fontSize: 14 }}>
            ติดตั้งแอปเพื่อประสบการณ์ที่ดีขึ้น พร้อมการเข้าถึงแบบออฟไลน์และการแจ้งเตือน
          </Paragraph>

          {/* Features */}
          <div style={{ textAlign: "left", margin: "20px 0" }}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleOutlined style={{ color: "var(--valorant-teal)", marginRight: 8 }} />
                <Text className="valorant-text-primary" style={{ fontSize: 13 }}>
                  เข้าถึงได้แม้ไม่มีอินเทอร์เน็ต
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <NotificationOutlined style={{ color: "var(--valorant-teal)", marginRight: 8 }} />
                <Text className="valorant-text-primary" style={{ fontSize: 13 }}>
                  รับการแจ้งเตือนทันที
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MobileOutlined style={{ color: "var(--valorant-teal)", marginRight: 8 }} />
                <Text className="valorant-text-primary" style={{ fontSize: 13 }}>
                  ประสบการณ์แบบ Native App
                </Text>
              </div>
            </Space>
          </div>

          {!isOnline && (
            <Alert
              message="ไม่มีการเชื่อมต่ออินเทอร์เน็ต"
              description="คุณยังสามารถใช้งานแอปได้ในโหมดออฟไลน์"
              type="warning"
              showIcon
              style={{ 
                margin: "16px 0",
                background: "rgba(255, 184, 0, 0.1)",
                border: "1px solid #ffb800"
              }}
            />
          )}

          {/* Action Buttons */}
          <Space style={{ width: "100%", marginTop: 20 }} direction="vertical" size={12}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="valorant-button-primary"
              onClick={handleInstall}
              block
              size="large"
            >
              ติดตั้งแอป
            </Button>
            
            <Space style={{ width: "100%" }}>
              <Button
                icon={<ShareAltOutlined />}
                className="valorant-button-secondary"
                onClick={handleShare}
                style={{ flex: 1 }}
              >
                แชร์
              </Button>
              <Button
                className="valorant-button-secondary"
                onClick={() => setShowModal(false)}
                style={{ flex: 1 }}
              >
                ไว้ทีหลัง
              </Button>
            </Space>
          </Space>
        </div>
      </Modal>
    </>
  );
}