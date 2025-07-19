"use client";
import { Table, Tag, Avatar, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function TeamList({ teams, eventTeams, onRegisterClick }) {
  // Table columns for team list
  const teamColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { 
      title: "ทีม", 
      dataIndex: "name", 
      key: "name",
      render: (name, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar 
            size={40} 
            src={record.teamLogo} 
            style={{ flexShrink: 0 }}
          >
            {name?.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: "bold" }}>{name}</div>
            <div style={{ fontSize: 12, color: "#666", display: "flex", alignItems: "center", gap: 4 }}>
              <Avatar size={16} src={record.schoolLogo} />
              {record.schoolId}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "สมาชิก",
      dataIndex: "members",
      key: "members",
      width: 120,
      render: (arr) => (
        <div>
          {arr && arr.map((member, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <Avatar size={20} style={{ backgroundColor: "#87d068" }}>
                {member?.charAt ? member.charAt(1) : member?.name?.charAt(0)}
              </Avatar>
              <span style={{ fontSize: 12 }}>
                {typeof member === 'string' ? member : member?.name}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "สลิปโอนเงิน",
      dataIndex: "paymentSlip",
      key: "paymentSlip",
      width: 120,
      render: (url) =>
        url ? (
          <img 
            src={url} 
            alt="payment slip" 
            style={{ 
              maxWidth: 100, 
              maxHeight: 60, 
              borderRadius: 4,
              border: "1px solid #d9d9d9"
            }} 
          />
        ) : (
          <div style={{ color: "#999", fontSize: 12 }}>ไม่มีสลิป</div>
        ),
    },
    {
      title: "เวลาสมัคร",
      dataIndex: "submittedAt",
      key: "submittedAt",
      width: 140,
      render: (d) => (d ? new Date(d).toLocaleString() : "-"),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (s) => {
        let color =
          s === "approved" ? "green" : s === "pending" ? "gold" : "red";
        let text =
          s === "approved"
            ? "อนุมัติ"
            : s === "pending"
            ? "รอตรวจสอบ"
            : "ไม่ผ่าน";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "ผู้สมัคร",
      dataIndex: "contactName",
      key: "contactName",
      width: 100,
      render: (contactName, record) => {
        const displayName = contactName || record.submittedBy;
        return displayName ? (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Avatar size={24} style={{ backgroundColor: "#1890ff" }}>
              {displayName?.charAt(0)}
            </Avatar>
            <span style={{ fontSize: 12 }}>{displayName}</span>
          </div>
        ) : "-";
      },
    },
    {
      title: "ผู้อนุมัติ",
      dataIndex: "approveBy",
      key: "approveBy",
      width: 100,
      render: (adminId) => adminId ? (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Avatar size={24} style={{ backgroundColor: "#52c41a" }}>
            {adminId?.charAt(1)}
          </Avatar>
          <span style={{ fontSize: 12 }}>{adminId}</span>
        </div>
      ) : "-",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          ทีมที่สมัครในรายการนี้ ({eventTeams.length} ทีม)
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onRegisterClick}
        >
          สมัครทีม
        </Button>
      </div>
      <Table
        columns={teamColumns}
        dataSource={teams}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "ไม่มีทีมที่สมัครในรายการนี้" }}
        size="small"
      />
    </div>
  );
}