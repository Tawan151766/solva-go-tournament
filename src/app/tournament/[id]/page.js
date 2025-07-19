"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Card,
  Typography,
  Descriptions,
  Table,
  Row,
  Col,
  Button,
  Tabs,
  Result,
  Avatar,
  Statistic,
  Tag,
  Space,
} from "antd";
import { useState } from "react";
import {
  TrophyOutlined,
  CrownOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

// Mock tournament data
const tournaments = [
  {
    id: 1,
    name: "Solva Go Championship",
    description: "การแข่งขันโกะระดับประเทศ จัดโดย Solva.",
    location: "Bangkok",
    startDate: "2025-08-01",
    endDate: "2025-08-05",
    createdById: 101,
    createdAt: "2025-07-01T10:00:00Z",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Go Summer Cup",
    description: "ทัวร์นาเมนต์โกะสำหรับเยาวชน.",
    location: "Chiang Mai",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    createdById: 102,
    createdAt: "2025-07-10T09:00:00Z",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "National Go Championship",
    description: "การแข่งขันโกะระดับชาติ แบ่งกลุ่มแล้วแพ้คัดออก",
    location: "Phuket",
    startDate: "2025-10-15",
    endDate: "2025-10-20",
    createdById: 103,
    createdAt: "2025-07-20T08:00:00Z",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop&crop=center",
    logo: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=100&h=100&fit=crop&crop=center",
  },

  // ...more mock data
];

// Mock event data (1 tournament can have many events)
const events = [
  {
    id: 1,
    name: "ป.1-3 เดี่ยว",
    category: "ป.1-3",
    competitionType: "knockout",
    teamSize: 1,
    maxTeams: 16,
    tournamentId: 1,
  },
  {
    id: 2,
    name: "ป.4-6 ทีม",
    category: "ป.4-6",
    competitionType: "round-robin",
    teamSize: 3,
    maxTeams: 8,
    tournamentId: 1,
  },
  {
    id: 3,
    name: "ม.ปลาย เดี่ยว",
    category: "ม.ปลาย",
    competitionType: "knockout",
    teamSize: 1,
    maxTeams: 12,
    tournamentId: 2,
  },
  {
    id: 4,
    name: "มหาวิทยาลัย ทีม",
    category: "มหาวิทยาลัย",
    competitionType: "group-knockout",
    teamSize: 4,
    maxTeams: 24,
    tournamentId: 3,
  },
  {
    id: 5,
    name: "ผู้ใหญ่ เดี่ยว",
    category: "ผู้ใหญ่",
    competitionType: "group-knockout",
    teamSize: 1,
    maxTeams: 32,
    tournamentId: 3,
  },
  // ...more mock events
];

// Mock results data for demonstration
const mockEventResults = {
  1: {
    // Event ID 1 - ป.1-3 เดี่ยว (Knockout)
    champion: {
      id: "T1",
      name: "โรงเรียน A ทีม 1",
      schoolId: "S1",
      members: ["U1"],
    },
    runnerUp: {
      id: "T2",
      name: "โรงเรียน B ทีม 2",
      schoolId: "S2",
      members: ["U4"],
    },
    isFinished: true,
    type: "knockout",
  },
  2: {
    // Event ID 2 - ป.4-6 ทีม (Round Robin)
    champion: {
      id: "T9",
      name: "ป.4-6 ทีม A",
      schoolId: "S5",
      members: ["U29", "U30", "U31"],
    },
    runnerUp: {
      id: "T10",
      name: "ป.4-6 ทีม B",
      schoolId: "S6",
      members: ["U32", "U33", "U34"],
    },
    third: {
      id: "T11",
      name: "ป.4-6 ทีม C",
      schoolId: "S7",
      members: ["U35", "U36", "U37"],
    },
    standings: [
      {
        team: { id: "T9", name: "ป.4-6 ทีม A" },
        points: 9,
        won: 3,
        lost: 0,
        scoreFor: 15,
        scoreAgainst: 8,
        scoreDiff: 7,
      },
      {
        team: { id: "T10", name: "ป.4-6 ทีม B" },
        points: 6,
        won: 2,
        lost: 1,
        scoreFor: 12,
        scoreAgainst: 10,
        scoreDiff: 2,
      },
      {
        team: { id: "T11", name: "ป.4-6 ทีม C" },
        points: 3,
        won: 1,
        lost: 2,
        scoreFor: 10,
        scoreAgainst: 12,
        scoreDiff: -2,
      },
    ],
    isFinished: true,
    type: "round-robin",
  },
  3: {
    // Event ID 3 - ม.ปลาย เดี่ยว (Knockout) - Not finished
    isFinished: false,
    type: "knockout",
  },
  4: {
    // Event ID 4 - มหาวิทยาลัย ทีม (Group-Knockout)
    champion: {
      id: "T5",
      name: "มหาวิทยาลัย A",
      schoolId: "U1",
      members: ["U13", "U14", "U15", "U16"],
    },
    runnerUp: {
      id: "T6",
      name: "มหาวิทยาลัย B",
      schoolId: "U2",
      members: ["U17", "U18", "U19", "U20"],
    },
    isFinished: true,
    type: "group-knockout",
  },
  5: {
    // Event ID 5 - ผู้ใหญ่ เดี่ยว (Group-Knockout) - Not finished
    isFinished: false,
    type: "group-knockout",
  },
};

const { Title, Text } = Typography;

export default function TournamentDetailPage() {
  const params = useParams();
  const id = params.id;
  const tournament = tournaments.find((t) => String(t.id) === String(id));

  if (!tournament) {
    return (
      <Card style={{ maxWidth: 900, margin: "40px auto" }}>
        <Title level={4}>ไม่พบข้อมูลทัวร์นาเมนต์</Title>
      </Card>
    );
  }

  // Filter events for this tournament
  const tournamentEvents = events.filter(
    (e) => String(e.tournamentId) === String(tournament.id)
  );

  // Get tournament results
  const getTournamentResults = () => {
    const finishedEvents = tournamentEvents.filter((event) => {
      const result = mockEventResults[event.id];
      return result && result.isFinished;
    });

    const unfinishedEvents = tournamentEvents.filter((event) => {
      const result = mockEventResults[event.id];
      return !result || !result.isFinished;
    });

    return { finishedEvents, unfinishedEvents };
  };

  // Check if tournament is finished
  const isTournamentFinished = () => {
    const { unfinishedEvents } = getTournamentResults();
    return unfinishedEvents.length === 0 && tournamentEvents.length > 0;
  };

  // Render event result card
  const renderEventResult = (event) => {
    const result = mockEventResults[event.id];
    if (!result || !result.isFinished) return null;

    const { champion, runnerUp, third, type, standings } = result;

    return (
      <Card
        key={event.id}
        style={{ marginBottom: 16 }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TrophyOutlined style={{ color: "#faad14" }} />
            <span>
              {event.name} - {event.category}
            </span>
            <Tag color="green">เสร็จสิ้น</Tag>
          </div>
        }
      >
        {type === "round-robin" ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div
                style={{
                  textAlign: "center",
                  padding: 16,
                  border: "2px solid #faad14",
                  borderRadius: 8,
                }}
              >
                <Avatar
                  size={48}
                  style={{ backgroundColor: "#faad14", marginBottom: 8 }}
                >
                  <CrownOutlined />
                </Avatar>
                <div style={{ fontWeight: "bold", color: "#faad14" }}>
                  ชนะเลิศ
                </div>
                <div style={{ fontWeight: "bold" }}>{champion?.name}</div>
                {standings && (
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {standings[0]?.points} คะแนน ({standings[0]?.won}W-
                    {standings[0]?.lost}L)
                  </div>
                )}
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div
                style={{
                  textAlign: "center",
                  padding: 16,
                  border: "2px solid #d9d9d9",
                  borderRadius: 8,
                }}
              >
                <Avatar
                  size={48}
                  style={{ backgroundColor: "#d9d9d9", marginBottom: 8 }}
                >
                  <TrophyOutlined />
                </Avatar>
                <div style={{ fontWeight: "bold", color: "#666" }}>
                  รองชนะเลิศ
                </div>
                <div style={{ fontWeight: "bold" }}>{runnerUp?.name}</div>
                {standings && (
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {standings[1]?.points} คะแนน ({standings[1]?.won}W-
                    {standings[1]?.lost}L)
                  </div>
                )}
              </div>
            </Col>
            {third && (
              <Col xs={24} sm={8}>
                <div
                  style={{
                    textAlign: "center",
                    padding: 16,
                    border: "2px solid #cd7f32",
                    borderRadius: 8,
                  }}
                >
                  <Avatar
                    size={48}
                    style={{ backgroundColor: "#cd7f32", marginBottom: 8 }}
                  >
                    <StepForwardOutlined />
                  </Avatar>
                  <div style={{ fontWeight: "bold", color: "#cd7f32" }}>
                    อันดับ 3
                  </div>
                  <div style={{ fontWeight: "bold" }}>{third?.name}</div>
                  {standings && (
                    <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                      {standings[2]?.points} คะแนน ({standings[2]?.won}W-
                      {standings[2]?.lost}L)
                    </div>
                  )}
                </div>
              </Col>
            )}
          </Row>
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div
                style={{
                  textAlign: "center",
                  padding: 16,
                  border: "2px solid #faad14",
                  borderRadius: 8,
                }}
              >
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#faad14", marginBottom: 12 }}
                >
                  <CrownOutlined />
                </Avatar>
                <div
                  style={{ fontWeight: "bold", color: "#faad14", fontSize: 16 }}
                >
                  ชนะเลิศ
                </div>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  {champion?.name}
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                  {champion?.schoolId} | {champion?.members?.join(", ")}
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div
                style={{
                  textAlign: "center",
                  padding: 16,
                  border: "2px solid #d9d9d9",
                  borderRadius: 8,
                }}
              >
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#d9d9d9", marginBottom: 12 }}
                >
                  <TrophyOutlined />
                </Avatar>
                <div
                  style={{ fontWeight: "bold", color: "#666", fontSize: 16 }}
                >
                  รองชนะเลิศ
                </div>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  {runnerUp?.name}
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                  {runnerUp?.schoolId} | {runnerUp?.members?.join(", ")}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Card>
    );
  };

  // Render tournament results summary
  const renderTournamentSummary = () => {
    if (!isTournamentFinished()) return null;

    const allChampions = tournamentEvents
      .map((event) => {
        const result = mockEventResults[event.id];
        return result && result.isFinished
          ? {
              event: event.name,
              category: event.category,
              champion: result.champion,
              type: result.type,
            }
          : null;
      })
      .filter(Boolean);

    return (
      <Card style={{ marginBottom: 24, border: "2px solid #faad14" }}>
        <Result
          icon={<CrownOutlined style={{ color: "#faad14" }} />}
          title={
            <span style={{ color: "#faad14" }}>
              <TrophyOutlined /> {tournament.name} - ผลการแข่งขันรวม
            </span>
          }
          subTitle="การแข่งขันทุกรายการเสร็จสิ้นแล้ว"
        />
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          {allChampions.map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                size="small"
                style={{ textAlign: "center", backgroundColor: "#fffbe6" }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#faad14",
                    marginBottom: 8,
                  }}
                >
                  {item.category}
                </div>
                <Avatar
                  size={40}
                  style={{ backgroundColor: "#faad14", marginBottom: 8 }}
                >
                  <TrophyOutlined />
                </Avatar>
                <div style={{ fontWeight: "bold" }}>{item.champion?.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {item.champion?.schoolId}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    );
  };

  // Ant Design Table columns for events
  const columns = [
    {
      title: <Text strong>Category</Text>,
      dataIndex: "category",
      key: "category",
      render: (text, record) => (
        <Link href={`/event/${record.id}`} style={{ color: "#1677ff" }}>
          {text}
        </Link>
      ),
    },
    {
      title: <Text strong>Competition Type</Text>,
      dataIndex: "competitionType",
      key: "competitionType",
      render: (v) =>
        v === "knockout"
          ? "Knockout"
          : v === "round-robin"
          ? "Round-Robin"
          : v === "group-knockout"
          ? "Group Stage + Knockout"
          : v,
    },
    {
      title: <Text strong>Team Size</Text>,
      dataIndex: "teamSize",
      key: "teamSize",
      align: "center",
    },
    {
      title: <Text strong>Max Teams</Text>,
      dataIndex: "maxTeams",
      key: "maxTeams",
      align: "center",
    },
    {
      title: <Text strong>Status</Text>,
      key: "status",
      align: "center",
      render: (_, record) => {
        const result = mockEventResults[record.id];
        if (result && result.isFinished) {
          return <Tag color="green">เสร็จสิ้น</Tag>;
        }
        return <Tag color="orange">กำลังดำเนินการ</Tag>;
      },
    },
    {
      title: <Text strong>Options</Text>,
      key: "options",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Link href={`/event/${record.id}`}>
            <Button type="primary" size="small">
              ดูรายละเอียด
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  // Create tab items
  const { finishedEvents, unfinishedEvents } = getTournamentResults();

  const tabItems = [
    {
      key: "1",
      label: "รายการแข่งขัน",
      children: (
        <div>
          <Table
            columns={columns}
            dataSource={tournamentEvents}
            rowKey="id"
            pagination={false}
            locale={{ emptyText: "ไม่มีรายการแข่งในทัวร์นาเมนต์นี้" }}
            size="middle"
          />
        </div>
      ),
    },
    ...(finishedEvents.length > 0
      ? [
          {
            key: "2",
            label: `ผลการแข่งขัน (${finishedEvents.length}/${tournamentEvents.length})`,
            icon: <TrophyOutlined />,
            children: (
              <div>
                {renderTournamentSummary()}

                <div style={{ marginBottom: 16 }}>
                  <Title level={5}>ผลการแข่งขันแต่ละรายการ</Title>
                </div>

                {finishedEvents.map((event) => renderEventResult(event))}

                {unfinishedEvents.length > 0 && (
                  <Card style={{ marginTop: 16, backgroundColor: "#f6f6f6" }}>
                    <Title level={6} style={{ color: "#666" }}>
                      รายการที่ยังไม่เสร็จสิ้น
                    </Title>
                    <Space wrap>
                      {unfinishedEvents.map((event) => (
                        <Tag key={event.id} color="orange">
                          {event.category} - {event.name}
                        </Tag>
                      ))}
                    </Space>
                  </Card>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <Card
      style={{
        maxWidth: 900,
        margin: "40px auto",
        boxShadow: "0 2px 8px #f0f1f2",
      }}
    >
      <div
        style={{
          background: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url('${tournament.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 218,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            padding: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Avatar
            size={64}
            src={tournament.logo}
            style={{ border: "3px solid white" }}
          />
          <Title level={2} style={{ color: "#fff", margin: 0 }}>
            {tournament.name}
          </Title>
        </div>
      </div>
      <Text style={{ color: "#101518", fontSize: 16, padding: "0 16px" }}>
        {tournament.description}
      </Text>
      <Row gutter={32} style={{ padding: 24, paddingBottom: 0 }}>
        <Col
          xs={24}
          sm={12}
          style={{ borderTop: "1px solid #d4dce2", paddingTop: 24 }}
        >
          <Text type="secondary">Location</Text>
          <div>
            <Text>{tournament.location}</Text>
          </div>
        </Col>
        <Col
          xs={24}
          sm={6}
          style={{ borderTop: "1px solid #d4dce2", paddingTop: 24 }}
        >
          <Text type="secondary">Start Date</Text>
          <div>
            <Text>{dayjs(tournament.startDate).format("YYYY-MM-DD")}</Text>
          </div>
        </Col>
        <Col
          xs={24}
          sm={6}
          style={{ borderTop: "1px solid #d4dce2", paddingTop: 24 }}
        >
          <Text type="secondary">End Date</Text>
          <div>
            <Text>{dayjs(tournament.endDate).format("YYYY-MM-DD")}</Text>
          </div>
        </Col>
      </Row>
      <div style={{ padding: 16 }}>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </Card>
  );
}
