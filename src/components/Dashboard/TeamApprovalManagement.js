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
  Typography,
  Row,
  Col,
  Statistic,
  Avatar,
  Image,
  Descriptions,
  message
} from "antd";
import { 
  TeamOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  FileImageOutlined,
  CalendarOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { events, initialTeams, users, schools } from "../../data/mockData";

const { Title, Text } = Typography;
const { Search } = Input;

export default function TeamApprovalManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Calculate real statistics from mock data
  const approvalStats = {
    total: initialTeams.length,
    pending: initialTeams.filter(t => t.status === 'pending').length,
    approved: initialTeams.filter(t => t.status === 'approved').length,
    rejected: initialTeams.filter(t => t.status === 'rejected').length,
    todaySubmissions: initialTeams.filter(t => {
      const today = new Date().toDateString();
      return new Date(t.submittedAt).toDateString() === today;
    }).length
  };

  // Enhanced team data with real user and event information
  const enhancedTeams = initialTeams.map(team => {
    const event = events.find(e => e.id === team.eventId);
    const submitter = users.find(u => u.id === team.submittedBy);
    const approver = team.approveBy ? users.find(u => u.id === team.approveBy) : null;
    const school = schools.find(s => s.id === team.schoolId);
    const teamMembers = team.members.map(memberId => users.find(u => u.id === memberId)).filter(Boolean);
    
    return {
      ...team,
      eventName: event?.name || 'Unknown Event',
      eventCategory: event?.category || 'Unknown',
      submitterName: submitter?.name || 'Unknown User',
      submitterEmail: submitter?.email || 'Unknown Email',
      approverName: approver?.name || null,
      schoolName: school?.name || 'Unknown School',
      memberDetails: teamMembers,
      submittedDate: new Date(team.submittedAt).toLocaleDateString('th-TH'),
      submittedTime: new Date(team.submittedAt).toLocaleTimeString('th-TH'),
      daysSinceSubmission: Math.floor((new Date() - new Date(team.submittedAt)) / (1000 * 60 * 60 * 24))
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'var(--valorant-teal)';
      case 'pending': return '#ffb800';
      case 'rejected': return 'var(--valorant-red)';
      default: return 'var(--valorant-text-secondary)';
    }
  };

  const getPriorityColor = (days) => {
    if (days >= 7) return 'var(--valorant-red)';
    if (days >= 3) return '#ffb800';
    return 'var(--valorant-teal)';
  };

  const columns = [
    {
      title: 'Team',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={40} 
            src={record.teamLogo}
            icon={<TeamOutlined />}
            style={{ marginRight: 12, border: '1px solid var(--valorant-dark-border)' }}
          />
          <div>
            <Text className="valorant-text-primary" style={{ fontWeight: 600, display: 'block' }}>
              {text}
            </Text>
            <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
              {record.schoolName}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Event',
      key: 'event',
      render: (_, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontWeight: 500, display: 'block' }}>
            {record.eventName}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
            {record.eventCategory}
          </Text>
        </div>
      ),
    },
    {
      title: 'Submitted By',
      key: 'submitter',
      render: (_, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontWeight: 500, display: 'block' }}>
            {record.submitterName}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
            {record.submitterEmail}
          </Text>
        </div>
      ),
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
      align: 'center',
      render: (members) => (
        <Text className="valorant-text-primary" style={{ fontWeight: 600 }}>
          {members.length}
        </Text>
      )
    },
    {
      title: 'Submitted',
      key: 'submitted',
      render: (_, record) => (
        <div>
          <Text className="valorant-text-primary" style={{ fontSize: 12, display: 'block' }}>
            {record.submittedDate}
          </Text>
          <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
            {record.submittedTime}
          </Text>
          {record.daysSinceSubmission > 0 && (
            <Tag 
              style={{ 
                background: `${getPriorityColor(record.daysSinceSubmission)}22`,
                border: `1px solid ${getPriorityColor(record.daysSinceSubmission)}`,
                color: getPriorityColor(record.daysSinceSubmission),
                fontSize: 9,
                marginTop: 2
              }}
            >
              {record.daysSinceSubmission}d ago
            </Tag>
          )}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div>
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
          {record.approverName && (
            <Text className="valorant-text-tertiary" style={{ fontSize: 10, display: 'block', marginTop: 2 }}>
              by {record.approverName}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{ color: 'var(--valorant-teal)' }}
          >
            View
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="text"
                size="small"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApprove(record)}
                style={{ color: 'var(--valorant-teal)' }}
              >
                Approve
              </Button>
              <Button
                type="text"
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={() => handleReject(record)}
                style={{ color: 'var(--valorant-red)' }}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const filteredTeams = enhancedTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         team.submitterName.toLowerCase().includes(searchText.toLowerCase()) ||
                         team.schoolName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (team) => {
    setSelectedTeam(team);
    setDetailModalVisible(true);
  };

  const handleApprove = (team) => {
    Modal.confirm({
      title: 'Approve Team Registration',
      content: `Are you sure you want to approve "${team.name}"?`,
      okText: 'Approve',
      cancelText: 'Cancel',
      onOk() {
        console.log('Approve team:', team.id);
        message.success(`Team "${team.name}" has been approved successfully!`);
        // Here you would update the team status in your data store
      },
    });
  };

  const handleReject = (team) => {
    Modal.confirm({
      title: 'Reject Team Registration',
      content: `Are you sure you want to reject "${team.name}"? This action cannot be undone.`,
      okText: 'Reject',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Reject team:', team.id);
        message.error(`Team "${team.name}" has been rejected.`);
        // Here you would update the team status in your data store
      },
    });
  };

  const handleBulkApprove = () => {
    const selectedTeams = enhancedTeams.filter(team => selectedRowKeys.includes(team.id));
    const pendingTeams = selectedTeams.filter(team => team.status === 'pending');
    
    if (pendingTeams.length === 0) {
      message.warning('No pending teams selected for approval.');
      return;
    }

    Modal.confirm({
      title: 'Bulk Approve Teams',
      content: `Are you sure you want to approve ${pendingTeams.length} teams?`,
      okText: 'Approve All',
      cancelText: 'Cancel',
      onOk() {
        console.log('Bulk approve teams:', pendingTeams.map(t => t.id));
        message.success(`${pendingTeams.length} teams have been approved successfully!`);
        setSelectedRowKeys([]);
      },
    });
  };

  const handleBulkReject = () => {
    const selectedTeams = enhancedTeams.filter(team => selectedRowKeys.includes(team.id));
    const pendingTeams = selectedTeams.filter(team => team.status === 'pending');
    
    if (pendingTeams.length === 0) {
      message.warning('No pending teams selected for rejection.');
      return;
    }

    Modal.confirm({
      title: 'Bulk Reject Teams',
      content: `Are you sure you want to reject ${pendingTeams.length} teams? This action cannot be undone.`,
      okText: 'Reject All',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Bulk reject teams:', pendingTeams.map(t => t.id));
        message.error(`${pendingTeams.length} teams have been rejected.`);
        setSelectedRowKeys([]);
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.status !== 'pending',
    }),
  };

  return (
    <div>
      <Title level={2} className="valorant-title" style={{ marginBottom: 24 }}>
        TEAM APPROVAL MANAGEMENT
      </Title>

      {/* Approval Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={12} sm={6} lg={4}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">TOTAL</span>}
              value={approvalStats.total}
              prefix={<TeamOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-text-primary)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">PENDING</span>}
              value={approvalStats.pending}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ 
                color: '#ffb800',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">APPROVED</span>}
              value={approvalStats.approved}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-teal)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">REJECTED</span>}
              value={approvalStats.rejected}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-red)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="valorant-card" style={{ textAlign: 'center' }}>
            <Statistic
              title={<span className="valorant-subtitle">TODAY</span>}
              value={approvalStats.todaySubmissions}
              prefix={<CalendarOutlined />}
              valueStyle={{ 
                color: 'var(--valorant-text-primary)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Team Approval Table */}
      <Card className="valorant-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4} className="valorant-subtitle" style={{ margin: 0 }}>
            TEAM REGISTRATIONS
          </Title>
          <Space>
            {selectedRowKeys.length > 0 && (
              <>
                <Button
                  icon={<CheckCircleOutlined />}
                  className="valorant-button-secondary"
                  onClick={handleBulkApprove}
                >
                  Approve Selected
                </Button>
                <Button
                  icon={<CloseCircleOutlined />}
                  danger
                  onClick={handleBulkReject}
                >
                  Reject Selected
                </Button>
              </>
            )}
          </Space>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <Search
            placeholder="Search teams, schools, or submitters..."
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
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' }
            ]}
          />
        </div>

        <div className="valorant-table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredTeams}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} registrations`
            }}
            size="small"
          />
        </div>

        {selectedRowKeys.length > 0 && (
          <div style={{ marginTop: 16, padding: 16, background: 'var(--valorant-dark-elevated)', borderRadius: 8 }}>
            <Text className="valorant-text-secondary">
              {selectedRowKeys.length} teams selected
            </Text>
            <Space style={{ marginLeft: 16 }}>
              <Button size="small" className="valorant-button-secondary">
                Export Selected
              </Button>
            </Space>
          </div>
        )}
      </Card>

      {/* Team Detail Modal */}
      <Modal
        title={<span className="valorant-subtitle">TEAM REGISTRATION DETAILS</span>}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        className="valorant-modal"
        footer={selectedTeam?.status === 'pending' ? [
          <Button key="reject" danger onClick={() => {
            handleReject(selectedTeam);
            setDetailModalVisible(false);
          }}>
            Reject
          </Button>,
          <Button key="approve" type="primary" className="valorant-button-primary" onClick={() => {
            handleApprove(selectedTeam);
            setDetailModalVisible(false);
          }}>
            Approve
          </Button>
        ] : [
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {selectedTeam && (
          <div>
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <Avatar 
                    size={80} 
                    src={selectedTeam.teamLogo}
                    icon={<TeamOutlined />}
                    style={{ marginBottom: 16, border: '2px solid var(--valorant-red)' }}
                  />
                  <Title level={4} className="valorant-text-primary" style={{ margin: 0 }}>
                    {selectedTeam.name}
                  </Title>
                  <Text className="valorant-text-secondary">
                    {selectedTeam.schoolName}
                  </Text>
                </div>
              </Col>
              <Col span={16}>
                <Descriptions
                  column={2}
                  size="small"
                  styles={{
                    label: { 
                      color: "var(--valorant-text-secondary)", 
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    },
                    content: { 
                      color: "var(--valorant-text-primary)",
                      fontWeight: 500
                    }
                  }}
                >
                  <Descriptions.Item label="Event">{selectedTeam.eventName}</Descriptions.Item>
                  <Descriptions.Item label="Category">{selectedTeam.eventCategory}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag 
                      style={{ 
                        background: `${getStatusColor(selectedTeam.status)}22`,
                        border: `1px solid ${getStatusColor(selectedTeam.status)}`,
                        color: getStatusColor(selectedTeam.status),
                        fontSize: 10,
                        fontWeight: 600
                      }}
                    >
                      {selectedTeam.status.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Members">{selectedTeam.members.length}</Descriptions.Item>
                  <Descriptions.Item label="Submitted By">{selectedTeam.submitterName}</Descriptions.Item>
                  <Descriptions.Item label="Email">{selectedTeam.submitterEmail}</Descriptions.Item>
                  <Descriptions.Item label="Submitted Date">{selectedTeam.submittedDate}</Descriptions.Item>
                  <Descriptions.Item label="Submitted Time">{selectedTeam.submittedTime}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Divider className="valorant-divider" />

            <Title level={5} className="valorant-subtitle">TEAM MEMBERS</Title>
            <Row gutter={[16, 16]}>
              {selectedTeam.memberDetails.map((member, index) => (
                <Col span={8} key={member.id}>
                  <Card className="valorant-card" size="small">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        size={32} 
                        icon={<UserOutlined />}
                        style={{ marginRight: 8 }}
                      />
                      <div>
                        <Text className="valorant-text-primary" style={{ fontWeight: 500, display: 'block' }}>
                          {member.name}
                        </Text>
                        <Text className="valorant-text-secondary" style={{ fontSize: 11 }}>
                          {member.email}
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider className="valorant-divider" />

            <Title level={5} className="valorant-subtitle">PAYMENT SLIP</Title>
            <div style={{ textAlign: 'center' }}>
              <Image
                width={200}
                src={selectedTeam.paymentSlip}
                placeholder={
                  <div style={{ 
                    width: 200, 
                    height: 100, 
                    background: 'var(--valorant-dark-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--valorant-dark-border)',
                    borderRadius: 4
                  }}>
                    <FileImageOutlined style={{ fontSize: 24, color: 'var(--valorant-text-tertiary)' }} />
                  </div>
                }
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}