"use client";
import { useState } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Form, 
  Input, 
  Switch, 
  Select, 
  Button, 
  Typography, 
  Divider,
  Space,
  Alert,
  Upload,
  ColorPicker,
  Slider,
  InputNumber,
  TimePicker,
  Tabs
} from "antd";
import { 
  SettingOutlined,
  SaveOutlined,
  ReloadOutlined,
  UploadOutlined,
  SecurityScanOutlined,
  NotificationOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  MailOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function SystemSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = async (values) => {
    setLoading(true);
    console.log("Saving settings:", values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const generalSettings = (
    <Form form={form} layout="vertical" onFinish={handleSave}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              SYSTEM INFORMATION
            </Title>
            
            <Form.Item
              name="systemName"
              label={<span className="valorant-form-label">System Name</span>}
              initialValue="VALORANT Tournament System"
            >
              <Input className="valorant-input" />
            </Form.Item>

            <Form.Item
              name="systemDescription"
              label={<span className="valorant-form-label">Description</span>}
              initialValue="Professional esports tournament management platform"
            >
              <TextArea className="valorant-input" rows={3} />
            </Form.Item>

            <Form.Item
              name="systemVersion"
              label={<span className="valorant-form-label">Version</span>}
              initialValue="1.0.0"
            >
              <Input className="valorant-input" disabled />
            </Form.Item>

            <Form.Item
              name="maintenanceMode"
              label={<span className="valorant-form-label">Maintenance Mode</span>}
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              APPEARANCE
            </Title>

            <Form.Item
              name="primaryColor"
              label={<span className="valorant-form-label">Primary Color</span>}
              initialValue="#ff4655"
            >
              <ColorPicker showText />
            </Form.Item>

            <Form.Item
              name="secondaryColor"
              label={<span className="valorant-form-label">Secondary Color</span>}
              initialValue="#00d4aa"
            >
              <ColorPicker showText />
            </Form.Item>

            <Form.Item
              name="logoUpload"
              label={<span className="valorant-form-label">System Logo</span>}
            >
              <Upload
                name="logo"
                listType="picture-card"
                className="valorant-input"
                showUploadList={false}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              name="darkMode"
              label={<span className="valorant-form-label">Dark Mode</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  const securitySettings = (
    <Form layout="vertical">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              AUTHENTICATION
            </Title>

            <Form.Item
              name="requireEmailVerification"
              label={<span className="valorant-form-label">Require Email Verification</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="twoFactorAuth"
              label={<span className="valorant-form-label">Two-Factor Authentication</span>}
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="sessionTimeout"
              label={<span className="valorant-form-label">Session Timeout (minutes)</span>}
              initialValue={60}
            >
              <InputNumber className="valorant-input" min={15} max={480} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="maxLoginAttempts"
              label={<span className="valorant-form-label">Max Login Attempts</span>}
              initialValue={5}
            >
              <InputNumber className="valorant-input" min={3} max={10} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              PERMISSIONS
            </Title>

            <Form.Item
              name="allowUserRegistration"
              label={<span className="valorant-form-label">Allow User Registration</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="autoApproveTeams"
              label={<span className="valorant-form-label">Auto-approve Team Registration</span>}
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="allowGuestViewing"
              label={<span className="valorant-form-label">Allow Guest Viewing</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="moderationLevel"
              label={<span className="valorant-form-label">Content Moderation Level</span>}
              initialValue="medium"
            >
              <Select className="valorant-input">
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
                <Select.Option value="strict">Strict</Select.Option>
              </Select>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  const notificationSettings = (
    <Form layout="vertical">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              EMAIL NOTIFICATIONS
            </Title>

            <Form.Item
              name="emailEnabled"
              label={<span className="valorant-form-label">Enable Email Notifications</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="smtpServer"
              label={<span className="valorant-form-label">SMTP Server</span>}
              initialValue="smtp.gmail.com"
            >
              <Input className="valorant-input" />
            </Form.Item>

            <Form.Item
              name="smtpPort"
              label={<span className="valorant-form-label">SMTP Port</span>}
              initialValue={587}
            >
              <InputNumber className="valorant-input" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="emailFrom"
              label={<span className="valorant-form-label">From Email</span>}
              initialValue="noreply@valorant-tournament.com"
            >
              <Input className="valorant-input" />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              NOTIFICATION TYPES
            </Title>

            <Form.Item
              name="notifyTournamentCreated"
              label={<span className="valorant-form-label">Tournament Created</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="notifyTeamRegistered"
              label={<span className="valorant-form-label">Team Registered</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="notifyMatchCompleted"
              label={<span className="valorant-form-label">Match Completed</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="notifySystemUpdates"
              label={<span className="valorant-form-label">System Updates</span>}
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  const performanceSettings = (
    <Form layout="vertical">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              PERFORMANCE
            </Title>

            <Form.Item
              name="cacheEnabled"
              label={<span className="valorant-form-label">Enable Caching</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="cacheTimeout"
              label={<span className="valorant-form-label">Cache Timeout (seconds)</span>}
              initialValue={300}
            >
              <Slider
                min={60}
                max={3600}
                marks={{
                  60: '1m',
                  300: '5m',
                  900: '15m',
                  1800: '30m',
                  3600: '1h'
                }}
              />
            </Form.Item>

            <Form.Item
              name="maxConcurrentUsers"
              label={<span className="valorant-form-label">Max Concurrent Users</span>}
              initialValue={1000}
            >
              <InputNumber className="valorant-input" min={100} max={10000} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="apiRateLimit"
              label={<span className="valorant-form-label">API Rate Limit (requests/minute)</span>}
              initialValue={100}
            >
              <InputNumber className="valorant-input" min={10} max={1000} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="valorant-card">
            <Title level={4} className="valorant-subtitle" style={{ marginBottom: 16 }}>
              DATABASE
            </Title>

            <Form.Item
              name="autoBackup"
              label={<span className="valorant-form-label">Auto Backup</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="backupFrequency"
              label={<span className="valorant-form-label">Backup Frequency</span>}
              initialValue="daily"
            >
              <Select className="valorant-input">
                <Select.Option value="hourly">Hourly</Select.Option>
                <Select.Option value="daily">Daily</Select.Option>
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="backupTime"
              label={<span className="valorant-form-label">Backup Time</span>}
            >
              <TimePicker className="valorant-input" format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="retentionDays"
              label={<span className="valorant-form-label">Backup Retention (days)</span>}
              initialValue={30}
            >
              <InputNumber className="valorant-input" min={7} max={365} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  const tabItems = [
    {
      key: "general",
      label: (
        <span>
          <AppstoreOutlined />
          GENERAL
        </span>
      ),
      children: generalSettings
    },
    {
      key: "security",
      label: (
        <span>
          <SecurityScanOutlined />
          SECURITY
        </span>
      ),
      children: securitySettings
    },
    {
      key: "notifications",
      label: (
        <span>
          <NotificationOutlined />
          NOTIFICATIONS
        </span>
      ),
      children: notificationSettings
    },
    {
      key: "performance",
      label: (
        <span>
          <DatabaseOutlined />
          PERFORMANCE
        </span>
      ),
      children: performanceSettings
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <Title level={2} className="valorant-title" style={{ margin: 0 }}>
          SYSTEM SETTINGS
        </Title>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            className="valorant-button-secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            icon={<SaveOutlined />}
            className="valorant-button-primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      <Alert
        message="System Configuration"
        description="Changes to these settings will affect the entire system. Please review carefully before saving."
        type="info"
        showIcon
        style={{ 
          marginBottom: 24,
          background: "rgba(0, 212, 170, 0.1)",
          border: "1px solid var(--valorant-teal)",
          color: "var(--valorant-text-primary)"
        }}
      />

      <Card className="valorant-card">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="valorant-tabs"
          size="large"
          tabBarStyle={{
            marginBottom: 24,
            borderBottom: "2px solid var(--valorant-dark-border)"
          }}
        />
      </Card>
    </div>
  );
}