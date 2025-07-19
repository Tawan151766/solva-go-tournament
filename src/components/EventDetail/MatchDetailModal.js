"use client";
import { Modal, Typography, Avatar, Tag, Card, Row, Col, Statistic } from "antd";
import { TrophyOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function MatchDetailModal({ 
  open, 
  onCancel, 
  selectedMatch, 
  event 
}) {
  if (!selectedMatch) return null;

  return (
    <Modal
      open={open}
      title={null}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnHidden
      centered
    >
      <div>
        {/* Event Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px 12px 0 0",
          padding: 24,
          color: "white",
          marginBottom: 24
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <Avatar size={64} style={{ backgroundColor: "#fff", color: "#667eea" }}>
              <TrophyOutlined />
            </Avatar>
            <div>
              <Title level={3} style={{ color: "white", margin: 0 }}>
                {event.name}
              </Title>
              <div style={{ opacity: 0.9, fontSize: 16 }}>
                {event.category} • {event.competitionType === "knockout" ? "Knockout" : 
                 event.competitionType === "round-robin" ? "Round Robin" : 
                 event.competitionType === "group-knockout" ? "Group Stage + Knockout" : event.competitionType}
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <Tag color="gold" style={{ fontSize: 14, padding: "4px 12px" }}>
              Match ID: {selectedMatch.id}
            </Tag>
            {selectedMatch.group && (
              <Tag color="blue" style={{ fontSize: 14, padding: "4px 12px" }}>
                Group {selectedMatch.group}
              </Tag>
            )}
            {selectedMatch.round && (
              <Tag color="green" style={{ fontSize: 14, padding: "4px 12px" }}>
                รอบ {selectedMatch.round}
              </Tag>
            )}
          </div>
        </div>

        {/* Match Content */}
        {selectedMatch.isBye ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Avatar size={80} style={{ backgroundColor: "#faad14", marginBottom: 16 }}>
              <TrophyOutlined />
            </Avatar>
            <Title level={4} style={{ color: "#faad14" }}>BYE - ผ่านรอบอัตโนมัติ</Title>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
              <Card style={{ width: 300, textAlign: "center", border: "2px solid #faad14" }}>
                <Avatar size={60} src={selectedMatch.team1?.teamLogo} style={{ marginBottom: 12 }}>
                  {selectedMatch.team1?.name?.charAt(0)}
                </Avatar>
                <Title level={5} style={{ margin: 0 }}>{selectedMatch.team1?.name}</Title>
                <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
                  {selectedMatch.team1?.schoolId}
                </div>
                <div style={{ marginTop: 12 }}>
                  {selectedMatch.team1?.members?.map((member, index) => (
                    <Tag key={index} style={{ margin: 2 }}>
                      {typeof member === 'string' ? member : member?.name}
                    </Tag>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div>
            {/* Teams Display */}
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
              {/* Team 1 */}
              <Col span={11}>
                <Card 
                  style={{ 
                    height: "100%", 
                    textAlign: "center",
                    border: selectedMatch.winner?.id === selectedMatch.team1?.id ? "2px solid #52c41a" : "1px solid #d9d9d9",
                    backgroundColor: selectedMatch.winner?.id === selectedMatch.team1?.id ? "#f6ffed" : "white"
                  }}
                >
                  <Avatar size={80} src={selectedMatch.team1?.teamLogo} style={{ marginBottom: 16 }}>
                    {selectedMatch.team1?.name?.charAt(0)}
                  </Avatar>
                  <Title level={4} style={{ margin: "0 0 8px 0" }}>
                    {selectedMatch.team1?.name}
                  </Title>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                    <Avatar size={24} src={selectedMatch.team1?.schoolLogo} />
                    <span style={{ color: "#666" }}>{selectedMatch.team1?.schoolId}</span>
                  </div>
                  
                  {selectedMatch.status === "completed" && (
                    <div style={{ marginBottom: 16 }}>
                      <Statistic 
                        title="คะแนน" 
                        value={selectedMatch.score1} 
                        valueStyle={{ 
                          color: selectedMatch.winner?.id === selectedMatch.team1?.id ? "#52c41a" : "#666",
                          fontSize: 32
                        }}
                      />
                    </div>
                  )}
                  
                  <div>
                    <div style={{ marginBottom: 8, fontWeight: "bold", color: "#666" }}>สมาชิกทีม</div>
                    {selectedMatch.team1?.members?.map((member, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, justifyContent: "center" }}>
                        <Avatar size={24} style={{ backgroundColor: "#87d068" }}>
                          {typeof member === 'string' ? member?.charAt(1) : member?.name?.charAt(0)}
                        </Avatar>
                        <span>{typeof member === 'string' ? member : member?.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>

              {/* VS Section */}
              <Col span={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: 24, 
                    fontWeight: "bold", 
                    color: "#1890ff",
                    background: "linear-gradient(45deg, #1890ff, #722ed1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: 8
                  }}>
                    VS
                  </div>
                  <Tag color={
                    selectedMatch.status === "completed" ? "green" : 
                    selectedMatch.status === "ongoing" ? "blue" : "gold"
                  }>
                    {selectedMatch.status === "completed" ? "เสร็จสิ้น" : 
                     selectedMatch.status === "ongoing" ? "กำลังแข่ง" : "รอแข่ง"}
                  </Tag>
                </div>
              </Col>

              {/* Team 2 */}
              <Col span={11}>
                <Card 
                  style={{ 
                    height: "100%", 
                    textAlign: "center",
                    border: selectedMatch.winner?.id === selectedMatch.team2?.id ? "2px solid #52c41a" : "1px solid #d9d9d9",
                    backgroundColor: selectedMatch.winner?.id === selectedMatch.team2?.id ? "#f6ffed" : "white"
                  }}
                >
                  <Avatar size={80} src={selectedMatch.team2?.teamLogo} style={{ marginBottom: 16 }}>
                    {selectedMatch.team2?.name?.charAt(0)}
                  </Avatar>
                  <Title level={4} style={{ margin: "0 0 8px 0" }}>
                    {selectedMatch.team2?.name}
                  </Title>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                    <Avatar size={24} src={selectedMatch.team2?.schoolLogo} />
                    <span style={{ color: "#666" }}>{selectedMatch.team2?.schoolId}</span>
                  </div>
                  
                  {selectedMatch.status === "completed" && (
                    <div style={{ marginBottom: 16 }}>
                      <Statistic 
                        title="คะแนน" 
                        value={selectedMatch.score2} 
                        valueStyle={{ 
                          color: selectedMatch.winner?.id === selectedMatch.team2?.id ? "#52c41a" : "#666",
                          fontSize: 32
                        }}
                      />
                    </div>
                  )}
                  
                  <div>
                    <div style={{ marginBottom: 8, fontWeight: "bold", color: "#666" }}>สมาชิกทีม</div>
                    {selectedMatch.team2?.members?.map((member, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, justifyContent: "center" }}>
                        <Avatar size={24} style={{ backgroundColor: "#87d068" }}>
                          {typeof member === 'string' ? member?.charAt(1) : member?.name?.charAt(0)}
                        </Avatar>
                        <span>{typeof member === 'string' ? member : member?.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Winner Section */}
            {selectedMatch.status === "completed" && selectedMatch.winner && (
              <Card style={{ 
                background: "linear-gradient(135deg, #52c41a 0%, #389e0d 100%)", 
                color: "white",
                textAlign: "center",
                border: "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <Avatar size={48} style={{ backgroundColor: "#faad14" }}>
                    <TrophyOutlined />
                  </Avatar>
                  <div>
                    <Title level={4} style={{ color: "white", margin: 0 }}>
                      ผู้ชนะ: {selectedMatch.winner.name}
                    </Title>
                    <div style={{ opacity: 0.9 }}>
                      คะแนน {selectedMatch.winner.id === selectedMatch.team1?.id ? selectedMatch.score1 : selectedMatch.score2} - {selectedMatch.winner.id === selectedMatch.team1?.id ? selectedMatch.score2 : selectedMatch.score1}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}