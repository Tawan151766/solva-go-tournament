
"use client";
import { useState } from "react";
import { Input, DatePicker, Card, Row, Col, Empty, Typography, Space, Button } from "antd";
import { SearchOutlined, CalendarOutlined, EnvironmentOutlined, TrophyOutlined } from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

export default function Home() {
  // Mock tournament data with Valorant theme
  const tournaments = [
    {
      id: 1,
      name: "VALORANT Champions Tour",
      description: "การแข่งขันอีสปอร์ตระดับโลก สำหรับนักกีฬาอาชีพ",
      location: "Bangkok, Thailand",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      createdById: 101,
      createdAt: "2025-07-01T10:00:00Z",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop&crop=center",
      logo: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=60&h=60&fit=crop&crop=center",
      status: "upcoming",
      prize: "฿500,000",
    },
    {
      id: 2,
      name: "Spike Rush Championship",
      description: "ทัวร์นาเมนต์สำหรับนักเรียนและนักศึกษา",
      location: "Chiang Mai, Thailand",
      startDate: "2025-09-10",
      endDate: "2025-09-12",
      createdById: 102,
      createdAt: "2025-07-10T09:00:00Z",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop&crop=center",
      logo: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=60&h=60&fit=crop&crop=center",
      status: "registration",
      prize: "฿100,000",
    },
    {
      id: 3,
      name: "Radiant Series",
      description: "การแข่งขันระดับมืออาชีพ แบ่งกลุ่มแล้วแพ้คัดออก",
      location: "Phuket, Thailand",
      startDate: "2025-10-15",
      endDate: "2025-10-20",
      createdById: 103,
      createdAt: "2025-07-20T08:00:00Z",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop&crop=center",
      logo: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=60&h=60&fit=crop&crop=center",
      status: "completed",
      prize: "฿1,000,000",
    },
  ];


  const [filters, setFilters] = useState({
    name: "",
    location: "",
    dateRange: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => {
    setFilters((prev) => ({ ...prev, dateRange: dates }));
  };

  const filteredTournaments = tournaments.filter((t) => {
    const nameMatch = t.name.toLowerCase().includes(filters.name.toLowerCase());
    const locationMatch = t.location.toLowerCase().includes(filters.location.toLowerCase());
    let dateMatch = true;
    if (filters.dateRange && filters.dateRange.length === 2 && filters.dateRange[0] && filters.dateRange[1]) {
      const start = dayjs(t.startDate);
      const filterStart = filters.dateRange[0];
      const filterEnd = filters.dateRange[1];
      dateMatch = start.isAfter(filterStart.subtract(1, 'day')) && start.isBefore(filterEnd.add(1, 'day'));
    }
    return nameMatch && locationMatch && dateMatch;
  });

  return (
    <div className="valorant-layout valorant-content">
      {/* Hero Section */}
      <Row justify="center" style={{ marginBottom: 48 }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <TrophyOutlined style={{ fontSize: 64, color: "var(--valorant-red)", marginBottom: 16 }} />
          </div>
          <Title level={1} className="valorant-title">
            VALORANT TOURNAMENT SYSTEM
          </Title>
          <Text className="valorant-subtitle" style={{ fontSize: 18 }}>
            Professional Esports Tournament Management Platform
          </Text>
        </Col>
      </Row>

      {/* Filter Section */}
      <Row justify="center" style={{ marginBottom: 32 }}>
        <Col xs={24} sm={22} md={18} lg={12} xl={10}>
          <Card className="valorant-card">
            <div className="valorant-card-header" style={{ padding: "12px 16px", marginBottom: 16 }}>
              <Text className="valorant-subtitle">
                <SearchOutlined style={{ marginRight: 8 }} />
                SEARCH TOURNAMENTS
              </Text>
            </div>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div className="valorant-input">
                    <Input
                      name="name"
                      value={filters.name}
                      onChange={handleInputChange}
                      placeholder="ค้นหาชื่อทัวร์นาเมนต์"
                      prefix={<SearchOutlined />}
                      allowClear
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="valorant-input">
                    <Input
                      name="location"
                      value={filters.location}
                      onChange={handleInputChange}
                      placeholder="ค้นหาสถานที่จัด"
                      prefix={<EnvironmentOutlined />}
                      allowClear
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <div className="valorant-input">
                    <RangePicker
                      style={{ width: "100%" }}
                      value={filters.dateRange}
                      onChange={handleDateChange}
                      format="YYYY-MM-DD"
                      placeholder={["วันที่เริ่ม", "วันที่สิ้นสุด"]}
                      suffixIcon={<CalendarOutlined />}
                    />
                  </div>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
      {/* Tournament Cards */}
      <Row gutter={[24, 24]} justify="center">
        {filteredTournaments.length === 0 ? (
          <Col span={24} style={{ textAlign: "center" }}>
            <div className="valorant-card" style={{ padding: 48 }}>
              <TrophyOutlined style={{ fontSize: 48, color: "var(--valorant-text-tertiary)", marginBottom: 16 }} />
              <Text className="valorant-text-secondary">ไม่พบข้อมูลทัวร์นาเมนต์</Text>
            </div>
          </Col>
        ) : (
          filteredTournaments.map((t) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={t.id}>
              <Link href={`/tournament/${t.id}`} style={{ textDecoration: "none" }}>
                <Card
                  className="valorant-card"
                  style={{ minHeight: 320, cursor: "pointer", overflow: "hidden" }}
                  hoverable
                  cover={
                    <div style={{ position: "relative", height: 180 }}>
                      <img 
                        src={t.image} 
                        alt={t.name}
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          filter: "brightness(0.8)"
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(255, 70, 85, 0.1), rgba(0, 212, 170, 0.1))"
                      }} />
                      <div style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "var(--valorant-dark-elevated)",
                        borderRadius: "50%",
                        padding: 4,
                        border: "2px solid var(--valorant-red)"
                      }}>
                        <img 
                          src={t.logo} 
                          alt="logo"
                          style={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: "50%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                      <div style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                      }}>
                        {t.status === "upcoming" && (
                          <span className="valorant-tag-warning" style={{ padding: "4px 8px", borderRadius: 4, fontSize: 10 }}>
                            UPCOMING
                          </span>
                        )}
                        {t.status === "registration" && (
                          <span className="valorant-tag-success" style={{ padding: "4px 8px", borderRadius: 4, fontSize: 10 }}>
                            OPEN
                          </span>
                        )}
                        {t.status === "completed" && (
                          <span className="valorant-tag-default" style={{ padding: "4px 8px", borderRadius: 4, fontSize: 10 }}>
                            COMPLETED
                          </span>
                        )}
                      </div>
                    </div>
                  }
                >
                  <div style={{ padding: "16px 0" }}>
                    <Title level={4} className="valorant-subtitle" style={{ margin: 0, marginBottom: 8, color: "var(--valorant-red)" }}>
                      {t.name}
                    </Title>
                    
                    <div style={{ marginBottom: 12 }}>
                      <Text className="valorant-text-secondary" style={{ fontSize: 13 }}>
                        <EnvironmentOutlined style={{ marginRight: 4 }} />
                        {t.location}
                      </Text>
                    </div>
                    
                    <div style={{ marginBottom: 12 }}>
                      <Text className="valorant-text-secondary" style={{ fontSize: 13 }}>
                        <CalendarOutlined style={{ marginRight: 4 }} />
                        {dayjs(t.startDate).format("DD MMM")} - {dayjs(t.endDate).format("DD MMM YYYY")}
                      </Text>
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <Text className="valorant-text-primary" style={{ fontSize: 14 }}>
                        {t.description}
                      </Text>
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <Text className="valorant-text-tertiary" style={{ fontSize: 12 }}>
                          Prize Pool
                        </Text>
                        <br />
                        <Text className="valorant-text-primary" style={{ fontSize: 16, fontWeight: 600 }}>
                          {t.prize}
                        </Text>
                      </div>
                      <Button 
                        type="primary" 
                        className="valorant-button-primary"
                        size="small"
                      >
                        VIEW
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
