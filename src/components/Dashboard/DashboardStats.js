"use client";
import { Card, Row, Col, Statistic, Progress, Typography } from "antd";
import {
  TrophyOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  RiseOutlined,
  FireOutlined,
  ThunderboltOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function DashboardStats({ data }) {
  const {
    totalTournaments = 12,
    activeTournaments = 3,
    totalTeams = 156,
    activeTeams = 89,
    totalMatches = 234,
    completedMatches = 187,
    totalUsers = 445,
    activeUsers = 234,
    monthlyGrowth = 15.2,
    weeklyActive = 78.5,
  } = data || {};

  const matchProgress = (completedMatches / totalMatches) * 100;
  const teamEngagement = (activeTeams / totalTeams) * 100;
  const userEngagement = (activeUsers / totalUsers) * 100;

  return (
    <div>
      <Title level={2} className="valorant-title" style={{ marginBottom: 24 }}>
        TOURNAMENT ANALYTICS
      </Title>

      {/* Main Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="valorant-card" style={{ textAlign: "center" }}>
            <div
              style={{
                background:
                  "linear-gradient(135deg, var(--valorant-red), #ff6b75)",
                borderRadius: "50%",
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "var(--valorant-glow)",
              }}
            >
              <TrophyOutlined style={{ fontSize: 24, color: "white" }} />
            </div>
            <Statistic
              title={<span className="valorant-subtitle">TOURNAMENTS</span>}
              value={totalTournaments}
              valueStyle={{
                color: "var(--valorant-text-primary)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
              }}
            />
            <div style={{ marginTop: 8 }}>
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {activeTournaments} Active
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="valorant-card" style={{ textAlign: "center" }}>
            <div
              style={{
                background:
                  "linear-gradient(135deg, var(--valorant-teal), #1ae6b8)",
                borderRadius: "50%",
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 0 20px rgba(0, 212, 170, 0.3)",
              }}
            >
              <TeamOutlined style={{ fontSize: 24, color: "white" }} />
            </div>
            <Statistic
              title={<span className="valorant-subtitle">TEAMS</span>}
              value={totalTeams}
              valueStyle={{
                color: "var(--valorant-text-primary)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
              }}
            />
            <div style={{ marginTop: 8 }}>
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {activeTeams} Active
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="valorant-card" style={{ textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #ffb800, #ffc933)",
                borderRadius: "50%",
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 0 20px rgba(255, 184, 0, 0.3)",
              }}
            >
              <FireOutlined style={{ fontSize: 24, color: "white" }} />
            </div>
            <Statistic
              title={<span className="valorant-subtitle">MATCHES</span>}
              value={totalMatches}
              valueStyle={{
                color: "var(--valorant-text-primary)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
              }}
            />
            <div style={{ marginTop: 8 }}>
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {completedMatches} Completed
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="valorant-card" style={{ textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #8a2be2, #9932cc)",
                borderRadius: "50%",
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)",
              }}
            >
              <UserOutlined style={{ fontSize: 24, color: "white" }} />
            </div>
            <Statistic
              title={<span className="valorant-subtitle">USERS</span>}
              value={totalUsers}
              valueStyle={{
                color: "var(--valorant-text-primary)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
              }}
            />
            <div style={{ marginTop: 8 }}>
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {activeUsers} Active
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Progress Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={8}>
          <Card className="valorant-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <ThunderboltOutlined
                style={{
                  color: "var(--valorant-red)",
                  fontSize: 20,
                  marginRight: 8,
                }}
              />
              <span className="valorant-subtitle">MATCH COMPLETION</span>
            </div>
            <div className="valorant-progress">
              <Progress
                percent={Math.round(matchProgress)}
                strokeColor={{
                  "0%": "var(--valorant-red)",
                  "100%": "var(--valorant-teal)",
                }}
                trailColor="var(--valorant-dark-border)"
                size="small"
              />
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {completedMatches} / {totalMatches} matches
              </span>
              <span
                className="valorant-text-primary"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {Math.round(matchProgress)}%
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="valorant-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <TeamOutlined
                style={{
                  color: "var(--valorant-teal)",
                  fontSize: 20,
                  marginRight: 8,
                }}
              />
              <span className="valorant-subtitle">TEAM ENGAGEMENT</span>
            </div>
            <div className="valorant-progress">
              <Progress
                percent={Math.round(teamEngagement)}
                strokeColor={{
                  "0%": "var(--valorant-teal)",
                  "100%": "#1ae6b8",
                }}
                trailColor="var(--valorant-dark-border)"
                size="small"
              />
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {activeTeams} / {totalTeams} teams
              </span>
              <span
                className="valorant-text-primary"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {Math.round(teamEngagement)}%
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="valorant-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <UserOutlined
                style={{ color: "#ffb800", fontSize: 20, marginRight: 8 }}
              />
              <span className="valorant-subtitle">USER ACTIVITY</span>
            </div>
            <div className="valorant-progress">
              <Progress
                percent={Math.round(userEngagement)}
                strokeColor={{
                  "0%": "#ffb800",
                  "100%": "#ffc933",
                }}
                trailColor="var(--valorant-dark-border)"
                size="small"
              />
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                {activeUsers} / {totalUsers} users
              </span>
              <span
                className="valorant-text-primary"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {Math.round(userEngagement)}%
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Growth Metrics */}
      <Row gutter={[24, 24]}>
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <RiseOutlined
                  style={{
                    color: "var(--valorant-teal)",
                    fontSize: 20,
                    marginRight: 8,
                  }}
                />
                <span className="valorant-subtitle">MONTHLY GROWTH</span>
              </div>
              <div
                style={{
                  background: "rgba(0, 212, 170, 0.1)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--valorant-teal)",
                }}
              >
                <span
                  style={{
                    color: "var(--valorant-teal)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  +{monthlyGrowth}%
                </span>
              </div>
            </div>
            <Statistic
              value={monthlyGrowth}
              precision={1}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{
                color: "var(--valorant-teal)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 24,
              }}
            />
            <div style={{ marginTop: 8 }}>
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                Compared to last month
              </span>
            </div>
          </Card>
        </Col>

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
              <div style={{ display: "flex", alignItems: "center" }}>
                <StarOutlined
                  style={{
                    color: "var(--valorant-red)",
                    fontSize: 20,
                    marginRight: 8,
                  }}
                />
                <span className="valorant-subtitle">WEEKLY ACTIVE</span>
              </div>
              <div
                style={{
                  background: "rgba(255, 70, 85, 0.1)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--valorant-red)",
                }}
              >
                <span
                  style={{
                    color: "var(--valorant-red)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {weeklyActive}%
                </span>
              </div>
            </div>
            <Statistic
              value={weeklyActive}
              precision={1}
              suffix="%"
              prefix={<StarOutlined />}
              valueStyle={{
                color: "var(--valorant-red)",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 24,
              }}
            />
            <div style={{ marginTop: 8 }}>
              <span
                className="valorant-text-secondary"
                style={{ fontSize: 12 }}
              >
                Users active this week
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
