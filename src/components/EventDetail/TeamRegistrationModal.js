"use client";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  InputNumber,
  DatePicker,
  Upload,
  Space,
  message,
  Typography,
} from "antd";
import { TrophyOutlined, PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function TeamRegistrationModal({
  open,
  onCancel,
  onSubmit,
  loading,
  event,
  form
}) {
  return (
    <Modal
      open={open}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TrophyOutlined style={{ color: "#1890ff" }} />
          <span>สมัครทีมเข้าร่วมรายการ: {event.name}</span>
        </div>
      }
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnHidden
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        {/* Event Info */}
        <div style={{ 
          background: "#f0f2ff", 
          padding: 16, 
          borderRadius: 8, 
          marginBottom: 24,
          border: "1px solid #d6e4ff"
        }}>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ fontSize: 12, color: "#666" }}>รายการแข่งขัน</div>
              <div style={{ fontWeight: "bold" }}>{event.name}</div>
            </Col>
            <Col span={6}>
              <div style={{ fontSize: 12, color: "#666" }}>จำนวนสมาชิก</div>
              <div style={{ fontWeight: "bold" }}>{event.teamSize} คน</div>
            </Col>
            <Col span={6}>
              <div style={{ fontSize: 12, color: "#666" }}>ประเภท</div>
              <div style={{ fontWeight: "bold" }}>{event.category}</div>
            </Col>
          </Row>
        </div>

        {/* Team Information */}
        <Title level={5} style={{ marginBottom: 16 }}>ข้อมูลทีม</Title>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="ชื่อทีม"
              rules={[{ required: true, message: "กรุณากรอกชื่อทีม" }]}
            >
              <Input placeholder="เช่น โรงเรียนสมมติ ทีม A" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="schoolId"
              label="ชื่อสถาบัน/โรงเรียน"
              rules={[{ required: true, message: "กรุณากรอกชื่อสถาบัน" }]}
            >
              <Input placeholder="เช่น โรงเรียนสมมติ" />
            </Form.Item>
          </Col>
        </Row>

        {/* Team Members */}
        <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
          สมาชิกทีม ({event.teamSize} คน)
        </Title>
        
        <Form.List
          name="members"
          rules={[
            {
              validator: async (_, members) => {
                if (!members || members.length !== event.teamSize) {
                  return Promise.reject(new Error(`ต้องมีสมาชิกครบ ${event.teamSize} คน`));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Card 
                  key={key} 
                  size="small" 
                  style={{ marginBottom: 16 }}
                  title={`สมาชิกคนที่ ${index + 1}`}
                  extra={
                    fields.length > 1 ? (
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      >
                        ลบ
                      </Button>
                    ) : null
                  }
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        label="ชื่อ-นามสกุล"
                        rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
                      >
                        <Input placeholder="เช่น สมชาย ใจดี" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'phone']}
                        label="เบอร์โทรศัพท์"
                        rules={[
                          { required: true, message: 'กรุณากรอกเบอร์โทร' },
                          { pattern: /^[0-9]{10}$/, message: 'เบอร์โทรต้องเป็นตัวเลข 10 หลัก' }
                        ]}
                      >
                        <Input placeholder="0812345678" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'email']}
                        label="อีเมล"
                        rules={[
                          { required: true, message: 'กรุณากรอกอีเมล' },
                          { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }
                        ]}
                      >
                        <Input placeholder="example@email.com" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'age']}
                        label="อายุ"
                        rules={[{ required: true, message: 'กรุณากรอกอายุ' }]}
                      >
                        <InputNumber 
                          min={5} 
                          max={100} 
                          placeholder="18"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'studentId']}
                        label="รหัสนักเรียน/นักศึกษา"
                      >
                        <Input placeholder="12345" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'position']}
                        label="ตำแหน่งในทีม"
                      >
                        <Select placeholder="เลือกตำแหน่ง">
                          <Select.Option value="captain">หัวหน้าทีม</Select.Option>
                          <Select.Option value="member">สมาชิก</Select.Option>
                          <Select.Option value="substitute">ตัวสำรอง</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}
              
              {fields.length < event.teamSize && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    เพิ่มสมาชิก ({fields.length}/{event.teamSize})
                  </Button>
                </Form.Item>
              )}
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>

        {/* Contact Information */}
        <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
          ข้อมูลผู้สมัคร/ผู้ติดต่อ
        </Title>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="contactName"
              label="ชื่อผู้สมัคร"
              rules={[{ required: true, message: "กรุณากรอกชื่อผู้สมัคร" }]}
            >
              <Input placeholder="ชื่อ-นามสกุล ผู้สมัคร" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="contactPhone"
              label="เบอร์โทรติดต่อ"
              rules={[
                { required: true, message: "กรุณากรอกเบอร์โทร" },
                { pattern: /^[0-9]{10}$/, message: 'เบอร์โทรต้องเป็นตัวเลข 10 หลัก' }
              ]}
            >
              <Input placeholder="0812345678" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="contactEmail"
              label="อีเมลติดต่อ"
              rules={[
                { required: true, message: "กรุณากรอกอีเมล" },
                { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }
              ]}
            >
              <Input placeholder="contact@email.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contactRole"
              label="ตำแหน่ง/หน้าที่"
              rules={[{ required: true, message: "กรุณาระบุตำแหน่ง" }]}
            >
              <Select placeholder="เลือกตำแหน่ง">
                <Select.Option value="teacher">ครูผู้ดูแล</Select.Option>
                <Select.Option value="coach">โค้ช</Select.Option>
                <Select.Option value="parent">ผู้ปกครอง</Select.Option>
                <Select.Option value="student">นักเรียน/นักศึกษา</Select.Option>
                <Select.Option value="other">อื่นๆ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="emergencyContact"
              label="เบอร์ฉุกเฉิน"
              rules={[
                { required: true, message: "กรุณากรอกเบอร์ฉุกเฉิน" },
                { pattern: /^[0-9]{10}$/, message: 'เบอร์โทรต้องเป็นตัวเลข 10 หลัก' }
              ]}
            >
              <Input placeholder="0812345678" />
            </Form.Item>
          </Col>
        </Row>

        {/* Payment Information */}
        <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
          ข้อมูลการชำระเงิน
        </Title>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="paymentAmount"
              label="จำนวนเงิน (บาท)"
              rules={[{ required: true, message: "กรุณากรอกจำนวนเงิน" }]}
            >
              <InputNumber
                min={0}
                placeholder="500"
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="paymentDate"
              label="วันที่โอนเงิน"
              rules={[{ required: true, message: "กรุณาเลือกวันที่โอน" }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="เลือกวันที่" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="paymentSlip"
          label="สลิปโอนเงิน"
          rules={[{ required: true, message: "กรุณาอัปโหลดสลิปโอนเงิน" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                const file = info.fileList[0];
                if (file.originFileObj) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    // Store the base64 data for later use
                    file.base64 = e.target.result;
                  };
                  reader.readAsDataURL(file.originFileObj);
                }
              }
            }}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>อัปโหลดสลิป</div>
            </div>
          </Upload>
        </Form.Item>

        {/* Additional Information */}
        <Form.Item
          name="notes"
          label="หมายเหตุเพิ่มเติม"
        >
          <Input.TextArea 
            rows={3} 
            placeholder="ข้อมูลเพิ่มเติม เช่น ความต้องการพิเศษ, อาหารแพ้, ฯลฯ"
          />
        </Form.Item>

        {/* Terms and Conditions */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            { 
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('กรุณายอมรับเงื่อนไข'))
            }
          ]}
        >
          <div style={{ 
            background: "#fff7e6", 
            border: "1px solid #ffd591", 
            borderRadius: 6, 
            padding: 12 
          }}>
            <input type="checkbox" style={{ marginRight: 8 }} />
            <span style={{ fontSize: 14 }}>
              ข้าพเจ้ายอมรับ
              <a href="#" style={{ color: "#1890ff", marginLeft: 4 }}>
                เงื่อนไขและข้อกำหนด
              </a>
              ของการแข่งขัน และรับรองว่าข้อมูลที่กรอกถูกต้องครบถ้วน
            </span>
          </div>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item style={{ marginTop: 32 }}>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              ส่งใบสมัคร
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}