// Tournament Management System Types

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  type: 'esports' | 'traditional' | 'online' | 'offline';
  game?: string;
  startDate: string;
  endDate: string;
  registrationStart: string;
  registrationEnd: string;
  location: string;
  venue?: string;
  status: TournamentStatus;
  prize?: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: {
    name: string;
    contact: string;
    phone?: string;
  };
  rules?: string;
  format: CompetitionFormat;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
  isPublic: boolean;
  requiresApproval: boolean;
}

export interface Event {
  id: string;
  tournamentId: string;
  name: string;
  description?: string;
  category: string;
  competitionType: 'individual' | 'team';
  teamSize: number;
  minTeamSize: number;
  maxTeamSize: number;
  maxTeams: number;
  currentTeams: number;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  format: CompetitionFormat;
  status: EventStatus;
  entryFee?: number;
  currency: string;
  prizes: Prize[];
  requirements: EventRequirements;
  schedule: ScheduleItem[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  country: string;
  region: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  gameProfiles: GameProfiles;
  preferences: UserPreferences;
  statistics: UserStatistics;
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  kycVerified: boolean;
}

export interface TeamRegistration {
  id: string;
  teamId?: string;
  tournamentId: string;
  eventId: string;
  teamName: string;
  teamTag: string;
  teamLogo?: string;
  captain: TeamMember;
  members: TeamMember[];
  registrationDate: string;
  status: RegistrationStatus;
  priority: Priority;
  payment: PaymentInfo;
  teamDescription?: string;
  motivation?: string;
  previousExperience?: string;
  contactInfo: ContactInfo;
  approvalInfo: ApprovalInfo;
  createdAt: string;
  updatedAt: string;
  submittedBy: string;
  documentsSubmitted: Document[];
  seed?: number;
  group?: string;
  bracket?: string;
  notifications: NotificationSettings;
}

export interface TeamMember {
  userId: string;
  username: string;
  email: string;
  rank?: string;
  role: string;
  isPrimary: boolean;
}

export interface Prize {
  position: number;
  amount: number;
  currency: string;
}

export interface EventRequirements {
  rankMinimum?: string;
  rankMaximum?: string;
  regionRestriction?: string;
  ageMinimum?: number;
  ageMaximum?: number;
}

export interface ScheduleItem {
  round: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface GameProfiles {
  valorant?: {
    riotId: string;
    rank: string;
    rr: number;
    peakRank: string;
    region: string;
    verified: boolean;
  };
  [key: string]: any;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface UserStatistics {
  tournamentsPlayed: number;
  tournamentsWon: number;
  winRate: number;
  totalPrizeWon: number;
}

export interface SocialLinks {
  twitch?: string;
  youtube?: string;
  twitter?: string;
  discord?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string;
  paymentSlip?: string;
  paidAt?: string;
}

export interface ContactInfo {
  primaryContact: string;
  alternateContact?: string;
  preferredMethod: 'email' | 'discord' | 'phone';
}

export interface ApprovalInfo {
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface Document {
  type: DocumentType;
  url: string;
  status: DocumentStatus;
}

export interface NotificationSettings {
  registrationConfirmed: boolean;
  paymentReceived: boolean;
  approvalStatus: boolean;
  tournamentUpdates: boolean;
}

// Enums
export type TournamentStatus = 
  | 'draft'
  | 'upcoming'
  | 'registration-open'
  | 'registration-closed'
  | 'ongoing'
  | 'completed'
  | 'cancelled';

export type EventStatus = 
  | 'draft'
  | 'registration-open'
  | 'registration-closed'
  | 'ongoing'
  | 'completed'
  | 'cancelled';

export type RegistrationStatus = 
  | 'draft'
  | 'submitted'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'withdrawn'
  | 'disqualified';

export type UserRole = 
  | 'player'
  | 'admin'
  | 'organizer'
  | 'moderator';

export type UserStatus = 
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'banned'
  | 'pending';

export type Priority = 
  | 'high'
  | 'medium'
  | 'low';

export type CompetitionFormat = 
  | 'single-elimination'
  | 'double-elimination'
  | 'round-robin'
  | 'swiss'
  | 'group-stage'
  | 'bracket';

export type PaymentMethod = 
  | 'bank_transfer'
  | 'credit_card'
  | 'paypal'
  | 'crypto'
  | 'cash';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export type DocumentType = 
  | 'team_roster'
  | 'payment_slip'
  | 'id_verification'
  | 'parental_consent'
  | 'medical_certificate';

export type DocumentStatus = 
  | 'pending'
  | 'verified'
  | 'rejected';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface TeamRegistrationForm {
  teamName: string;
  teamTag: string;
  teamLogo?: File;
  captain: {
    userId: string;
    role: string;
  };
  members: {
    userId: string;
    role: string;
    isPrimary: boolean;
  }[];
  teamDescription?: string;
  motivation?: string;
  previousExperience?: string;
  paymentSlip?: File;
  contactInfo: {
    primaryContact: string;
    alternateContact?: string;
    preferredMethod: 'email' | 'discord' | 'phone';
  };
}

export interface TournamentForm {
  name: string;
  description?: string;
  type: 'esports' | 'traditional' | 'online' | 'offline';
  game?: string;
  startDate: string;
  endDate: string;
  registrationStart: string;
  registrationEnd: string;
  location: string;
  venue?: string;
  prize?: string;
  maxParticipants: number;
  organizer: {
    name: string;
    contact: string;
    phone?: string;
  };
  rules?: string;
  format: CompetitionFormat;
  tags: string[];
  isPublic: boolean;
  requiresApproval: boolean;
}

export interface EventForm {
  name: string;
  description?: string;
  category: string;
  competitionType: 'individual' | 'team';
  teamSize: number;
  minTeamSize: number;
  maxTeamSize: number;
  maxTeams: number;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  format: CompetitionFormat;
  entryFee?: number;
  currency: string;
  prizes: Prize[];
  requirements: EventRequirements;
}

// Filter and Search Types
export interface TournamentFilters {
  status?: TournamentStatus[];
  type?: string[];
  game?: string[];
  location?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  prizeRange?: {
    min: number;
    max: number;
  };
}

export interface RegistrationFilters {
  status?: RegistrationStatus[];
  priority?: Priority[];
  tournamentId?: string;
  eventId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// ...existing code...
  // ...existing code...

export interface RecentActivity {
  id: string;
  type: 'tournament' | 'registration' | 'user' | 'event';
  action: string;
  title: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}