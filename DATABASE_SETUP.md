# Database Setup Guide

## Overview
This project uses PostgreSQL with Prisma ORM for database management. The database is designed to support a tournament management system with proper relationships and data integrity.

## Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Basic knowledge of SQL and database concepts

## Database Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Configuration
1. Copy the environment file:
```bash
cp .env.example .env
```

2. Update the `DATABASE_URL` in `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/tournament_db?schema=public"
```

Replace:
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `localhost:5432`: Your PostgreSQL host and port
- `tournament_db`: Your database name

### 3. Create Database
Create a new PostgreSQL database:
```sql
CREATE DATABASE tournament_db;
```

### 4. Generate Prisma Client
```bash
npm run db:generate
```

### 5. Push Database Schema
```bash
npm run db:push
```

### 6. Seed Database with Sample Data
```bash
npm run db:seed
```

### 7. View Database (Optional)
```bash
npm run db:studio
```

## Database Schema Overview

### Core Tables

#### Users
- Stores user information (players, admins, organizers)
- Includes game profiles, preferences, and verification status
- Supports multiple roles and user statuses

#### Tournaments
- Main tournament information
- Organizer details, dates, and settings
- Status tracking and participant limits

#### Events
- Specific events within tournaments
- Competition format and requirements
- Prize information and scheduling

#### Team Registrations
- Team registration requests
- Payment tracking and approval workflow
- Team member management

#### Team Members
- Individual team member details
- Role assignments and primary/substitute status

#### Notifications
- User notification system
- Different notification types and read status

#### Audit Logs
- Track all system changes
- User actions and data modifications

### Key Relationships

```
User (1) ←→ (Many) TeamRegistration (as captain/submitter)
Tournament (1) ←→ (Many) Event
Tournament (1) ←→ (Many) TeamRegistration
Event (1) ←→ (Many) TeamRegistration
TeamRegistration (1) ←→ (Many) TeamMember
User (1) ←→ (Many) TeamMember
```

## API Endpoints

### Tournaments
- `GET /api/tournaments` - List tournaments with filters
- `POST /api/tournaments` - Create new tournament
- `GET /api/tournaments/[id]` - Get tournament details
- `PUT /api/tournaments/[id]` - Update tournament
- `DELETE /api/tournaments/[id]` - Delete tournament

### Team Registrations
- `GET /api/registrations` - List registrations with filters
- `POST /api/registrations` - Create team registration
- `GET /api/registrations/pending` - Get pending approvals
- `POST /api/registrations/[id]/approve` - Approve registration
- `POST /api/registrations/[id]/reject` - Reject registration

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Design Principles

### 1. Normalization
- Proper table relationships to avoid data duplication
- Foreign key constraints for data integrity
- Separate tables for different entities

### 2. Flexibility
- JSON fields for complex data structures
- Extensible user profiles and game information
- Configurable tournament and event settings

### 3. Performance
- Proper indexing on frequently queried fields
- Efficient relationship structures
- Pagination support for large datasets

### 4. Security
- Input validation at API level
- Proper user role management
- Audit logging for sensitive operations

### 5. Scalability
- Modular table design
- Support for multiple tournaments and events
- Efficient query patterns

## Data Types and Enums

### User Roles
- `PLAYER` - Regular tournament participants
- `ADMIN` - System administrators
- `ORGANIZER` - Tournament organizers
- `MODERATOR` - Content moderators

### Tournament Status
- `DRAFT` - Being created
- `UPCOMING` - Scheduled
- `REGISTRATION_OPEN` - Accepting registrations
- `REGISTRATION_CLOSED` - Registration closed
- `ONGOING` - In progress
- `COMPLETED` - Finished
- `CANCELLED` - Cancelled

### Registration Status
- `DRAFT` - Being filled out
- `SUBMITTED` - Submitted for review
- `PENDING` - Under admin review
- `APPROVED` - Approved by admin
- `REJECTED` - Rejected by admin
- `WITHDRAWN` - Withdrawn by team
- `DISQUALIFIED` - Disqualified

## Sample Data

The seed script creates:
- 1 Admin user
- 2 Sample players
- 1 Sample tournament (VALORANT Champions League 2024)
- 1 Sample event (VCL 2024 Qualifier)
- 1 Sample team registration (Phoenix Esports)

### Default Admin Credentials
- Email: `admin@tournament.com`
- Username: `admin`
- Role: `ADMIN`

## Useful Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database (WARNING: Deletes all data)
npm run db:reset
```

## Troubleshooting

### Connection Issues
1. Verify PostgreSQL is running
2. Check database credentials in `.env`
3. Ensure database exists
4. Check firewall settings

### Migration Issues
1. Reset database: `npm run db:reset`
2. Push schema: `npm run db:push`
3. Seed data: `npm run db:seed`

### Performance Issues
1. Check query efficiency in Prisma Studio
2. Add indexes for frequently queried fields
3. Use pagination for large datasets
4. Optimize API queries with proper includes

## Production Considerations

### Security
- Use environment variables for sensitive data
- Enable SSL for database connections
- Implement proper authentication and authorization
- Regular security audits

### Performance
- Database connection pooling
- Query optimization
- Proper indexing strategy
- Caching for frequently accessed data

### Monitoring
- Database performance monitoring
- Error logging and alerting
- Backup and recovery procedures
- Health checks for database connectivity

### Scaling
- Read replicas for heavy read workloads
- Database sharding for large datasets
- Connection pooling optimization
- Query performance monitoring