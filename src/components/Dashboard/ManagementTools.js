"use client";
import {
  Card,
  Row,
  Col,
  Button,
  List,
  Avatar,
  Tag,
  Typography,
  Space,
  Divider,
} from "antd";
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
  ClockCircleOutlined,
} from "@ant-design/icons";
import { events, initialTeams, users, tournaments } from "../../data/mockData";

const { Title, Text } = Typography;

export default function ManagementTools() {
  // Generate real recent activities from mock data
  const generateRecentActivities = () => {
    const activities = [];

    // Add tournament activities
    tournaments.forEach((tournament, index) => {
      activities.push({
        id: `t-${tournament.id}`,
        type: "tournament",
        action: "created",
        title: `${tournament.name} ถูกสร้างแล้ว`,
        user: users.find((u) => u.role === "admin")?.name || "Admin",
        time: `${index + 1} วันที่แล้ว`,
        status: "success",
      });
    });

    // Add team registration activities
    initialTeams.slice(0, 5).forEach((team, index) => {
      const submitter = users.find((u) => u.id === team.submittedBy);
      activities.push({
        id: `team-${team.id}`,
        type: "team",
        action: "registered",
        title: `${team.name} สมัครเข้าร่วม`,
        user: submitter?.name || "Unknown User",
        time: `${index + 2} ชั่วโมงที่แล้ว`,
        status: team.status === "approved" ? "success" : "pending",
      });
    });

    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 10);
  };

  // Generate real pending approvals from mock data
  const generatePendingApprovals = () => {
    const approvals = [];

    // Team registration requests pending approval
    const teamRegistrationRequests = [
      {
        id: "team-reg-001",
        teamName: "Phoenix Esports",
        captainName: "PlayerOne",
        captainRank: "Immortal 2",
        tournamentId: "tournament-001",
        tournamentName: "VALORANT Champions League 2024",
        eventId: "event-001",
        eventName: "VCL 2024 Qualifier",
        registeredAt: "2024-01-15",
        teamMembers: [
          { name: "PlayerOne", rank: "Immortal 2", role: "Duelist" },
          { name: "ShadowStrike", rank: "Diamond 3", role: "Controller" },
          { name: "PhoenixRising", rank: "Ascendant 1", role: "Initiator" },
          { name: "CyberNinja", rank: "Immortal 1", role: "Sentinel" },
          { name: "VortexGamer", rank: "Diamond 1", role: "Flex" },
        ],
        teamDescription:
          "ทีมที่มีประสบการณ์การแข่งขันมาแล้ว พร้อมสำหรับการแข่งขันระดับสูง",
        priority: "high",
      },
      {
        id: "team-reg-002",
        teamName: "Cyber Wolves",
        captainName: "AlphaWolf",
        captainRank: "Diamond 2",
        tournamentId: "tournament-002",
        tournamentName: "Regional Esports Championship",
        eventId: "event-002",
        eventName: "Regional Championship 2024",
        registeredAt: "2024-01-14",
        teamMembers: [
          { name: "AlphaWolf", rank: "Diamond 2", role: "IGL/Controller" },
          { name: "BetaStrike", rank: "Diamond 1", role: "Duelist" },
          { name: "GammaShield", rank: "Platinum 3", role: "Sentinel" },
          { name: "DeltaFlash", rank: "Diamond 3", role: "Initiator" },
          { name: "EpsilonFlex", rank: "Platinum 2", role: "Flex" },
        ],
        teamDescription:
          "ทีมใหม่ที่มีความมุ่งมั่นและพร้อมเรียนรู้จากการแข่งขัน",
        priority: "medium",
      },
      {
        id: "team-reg-003",
        teamName: "Thunder Bolts",
        captainName: "ThunderStorm",
        captainRank: "Immortal 3",
        tournamentId: "tournament-003",
        tournamentName: "Pro League Season 5",
        eventId: "event-003",
        eventName: "Pro League Qualifier",
        registeredAt: "2024-01-13",
        teamMembers: [
          { name: "ThunderStorm", rank: "Immortal 3", role: "IGL/Sentinel" },
          { name: "LightningBolt", rank: "Immortal 2", role: "Duelist" },
          { name: "StormCloud", rank: "Immortal 1", role: "Controller" },
          { name: "WindGust", rank: "Diamond 3", role: "Initiator" },
          { name: "RainDrop", rank: "Immortal 1", role: "Flex" },
        ],
        teamDescription:
          "ทีมที่มีประสบการณ์ระดับโปรและพร้อมสำหรับการแข่งขันระดับสูงสุด",
        priority: "high",
      },
      {
        id: "team-reg-004",
        teamName: "Neon Strikers",
        captainName: "NeonFlash",
        captainRank: "Ascendant 3",
        tournamentId: "tournament-001",
        tournamentName: "VALORANT Champions League 2024",
        eventId: "event-001",
        eventName: "VCL 2024 Qualifier",
        registeredAt: "2024-01-12",
        teamMembers: [
          { name: "NeonFlash", rank: "Ascendant 3", role: "Duelist" },
          { name: "ElectricShock", rank: "Ascendant 2", role: "Controller" },
          { name: "PowerSurge", rank: "Ascendant 1", role: "Initiator" },
          { name: "VoltGuard", rank: "Diamond 3", role: "Sentinel" },
          { name: "CircuitBreaker", rank: "Ascendant 2", role: "Flex" },
        ],
        teamDescription: "ทีมหน้าใหม่ที่มีศักยภาพสูงและต้องการพิสูจน์ตัวเอง",
        priority: "medium",
      },
    ];

    teamRegistrationRequests.forEach((request) => {
      const tournament = tournaments.find((t) => t.id === request.tournamentId);
      const event = events.find((e) => e.id === request.eventId);

      approvals.push({
        id: request.id,
        type: "team_registration",
        title: request.teamName,
        description: `สมัครทีมเข้าร่วมรายการ ${request.eventName}`,
        submittedBy: `${request.captainName} (${request.captainRank})`,
        submittedAt: new Date(request.registeredAt).toLocaleDateString("th-TH"),
        priority: request.priority,
        tournamentInfo: {
          name: request.tournamentName,
          type: tournament?.type || "Tournament",
          prize: tournament?.prize || "TBD",
        },
        eventInfo: {
          name: request.eventName,
          date: event?.date || "TBD",
          location: event?.location || "Online",
        },
        teamInfo: {
          name: request.teamName,
          captain: request.captainName,
          captainRank: request.captainRank,
          members: request.teamMembers,
          description: request.teamDescription,
          memberCount: request.teamMembers.length,
        },
        data: request,
      });
    });

    return approvals;
  };

  const recentActivities = generateRecentActivities();
  const pendingApprovals = generatePendingApprovals();

  const quickActions = [
    {
      title: "Create Tournament",
      description: "Set up a new tournament",
      icon: <TrophyOutlined />,
      color: "var(--valorant-red)",
      action: "create-tournament",
    },
    {
      title: "Manage Teams",
      description: "View and manage registered teams",
      icon: <TeamOutlined />,
      color: "var(--valorant-teal)",
      action: "manage-teams",
    },
    {
      title: "Schedule Matches",
      description: "Create and schedule new matches",
      icon: <CalendarOutlined />,
      color: "#ffb800",
      action: "schedule-matches",
    },
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: <UserOutlined />,
      color: "#8a2be2",
      action: "user-management",
    },
  ];

  const getActivityIcon = (type, status) => {
    const iconStyle = {
      fontSize: 16,
      color:
        status === "success"
          ? "var(--valorant-teal)"
          : status === "warning"
          ? "#ffb800"
          : status === "pending"
          ? "var(--valorant-red)"
          : "var(--valorant-text-secondary)",
    };

    switch (type) {
      case "tournament":
        return <TrophyOutlined style={iconStyle} />;
      case "team":
        return <TeamOutlined style={iconStyle} />;
      case "match":
        return <CalendarOutlined style={iconStyle} />;
      case "user":
        return <UserOutlined style={iconStyle} />;
      default:
        return <SettingOutlined style={iconStyle} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "var(--valorant-red)";
      case "medium":
        return "#ffb800";
      case "low":
        return "var(--valorant-teal)";
      default:
        return "var(--valorant-text-secondary)";
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
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, ${action.color}, ${action.color}aa)`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: `0 0 20px ${action.color}33`,
                  }}
                >
                  <span style={{ fontSize: 24, color: "white" }}>
                    {action.icon}
                  </span>
                </div>
                <Title
                  level={5}
                  className="valorant-subtitle"
                  style={{ margin: "0 0 8px 0" }}
                >
                  {action.title}
                </Title>
                <Text
                  className="valorant-text-secondary"
                  style={{ fontSize: 12 }}
                >
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Title
                level={4}
                className="valorant-subtitle"
                style={{ margin: 0 }}
              >
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ marginRight: 12 }}>
                      {getActivityIcon(item.type, item.status)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          className="valorant-text-primary"
                          style={{ fontSize: 14, fontWeight: 500 }}
                        >
                          {item.title}
                        </Text>
                        <Tag
                          color={
                            item.status === "success"
                              ? "green"
                              : item.status === "warning"
                              ? "orange"
                              : item.status === "pending"
                              ? "red"
                              : "default"
                          }
                          size="small"
                          style={{ marginLeft: 8, fontSize: 10 }}
                        >
                          {item.status.toUpperCase()}
                        </Tag>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          className="valorant-text-secondary"
                          style={{ fontSize: 12 }}
                        >
                          by {item.user}
                        </Text>
                        <Text
                          className="valorant-text-tertiary"
                          style={{ fontSize: 11 }}
                        >
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Title
                level={4}
                className="valorant-subtitle"
                style={{ margin: 0 }}
              >
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
                    {/* Team Name and Priority */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TeamOutlined
                          style={{
                            marginRight: 8,
                            color: "var(--valorant-teal)",
                          }}
                        />
                        <Text
                          className="valorant-text-primary"
                          style={{ fontSize: 14, fontWeight: 600 }}
                        >
                          {item.title}
                        </Text>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: getPriorityColor(item.priority),
                            marginLeft: 8,
                          }}
                        />
                      </div>
                      <Text
                        className="valorant-text-tertiary"
                        style={{ fontSize: 11 }}
                      >
                        {item.submittedAt}
                      </Text>
                    </div>

                    {/* Tournament Info */}
                    <div style={{ marginBottom: 6 }}>
                      <Text
                        className="valorant-text-secondary"
                        style={{ fontSize: 11, display: "block" }}
                      >
                        <TrophyOutlined
                          style={{ marginRight: 4, fontSize: 10 }}
                        />
                        Tournament: {item.tournamentInfo?.name}
                      </Text>
                    </div>

                    {/* Event Info */}
                    <div style={{ marginBottom: 6 }}>
                      <Text
                        className="valorant-text-secondary"
                        style={{ fontSize: 11, display: "block" }}
                      >
                        <CalendarOutlined
                          style={{ marginRight: 4, fontSize: 10 }}
                        />
                        Event: {item.eventInfo?.name}
                      </Text>
                    </div>

                    {/* Team Info */}
                    <div style={{ marginBottom: 8 }}>
                      <Text
                        className="valorant-text-secondary"
                        style={{ fontSize: 11, display: "block" }}
                      >
                        <UserOutlined
                          style={{ marginRight: 4, fontSize: 10 }}
                        />
                        Captain: {item.teamInfo?.captain} (
                        {item.teamInfo?.captainRank}) • Members:{" "}
                        {item.teamInfo?.memberCount}/5
                      </Text>
                    </div>

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        className="valorant-text-tertiary"
                        style={{ fontSize: 10 }}
                      >
                        สมัครทีมเข้าร่วมรายการ
                      </Text>
                      <Space size="small">
                        <Button
                          size="small"
                          type="text"
                          icon={<EyeOutlined />}
                          className="valorant-button-secondary"
                          onClick={() => console.log("View details:", item.id)}
                          style={{ color: "var(--valorant-text-secondary)" }}
                        />
                        <Button
                          size="small"
                          type="text"
                          icon={<CheckCircleOutlined />}
                          className="valorant-button-secondary"
                          onClick={() => handleApproval(item.id, "approve")}
                          style={{ color: "var(--valorant-teal)" }}
                        />
                        <Button
                          size="small"
                          type="text"
                          icon={<DeleteOutlined />}
                          className="valorant-button-secondary"
                          onClick={() => handleApproval(item.id, "reject")}
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
