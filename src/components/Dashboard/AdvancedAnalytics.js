"use client";
import { Card, Row, Col, Typography, Select, DatePicker, Space, Table, Tag } from "antd";
import { 
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  TeamOutlined,
  CalendarOutlined,
  RiseOutlined,
  FallOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function AdvancedAnalytics() {
  // Mock data for charts and tables
  const tournamentPerformance = [
    {
      key: 1,
      tournament: "VALORANT Champions Tour",
      teams: 32,
      matches: 63,
      completion: 95,
      avgDuration: "2.5 hours",
      status: "active",
      trend: "up"
    },
    {
      key: 2,
      tournament: "Spike Rush Championship",
      teams: 16,
      matches: 31,
      completion: 100,
      avgDuration: "1.8 hours",
      status: "completed",
      trend: "up"
    },
    {
      key: 3,
      tournament: "University League",
      teams: 24,
      matches: 47,
      completion: 68,
      avgDuration: "2.1 hours",
      status: "active",
      trend: "down"
    },
    {
      key: 4,
      tournament: "Radiant Series",
      teams: 8,
      matches: 15,
      completion: 87,
      avgDuration: "3.2 hours",
      status: "active",
      trend: "up"
    }
  ];

  const topTeams = [
    { rank: 1, team: "Team Phoenix", wins: 15, losses: 2, winRate: 88.2, points: 1250 },
    { rank: 2, team: "Radiant Squad", wins: 13, losses: 4, winRate: 76.5, points: 1180 },
    { rank: 3, team: "Valorant Kings", wins: 12, losses: 5, winRate: 70.6, points: 1120 },
    { rank: 4, team: "Spike Legends", wins: 11, losses: 6, winRate: 64.7, points: 1080 },
    { rank: 5, team: "Immortal Force", wins: 10, losses: 7, winRate: 58.8, points: 1020 }
  ];

  const performanceMetrics = [
    {
      title: "Tournament Completion Rate",
      value: "87.5%",
      change: "+5.2%",
      trend: "up",
      color: "var(--valorant-teal)",
      icon: <TrophyOutlined />
    },
    {
      title: "Average Match Duration",
      value: "2.3 hrs",
      change: "-0.3 hrs",
      trend: "down",
      color: "var(--valorant-red)",
      icon: <CalendarOutlined />
    },
    {
      title: "Team Participation",
      value: "156 teams",
      change: "+23 teams",
      trend: "up",
      color: "#ffb800",
      icon: <TeamOutlined />
    },
    {
      title: "User Engagement",
      value: "78.5%",
      change: "+12.3%",
      trend: "up",
      color: "#8a2be2",
      icon: <BarChartOutlined />
    }
  ];

  const tournamentColumns = [
    {
      title: "Tournament",
      dataIndex: "tournament",
      key: "tournament",
      render: (text) => (
        <Text className="valorant-text-primary" style={{ fontWeight: 600 }}>
          {text}
        </Text>
      )
    },
    {
      title: "Teams",
      dataIndex: "teams",
      key: "teams",
      align: "center",
      render: (value) => (
        <Text className="valorant-text-primary">{value}</Text>
      )
    },
    {
      title: "Matches",
      dataIndex: "matches",
      key: "matches",
      align: "center",
      render: (value) => (
        <Text className="valorant-text-primary">{value}</Text>
      )
    },
    {
      title: "Completion",
      dataIndex: "completion",
      key: "completion",
      align: "center",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 40,
            height: 6,
            background: "var(--valorant-dark-border)",
            borderRadius: 3,
            marginRight: 8
          }}>
            <div style={{
              width: `${value}%`,
              height: "100%",
              background: value >= 90 ? "var(--valorant-teal)" : 
                         value >= 70 ? "#ffb800" : "var(--valorant-red)",
              borderRadius: 3
            }} />
          </div>
          <Text className="valorant-text-primary" style={{ fontSize: 12 }}>
            {value}%
          </Text>
        </div>
      )
    },
    {
      title: "Avg Duration",
      dataIndex: "avgDuration",
      key: "avgDuration",
      align: "center",
      render: (value) => (
        <Text className="valorant-text-secondary">{value}</Text>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag 
          className={status === "completed" ? "valorant-tag-success" : "valorant-tag-warning"}
          style={{ fontSize: 10 }}
        >
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      align: "center",
      render: (trend) => (
        trend === "up" ? 
          <RiseOutlined style={{ color: "var(--valorant-teal)", fontSize: 16 }} /> :
          <FallOutlined style={{ color: "var(--valorant-red)", fontSize: 16 }} />
      )
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={2} className="valorant-title" style={{ margin: 0 }}>
          ADVANCED ANALYTICS
        </Title>
        <Space>
          <Select
            defaultValue="all"
            className="valorant-input"
            style={{ width: 120 }}
            options={[
              { value: "all", label: "All Time" },
              { value: "month", label: "This Month" },
              { value: "week", label: "This Week" }
            ]}
          />
          <RangePicker className="valorant-input" />
        </Space>
      </div>

      {/* Performance Metrics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {performanceMetrics.map((metric, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="valorant-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  background: `${metric.color}22`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${metric.color}`
                }}>
                  <span style={{ color: metric.color, fontSize: 16 }}>
                    {metric.icon}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {metric.trend === "up" ? 
                    <RiseOutlined style={{ color: "var(--valorant-teal)", fontSize: 12, marginRight: 4 }} /> :
                    <FallOutlined style={{ color: "var(--valorant-red)", fontSize: 12, marginRight: 4 }} />
                  }
                  <Text style={{ 
                    color: metric.trend === "up" ? "var(--valorant-teal)" : "var(--valorant-red)",
                    fontSize: 11,
                    fontWeight: 600
                  }}>
                    {metric.change}
                  </Text>
                </div>
              </div>
              <Text className="valorant-text-secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                {metric.title}
              </Text>
              <Text className="valorant-text-primary" style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Rajdhani', sans-serif" }}>
                {metric.value}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {/* Chart Placeholders */}
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              TOURNAMENT ACTIVITY
            </Title>
            <div style={{ 
              height: 200, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              background: "var(--valorant-dark-elevated)",
              borderRadius: 8,
              border: "1px solid var(--valorant-dark-border)"
            }}>
              <div style={{ textAlign: "center" }}>
                <LineChartOutlined style={{ fontSize: 48, color: "var(--valorant-text-tertiary)", marginBottom: 8 }} />
                <Text className="valorant-text-secondary">Line Chart Coming Soon</Text>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              MATCH DISTRIBUTION
            </Title>
            <div style={{ 
              height: 200, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              background: "var(--valorant-dark-elevated)",
              borderRadius: 8,
              border: "1px solid var(--valorant-dark-border)"
            }}>
              <div style={{ textAlign: "center" }}>
                <PieChartOutlined style={{ fontSize: 48, color: "var(--valorant-text-tertiary)", marginBottom: 8 }} />
                <Text className="valorant-text-secondary">Pie Chart Coming Soon</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Tournament Performance Table */}
        <Col xs={24} lg={14}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              TOURNAMENT PERFORMANCE
            </Title>
            <div className="valorant-table">
              <Table
                columns={tournamentColumns}
                dataSource={tournamentPerformance}
                pagination={false}
                size="small"
              />
            </div>
          </Card>
        </Col>

        {/* Top Teams Leaderboard */}
        <Col xs={24} lg={10}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              TOP PERFORMING TEAMS
            </Title>
            <div>
              {topTeams.map((team, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  padding: "12px 0",
                  borderBottom: index < topTeams.length - 1 ? "1px solid var(--valorant-dark-border)" : "none"
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    background: index < 3 ? 
                      (index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32") :
                      "var(--valorant-dark-elevated)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                    border: index < 3 ? "none" : "1px solid var(--valorant-dark-border)"
                  }}>
                    <Text style={{ 
                      color: index < 3 ? "white" : "var(--valorant-text-primary)",
                      fontSize: 12,
                      fontWeight: 700
                    }}>
                      {team.rank}
                    </Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text className="valorant-text-primary" style={{ fontSize: 14, fontWeight: 600, display: "block" }}>
                      {team.team}
                    </Text>
                    <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
                      {team.wins}W - {team.losses}L ({team.winRate}%)
                    </Text>
                  </div>
                  <Text className="valorant-text-primary" style={{ fontSize: 14, fontWeight: 700 }}>
                    {team.points}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}