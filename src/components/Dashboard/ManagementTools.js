"use client";
import { Card, Row, Col, Button, List, Avatar, Tag, Typography, Space, Divider } from "antd";
import { 
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function ManagementTools() {
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "tournament",
      action: "created",
      title: "VALORANT Champions Tour 2025",
      user: "Admin User",
      time: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      type: "team",
      action: "registered",
      title: "Team Phoenix registered for VCT",
      user: "Phoenix Captain",
      time: "4 hours ago",
      status: "pending"
    },
    {
      id: 3,
      type: "match",
      action: "completed",
      title: "Semi-Final: Team A vs Team B",
      user: "System",
      time: "6 hours ago",
      status: "success"
    },
    {
      id: 4,
      type: "user",
      action: "banned",
      title: "User violation reported",
      user: "Moderator",
      time: "1 day ago",
      status: "warning"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "team",
      title: "Team Radiant",
      description: "Registration for Spike Rush Championship",
      submittedBy: "Radiant Captain",
      submittedAt: "2025-01-19",
      priority: "high"
    },
    {
      id: 2,
      type: "tournament",
      title: "University League",
      description: "New tournament proposal",
      submittedBy: "University Admin",
      submittedAt: "2025-01-18",
      priority: "medium"
    },
    {
      id: 3,
      type: "match",
      title: "Match Result Dispute",
      description: "Team B disputes final score",
      submittedBy: "Team B Captain",
      submittedAt: "2025-01-17",
      priority: "high"
    }
  ];

  const quickActions = [
    {
      title: "Create Tournament",
      description: "Set up a new tournament",
      icon: <TrophyOutlined />,
      color: "var(--valorant-red)",
      action: "create-tournament"
    },
    {
      title: "Manage Teams",
      description: "View and manage registered teams",
      icon: <TeamOutlined />,
      color: "var(--valorant-teal)",
      action: "manage-teams"
    },
    {
      title: "Schedule Matches",
      description: "Create and schedule new matches",
      icon: <CalendarOutlined />,
      color: "#ffb800",
      action: "schedule-matches"
    },
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: <UserOutlined />,
      color: "#8a2be2",
      action: "user-management"
    }
  ];

  const getActivityIcon = (type, status) => {
    const iconStyle = { 
      fontSize: 16, 
      color: status === 'success' ? 'var(--valorant-teal)' : 
             status === 'warning' ? '#ffb800' : 
             status === 'pending' ? 'var(--valorant-red)' : 
             'var(--valorant-text-secondary)' 
    };

    switch (type) {
      case 'tournament': return <TrophyOutlined style={iconStyle} />;
      case 'team': return <TeamOutlined style={iconStyle} />;
      case 'match': return <CalendarOutlined style={iconStyle} />;
      case 'user': return <UserOutlined style={iconStyle} />;
      default: return <SettingOutlined style={iconStyle} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--valorant-red)';
      case 'medium': return '#ffb800';
      case 'low': return 'var(--valorant-teal)';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement navigation or modal opening logic here
  };

  const handleApproval = (id, action) => {
    console.log(`${action} approval for item ${id}`);
    // Implement approval logic here
  };

  return (
    <div>
      <Title level={2} className="valorant-title" style={{ marginBottom: 24 }}>
        MANAGEMENT TOOLS
      </Title>

      {/* Quick Actions */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {quickActions.map((action, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              className="valorant-card"
              hoverable
              onClick={() => handleQuickAction(action.action)}
              style={{ 
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 60,
                  height: 60,
                  background: `linear-gradient(135deg, ${action.color}, ${action.color}aa)`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: `0 0 20px ${action.color}33`
                }}>
                  <span style={{ fontSize: 24, color: "white" }}>
                    {action.icon}
                  </span>
                </div>
                <Title level={5} className="valorant-subtitle" style={{ margin: "0 0 8px 0" }}>
                  {action.title}
                </Title>
                <Text className="valorant-text-secondary" style={{ fontSize: 12 }}>
                  {action.description}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <Title level={4} className="valorant-subtitle" style={{ margin: 0 }}>
                RECENT ACTIVITIES
              </Title>
              <Button 
                type="text" 
                size="small"
                className="valorant-button-secondary"
                icon={<EyeOutlined />}
              >
                View All
              </Button>
            </div>
            
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item style={{ padding: "12px 0", border: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <div style={{ marginRight: 12 }}>
                      {getActivityIcon(item.type, item.status)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                        <Text className="valorant-text-primary" style={{ fontSize: 14, fontWeight: 500 }}>
                          {item.title}
                        </Text>
                        <Tag 
                          color={item.status === 'success' ? 'green' : 
                                 item.status === 'warning' ? 'orange' : 
                                 item.status === 'pending' ? 'red' : 'default'}
                          size="small"
                          style={{ marginLeft: 8, fontSize: 10 }}
                        >
                          {item.status.toUpperCase()}
                        </Tag>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Text className="valorant-text-secondary" style={{ fontSize: 12 }}>
                          by {item.user}
                        </Text>
                        <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                          {item.time}
                        </Text>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Pending Approvals */}
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <Title level={4} className="valorant-subtitle" style={{ margin: 0 }}>
                PENDING APPROVALS
              </Title>
              <Tag className="valorant-tag-warning" style={{ fontSize: 10 }}>
                {pendingApprovals.length} PENDING
              </Tag>
            </div>

            <List
              dataSource={pendingApprovals}
              renderItem={(item) => (
                <List.Item style={{ padding: "16px 0", border: "none" }}>
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Text className="valorant-text-primary" style={{ fontSize: 14, fontWeight: 600 }}>
                          {item.title}
                        </Text>
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: getPriorityColor(item.priority),
                          marginLeft: 8
                        }} />
                      </div>
                      <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                        {item.submittedAt}
                      </Text>
                    </div>
                    
                    <Text className="valorant-text-secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
                      {item.description}
                    </Text>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                        by {item.submittedBy}
                      </Text>
                      <Space size="small">
                        <Button 
                          size="small" 
                          type="text"
                          icon={<CheckCircleOutlined />}
                          className="valorant-button-secondary"
                          onClick={() => handleApproval(item.id, 'approve')}
                          style={{ color: "var(--valorant-teal)" }}
                        />
                        <Button 
                          size="small" 
                          type="text"
                          icon={<DeleteOutlined />}
                          className="valorant-button-secondary"
                          onClick={() => handleApproval(item.id, 'reject')}
                          style={{ color: "var(--valorant-red)" }}
                        />
                      </Space>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}