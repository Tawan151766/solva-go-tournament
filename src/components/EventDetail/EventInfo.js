"use client";
import { Card, Typography, Descriptions, Tag, Progress } from "antd";
import { TrophyOutlined, TeamOutlined, FireOutlined, ThunderboltOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function EventInfo({ event, eventTeams }) {
  const getCompetitionTypeIcon = (type) => {
    switch (type) {
      case "knockout":
        return <ThunderboltOutlined style={{ color: "var(--valorant-red)" }} />;
      case "round-robin":
        return <FireOutlined style={{ color: "var(--valorant-teal)" }} />;
      case "group-knockout":
        return <TrophyOutlined style={{ color: "var(--valorant-red)" }} />;
      default:
        return <TeamOutlined />;
    }
  };

  const getCompetitionTypeName = (type) => {
    switch (type) {
      case "knockout":
        return "ELIMINATION";
      case "round-robin":
        return "ROUND ROBIN";
      case "group-knockout":
        return "GROUP STAGE + ELIMINATION";
      default:
        return type.toUpperCase();
    }
  };

  const registrationProgress = (eventTeams.length / event.maxTeams) * 100;

  return (
    <Card className="valorant-card" style={{ marginBottom: 24 }}>
      <div className="valorant-card-header" style={{ padding: "16px 0", marginBottom: 24 }}>
        <Title level={2} className="valorant-title" style={{ margin: 0 }}>
          {event.name}
        </Title>
        <Text className="valorant-subtitle">
          EVENT #{event.id} • TOURNAMENT #{event.tournamentId}
        </Text>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {/* Competition Info */}
        <div className="valorant-bg-elevated" style={{ padding: 20, borderRadius: 8, border: "1px solid var(--valorant-dark-border)" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            {getCompetitionTypeIcon(event.competitionType)}
            <Text className="valorant-subtitle" style={{ marginLeft: 8 }}>
              COMPETITION TYPE
            </Text>
          </div>
          <Title level={4} className="valorant-text-primary" style={{ margin: 0 }}>
            {getCompetitionTypeName(event.competitionType)}
          </Title>
        </div>

        {/* Category Info */}
        <div className="valorant-bg-elevated" style={{ padding: 20, borderRadius: 8, border: "1px solid var(--valorant-dark-border)" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <TeamOutlined style={{ color: "var(--valorant-teal)" }} />
            <Text className="valorant-subtitle" style={{ marginLeft: 8 }}>
              CATEGORY
            </Text>
          </div>
          <Title level={4} className="valorant-text-primary" style={{ margin: 0 }}>
            {event.category}
          </Title>
        </div>

        {/* Team Size */}
        <div className="valorant-bg-elevated" style={{ padding: 20, borderRadius: 8, border: "1px solid var(--valorant-dark-border)" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <TeamOutlined style={{ color: "var(--valorant-red)" }} />
            <Text className="valorant-subtitle" style={{ marginLeft: 8 }}>
              TEAM SIZE
            </Text>
          </div>
          <Title level={4} className="valorant-text-primary" style={{ margin: 0 }}>
            {event.teamSize} {event.teamSize === 1 ? "PLAYER" : "PLAYERS"}
          </Title>
        </div>

        {/* Registration Status */}
        <div className="valorant-bg-elevated" style={{ padding: 20, borderRadius: 8, border: "1px solid var(--valorant-dark-border)" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <TrophyOutlined style={{ color: "var(--valorant-teal)" }} />
            <Text className="valorant-subtitle" style={{ marginLeft: 8 }}>
              REGISTRATION
            </Text>
          </div>
          <div style={{ marginBottom: 12 }}>
            <Text className="valorant-text-primary" style={{ fontSize: 18, fontWeight: 600 }}>
              {eventTeams.length} / {event.maxTeams}
            </Text>
            <Text className="valorant-text-secondary" style={{ marginLeft: 8 }}>
              TEAMS
            </Text>
          </div>
          <div className="valorant-progress">
            <Progress
              percent={registrationProgress}
              showInfo={false}
              strokeColor={{
                '0%': 'var(--valorant-red)',
                '100%': 'var(--valorant-teal)',
              }}
              trailColor="var(--valorant-dark-border)"
              size="small"
            />
          </div>
          <div style={{ marginTop: 8 }}>
            {registrationProgress >= 100 ? (
              <Tag className="valorant-tag-danger">FULL</Tag>
            ) : registrationProgress >= 75 ? (
              <Tag className="valorant-tag-warning">ALMOST FULL</Tag>
            ) : (
              <Tag className="valorant-tag-success">OPEN</Tag>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Descriptions */}
      <div style={{ marginTop: 32 }}>
        <div className="valorant-divider-red" style={{ margin: "24px 0" }} />
        <Descriptions
          column={{ xs: 1, sm: 2, md: 2, lg: 2 }}
          size="middle"
          styles={{
            label: { 
              color: "var(--valorant-text-secondary)", 
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            },
            content: { 
              color: "var(--valorant-text-primary)",
              fontWeight: 500
            }
          }}
        >
          <Descriptions.Item label="Event ID">
            <Tag className="valorant-tag-default">#{event.id}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Tournament ID">
            <Tag className="valorant-tag-default">#{event.tournamentId}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Max Teams">
            {event.maxTeams} teams
          </Descriptions.Item>
          <Descriptions.Item label="Team Size">
            {event.teamSize} {event.teamSize === 1 ? "player" : "players"} per team
          </Descriptions.Item>
          <Descriptions.Item label="Registered Teams">
            <span style={{ color: "var(--valorant-teal)", fontWeight: 600 }}>
              {eventTeams.length} teams
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Available Slots">
            <span style={{ color: registrationProgress >= 100 ? "var(--valorant-red)" : "var(--valorant-teal)", fontWeight: 600 }}>
              {event.maxTeams - eventTeams.length} slots
            </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
}