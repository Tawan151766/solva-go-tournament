"use client";
import { Table, Typography, Button, Card, Tag, Space } from "antd";

const { Title } = Typography;

export default function StandingsTable({ 
  event, 
  matches, 
  eventTeams, 
  calculateStandings,
  onGenerateKnockoutFromGroups 
}) {
  // Standings table columns
  const standingsColumns = [
    {
      title: "อันดับ",
      key: "rank",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "ทีม",
      dataIndex: "team",
      key: "team",
      render: (team) => team.name,
    },
    {
      title: "แข่ง",
      dataIndex: "played",
      key: "played",
      width: 60,
      align: "center",
    },
    { title: "ชนะ", dataIndex: "won", key: "won", width: 60, align: "center" },
    {
      title: "แพ้",
      dataIndex: "lost",
      key: "lost",
      width: 60,
      align: "center",
    },
    {
      title: "คะแนน",
      dataIndex: "points",
      key: "points",
      width: 80,
      align: "center",
    },
    {
      title: "ได้",
      dataIndex: "scoreFor",
      key: "scoreFor",
      width: 60,
      align: "center",
    },
    {
      title: "เสีย",
      dataIndex: "scoreAgainst",
      key: "scoreAgainst",
      width: 60,
      align: "center",
    },
    {
      title: "+/-",
      dataIndex: "scoreDiff",
      key: "scoreDiff",
      width: 60,
      align: "center",
      render: (diff) => (
        <span style={{ color: diff >= 0 ? "green" : "red" }}>
          {diff >= 0 ? `+${diff}` : diff}
        </span>
      ),
    },
  ];

  // Render standings for Round Robin and Group Stage
  const renderStandings = () => {
    if (event.competitionType === "round-robin") {
      const standings = calculateStandings(matches);
      return (
        <div>
          <Title level={5} style={{ margin: "0 0 16px 0" }}>
            ตารางคะแนน
          </Title>
          <Table
            columns={standingsColumns}
            dataSource={standings}
            rowKey={(record) => record.team.id}
            pagination={false}
            size="small"
            
          />
        </div>
      );
    }

    if (event.competitionType === "group-knockout") {
      const groupMatches = matches.filter((m) => m.group && m.round === 1);
      const groups = [...new Set(groupMatches.map((m) => m.group))].sort(
        (a, b) => a - b
      );

      const groupStageCompleted = groups.every((group) => {
        const groupMatchesForGroup = groupMatches.filter(
          (m) => m.group === group
        );
        const completedGroupMatches = groupMatchesForGroup.filter(
          (m) => m.status === "completed"
        );
        return (
          groupMatchesForGroup.length === completedGroupMatches.length &&
          groupMatchesForGroup.length > 0
        );
      });

      const knockoutMatches = matches.filter(
        (m) => m.phase === "knockout" || m.round > 1
      );
      const hasKnockoutPhase = knockoutMatches.length > 0;

      return (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Title level={5} style={{ margin: 0 }}>ตารางคะแนนแต่ละกลุ่ม</Title>
            {groupStageCompleted && !hasKnockoutPhase && (
              <Button type="primary" onClick={onGenerateKnockoutFromGroups}>
                สร้างรอบ Knockout
              </Button>
            )}
          </div>
          
          {groups.map(group => {
            const standings = calculateStandings(matches, group);
            return (
              <div key={group} style={{ marginBottom: 24 }}>
                <Title level={6}>Group {group} - ตารางคะแนน</Title>
                <Table
                  columns={standingsColumns}
                  dataSource={standings}
                  rowKey={(record) => record.team.id}
                  pagination={false}
                  size="small"
                  
                />
              </div>
            );
          })}

          {hasKnockoutPhase && (
            <div style={{ marginTop: 32 }}>
              <Title level={5}>รอบ Knockout</Title>
              {(() => {
                const koRounds = [
                  ...new Set(knockoutMatches.map((m) => m.round)),
                ].sort((a, b) => a - b);
                const currentKoRound = Math.max(
                  ...knockoutMatches.map((m) => m.round)
                );
                const canGenerateNextKoRound =
                  knockoutMatches.filter(
                    (m) =>
                      m.round === currentKoRound && m.status === "completed"
                  ).length ===
                    knockoutMatches.filter((m) => m.round === currentKoRound)
                      .length &&
                  knockoutMatches.filter((m) => m.round === currentKoRound)
                    .length > 0;

                return (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 16,
                      }}
                    >
                      {canGenerateNextKoRound && (
                        <Button
                          type="primary"
                          onClick={() => {
                            // This would be handled by the parent component
                            console.log("Generate next knockout round");
                          }}
                        >
                          สร้างรอบ Knockout ถัดไป
                        </Button>
                      )}
                    </div>
                    {koRounds.map((round) => {
                      const roundMatches = knockoutMatches.filter(
                        (m) => m.round === round
                      );
                      return (
                        <div key={round} style={{ marginBottom: 24 }}>
                          <Title level={6}>รอบ {round} (Knockout)</Title>
                          <Table
                            columns={[
                              { title: "Match ID", dataIndex: "id", key: "id", width: 100 },
                              { title: "ทีม 1", dataIndex: "team1", key: "team1", render: (team) => team?.name || "-" },
                              { title: "VS", key: "vs", width: 50, align: "center", render: () => "VS" },
                              { title: "ทีม 2", dataIndex: "team2", key: "team2", render: (team) => team?.name || "-" },
                              { title: "ผู้ชนะ", dataIndex: "winner", key: "winner", render: (winner) => winner?.name || "รอผลการแข่ง" },
                              { title: "สถานะ", dataIndex: "status", key: "status", render: (status) => {
                                const color = status === "completed" ? "green" : status === "ongoing" ? "blue" : "gold";
                                const text = status === "completed" ? "เสร็จสิ้น" : status === "ongoing" ? "กำลังแข่ง" : "รอแข่ง";
                                return <Tag color={color}>{text}</Tag>;
                              }}
                            ]}
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
              })()}
            </div>
          )}

          {/* Unfinished events display */}
          <Card style={{ marginTop: 16, backgroundColor: "#f6f6f6" }}>
            <Title level={6} style={{ color: "#666" }}>รายการที่ยังไม่เสร็จสิ้น</Title>
            <Space wrap>
              {/* This would be populated by parent component */}
            </Space>
          </Card>
        </div>
      );
    }

    return null;
  };

  return renderStandings();
}