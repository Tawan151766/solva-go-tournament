"use client";
import { Modal, Form, Select, Button, Space } from "antd";
import { TrophyOutlined } from "@ant-design/icons";

export default function RoundRobinSetupModal({ 
  open, 
  onCancel, 
  onSubmit, 
  eventTeams, 
  form 
}) {
  return (
    <Modal
      open={open}
      title="ตั้งค่าการแข่งขัน Round Robin"
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <div style={{ marginBottom: 16, padding: 16, backgroundColor: "#f0f2ff", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <TrophyOutlined style={{ color: "#1890ff" }} />
            <span style={{ fontWeight: "bold" }}>การแข่งขัน Round Robin</span>
          </div>
          <div style={{ fontSize: 14, color: "#666" }}>
            ทุกทีมจะแข่งกับทุกทีมตามจำนวนรอบที่กำหนด
          </div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
            ทีมที่เข้าร่วม: {eventTeams.length} ทีม
          </div>
        </div>

        <Form.Item
          name="rounds"
          label="จำนวนรอบการแข่งขัน"
          rules={[
            { required: true, message: "กรุณาเลือกจำนวนรอบ" },
            { type: "number", min: 1, max: 5, message: "จำนวนรอบต้องอยู่ระหว่าง 1-5 รอบ" }
          ]}
          extra="แต่ละรอบทุกทีมจะแข่งกับทุกทีม 1 ครั้ง"
        >
          <Select placeholder="เลือกจำนวนรอบ" size="large">
            <Select.Option value={1}>
              <div>
                <div style={{ fontWeight: "bold" }}>1 รอบ</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {eventTeams.length > 1 ? `${(eventTeams.length * (eventTeams.length - 1)) / 2} แมตช์` : "0 แมตช์"}
                </div>
              </div>
            </Select.Option>
            <Select.Option value={2}>
              <div>
                <div style={{ fontWeight: "bold" }}>2 รอบ</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {eventTeams.length > 1 ? `${((eventTeams.length * (eventTeams.length - 1)) / 2) * 2} แมตช์` : "0 แมตช์"}
                </div>
              </div>
            </Select.Option>
            <Select.Option value={3}>
              <div>
                <div style={{ fontWeight: "bold" }}>3 รอบ</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {eventTeams.length > 1 ? `${((eventTeams.length * (eventTeams.length - 1)) / 2) * 3} แมตช์` : "0 แมตช์"}
                </div>
              </div>
            </Select.Option>
            <Select.Option value={4}>
              <div>
                <div style={{ fontWeight: "bold" }}>4 รอบ</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {eventTeams.length > 1 ? `${((eventTeams.length * (eventTeams.length - 1)) / 2) * 4} แมตช์` : "0 แมตช์"}
                </div>
              </div>
            </Select.Option>
            <Select.Option value={5}>
              <div>
                <div style={{ fontWeight: "bold" }}>5 รอบ</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {eventTeams.length > 1 ? `${((eventTeams.length * (eventTeams.length - 1)) / 2) * 5} แมตช์` : "0 แมตช์"}
                </div>
              </div>
            </Select.Option>
          </Select>
        </Form.Item>

        <div style={{ 
          background: "#fff7e6", 
          border: "1px solid #ffd591", 
          borderRadius: 6, 
          padding: 12, 
          marginBottom: 16 
        }}>
          <div style={{ fontSize: 12, color: "#d46b08" }}>
            💡 <strong>คำแนะนำ:</strong>
            <ul style={{ margin: "4px 0 0 16px", paddingLeft: 0 }}>
              <li>1 รอบ: เหมาะสำหรับการแข่งขันทั่วไป</li>
              <li>2 รอบ: เพิ่มความยุติธรรม ลดโชคชะตา</li>
              <li>3+ รอบ: สำหรับการแข่งขันสำคัญ</li>
            </ul>
          </div>
        </div>

        <Form.Item>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit">
              สร้างการจับคู่
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}