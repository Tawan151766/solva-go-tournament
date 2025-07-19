"use client";
import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Typography,
  Badge,
} from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header } = Layout;
const { Text } = Typography;

export default function NavigationBar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Mock user data
  const currentUser = {
    name: "Admin User",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    notifications: 3,
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/">หน้าหลัก</Link>,
    },
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">แดชบอร์ด</Link>,
    },
  ];

  const userMenuItems = [
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
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "ออกจากระบบ",
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }) => {
    console.log("User menu clicked:", key);
  };

  const getSelectedKey = () => {
    if (pathname === "/") return ["/"];
    if (pathname === "/dashboard") return ["/dashboard"];
    return [];
  };

  return (
    <Header
      className="valorant-header"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--valorant-dark-container)",
        borderBottom: "2px solid var(--valorant-red)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Left side - Logo and Menu */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {/* Logo */}
        {/* <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", marginRight: 32 }}>
          <div style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, var(--valorant-red), var(--valorant-teal))",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            boxShadow: "var(--valorant-glow)"
          }}>
            <ThunderboltOutlined style={{ color: "white", fontSize: 20 }} />
          </div>
          <div>
            <Text className="valorant-title" style={{ 
              fontSize: 18, 
              margin: 0,
              background: "linear-gradient(135deg, var(--valorant-red), var(--valorant-teal))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              VALORANT
            </Text>
            <br />
            <Text className="valorant-text-secondary" style={{ 
              fontSize: 10, 
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              TOURNAMENT
            </Text>
          </div>
        </Link> */}

        {/* Desktop Menu */}
        <div className="desktop-nav" style={{ flex: 1 }}>
          <Menu
            mode="horizontal"
            selectedKeys={getSelectedKey()}
            items={menuItems}
            style={{
              background: "transparent",
              border: "none",
              lineHeight: "62px",
            }}
          />
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="valorant-button-secondary mobile-menu-btn"
        />
      </div>

      {/* Right side - User actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Notifications */}
        <Badge count={currentUser.notifications} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="valorant-button-secondary"
            style={{
              color: "var(--valorant-text-secondary)",
              border: "1px solid var(--valorant-dark-border)",
            }}
          />
        </Badge>

        {/* User Profile */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
          trigger={["click"]}
          overlayClassName="valorant-dropdown"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              padding: "4px 12px",
              borderRadius: "6px",
              border: "1px solid var(--valorant-dark-border)",
              background: "var(--valorant-dark-elevated)",
              transition: "all 0.3s ease",
            }}
            className="user-profile-hover"
          >
            <Avatar
              size={32}
              src={currentUser.avatar}
              style={{ border: "2px solid var(--valorant-red)" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text
                className="valorant-text-primary"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {currentUser.name}
              </Text>
              <Text
                className="valorant-text-tertiary"
                style={{ fontSize: 10, textTransform: "uppercase" }}
              >
                {currentUser.role}
              </Text>
            </div>
          </div>
        </Dropdown>
      </div>

      {/* Mobile Menu Overlay */}
      {collapsed && (
        <div
          className="mobile-nav-overlay"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--valorant-dark-container)",
            border: "1px solid var(--valorant-dark-border)",
            zIndex: 999,
            padding: "16px 0",
          }}
        >
          <Menu
            mode="vertical"
            selectedKeys={getSelectedKey()}
            items={menuItems}
            style={{
              background: "transparent",
              border: "none",
            }}
          />
        </div>
      )}
    </Header>
  );
}
