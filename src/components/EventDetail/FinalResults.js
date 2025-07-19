"use client";
import { Result, Avatar, Card, Row, Col, Statistic, Typography } from "antd";
import { TrophyOutlined, CrownOutlined, StepForwardOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function FinalResults({ event, finalResults }) {
  if (!finalResults) return null;

  const { champion, runnerUp, third, standings, type } = finalResults;

  if (type === "round-robin") {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Result
          icon={<TrophyOutlined style={{ color: "#faad14" }} />}
          title={<><TrophyOutlined /> การแข่งขันเสร็จสิ้น!</>}
          subTitle={`${event.name} - ${event.category}`}
        />
        
        <Row gutter={[24, 24]} justify="center" style={{ marginTop: 32 }}>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: "center", border: "2px solid #faad14" }}>
              <Avatar size={64} style={{ backgroundColor: "#faad14", marginBottom: 16 }}>
                <CrownOutlined />
              </Avatar>
              <Title level={4} style={{ margin: "8px 0", color: "#faad14" }}>
                ชนะเลิศ
              </Title>
              <Title level={5} style={{ margin: 0 }}>
                {champion?.name}
              </Title>
              {standings && (
                <div style={{ marginTop: 8 }}>
                  <Statistic title="คะแนน" value={standings[0]?.points} />
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {standings[0]?.won}W-{standings[0]?.lost}L ({standings[0]?.scoreDiff >= 0 ? '+' : ''}{standings[0]?.scoreDiff})
                  </div>
                </div>
              )}
            </Card>
          </Col>
          
          {runnerUp && (
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: "center", border: "2px solid #d9d9d9" }}>
                <Avatar size={64} style={{ backgroundColor: "#d9d9d9", marginBottom: 16 }}>
                  <TrophyOutlined />
                </Avatar>
                <Title level={4} style={{ margin: "8px 0", color: "#666" }}>
                  รองชนะเลิศ
                </Title>
                <Title level={5} style={{ margin: 0 }}>
                  {runnerUp?.name}
                </Title>
                {standings && (
                  <div style={{ marginTop: 8 }}>
                    <Statistic title="คะแนน" value={standings[1]?.points} />
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {standings[1]?.won}W-{standings[1]?.lost}L ({standings[1]?.scoreDiff >= 0 ? '+' : ''}{standings[1]?.scoreDiff})
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          )}
          
          {third && (
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: "center", border: "2px solid #cd7f32" }}>
                <Avatar size={64} style={{ backgroundColor: "#cd7f32", marginBottom: 16 }}>
                  <StepForwardOutlined />
                </Avatar>
                <Title level={4} style={{ margin: "8px 0", color: "#cd7f32" }}>
                  อันดับ 3
                </Title>
                <Title level={5} style={{ margin: 0 }}>
                  {third?.name}
                </Title>
                {standings && (
                  <div style={{ marginTop: 8 }}>
                    <Statistic title="คะแนน" value={standings[2]?.points} />
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {standings[2]?.won}W-{standings[2]?.lost}L ({standings[2]?.scoreDiff >= 0 ? '+' : ''}{standings[2]?.scoreDiff})
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }

  // Knockout and Group-Knockout results
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <Result
        icon={<TrophyOutlined style={{ color: "#faad14" }} />}
        title={<><TrophyOutlined /> การแข่งขันเสร็จสิ้น!</>}
        subTitle={`${event.name} - ${event.category}`}
      />
      
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: 32 }}>
        <Col xs={24} sm={12}>
          <Card style={{ textAlign: "center", border: "2px solid #faad14" }}>
            <Avatar size={80} style={{ backgroundColor: "#faad14", marginBottom: 16 }}>
              <CrownOutlined />
            </Avatar>
            <Title level={3} style={{ margin: "8px 0", color: "#faad14" }}>
              ชนะเลิศ
            </Title>
            <Title level={4} style={{ margin: 0 }}>
              {champion?.name}
            </Title>
            <div style={{ marginTop: 16, color: "#666" }}>
              <div>โรงเรียน: {champion?.schoolId}</div>
              <div>สมาชิก: {champion?.members?.map(m => typeof m === 'string' ? m : m?.name).join(", ")}</div>
            </div>
          </Card>
        </Col>
        
        {runnerUp && (
          <Col xs={24} sm={12}>
            <Card style={{ textAlign: "center", border: "2px solid #d9d9d9" }}>
              <Avatar size={80} style={{ backgroundColor: "#d9d9d9", marginBottom: 16 }}>
                <TrophyOutlined />
              </Avatar>
              <Title level={3} style={{ margin: "8px 0", color: "#666" }}>
                รองชนะเลิศ
              </Title>
              <Title level={4} style={{ margin: 0 }}>
                {runnerUp?.name}
              </Title>
              <div style={{ marginTop: 16, color: "#666" }}>
                <div>โรงเรียน: {runnerUp?.schoolId}</div>
                <div>สมาชิก: {runnerUp?.members?.map(m => typeof m === 'string' ? m : m?.name).join(", ")}</div>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}