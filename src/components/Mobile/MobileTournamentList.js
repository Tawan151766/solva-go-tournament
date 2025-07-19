"use client";
import { useState } from "react";
import { Card, List, Avatar, Tag, Button, Input, Select, Space, Typography, Row, Col } from "antd";
import { 
  SearchOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  TrophyOutlined,
  FilterOutlined,
  PlusOutlined,
  EyeOutlined
} from "@ant-design/icons";
import Link from "next/link";

const { Text, Title } = Typography;
const { Search } = Input;

export default function MobileTournamentList() {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock tournament data
  const tournaments = [
    {
      id: 1,
      name: "VALORANT Champions Tour 2025",
      description: "การแข่งขันอีสปอร์ตระดับโลก สำหรับนักกีฬาอาชีพ",
      location: "Bangkok, Thailand",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      status: "upcoming",
      teams: 32,
      maxTeams: 32,
      prize: "฿500,000",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop&crop=center",
      category: "Professional"
    },
    {
      id: 2,
      name: "Spike Rush Championship",
      description: "ทัวร์นาเมนต์สำหรับนักเรียนและนักศึกษา",
      location: "Chiang Mai, Thailand",
      startDate: "2025-09-10",
      endDate: "2025-09-12",
      status: "registration",
      teams: 12,
      maxTeams: 16,
      prize: "฿100,000",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop&crop=center",
      category: "Student"
    },
    {
      id: 3,
      name: "Radiant Series",
      description: "การแข่งขันระดับมืออาชีพ แบ่งกลุ่มแล้วแพ้คัดออก",
      location: "Phuket, Thailand",
      startDate: "2025-10-15",
      endDate: "2025-10-20",
      status: "completed",
      teams: 24,
      maxTeams: 24,
      prize: "฿1,000,000",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=60&h=60&fit=crop&crop=center",
      category: "Professional"
    },
    {
      id: 4,
      name: "University League",
      description: "การแข่งขันระดับมหาวิทยาลัย",
      location: "Online",
      startDate: "2025-11-01",
      endDate: "2025-11-03",
      status: "active",
      teams: 8,
      maxTeams: 16,
      prize: "฿50,000",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
      category: "University"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#ffb800';
      case 'registration': return 'var(--valorant-teal)';
      case 'active': return 'var(--valorant-red)';
      case 'completed': return 'var(--valorant-text-secondary)';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'กำลังมา';
      case 'registration': return 'เปิดรับสมัคร';
      case 'active': return 'กำลังแข่ง';
      case 'completed': return 'เสร็จสิ้น';
      default: return status;
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tournament.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "16px", paddingTop: "72px" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <Title level={3} className="valorant-title" style={{ margin: 0, fontSize: 20 }}>
              ทัวร์นาเมนต์
            </Title>
            <Text className="valorant-text-secondary" style={{ fontSize: 14 }}>
              {filteredTournaments.length} ทัวร์นาเมนต์
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="valorant-button-primary"
            size="small"
          >
            สร้าง
          </Button>
        </div>

        {/* Search and Filter */}
        <Space direction="vertical" style={{ width: "100%" }} size={12}>
          <Search
            placeholder="ค้นหาทัวร์นาเมนต์..."
            allowClear
            className="valorant-input"
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%" }}
          />
          
          <div style={{ display: "flex", gap: 8 }}>
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              className="valorant-input"
              style={{ flex: 1 }}
              options={[
                { value: 'all', label: 'ทุกสถานะ' },
                { value: 'upcoming', label: 'กำลังมา' },
                { value: 'registration', label: 'เปิดรับสมัคร' },
                { value: 'active', label: 'กำลังแข่ง' },
                { value: 'completed', label: 'เสร็จสิ้น' }
              ]}
            />
            <Button
              icon={<FilterOutlined />}
              className="valorant-button-secondary"
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </Space>
      </div>

      {/* Tournament List */}
      <List
        dataSource={filteredTournaments}
        renderItem={(tournament) => (
          <Card 
            className="valorant-card mobile-tournament-card" 
            style={{ marginBottom: 12, cursor: "pointer" }}
            hoverable
          >
            <Link href={`/tournament/${tournament.id}`} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                {/* Tournament Image */}
                <div style={{ marginRight: 12, flexShrink: 0 }}>
                  <Avatar
                    size={60}
                    src={tournament.image}
                    shape="square"
                    style={{ 
                      border: "2px solid var(--valorant-dark-border)",
                      borderRadius: 8
                    }}
                  />
                </div>

                {/* Tournament Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Title level={5} className="valorant-text-primary" style={{ 
                        margin: 0, 
                        fontSize: 16, 
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {tournament.name}
                      </Title>
                      <Text className="valorant-text-secondary" style={{ fontSize: 12 }}>
                        {tournament.category}
                      </Text>
                    </div>
                    <Tag 
                      style={{ 
                        background: `${getStatusColor(tournament.status)}22`,
                        border: `1px solid ${getStatusColor(tournament.status)}`,
                        color: getStatusColor(tournament.status),
                        fontSize: 10,
                        fontWeight: 600,
                        marginLeft: 8,
                        flexShrink: 0
                      }}
                    >
                      {getStatusText(tournament.status)}
                    </Tag>
                  </div>

                  <Text className="valorant-text-secondary" style={{ 
                    fontSize: 13, 
                    display: "block", 
                    marginBottom: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {tournament.description}
                  </Text>

                  {/* Tournament Details */}
                  <Row gutter={[8, 4]} style={{ marginBottom: 8 }}>
                    <Col span={24}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <EnvironmentOutlined style={{ fontSize: 12, color: "var(--valorant-text-tertiary)", marginRight: 4 }} />
                        <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                          {tournament.location}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CalendarOutlined style={{ fontSize: 12, color: "var(--valorant-text-tertiary)", marginRight: 4 }} />
                        <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                          {new Date(tournament.startDate).toLocaleDateString('th-TH', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TeamOutlined style={{ fontSize: 12, color: "var(--valorant-text-tertiary)", marginRight: 4 }} />
                        <Text className="valorant-text-tertiary" style={{ fontSize: 11 }}>
                          {tournament.teams}/{tournament.maxTeams} ทีม
                        </Text>
                      </div>
                    </Col>
                  </Row>

                  {/* Prize and Action */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <Text className="valorant-text-tertiary" style={{ fontSize: 10 }}>
                        รางวัล
                      </Text>
                      <Text className="valorant-text-primary" style={{ 
                        fontSize: 14, 
                        fontWeight: 700, 
                        display: "block",
                        color: "var(--valorant-teal)"
                      }}>
                        {tournament.prize}
                      </Text>
                    </div>
                    <Button 
                      type="text" 
                      size="small"
                      icon={<EyeOutlined />}
                      className="valorant-button-secondary"
                      style={{ fontSize: 12 }}
                    >
                      ดู
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        )}
      />

      {filteredTournaments.length === 0 && (
        <Card className="valorant-card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <TrophyOutlined style={{ fontSize: 48, color: "var(--valorant-text-tertiary)", marginBottom: 16 }} />
          <Title level={4} className="valorant-text-secondary" style={{ fontSize: 16 }}>
            ไม่พบทัวร์นาเมนต์
          </Title>
          <Text className="valorant-text-tertiary" style={{ fontSize: 14 }}>
            ลองเปลี่ยนคำค้นหาหรือตัวกรอง
          </Text>
        </Card>
      )}
    </div>
  );
}