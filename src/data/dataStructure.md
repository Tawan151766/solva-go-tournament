# Data Structure Documentation

## Overview

This document defines the data structure for the tournament management system, including tournaments, events, users, and team registrations.

## 1. Tournament Structure

```javascript
const tournament = {
  id: "tournament-001", // Unique identifier
  name: "VALORANT Champions League 2024", // Tournament name
  description: "การแข่งขันระดับชาติ", // Tournament description
  type: "esports", // Tournament type
  game: "VALORANT", // Game being played
  startDate: "2024-03-01", // Start date (ISO format)
  endDate: "2024-03-15", // End date (ISO format)
  registrationStart: "2024-01-01", // Registration start date
  registrationEnd: "2024-02-15", // Registration end date
  location: "Bangkok, Thailand", // Tournament location
  venue: "Impact Arena", // Specific venue
  status: "upcoming", // Status: upcoming, ongoing, completed, cancelled
  prize: "1,000,000 THB", // Prize pool
  maxParticipants: 64, // Maximum number of participants/teams
  currentParticipants: 32, // Current registered participants
  organizer: {
    name: "Riot Games Thailand",
    contact: "contact@riot.com",
    phone: "02-123-4567",
  },
  rules: "Standard VALORANT tournament rules", // Tournament rules
  format: "single-elimination", // Tournament format
  createdAt: "2024-01-01T00:00:00Z", // Creation timestamp
  updatedAt: "2024-01-15T10:30:00Z", // Last update timestamp
  createdBy: "admin-001", // Admin who created
  tags: ["esports", "valorant", "national"], // Tags for categorization
  isPublic: true, // Public visibility
  requiresApproval: true, // Requires admin approval for registration
};
```

## 2. Event Structure

```javascript
const event = {
  id: "event-001", // Unique identifier
  tournamentId: "tournament-001", // Parent tournament ID
  name: "VCL 2024 Qualifier", // Event name
  description: "รอบคัดเลือกเข้าสู่รอบชิง", // Event description
  category: "qualifier", // Event category
  competitionType: "team", // Type: individual, team
  teamSize: 5, // Required team size
  minTeamSize: 5, // Minimum team size
  maxTeamSize: 5, // Maximum team size
  maxTeams: 32, // Maximum number of teams
  currentTeams: 16, // Current registered teams
  date: "2024-03-01", // Event date
  startTime: "09:00", // Start time
  endTime: "18:00", // End time
  location: "Online", // Event location
  format: "single-elimination", // Competition format
  status: "registration-open", // Status: registration-open, registration-closed, ongoing, completed
  entryFee: 500, // Entry fee in THB
  currency: "THB", // Currency
  prizes: [
    { position: 1, amount: 50000, currency: "THB" },
    { position: 2, amount: 30000, currency: "THB" },
    { position: 3, amount: 20000, currency: "THB" },
  ],
  requirements: {
    rankMinimum: "Bronze", // Minimum rank requirement
    rankMaximum: "Radiant", // Maximum rank requirement
    regionRestriction: "Thailand", // Region restriction
    ageMinimum: 16, // Minimum age
    ageMaximum: null, // Maximum age (null = no limit)
  },
  schedule: [
    {
      round: "Round 1",
      date: "2024-03-01",
      startTime: "09:00",
      endTime: "12:00",
    },
    {
      round: "Semifinals",
      date: "2024-03-01",
      startTime: "13:00",
      endTime: "16:00",
    },
    {
      round: "Finals",
      date: "2024-03-01",
      startTime: "17:00",
      endTime: "18:00",
    },
  ],
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  createdBy: "admin-001",
};
```

## 3. User Structure

```javascript
const user = {
  id: "user-001", // Unique identifier
  username: "PlayerOne", // Username/gamertag
  email: "player@example.com", // Email address
  firstName: "สมชาย", // First name
  lastName: "ใจดี", // Last name
  displayName: "PlayerOne", // Display name
  avatar: "https://example.com/avatar.jpg", // Profile picture URL
  dateOfBirth: "1995-05-15", // Date of birth
  gender: "male", // Gender: male, female, other
  nationality: "Thai", // Nationality
  country: "Thailand", // Country
  region: "Bangkok", // Region/State
  phone: "+66812345678", // Phone number
  role: "player", // Role: player, admin, organizer, moderator
  status: "active", // Status: active, inactive, banned, suspended
  gameProfiles: {
    valorant: {
      riotId: "PlayerOne#TH1",
      rank: "Immortal 2",
      rr: 85, // Rank Rating
      peakRank: "Radiant",
      region: "Asia Pacific",
      verified: true, // Account verification status
    },
  },
  preferences: {
    language: "th", // Preferred language
    timezone: "Asia/Bangkok", // Timezone
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  },
  statistics: {
    tournamentsPlayed: 15,
    tournamentsWon: 3,
    winRate: 0.65,
    totalPrizeWon: 25000,
  },
  socialLinks: {
    twitch: "https://twitch.tv/playerone",
    youtube: "https://youtube.com/playerone",
    twitter: "https://twitter.com/playerone",
  },
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  lastLoginAt: "2024-01-15T08:00:00Z",
  emailVerified: true,
  phoneVerified: true,
  kycVerified: false, // Know Your Customer verification
};
```

## 4. Team Registration Structure

```javascript
const teamRegistration = {
  id: "team-reg-001", // Unique identifier
  teamId: "team-001", // Team ID (if existing team)
  tournamentId: "tournament-001", // Tournament ID
  eventId: "event-001", // Event ID
  teamName: "Phoenix Esports", // Team name
  teamTag: "PHX", // Team tag/abbreviation
  teamLogo: "https://example.com/logo.png", // Team logo URL

  // Captain Information
  captain: {
    userId: "user-001",
    username: "PlayerOne",
    email: "captain@example.com",
    rank: "Immortal 2",
    role: "IGL", // In-game role
  },

  // Team Members
  members: [
    {
      userId: "user-001",
      username: "PlayerOne",
      email: "player1@example.com",
      rank: "Immortal 2",
      role: "Duelist",
      isPrimary: true, // Primary roster
    },
    {
      userId: "user-002",
      username: "ShadowStrike",
      email: "player2@example.com",
      rank: "Diamond 3",
      role: "Controller",
      isPrimary: true,
    },
    {
      userId: "user-003",
      username: "PhoenixRising",
      email: "player3@example.com",
      rank: "Ascendant 1",
      role: "Initiator",
      isPrimary: true,
    },
    {
      userId: "user-004",
      username: "CyberNinja",
      email: "player4@example.com",
      rank: "Immortal 1",
      role: "Sentinel",
      isPrimary: true,
    },
    {
      userId: "user-005",
      username: "VortexGamer",
      email: "player5@example.com",
      rank: "Diamond 1",
      role: "Flex",
      isPrimary: true,
    },
    {
      userId: "user-006",
      username: "SubPlayer",
      email: "sub@example.com",
      rank: "Diamond 2",
      role: "Substitute",
      isPrimary: false, // Substitute player
    },
  ],

  // Registration Details
  registrationDate: "2024-01-15T10:00:00Z", // Registration timestamp
  status: "pending", // Status: pending, approved, rejected, withdrawn
  priority: "high", // Priority: high, medium, low

  // Payment Information
  payment: {
    method: "bank_transfer", // Payment method
    amount: 2500, // Amount in THB
    currency: "THB",
    status: "paid", // Status: pending, paid, failed, refunded
    transactionId: "TXN-001",
    paymentSlip: "https://example.com/slip.jpg", // Payment slip image
    paidAt: "2024-01-15T09:30:00Z",
  },

  // Additional Information
  teamDescription:
    "ทีมที่มีประสบการณ์การแข่งขันมาแล้ว พร้อมสำหรับการแข่งขันระดับสูง",
  motivation: "ต้องการพิสูจน์ความสามารถและเรียนรู้จากทีมอื่น",
  previousExperience: "เข้าร่วมการแข่งขัน VCT Challengers 2023",

  // Contact Information
  contactInfo: {
    primaryContact: "user-001", // Primary contact user ID
    alternateContact: "user-002", // Alternate contact user ID
    preferredMethod: "discord", // Preferred communication method
  },

  // Approval Information
  approvalInfo: {
    reviewedBy: "admin-001", // Admin who reviewed
    reviewedAt: "2024-01-16T14:00:00Z", // Review timestamp
    approvedBy: null, // Admin who approved (null if not approved)
    approvedAt: null, // Approval timestamp
    rejectionReason: null, // Reason for rejection
    notes: "ทีมมีประสบการณ์ดี สมาชิกครบ", // Admin notes
  },

  // Metadata
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-16T14:00:00Z",
  submittedBy: "user-001", // User who submitted registration

  // Verification
  documentsSubmitted: [
    {
      type: "team_roster",
      url: "https://example.com/roster.pdf",
      status: "verified",
    },
    {
      type: "payment_slip",
      url: "https://example.com/payment.jpg",
      status: "verified",
    },
  ],

  // Tournament Specific Data
  seed: null, // Tournament seed (assigned after approval)
  group: null, // Group assignment (for group stage)
  bracket: null, // Bracket assignment

  // Communication
  notifications: {
    registrationConfirmed: true,
    paymentReceived: true,
    approvalStatus: false,
    tournamentUpdates: true,
  },
};
```

## 5. Database Relationships

```
Tournament (1) -> (Many) Events
Tournament (1) -> (Many) TeamRegistrations
Event (1) -> (Many) TeamRegistrations
User (1) -> (Many) TeamRegistrations (as captain or member)
Team (1) -> (Many) TeamRegistrations (across different tournaments)
```

## 6. Status Enums

### Tournament Status

- `draft` - Tournament is being created
- `upcoming` - Tournament is scheduled
- `registration-open` - Registration is open
- `registration-closed` - Registration is closed
- `ongoing` - Tournament is in progress
- `completed` - Tournament is finished
- `cancelled` - Tournament is cancelled

### Event Status

- `draft` - Event is being created
- `registration-open` - Registration is open
- `registration-closed` - Registration is closed
- `ongoing` - Event is in progress
- `completed` - Event is finished
- `cancelled` - Event is cancelled

### Team Registration Status

- `draft` - Registration is being filled
- `submitted` - Registration submitted, awaiting review
- `pending` - Under admin review
- `approved` - Registration approved
- `rejected` - Registration rejected
- `withdrawn` - Registration withdrawn by team
- `disqualified` - Team disqualified

### User Status

- `active` - User is active
- `inactive` - User is inactive
- `suspended` - User is temporarily suspended
- `banned` - User is permanently banned
- `pending` - User account pending verification

## 7. API Endpoints Structure

```javascript
// Tournament endpoints
GET    /api/tournaments              // List all tournaments
POST   /api/tournaments              // Create tournament
GET    /api/tournaments/:id          // Get tournament details
PUT    /api/tournaments/:id          // Update tournament
DELETE /api/tournaments/:id          // Delete tournament

// Event endpoints
GET    /api/tournaments/:id/events   // List tournament events
POST   /api/tournaments/:id/events   // Create event
GET    /api/events/:id               // Get event details
PUT    /api/events/:id               // Update event
DELETE /api/events/:id               // Delete event

// Team Registration endpoints
GET    /api/registrations            // List all registrations (admin)
POST   /api/registrations            // Submit team registration
GET    /api/registrations/:id        // Get registration details
PUT    /api/registrations/:id        // Update registration
DELETE /api/registrations/:id        // Withdraw registration
POST   /api/registrations/:id/approve // Approve registration (admin)
POST   /api/registrations/:id/reject  // Reject registration (admin)

// User endpoints
GET    /api/users                    // List users (admin)
POST   /api/users                    // Create user
GET    /api/users/:id                // Get user profile
PUT    /api/users/:id                // Update user profile
DELETE /api/users/:id                // Delete user (admin)
```

This structure provides a comprehensive foundation for the tournament management system with proper relationships, validation, and extensibility.
