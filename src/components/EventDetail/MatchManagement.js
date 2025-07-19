"use client";
import { Table, Tag, Button, Space, Typography } from "antd";
import { TrophyOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function MatchManagement({
  matches,
  event,
  eventTeams,
  roundRobinRounds,
  onGenerateMatches,
  onGenerateNextRound,
  onMatchDetail,
  onRecordResult,
  onRoundRobinSetup,
}) {
  // Match columns for different competition types
  const getMatchColumns = () => {
    const baseColumns = [
      { title: "Match ID", dataIndex: "id", key: "id", width: 100 },
      {
        title: "ทีม 1",
        dataIndex: "team1",
        key: "team1",
        render: (team, record) => (
          <div>
            <div>{team?.name || "-"}</div>
            {record.status === "completed" && (
              <Tag color="blue">{record.score1} คะแนน</Tag>
            )}
          </div>
        ),
      },
      {
        title: "VS",
        key: "vs",
        width: 50,
        align: "center",
        render: (_, record) => (record.isBye ? "BYE" : "VS"),
      },
      {
        title: "ทีม 2",
        dataIndex: "team2",
        key: "team2",
        render: (team, record) => (
          <div>
            <div>{team?.name || "-"}</div>
            {record.status === "completed" && team && (
              <Tag color="blue">{record.score2} คะแนน</Tag>
            )}
          </div>
        ),
      },
      {
        title: "ผู้ชนะ",
        dataIndex: "winner",
        key: "winner",
        render: (winner, record) => {
          if (record.isBye) return <Tag color="gold">BYE</Tag>;
          return winner?.name || "รอผลการแข่ง";
        },
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          const color =
            status === "completed"
              ? "green"
              : status === "ongoing"
              ? "blue"
              : "gold";
          const text =
            status === "completed"
              ? "เสร็จสิ้น"
              : status === "ongoing"
              ? "กำลังแข่ง"
              : "รอแข่ง";
          return <Tag color={color}>{text}</Tag>;
        },
      },
      {
        title: "จัดการ",
        key: "action",
        width: 160,
        render: (_, record) => {
          return (
            <Space>
              <Button size="small" onClick={() => onMatchDetail(record)}>
                ดูรายละเอียด
              </Button>
              {!record.isBye && record.status !== "completed" && (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => onRecordResult(record)}
                >
                  บันทึกผล
                </Button>
              )}
            </Space>
          );
        },
      },
    ];

    if (event.competitionType === "group-knockout") {
      return [
        {
          title: "กลุ่ม",
          dataIndex: "group",
          key: "group",
          width: 80,
          render: (group) => `Group ${group}`,
        },
        ...baseColumns,
      ];
    } else if (event.competitionType === "knockout") {
      return [
        {
          title: "รอบ",
          dataIndex: "round",
          key: "round",
          width: 80,
          render: (round) => `รอบ ${round}`,
        },
        ...baseColumns,
      ];
    }

    return baseColumns;
  };

  // Render matches based on competition type
  const renderMatches = () => {
    if (matches.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: 40 }}>
          <TrophyOutlined
            style={{ fontSize: 48, color: "#ccc", marginBottom: 16 }}
          />
          <div>ยังไม่มีการจับคู่</div>
          <Button
            type="primary"
            onClick={() => {
              if (event.competitionType === "round-robin") {
                onRoundRobinSetup();
              } else {
                onGenerateMatches();
              }
            }}
            style={{ marginTop: 16 }}
            disabled={eventTeams.length < 2}
          >
            สร้างการจับคู่
          </Button>
        </div>
      );
    }

    if (event.competitionType === "group-knockout") {
      // Group matches by group
      const groupedMatches = matches.reduce((acc, match) => {
        const group = match.group || 1;
        if (!acc[group]) acc[group] = [];
        acc[group].push(match);
        return acc;
      }, {});

      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              การจับคู่ Group Stage
            </Title>
            <Button
              onClick={onGenerateMatches}
              disabled={eventTeams.length < 2}
            >
              สร้างการจับคู่ใหม่
            </Button>
          </div>
          {Object.entries(groupedMatches).map(([group, groupMatches]) => (
            <div key={group} style={{ marginBottom: 24 }}>
              <Title level={5}>Group {group}</Title>
              <Table
                columns={getMatchColumns()}
                dataSource={groupMatches}
                rowKey="id"
                pagination={false}
                size="small"
              />
            </div>
          ))}
        </div>
      );
    }

    // Group matches by round for knockout
    if (event.competitionType === "knockout") {
      const rounds = [...new Set(matches.map((m) => m.round))].sort(
        (a, b) => a - b
      );
      const currentRound = Math.max(...matches.map((m) => m.round));
      const canGenerateNextRound =
        matches.filter(
          (m) => m.round === currentRound && m.status === "completed"
        ).length === matches.filter((m) => m.round === currentRound).length &&
        matches.filter((m) => m.round === currentRound).length > 0;

      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              การจับคู่ Knockout
            </Title>
            <Space>
              <Button
                onClick={onGenerateMatches}
                disabled={eventTeams.length < 2}
              >
                สร้างการจับคู่ใหม่
              </Button>
              {matches.length > 0 && canGenerateNextRound && (
                <Button type="primary" onClick={onGenerateNextRound}>
                  สร้างรอบถัดไป
                </Button>
              )}
            </Space>
          </div>
          {rounds.map((round) => {
            const roundMatches = matches.filter((m) => m.round === round);
            return (
              <div key={round} style={{ marginBottom: 24 }}>
                <Title level={5}>รอบ {round}</Title>
                <Table
                  columns={getMatchColumns()}
                  dataSource={roundMatches}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </div>
            );
          })}
        </div>
      );
    }

    // For Round Robin, group matches by round
    if (event.competitionType === "round-robin") {
      const rounds = [...new Set(matches.map((m) => m.round))].sort(
        (a, b) => a - b
      );

      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Title level={5} style={{ margin: 0 }}>
              การจับคู่ Round Robin ({roundRobinRounds} รอบ)
            </Title>
            <Button
              onClick={onRoundRobinSetup}
              disabled={eventTeams.length < 2}
            >
              สร้างการจับคู่ใหม่
            </Button>
          </div>
          {rounds.map((round) => {
            const roundMatches = matches.filter((m) => m.round === round);
            return (
              <div key={round} style={{ marginBottom: 24 }}>
                <Title level={5}>รอบ {round}</Title>
                <Table
                  columns={getMatchColumns()}
                  dataSource={roundMatches}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            การจับคู่
          </Title>
          <Button onClick={onGenerateMatches} disabled={eventTeams.length < 2}>
            สร้างการจับคู่ใหม่
          </Button>
        </div>
        <Table
          columns={getMatchColumns()}
          dataSource={matches}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </div>
    );
  };

  return renderMatches();
}
