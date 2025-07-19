"use client";
import { useState } from "react";
import { Layout, Button, Drawer, Menu, Avatar, Badge, Typography, Space } from "antd";
import { 
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header } = Layout;
const { Text } = Typography;

export default function MobileHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();

  const currentUser = {
    name: "Admin User",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    notifications: 3
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/" onClick={() => setDrawerVisible(false)}>หน้าหลัก</Link>,
    },
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard" onClick={() => setDrawerVisible(false)}>แดชบอร์ด</Link>,
    },
    {
      type: "divider"
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "โปรไฟล์",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "ตั้งค่า",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "ออกจากระบบ",
      danger: true,
    },
  ];

  const getSelectedKey = () => {
    if (pathname === "/") return ["/"];
    if (pathname === "/dashboard") return ["/dashboard"];
    return [];
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      console.log("Logout");
    } else if (key === "profile") {
      console.log("Go to profile");
    } else if (key === "settings") {
      console.log("Go to settings");
    }
    setDrawerVisible(false);
  };

  return (
    <>
      <Header 
        className="mobile-header"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          padding: "0 16px",
          height: "56px",
          lineHeight: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--valorant-dark-container)",
          borderBottom: "2px solid var(--valorant-red)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Left - Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{
            color: "var(--valorant-text-primary)",
            fontSize: 18,
            padding: 0,
            width: 40,
            height: 40
          }}
        />

        {/* Center - Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, var(--valorant-red), var(--valorant-teal))",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
              boxShadow: "var(--valorant-glow)"
            }}>
              <TrophyOutlined style={{ color: "white", fontSize: 16 }} />
            </div>
            <Text className="valorant-title" style={{ 
              fontSize: 16, 
              margin: 0,
              background: "linear-gradient(135deg, var(--valorant-red), var(--valorant-teal))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              VALORANT
            </Text>
          </div>
        </Link>

        {/* Right - Notifications & Profile */}
        <Space size={8}>
          <Badge count={currentUser.notifications} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{
                color: "var(--valorant-text-secondary)",
                fontSize: 16,
                padding: 0,
                width: 36,
                height: 36
              }}
            />
          </Badge>
          
          <Avatar 
            size={32} 
            src={currentUser.avatar}
            style={{ border: "2px solid var(--valorant-red)" }}
          />
        </Space>
      </Header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar 
              size={40} 
              src={currentUser.avatar}
              style={{ marginRight: 12, border: "2px solid var(--valorant-red)" }}
            />
            <div>
              <Text className="valorant-text-primary" style={{ fontWeight: 600, display: "block" }}>
                {currentUser.name}
              </Text>
              <Text className="valorant-text-secondary" style={{ fontSize: 12, textTransform: "uppercase" }}>
                {currentUser.role}
              </Text>
            </div>
          </div>
        }
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        className="mobile-drawer"
        styles={{
          header: {
            background: "var(--valorant-dark-elevated)",
            borderBottom: "1px solid var(--valorant-dark-border)",
            color: "var(--valorant-text-primary)"
          },
          body: {
            background: "var(--valorant-dark-container)",
            padding: 0
          }
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--valorant-text-primary)"
          }}
        />
      </Drawer>
    </>
  );
}