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
  Modal, 
  Form, 
  Typography,
  Row,
  Col,
  Statistic,
  Divider,
  DatePicker,
  InputNumber
} from "antd";
import { 
  TrophyOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
  TeamOutlined,
  FireOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { events, initialTeams, users, tournaments } from "../../data/mockData";

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function TournamentManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);
  const [form] = Form.useForm();

  // Calculate real statistics from mock data
  const tournamentStats = {
    total: tournaments.length,
    active: tournaments.filter(t => t.status === 'active').length,
    upcoming: tournaments.filter(t => t.status === 'upcoming').length,
    completed: tournaments.filter(t => t.status === 'completed').length,
    totalEvents: events.length,
    totalTeams: initialTeams.length,
    approvedTeams: initialTeams.filter(t => t.status === 'approved').length,
    pendingTeams: initialTeams.filter(t => t.status === 'pending').length
  };

  // Enhanced tournament data with real calculations
  const enhancedTournaments = tournaments.map(tournament => {
    const tournamentEvents = events.filter(e => e.tournamentId === tournament.id);
    const tournamentTeams = initialTeams.filter(team => 
      tournamentEvents.some(event => event.id === team.eventId)
    );
    
    return {
      ...tournament,
      eventsCount: tournamentEvents.length,
      teamsCount: tournamentTeams.length,
      approvedTeams: tournamentTeams.filter(t => t.status === 'approved').length,
      pendingTeams: tournamentTeams.filter(t => t.status === 'pending').length,
      events: tournamentEvents
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--valorant-red)';
      case 'upcoming': return '#ffb800';
      case 'completed': return 'var(--valorant-teal)';
      case 'registration': return 'var(--valorant-teal)';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const columns = [
    {
      title: 'Tournament',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontWeight: 600, display: 'block' }}>
            {text}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
            ID: {record.id}
          </Text>
        </div>
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
      title: 'Events',
      dataIndex: 'eventsCount',
      key: 'eventsCount',
      align: 'center',
      render: (count) => (
        <Text className="valorant-text-primary" style={{ fontWeight: 600 }}>
          {count}
        </Text>
      )
    },
    {
      title: 'Teams',
      key: 'teams',
      align: 'center',
      render: (_, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontWeight: 600, display: 'block' }}>
            {record.teamsCount}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 10 }}>
            {record.approvedTeams} approved, {record.pendingTeams} pending
          </Text>
        </div>
      )
    },
    {
      title: 'Date Range',
      key: 'dateRange',
      render: (_, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontSize: 12, display: 'block' }}>
            {new Date(record.startDate).toLocaleDateString('th-TH')}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
            to {new Date(record.endDate).toLocaleDateString('th-TH')}
          </Text>
        </div>
      )
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <Text className="valorant-text-secondary" style={{ fontSize: 12 }}>
          {location}
        </Text>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ color: 'var(--valorant-teal)' }}
          />
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
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{ color: 'var(--valorant-red)' }}
          />
        </Space>
      ),
    },
  ];

  const filteredTournaments = enhancedTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tournament.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleView = (tournament) => {
    console.log('View tournament:', tournament);
    // Navigate to tournament detail page
  };

  const handleEdit = (tournament) => {
    setEditingTournament(tournament);
    form.setFieldsValue({
      ...tournament,
      dateRange: [new Date(tournament.startDate), new Date(tournament.endDate)]
    });
    setModalVisible(true);
  };

  const handleDelete = (tournament) => {
    Modal.confirm({
      title: 'Delete Tournament',
      content: `Are you sure you want to delete "${tournament.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Delete tournament:', tournament.id);
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Save tournament:', editingTournament?.id, values);
      setModalVisible(false);
      setEditingTournament(null);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingTournament(null);
    form.resetFields();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div>
      <Title level={2} className="valorant-title" style={{ marginBottom: 24 }}>
        TOURNAMENT MANAGEMENT
      </Title>

      {/* Tournament Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">TOTAL</span>}
              value={tournamentStats.total}
              prefix={<TrophyOutlined />}
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
              value={tournamentStats.active}
              prefix={<FireOutlined />}
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
              title={<span className="valorant-subtitle">UPCOMING</span>}
              value={tournamentStats.upcoming}
              prefix={<ClockCircleOutlined />}
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
              title={<span className="valorant-subtitle">COMPLETED</span>}
              value={tournamentStats.completed}
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
              title={<span className="valorant-subtitle">EVENTS</span>}
              value={tournamentStats.totalEvents}
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
              title={<span className="valorant-subtitle">TEAMS</span>}
              value={tournamentStats.totalTeams}
              prefix={<TeamOutlined />}
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
              title={<span className="valorant-subtitle">APPROVED</span>}
              value={tournamentStats.approvedTeams}
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
              title={<span className="valorant-subtitle">PENDING</span>}
              value={tournamentStats.pendingTeams}
              valueStyle={{ 
                color: 'var(--valorant-red)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tournament Table */}
      <Card className="valorant-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4} className="valorant-subtitle" style={{ margin: 0 }}>
            TOURNAMENT LIST
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="valorant-button-primary"
            onClick={() => setModalVisible(true)}
          >
            Create Tournament
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <Search
            placeholder="Search tournaments..."
            allowClear
            style={{ width: 300 }}
            className="valorant-input"
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
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
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'completed', label: 'Completed' },
              { value: 'registration', label: 'Registration' }
            ]}
          />
        </div>

        <div className="valorant-table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredTournaments}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} tournaments`
            }}
            size="small"
          />
        </div>

        {selectedRowKeys.length > 0 && (
          <div style={{ marginTop: 16, padding: 16, background: 'var(--valorant-dark-elevated)', borderRadius: 8 }}>
            <Text className="valorant-text-secondary">
              {selectedRowKeys.length} tournaments selected
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

      {/* Create/Edit Tournament Modal */}
      <Modal
        title={<span className="valorant-subtitle">{editingTournament ? 'EDIT TOURNAMENT' : 'CREATE TOURNAMENT'}</span>}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="valorant-modal"
        okText={editingTournament ? 'Update' : 'Create'}
        cancelText="Cancel"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={<span className="valorant-form-label">Tournament Name</span>}
                rules={[{ required: true, message: 'Please input the tournament name!' }]}
              >
                <Input className="valorant-input" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label={<span className="valorant-form-label">Status</span>}
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select className="valorant-input">
                  <Select.Option value="upcoming">Upcoming</Select.Option>
                  <Select.Option value="registration">Registration</Select.Option>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label={<span className="valorant-form-label">Location</span>}
                rules={[{ required: true, message: 'Please input the location!' }]}
              >
                <Input className="valorant-input" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="dateRange"
                label={<span className="valorant-form-label">Date Range</span>}
                rules={[{ required: true, message: 'Please select date range!' }]}
              >
                <RangePicker className="valorant-input" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label={<span className="valorant-form-label">Description</span>}
          >
            <Input.TextArea className="valorant-input" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}