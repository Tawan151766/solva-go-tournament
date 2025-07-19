"use client";
import { useState } from "react";
import { Row, Col, Card, Tabs, Button, Space, Typography, Divider } from "antd";
import { 
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  ReloadOutlined,
  DownloadOutlined,
  FilterOutlined,
  UserOutlined,
  ToolOutlined
} from "@ant-design/icons";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import ManagementTools from "../../components/Dashboard/ManagementTools";
import AdvancedAnalytics from "../../components/Dashboard/AdvancedAnalytics";
import UserManagement from "../../components/Dashboard/UserManagement";
import SystemSettings from "../../components/Dashboard/SystemSettings";

const { Title, Text } = Typography;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Mock dashboard data
  const dashboardData = {
    totalTournaments: 12,
    activeTournaments: 3,
    totalTeams: 156,
    activeTeams: 89,
    totalMatches: 234,
    completedMatches: 187,
    totalUsers: 445,
    activeUsers: 234,
    monthlyGrowth: 15.2,
    weeklyActive: 78.5
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log("Exporting dashboard data...");
    // Implement export functionality
  };

  const tabItems = [
    {
      key: "overview",
      label: (
        <span>
          <DashboardOutlined />
          OVERVIEW
        </span>
      ),
      children: <DashboardStats data={dashboardData} />
    },
    {
      key: "analytics",
      label: (
        <span>
          <BarChartOutlined />
          ANALYTICS
        </span>
      ),
      children: <AdvancedAnalytics />
    },
    {
      key: "management",
      label: (
        <span>
          <SettingOutlined />
          MANAGEMENT
        </span>
      ),
      children: <ManagementTools />
    },
    {
      key: "users",
      label: (
        <span>
          <UserOutlined />
          USERS
        </span>
      ),
      children: <UserManagement />
    },
    {
      key: "settings",
      label: (
        <span>
          <ToolOutlined />
          SETTINGS
        </span>
      ),
      children: <SystemSettings />
    }
  ];

  return (
    <div className="valorant-content" style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <Title level={1} className="valorant-title" style={{ margin: 0 }}>
              DASHBOARD
            </Title>
            <Text className="valorant-text-secondary">
              Tournament Management System Overview
            </Text>
          </div>
          
          <Space>
            <Button
              icon={<FilterOutlined />}
              className="valorant-button-secondary"
            >
              Filters
            </Button>
            <Button
              icon={<DownloadOutlined />}
              className="valorant-button-secondary"
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              icon={<ReloadOutlined />}
              className="valorant-button-primary"
              loading={loading}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </Space>
        </div>
        
        <Divider className="valorant-divider-red" />
      </div>

      {/* Dashboard Content */}
      <Card className="valorant-card" style={{ minHeight: "calc(100vh - 200px)" }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="valorant-tabs"
          size="large"
          tabBarStyle={{
            marginBottom: 32,
            borderBottom: "2px solid var(--valorant-dark-border)"
          }}
        />
      </Card>
    </div>
  );
}