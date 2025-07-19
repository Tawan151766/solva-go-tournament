"use client";
import { useState } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Avatar, 
  Modal, 
  Form, 
  Typography,
  Row,
  Col,
  Statistic,
  Divider
} from "antd";
import { 
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BanOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  TeamOutlined,
  TrophyOutlined,
  CalendarOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

export default function UserManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Mock user data
  const users = [
    {
      key: 1,
      id: "U001",
      name: "John Phoenix",
      email: "john.phoenix@email.com",
      role: "admin",
      status: "active",
      lastLogin: "2025-01-19 14:30",
      teamsCount: 0,
      tournamentsCreated: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      key: 2,
      id: "U002",
      name: "Sarah Radiant",
      email: "sarah.radiant@email.com",
      role: "team_captain",
      status: "active",
      lastLogin: "2025-01-19 12:15",
      teamsCount: 2,
      tournamentsCreated: 0,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=40&h=40&fit=crop&crop=face"
    },
    {
      key: 3,
      id: "U003",
      name: "Mike Valorant",
      email: "mike.valorant@email.com",
      role: "player",
      status: "active",
      lastLogin: "2025-01-19 10:45",
      teamsCount: 1,
      tournamentsCreated: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      key: 4,
      id: "U004",
      name: "Lisa Spike",
      email: "lisa.spike@email.com",
      role: "moderator",
      status: "inactive",
      lastLogin: "2025-01-17 16:20",
      teamsCount: 0,
      tournamentsCreated: 1,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      key: 5,
      id: "U005",
      name: "Alex Immortal",
      email: "alex.immortal@email.com",
      role: "player",
      status: "banned",
      lastLogin: "2025-01-15 09:30",
      teamsCount: 0,
      tournamentsCreated: 0,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    banned: users.filter(u => u.status === 'banned').length,
    admins: users.filter(u => u.role === 'admin').length,
    moderators: users.filter(u => u.role === 'moderator').length,
    captains: users.filter(u => u.role === 'team_captain').length,
    players: users.filter(u => u.role === 'player').length
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'var(--valorant-red)';
      case 'moderator': return '#ffb800';
      case 'team_captain': return 'var(--valorant-teal)';
      case 'player': return '#8a2be2';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--valorant-teal)';
      case 'inactive': return '#ffb800';
      case 'banned': return 'var(--valorant-red)';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={32} 
            src={record.avatar}
            style={{ marginRight: 12, border: '1px solid var(--valorant-dark-border)' }}
          />
          <div>
            <Text className="valorant-text-primary" style={{ fontWeight: 600, display: 'block' }}>
              {text}
            </Text>
            <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text) => (
        <Text className="valorant-text-secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>
          {text}
        </Text>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag 
          style={{ 
            background: `${getRoleColor(role)}22`,
            border: `1px solid ${getRoleColor(role)}`,
            color: getRoleColor(role),
            fontSize: 10,
            fontWeight: 600
          }}
        >
          {role.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          style={{ 
            background: `${getStatusColor(status)}22`,
            border: `1px solid ${getStatusColor(status)}`,
            color: getStatusColor(status),
            fontSize: 10,
            fontWeight: 600
          }}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Teams',
      dataIndex: 'teamsCount',
      key: 'teamsCount',
      align: 'center',
      render: (count) => (
        <Text className="valorant-text-primary" style={{ fontWeight: 600 }}>
          {count}
        </Text>
      )
    },
    {
      title: 'Tournaments',
      dataIndex: 'tournamentsCreated',
      key: 'tournamentsCreated',
      align: 'center',
      render: (count) => (
        <Text className="valorant-text-primary" style={{ fontWeight: 600 }}>
          {count}
        </Text>
      )
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date) => (
        <Text className="valorant-text-secondary" style={{ fontSize: 12 }}>
          {date}
        </Text>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: 'var(--valorant-teal)' }}
          />
          <Button
            type="text"
            size="small"
            icon={record.status === 'banned' ? <CheckCircleOutlined /> : <BanOutlined />}
            onClick={() => handleBanToggle(record)}
            style={{ color: record.status === 'banned' ? 'var(--valorant-teal)' : 'var(--valorant-red)' }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{ color: 'var(--valorant-red)' }}
          />
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const handleBanToggle = (user) => {
    console.log(`${user.status === 'banned' ? 'Unban' : 'Ban'} user:`, user.id);
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete user ${user.name}?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Delete user:', user.id);
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Update user:', editingUser?.id, values);
      setModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div>
      <Title level={2} className="valorant-title" style={{ marginBottom: 24 }}>
        USER MANAGEMENT
      </Title>

      {/* User Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">TOTAL</span>}
              value={userStats.total}
              prefix={<UserOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-text-primary)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">ACTIVE</span>}
              value={userStats.active}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-teal)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">INACTIVE</span>}
              value={userStats.inactive}
              prefix={<WarningOutlined />}
              valueStyle={{ 
                color: '#ffb800',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">BANNED</span>}
              value={userStats.banned}
              prefix={<BanOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-red)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">ADMINS</span>}
              value={userStats.admins}
              valueStyle={{ 
                color: 'var(--valorant-red)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">MODERATORS</span>}
              value={userStats.moderators}
              valueStyle={{ 
                color: '#ffb800',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">CAPTAINS</span>}
              value={userStats.captains}
              valueStyle={{ 
                color: 'var(--valorant-teal)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">PLAYERS</span>}
              value={userStats.players}
              valueStyle={{ 
                color: '#8a2be2',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* User Table */}
      <Card className="valorant-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4} className="valorant-subtitle" style={{ margin: 0 }}>
            USER LIST
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="valorant-button-primary"
            onClick={() => setModalVisible(true)}
          >
            Add User
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <Search
            placeholder="Search users..."
            allowClear
            style={{ width: 300 }}
            className="valorant-input"
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by role"
            style={{ width: 150 }}
            className="valorant-input"
            value={filterRole}
            onChange={setFilterRole}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'moderator', label: 'Moderator' },
              { value: 'team_captain', label: 'Team Captain' },
              { value: 'player', label: 'Player' }
            ]}
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            className="valorant-input"
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'banned', label: 'Banned' }
            ]}
          />
        </div>

        <div className="valorant-table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredUsers}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} users`
            }}
            size="small"
          />
        </div>

        {selectedRowKeys.length > 0 && (
          <div style={{ marginTop: 16, padding: 16, background: 'var(--valorant-dark-elevated)', borderRadius: 8 }}>
            <Text className="valorant-text-secondary">
              {selectedRowKeys.length} users selected
            </Text>
            <Space style={{ marginLeft: 16 }}>
              <Button size="small" className="valorant-button-secondary">
                Bulk Edit
              </Button>
              <Button size="small" className="valorant-button-secondary">
                Export
              </Button>
              <Button size="small" danger>
                Delete Selected
              </Button>
            </Space>
          </div>
        )}
      </Card>

      {/* Edit User Modal */}
      <Modal
        title={<span className="valorant-subtitle">{editingUser ? 'EDIT USER' : 'ADD USER'}</span>}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="valorant-modal"
        okText={editingUser ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={<span className="valorant-form-label">Name</span>}
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input className="valorant-input" />
          </Form.Item>
          <Form.Item
            name="email"
            label={<span className="valorant-form-label">Email</span>}
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input className="valorant-input" />
          </Form.Item>
          <Form.Item
            name="role"
            label={<span className="valorant-form-label">Role</span>}
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select className="valorant-input">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="moderator">Moderator</Select.Option>
              <Select.Option value="team_captain">Team Captain</Select.Option>
              <Select.Option value="player">Player</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label={<span className="valorant-form-label">Status</span>}
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select className="valorant-input">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="banned">Banned</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}