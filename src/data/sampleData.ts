import { 
  Tournament, 
  Event, 
  User, 
  TeamRegistration, 
  // ...existing code...
  RecentActivity 
} from '../types';

// Sample Tournament Data
export const sampleTournaments: Tournament[] = [
  {
    id: "tournament-001",
    name: "VALORANT Champions League 2024",
    description: "การแข่งขันระดับชาติสำหรับผู้เล่น VALORANT ทุกระดับ",
    type: "esports",
    game: "VALORANT",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    registrationStart: "2024-01-01",
    registrationEnd: "2024-02-15",
    location: "Bangkok, Thailand",
    venue: "Impact Arena",
    status: "registration-open",
    prize: "1,000,000 THB",
    maxParticipants: 64,
    currentParticipants: 32,
    organizer: {
      name: "Riot Games Thailand",
      contact: "contact@riot.com",
      phone: "02-123-4567"
    },
    rules: "Standard VALORANT tournament rules apply",
    format: "single-elimination",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    createdBy: "admin-001",
    tags: ["esports", "valorant", "national"],
    isPublic: true,
    requiresApproval: true
  },
  {
    id: "tournament-002",
    name: "Regional Esports Championship",
    description: "การแข่งขันระดับภูมิภาคสำหรับทีมมืออาชีพ",
    type: "esports",
    game: "VALORANT",
    startDate: "2024-04-01",
    endDate: "2024-04-10",
    registrationStart: "2024-02-01",
    registrationEnd: "2024-03-15",
    location: "Chiang Mai, Thailand",
    venue: "CMCC Hall",
    status: "upcoming",
    prize: "500,000 THB",
    maxParticipants: 32,
    currentParticipants: 24,
    organizer: {
      name: "Thailand Esports Federation",
      contact: "info@tesf.org",
      phone: "02-987-6543"
    },
    rules: "Professional tournament rules",
    format: "double-elimination",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    createdBy: "admin-002",
    tags: ["esports", "valorant", "regional", "professional"],
    isPublic: true,
    requiresApproval: true
  },
  {
    id: "tournament-003",
    name: "Pro League Season 5",
    description: "ลีกมืออาชีพระดับสูงสุดในประเทศไทย",
    type: "esports",
    game: "VALORANT",
    startDate: "2024-05-01",
    endDate: "2024-07-31",
    registrationStart: "2024-03-01",
    registrationEnd: "2024-04-15",
    location: "Multiple Venues",
    venue: "Various",
    status: "upcoming",
    prize: "2,000,000 THB",
    maxParticipants: 16,
    currentParticipants: 8,
    organizer: {
      name: "Pro League Thailand",
      contact: "admin@proleague.th",
      phone: "02-555-0123"
    },
    rules: "Professional league regulations",
    format: "round-robin",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-25T09:15:00Z",
    createdBy: "admin-003",
    tags: ["esports", "valorant", "professional", "league"],
    isPublic: true,
    requiresApproval: true
  }
];

// Sample Event Data
export const sampleEvents: Event[] = [
  {
    id: "event-001",
    tournamentId: "tournament-001",
    name: "VCL 2024 Qualifier",
    description: "รอบคัดเลือกเข้าสู่รอบชิงชนะเลิศ",
    category: "qualifier",
    competitionType: "team",
    teamSize: 5,
    minTeamSize: 5,
    maxTeamSize: 5,
    maxTeams: 32,
    currentTeams: 16,
    date: "2024-03-01",
    startTime: "09:00",
    endTime: "18:00",
    location: "Online",
    format: "single-elimination",
    status: "registration-open",
    entryFee: 2500,
    currency: "THB",
    prizes: [
      { position: 1, amount: 100000, currency: "THB" },
      { position: 2, amount: 60000, currency: "THB" },
      { position: 3, amount: 40000, currency: "THB" }
    ],
    requirements: {
      rankMinimum: "Bronze",
      rankMaximum: "Radiant",
      regionRestriction: "Thailand",
      ageMinimum: 16
    },
    schedule: [
      {
        round: "Round of 32",
        date: "2024-03-01",
        startTime: "09:00",
        endTime: "12:00"
      },
      {
        round: "Round of 16",
        date: "2024-03-01",
        startTime: "13:00",
        endTime: "16:00"
      },
      {
        round: "Finals",
        date: "2024-03-01",
        startTime: "17:00",
        endTime: "18:00"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    createdBy: "admin-001"
  },
  {
    id: "event-002",
    tournamentId: "tournament-002",
    name: "Regional Championship 2024",
    description: "การแข่งขันชิงแชมป์ระดับภูมิภาค",
    category: "championship",
    competitionType: "team",
    teamSize: 5,
    minTeamSize: 5,
    maxTeamSize: 6,
    maxTeams: 16,
    currentTeams: 12,
    date: "2024-04-01",
    startTime: "10:00",
    endTime: "20:00",
    location: "Chiang Mai",
    format: "double-elimination",
    status: "registration-open",
    entryFee: 5000,
    currency: "THB",
    prizes: [
      { position: 1, amount: 200000, currency: "THB" },
      { position: 2, amount: 120000, currency: "THB" },
      { position: 3, amount: 80000, currency: "THB" }
    ],
    requirements: {
      rankMinimum: "Gold",
      rankMaximum: "Radiant",
      regionRestriction: "Thailand",
      ageMinimum: 18
    },
    schedule: [
      {
        round: "Group Stage",
        date: "2024-04-01",
        startTime: "10:00",
        endTime: "16:00"
      },
      {
        round: "Playoffs",
        date: "2024-04-01",
        startTime: "17:00",
        endTime: "20:00"
      }
    ],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    createdBy: "admin-002"
  }
];

// Sample User Data
export const sampleUsers: User[] = [
  {
    id: "user-001",
    username: "PlayerOne",
    email: "playerone@example.com",
    firstName: "สมชาย",
    lastName: "ใจดี",
    displayName: "PlayerOne",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    dateOfBirth: "1995-05-15",
    gender: "male",
    nationality: "Thai",
    country: "Thailand",
    region: "Bangkok",
    phone: "+66812345678",
    role: "player",
    status: "active",
    gameProfiles: {
      valorant: {
        riotId: "PlayerOne#TH1",
        rank: "Immortal 2",
        rr: 85,
        peakRank: "Radiant",
        region: "Asia Pacific",
        verified: true
      }
    },
    preferences: {
      language: "th",
      timezone: "Asia/Bangkok",
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    },
    statistics: {
      tournamentsPlayed: 15,
      tournamentsWon: 3,
      winRate: 0.65,
      totalPrizeWon: 25000
    },
    socialLinks: {
      twitch: "https://twitch.tv/playerone",
      discord: "PlayerOne#1234"
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    lastLoginAt: "2024-01-15T08:00:00Z",
    emailVerified: true,
    phoneVerified: true,
    kycVerified: false
  },
  {
    id: "user-002",
    username: "ShadowStrike",
    email: "shadowstrike@example.com",
    firstName: "สมหญิง",
    lastName: "รักเรียน",
    displayName: "ShadowStrike",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    dateOfBirth: "1997-08-22",
    gender: "female",
    nationality: "Thai",
    country: "Thailand",
    region: "Bangkok",
    phone: "+66823456789",
    role: "player",
    status: "active",
    gameProfiles: {
      valorant: {
        riotId: "ShadowStrike#TH2",
        rank: "Diamond 3",
        rr: 72,
        peakRank: "Immortal 1",
        region: "Asia Pacific",
        verified: true
      }
    },
    preferences: {
      language: "th",
      timezone: "Asia/Bangkok",
      notifications: {
        email: true,
        push: true,
        sms: true
      }
    },
    statistics: {
      tournamentsPlayed: 12,
      tournamentsWon: 2,
      winRate: 0.58,
      totalPrizeWon: 18000
    },
    socialLinks: {
      youtube: "https://youtube.com/shadowstrike",
      discord: "ShadowStrike#5678"
    },
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    lastLoginAt: "2024-01-14T20:30:00Z",
    emailVerified: true,
    phoneVerified: true,
    kycVerified: false
  }
];

// Sample Team Registration Data
export const sampleTeamRegistrations: TeamRegistration[] = [
  {
    id: "team-reg-001",
    teamId: "team-001",
    tournamentId: "tournament-001",
    eventId: "event-001",
    teamName: "Phoenix Esports",
    teamTag: "PHX",
    teamLogo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop&crop=center",
    captain: {
      userId: "user-001",
      username: "PlayerOne",
      email: "playerone@example.com",
      rank: "Immortal 2",
      role: "IGL",
      isPrimary: true
    },
    members: [
      {
        userId: "user-001",
        username: "PlayerOne",
        email: "playerone@example.com",
        rank: "Immortal 2",
        role: "Duelist",
        isPrimary: true
      },
      {
        userId: "user-002",
        username: "ShadowStrike",
        email: "shadowstrike@example.com",
        rank: "Diamond 3",
        role: "Controller",
        isPrimary: true
      },
      {
        userId: "user-003",
        username: "PhoenixRising",
        email: "phoenixrising@example.com",
        rank: "Ascendant 1",
        role: "Initiator",
        isPrimary: true
      },
      {
        userId: "user-004",
        username: "CyberNinja",
        email: "cyberninja@example.com",
        rank: "Immortal 1",
        role: "Sentinel",
        isPrimary: true
      },
      {
        userId: "user-005",
        username: "VortexGamer",
        email: "vortexgamer@example.com",
        rank: "Diamond 1",
        role: "Flex",
        isPrimary: true
      }
    ],
    registrationDate: "2024-01-15T10:00:00Z",
    status: "pending",
    priority: "high",
    payment: {
      method: "bank_transfer",
      amount: 2500,
      currency: "THB",
      status: "paid",
      transactionId: "TXN-001",
      paymentSlip: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop&crop=center",
      paidAt: "2024-01-15T09:30:00Z"
    },
    teamDescription: "ทีมที่มีประสบการณ์การแข่งขันมาแล้ว พร้อมสำหรับการแข่งขันระดับสูง",
    motivation: "ต้องการพิสูจน์ความสามารถและเรียนรู้จากทีมอื่น",
    previousExperience: "เข้าร่วมการแข่งขัน VCT Challengers 2023",
    contactInfo: {
      primaryContact: "user-001",
      alternateContact: "user-002",
      preferredMethod: "discord"
    },
    approvalInfo: {
      reviewedBy: "admin-001",
      reviewedAt: "2024-01-16T14:00:00Z",
      notes: "ทีมมีประสบการณ์ดี สมาชิกครบ"
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-16T14:00:00Z",
    submittedBy: "user-001",
    documentsSubmitted: [
      {
        type: "team_roster",
        url: "https://example.com/roster.pdf",
        status: "verified"
      },
      {
        type: "payment_slip",
        url: "https://example.com/payment.jpg",
        status: "verified"
      }
    ],
    notifications: {
      registrationConfirmed: true,
      paymentReceived: true,
      approvalStatus: false,
      tournamentUpdates: true
    }
  },
  {
    id: "team-reg-002",
    teamId: "team-002",
    tournamentId: "tournament-002",
    eventId: "event-002",
    teamName: "Cyber Wolves",
    teamTag: "CW",
    teamLogo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center",
    captain: {
      userId: "user-006",
      username: "AlphaWolf",
      email: "alphawolf@example.com",
      rank: "Diamond 2",
      role: "IGL",
      isPrimary: true
    },
    members: [
      {
        userId: "user-006",
        username: "AlphaWolf",
        email: "alphawolf@example.com",
        rank: "Diamond 2",
        role: "Controller",
        isPrimary: true
      },
      {
        userId: "user-007",
        username: "BetaStrike",
        email: "betastrike@example.com",
        rank: "Diamond 1",
        role: "Duelist",
        isPrimary: true
      },
      {
        userId: "user-008",
        username: "GammaShield",
        email: "gammashield@example.com",
        rank: "Platinum 3",
        role: "Sentinel",
        isPrimary: true
      },
      {
        userId: "user-009",
        username: "DeltaFlash",
        email: "deltaflash@example.com",
        rank: "Diamond 3",
        role: "Initiator",
        isPrimary: true
      },
      {
        userId: "user-010",
        username: "EpsilonFlex",
        email: "epsilonflex@example.com",
        rank: "Platinum 2",
        role: "Flex",
        isPrimary: true
      }
    ],
    registrationDate: "2024-01-14T15:30:00Z",
    status: "pending",
    priority: "medium",
    payment: {
      method: "bank_transfer",
      amount: 5000,
      currency: "THB",
      status: "paid",
      transactionId: "TXN-002",
      paymentSlip: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop&crop=center",
      paidAt: "2024-01-14T14:00:00Z"
    },
    teamDescription: "ทีมใหม่ที่มีความมุ่งมั่นและพร้อมเรียนรู้จากการแข่งขัน",
    motivation: "ต้องการสร้างชื่อเสียงในวงการและพัฒนาทักษะ",
    previousExperience: "ทีมใหม่ แต่สมาชิกมีประสบการณ์เล่นในระดับ Ranked",
    contactInfo: {
      primaryContact: "user-006",
      alternateContact: "user-007",
      preferredMethod: "discord"
    },
    approvalInfo: {
      reviewedBy: "admin-002",
      reviewedAt: "2024-01-15T10:00:00Z",
      notes: "ทีมใหม่ แต่มีศักยภาพ"
    },
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    submittedBy: "user-006",
    documentsSubmitted: [
      {
        type: "team_roster",
        url: "https://example.com/roster2.pdf",
        status: "verified"
      },
      {
        type: "payment_slip",
        url: "https://example.com/payment2.jpg",
        status: "verified"
      }
    ],
    notifications: {
      registrationConfirmed: true,
      paymentReceived: true,
      approvalStatus: false,
      tournamentUpdates: true
    }
  }
];

// ...existing code...
  // ...existing code...

// Sample Recent Activities
export const sampleRecentActivities: RecentActivity[] = [
  {
    id: "activity-001",
    type: "registration",
    action: "submitted",
    title: "Phoenix Esports ส่งใบสมัครเข้าร่วม VCL 2024",
    user: "PlayerOne",
    timestamp: "2024-01-15T10:00:00Z",
    status: "info"
  },
  {
    id: "activity-002",
    type: "tournament",
    action: "created",
    title: "Pro League Season 5 ถูกสร้างแล้ว",
    user: "Admin",
    timestamp: "2024-01-10T00:00:00Z",
    status: "success"
  },
  {
    id: "activity-003",
    type: "registration",
    action: "approved",
    title: "Cyber Wolves ได้รับการอนุมัติแล้ว",
    user: "Admin",
    timestamp: "2024-01-14T16:00:00Z",
    status: "success"
  },
  {
    id: "activity-004",
    type: "user",
    action: "registered",
    title: "ผู้ใช้ใหม่ ShadowStrike เข้าร่วม",
    user: "ShadowStrike",
    timestamp: "2024-01-12T09:30:00Z",
    status: "info"
  },
  {
    id: "activity-005",
    type: "event",
    action: "updated",
    title: "VCL 2024 Qualifier อัปเดตรายละเอียด",
    user: "Admin",
    timestamp: "2024-01-11T14:15:00Z",
    status: "warning"
  }
];