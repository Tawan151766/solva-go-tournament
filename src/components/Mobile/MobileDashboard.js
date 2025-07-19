"use client";
import { Card, Row, Col, Statistic, Progress, Typography, Space, Button, List, Avatar, Tag } from "antd";
import { 
  TrophyOutlined, 
  TeamOutlined, 
  CalendarOutlined, 
  UserOutlined,
  RiseOutlined,
  FireOutlined,
  EyeOutlined,
  PlusOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function MobileDashboard({ data }) {
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
    weeklyActive = 78.5
  } = data || {};

  const matchProgress = (completedMatches / totalMatches) * 100;
  const teamEngagement = (activeTeams / totalTeams) * 100;

  const quickActions = [
    { title: "สร้างทัวร์นาเมนต์", icon: <TrophyOutlined />, color: "var(--valorant-red)" },
    { title: "จัดการทีม", icon: <TeamOutlined />, color: "var(--valorant-teal)" },
    { title: "กำหนดการแข่ง", icon: <CalendarOutlined />, color: "#ffb800" },
    { title: "ตั้งค่าระบบ", icon: <SettingOutlined />, color: "#8a2be2" }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "VALORANT Champions Tour สร้างแล้ว",
      time: "2 ชั่วโมงที่แล้ว",
      type: "tournament",
      status: "success"
    },
    {
      id: 2,
      title: "Team Phoenix ลงทะเบียนแล้ว",
      time: "4 ชั่วโมงที่แล้ว",
      type: "team",
      status: "pending"
    },
    {
      id: 3,
      title: "รอบรองชนะเลิศเสร็จสิ้น",
      time: "6 ชั่วโมงที่แล้ว",
      type: "match",
      status: "success"
    }
  ];

  return (
    <div style={{ padding: "16px", paddingTop: "72px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={3} className="valorant-title" style={{ margin: 0, fontSize: 20 }}>
          DASHBOARD
        </Title>
        <Text className="valorant-text-secondary" style={{ fontSize: 14 }}>
          ภาพรวมระบบจัดการทัวร์นาเมนต์
        </Text>
      </div>

      {/* Main Stats - Mobile Grid */}
      <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card className="valorant-card mobile-stat-card" style={{ textAlign: "center", padding: "12px" }}>
            <div style={{ 
              background: "linear-gradient(135deg, var(--valorant-red), #ff6b75)",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              boxShadow: "var(--valorant-glow)"
            }}>
              <TrophyOutlined style={{ fontSize: 18, color: "white" }} />
            </div>
            <Text className="valorant-text-primary" style={{ fontSize: 18, fontWeight: 700, display: "block" }}>
              {totalTournaments}
            </Text>
            <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
              ทัวร์นาเมนต์
            </Text>
            <Text className="valorant-text-tertiary" style={{ fontSize: 10, display: "block" }}>
              {activeTournaments} กำลังดำเนิน
            </Text>
          </Card>
        </Col>

        <Col span={12}>
          <Card className="valorant-card mobile-stat-card" style={{ textAlign: "center", padding: "12px" }}>
            <div style={{ 
              background: "linear-gradient(135deg, var(--valorant-teal), #1ae6b8)",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              boxShadow: "0 0 20px rgba(0, 212, 170, 0.3)"
            }}>
              <TeamOutlined style={{ fontSize: 18, color: "white" }} />
            </div>
            <Text className="valorant-text-primary" style={{ fontSize: 18, fontWeight: 700, display: "block" }}>
              {totalTeams}
            </Text>
            <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
              ทีม
            </Text>
            <Text className="valorant-text-tertiary" style={{ fontSize: 10, display: "block" }}>
              {activeTeams} ใช้งานอยู่
            </Text>
          </Card>
        </Col>

        <Col span={12}>
          <Card className="valorant-card mobile-stat-card" style={{ textAlign: "center", padding: "12px" }}>
            <div style={{ 
              background: "linear-gradient(135deg, #ffb800, #ffc933)",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              boxShadow: "0 0 20px rgba(255, 184, 0, 0.3)"
            }}>
              <FireOutlined style={{ fontSize: 18, color: "white" }} />
            </div>
            <Text className="valorant-text-primary" style={{ fontSize: 18, fontWeight: 700, display: "block" }}>
              {totalMatches}
            </Text>
            <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
              แมทช์
            </Text>
            <Text className="valorant-text-tertiary" style={{ fontSize: 10, display: "block" }}>
              {completedMatches} เสร็จสิ้น
            </Text>
          </Card>
        </Col>

        <Col span={12}>
          <Card className="valorant-card mobile-stat-card" style={{ textAlign: "center", padding: "12px" }}>
            <div style={{ 
              background: "linear-gradient(135deg, #8a2be2, #9932cc)",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)"
            }}>
              <UserOutlined style={{ fontSize: 18, color: "white" }} />
            </div>
            <Text className="valorant-text-primary" style={{ fontSize: 18, fontWeight: 700, display: "block" }}>
              {totalUsers}
            </Text>
            <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
              ผู้ใช้
            </Text>
            <Text className="valorant-text-tertiary" style={{ fontSize: 10, display: "block" }}>
              {activeUsers} ออนไลน์
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Progress Cards */}
      <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card className="valorant-card" style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <FireOutlined style={{ color: "var(--valorant-red)", fontSize: 16, marginRight: 8 }} />
              <Text className="valorant-subtitle" style={{ fontSize: 12 }}>
                ความคืบหน้าแมทช์
              </Text>
            </div>
            <div className="valorant-progress">
              <Progress
                percent={Math.round(matchProgress)}
                strokeColor={{
                  '0%': 'var(--valorant-red)',
                  '100%': 'var(--valorant-teal)',
                }}
                trailColor="var(--valorant-dark-border)"
                size="small"
              />
            </div>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
                {completedMatches} / {totalMatches} แมทช์
              </Text>
              <Text className="valorant-text-primary" style={{ fontSize: 11, fontWeight: 600 }}>
                {Math.round(matchProgress)}%
              </Text>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card className="valorant-card" style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <TeamOutlined style={{ color: "var(--valorant-teal)", fontSize: 16, marginRight: 8 }} />
              <Text className="valorant-subtitle" style={{ fontSize: 12 }}>
                การมีส่วนร่วมของทีม
              </Text>
            </div>
            <div className="valorant-progress">
              <Progress
                percent={Math.round(teamEngagement)}
                strokeColor={{
                  '0%': 'var(--valorant-teal)',
                  '100%': '#1ae6b8',
                }}
                trailColor="var(--valorant-dark-border)"
                size="small"
              />
            </div>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
                {activeTeams} / {totalTeams} ทีม
              </Text>
              <Text className="valorant-text-primary" style={{ fontSize: 11, fontWeight: 600 }}>
                {Math.round(teamEngagement)}%
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card className="valorant-card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Text className="valorant-subtitle" style={{ fontSize: 14 }}>
            การดำเนินการด่วน
          </Text>
          <Button 
            type="text" 
            size="small"
            icon={<PlusOutlined />}
            className="valorant-button-secondary"
          />
        </div>
        
        <Row gutter={[8, 8]}>
          {quickActions.map((action, index) => (
            <Col span={12} key={index}>
              <div 
                style={{
                  padding: "12px",
                  background: "var(--valorant-dark-elevated)",
                  borderRadius: "8px",
                  border: "1px solid var(--valorant-dark-border)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                className="mobile-quick-action"
              >
                <div style={{
                  width: 32,
                  height: 32,
                  background: `${action.color}22`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 8px",
                  border: `1px solid ${action.color}`
                }}>
                  <span style={{ color: action.color, fontSize: 14 }}>
                    {action.icon}
                  </span>
                </div>
                <Text className="valorant-text-primary" style={{ fontSize: 11, fontWeight: 500 }}>
                  {action.title}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Recent Activities */}
      <Card className="valorant-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Text className="valorant-subtitle" style={{ fontSize: 14 }}>
            กิจกรรมล่าสุด
          </Text>
          <Button 
            type="text" 
            size="small"
            icon={<EyeOutlined />}
            className="valorant-button-secondary"
          >
            ดูทั้งหมด
          </Button>
        </div>
        
        <List
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item style={{ padding: "8px 0", border: "none" }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: item.status === 'success' ? 'var(--valorant-teal)' : 
                             item.status === 'pending' ? 'var(--valorant-red)' : 
                             'var(--valorant-text-secondary)',
                  marginRight: 12,
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <Text className="valorant-text-primary" style={{ fontSize: 13, fontWeight: 500, display: "block" }}>
                    {item.title}
                  </Text>
                  <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                    {item.time}
                  </Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}