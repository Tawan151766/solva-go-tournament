"use client";
import { Modal, Form, Select, Input, Button, Space } from "antd";

export default function MatchResultModal({ 
  open, 
  onCancel, 
  onSubmit, 
  selectedMatch, 
  form 
}) {
  if (!selectedMatch) return null;

  return (
    <Modal
      open={open}
      title="บันทึกผลการแข่งขัน"
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
        <div
          style={{
            marginBottom: 16,
            padding: 16,
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
          }}
        >
          <div>
            <strong>การแข่งขัน:</strong> {selectedMatch.team1?.name} VS{" "}
            {selectedMatch.team2?.name}
          </div>
          <div>
            <strong>Match ID:</strong> {selectedMatch.id}
          </div>
        </div>

        <Form.Item
          name="winner"
          label="ผู้ชนะ"
          rules={[{ required: true, message: "กรุณาเลือกผู้ชนะ" }]}
        >
          <Select placeholder="เลือกผู้ชนะ">
            <Select.Option value={selectedMatch.team1?.id}>
              {selectedMatch.team1?.name}
            </Select.Option>
            <Select.Option value={selectedMatch.team2?.id}>
              {selectedMatch.team2?.name}
            </Select.Option>
          </Select>
        </Form.Item>

        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item
            name="score1"
            label={`คะแนน ${selectedMatch.team1?.name}`}
            style={{ flex: 1 }}
            rules={[{ required: true, message: "กรุณากรอกคะแนน" }]}
          >
            <Input type="number" min={0} placeholder="0" />
          </Form.Item>

          <Form.Item
            name="score2"
            label={`คะแนน ${selectedMatch.team2?.name}`}
            style={{ flex: 1 }}
            rules={[{ required: true, message: "กรุณากรอกคะแนน" }]}
          >
            <Input type="number" min={0} placeholder="0" />
          </Form.Item>
        </div>

        <Form.Item>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit">
              บันทึกผล
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}