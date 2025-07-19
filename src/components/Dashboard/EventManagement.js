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
  Progress,
  InputNumber
} from "antd";
import { 
  FireOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TeamOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { events, initialTeams, tournaments } from "../../data/mockData";

const { Title, Text } = Typography;
const { Search } = Input;

export default function EventManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();

  // Calculate real statistics from mock data
  const eventStats = {
    total: events.length,
    knockout: events.filter(e => e.competitionType === 'knockout').length,
    roundRobin: events.filter(e => e.competitionType === 'round-robin').length,
    groupKnockout: events.filter(e => e.competitionType === 'group-knockout').length,
    totalTeams: initialTeams.length,
    averageTeamsPerEvent: Math.round(initialTeams.length / events.length),
    totalSlots: events.reduce((sum, event) => sum + event.maxTeams, 0),
    occupiedSlots: initialTeams.filter(t => t.status === 'approved').length
  };

  // Enhanced event data with real calculations
  const enhancedEvents = events.map(event => {
    const eventTeams = initialTeams.filter(team => team.eventId === event.id);
    const approvedTeams = eventTeams.filter(t => t.status === 'approved');
    const pendingTeams = eventTeams.filter(t => t.status === 'pending');
    const tournament = tournaments.find(t => t.id === event.tournamentId);
    
    return {
      ...event,
      tournamentName: tournament?.name || 'Unknown Tournament',
      registeredTeams: eventTeams.length,
      approvedTeams: approvedTeams.length,
      pendingTeams: pendingTeams.length,
      occupancyRate: (approvedTeams.length / event.maxTeams) * 100,
      status: approvedTeams.length >= event.maxTeams ? 'full' : 
              approvedTeams.length > 0 ? 'active' : 'open'
    };
  });

  const getCompetitionTypeColor = (type) => {
    switch (type) {
      case 'knockout': return 'var(--valorant-red)';
      case 'round-robin': return 'var(--valorant-teal)';
      case 'group-knockout': return '#ffb800';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'full': return 'var(--valorant-red)';
      case 'active': return '#ffb800';
      case 'open': return 'var(--valorant-teal)';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const columns = [
    {
      title: 'Event',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontWeight: 600, display: 'block' }}>
            {text}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
            {record.tournamentName}
          </Text>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag 
          style={{ 
            background: 'var(--valorant-dark-elevated)',
            border: '1px solid var(--valorant-dark-border)',
            color: 'var(--valorant-text-primary)',
            fontSize: 10,
            fontWeight: 600
          }}
        >
          {category}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'competitionType',
      key: 'competitionType',
      render: (type) => (
        <Tag 
          style={{ 
            background: `${getCompetitionTypeColor(type)}22`,
            border: `1px solid ${getCompetitionTypeColor(type)}`,
            color: getCompetitionTypeColor(type),
            fontSize: 10,
            fontWeight: 600
          }}
        >
          {type.replace('-', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Team Size',
      dataIndex: 'teamSize',
      key: 'teamSize',
      align: 'center',
      render: (size) => (
        <Text className="valorant-text-primary" style={{ fontWeight: 600 }}>
          {size}
        </Text>
      )
    },
    {
      title: 'Teams',
      key: 'teams',
      render: (_, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <Text className="valorant-text-primary" style={{ fontWeight: 600, marginRight: 8 }}>
              {record.approvedTeams}/{record.maxTeams}
            </Text>
            <div style={{ flex: 1, maxWidth: 60 }}>
              <Progress
                percent={record.occupancyRate}
                showInfo={false}
                strokeColor={
                  record.occupancyRate >= 100 ? 'var(--valorant-red)' :
                  record.occupancyRate >= 75 ? '#ffb800' : 'var(--valorant-teal)'
                }
                trailColor="var(--valorant-dark-border)"
                size="small"
              />
            </div>
          </div>
          {record.pendingTeams > 0 && (
            <Text className="valorant-text-secondary" style={{ fontSize: 10 }}>
              {record.pendingTeams} pending
            </Text>
          )}
        </div>
      )
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

  const filteredEvents = enhancedEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType === 'all' || event.competitionType === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleView = (event) => {
    console.log('View event:', event);
    // Navigate to event detail page
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    form.setFieldsValue(event);
    setModalVisible(true);
  };

  const handleDelete = (event) => {
    Modal.confirm({
      title: 'Delete Event',
      content: `Are you sure you want to delete "${event.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Delete event:', event.id);
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Save event:', editingEvent?.id, values);
      setModalVisible(false);
      setEditingEvent(null);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingEvent(null);
    form.resetFields();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div>
      <Title level={2} className="valorant-title" style={{ marginBottom: 24 }}>
        EVENT MANAGEMENT
      </Title>

      {/* Event Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={12} sm={6} lg={3}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">TOTAL EVENTS</span>}
              value={eventStats.total}
              prefix={<FireOutlined />}
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
              title={<span className="valorant-subtitle">KNOCKOUT</span>}
              value={eventStats.knockout}
              prefix={<ThunderboltOutlined />}
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
              title={<span className="valorant-subtitle">ROUND ROBIN</span>}
              value={eventStats.roundRobin}
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
              title={<span className="valorant-subtitle">GROUP+KO</span>}
              value={eventStats.groupKnockout}
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
              title={<span className="valorant-subtitle">TOTAL TEAMS</span>}
              value={eventStats.totalTeams}
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
              title={<span className="valorant-subtitle">AVG/EVENT</span>}
              value={eventStats.averageTeamsPerEvent}
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
              title={<span className="valorant-subtitle">TOTAL SLOTS</span>}
              value={eventStats.totalSlots}
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
              title={<span className="valorant-subtitle">OCCUPIED</span>}
              value={eventStats.occupiedSlots}
              valueStyle={{ 
                color: 'var(--valorant-teal)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Event Table */}
      <Card className="valorant-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4} className="valorant-subtitle" style={{ margin: 0 }}>
            EVENT LIST
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="valorant-button-primary"
            onClick={() => setModalVisible(true)}
          >
            Create Event
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <Search
            placeholder="Search events..."
            allowClear
            style={{ width: 300 }}
            className="valorant-input"
            onSearch={setSearchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by type"
            style={{ width: 150 }}
            className="valorant-input"
            value={filterType}
            onChange={setFilterType}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'knockout', label: 'Knockout' },
              { value: 'round-robin', label: 'Round Robin' },
              { value: 'group-knockout', label: 'Group + Knockout' }
            ]}
          />
        </div>

        <div className="valorant-table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredEvents}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} events`
            }}
            size="small"
          />
        </div>

        {selectedRowKeys.length > 0 && (
          <div style={{ marginTop: 16, padding: 16, background: 'var(--valorant-dark-elevated)', borderRadius: 8 }}>
            <Text className="valorant-text-secondary">
              {selectedRowKeys.length} events selected
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

      {/* Create/Edit Event Modal */}
      <Modal
        title={<span className="valorant-subtitle">{editingEvent ? 'EDIT EVENT' : 'CREATE EVENT'}</span>}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="valorant-modal"
        okText={editingEvent ? 'Update' : 'Create'}
        cancelText="Cancel"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={<span className="valorant-form-label">Event Name</span>}
                rules={[{ required: true, message: 'Please input the event name!' }]}
              >
                <Input className="valorant-input" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label={<span className="valorant-form-label">Category</span>}
                rules={[{ required: true, message: 'Please input the category!' }]}
              >
                <Input className="valorant-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="competitionType"
                label={<span className="valorant-form-label">Competition Type</span>}
                rules={[{ required: true, message: 'Please select competition type!' }]}
              >
                <Select className="valorant-input">
                  <Select.Option value="knockout">Knockout</Select.Option>
                  <Select.Option value="round-robin">Round Robin</Select.Option>
                  <Select.Option value="group-knockout">Group + Knockout</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="teamSize"
                label={<span className="valorant-form-label">Team Size</span>}
                rules={[{ required: true, message: 'Please input team size!' }]}
              >
                <InputNumber className="valorant-input" min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxTeams"
                label={<span className="valorant-form-label">Max Teams</span>}
                rules={[{ required: true, message: 'Please input max teams!' }]}
              >
                <InputNumber className="valorant-input" min={2} max={64} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="tournamentId"
            label={<span className="valorant-form-label">Tournament</span>}
            rules={[{ required: true, message: 'Please select a tournament!' }]}
          >
            <Select className="valorant-input">
              {tournaments.map(tournament => (
                <Select.Option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}