import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tournament.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@tournament.com',
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Tournament Admin',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'OTHER',
      nationality: 'Thai',
      country: 'Thailand',
      region: 'Bangkok',
      phone: '+66812345678',
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      gameProfiles: {
        valorant: {
          riotId: 'Admin#TH1',
          rank: 'Radiant',
          rr: 100,
          peakRank: 'Radiant',
          region: 'Asia Pacific',
          verified: true
        }
      },
      preferences: {
        language: 'th',
        timezone: 'Asia/Bangkok',
        notifications: {
          email: true,
          push: true,
          sms: false
        }
      },
      statistics: {
        tournamentsPlayed: 0,
        tournamentsWon: 0,
        winRate: 0,
        totalPrizeWon: 0
      }
    }
  })

  // Create sample players
  const players = await Promise.all([
    prisma.user.upsert({
      where: { email: 'player1@example.com' },
      update: {},
      create: {
        username: 'PlayerOne',
        email: 'player1@example.com',
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        displayName: 'PlayerOne',
        dateOfBirth: new Date('1995-05-15'),
        gender: 'MALE',
        nationality: 'Thai',
        country: 'Thailand',
        region: 'Bangkok',
        phone: '+66823456789',
        role: 'PLAYER',
        status: 'ACTIVE',
        emailVerified: true,
        gameProfiles: {
          valorant: {
            riotId: 'PlayerOne#TH1',
            rank: 'Immortal 2',
            rr: 85,
            peakRank: 'Radiant',
            region: 'Asia Pacific',
            verified: true
          }
        }
      }
    }),
    prisma.user.upsert({
      where: { email: 'player2@example.com' },
      update: {},
      create: {
        username: 'ShadowStrike',
        email: 'player2@example.com',
        firstName: 'สมหญิง',
        lastName: 'รักเรียน',
        displayName: 'ShadowStrike',
        dateOfBirth: new Date('1997-08-22'),
        gender: 'FEMALE',
        nationality: 'Thai',
        country: 'Thailand',
        region: 'Bangkok',
        phone: '+66834567890',
        role: 'PLAYER',
        status: 'ACTIVE',
        emailVerified: true,
        gameProfiles: {
          valorant: {
            riotId: 'ShadowStrike#TH2',
            rank: 'Diamond 3',
            rr: 72,
            peakRank: 'Immortal 1',
            region: 'Asia Pacific',
            verified: true
          }
        }
      }
    })
  ])

  // Create sample tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: 'VALORANT Champions League 2024',
      description: 'การแข่งขันระดับชาติสำหรับผู้เล่น VALORANT ทุกระดับ',
      type: 'ESPORTS',
      game: 'VALORANT',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-15'),
      registrationStart: new Date('2024-01-01'),
      registrationEnd: new Date('2024-02-15'),
      location: 'Bangkok, Thailand',
      venue: 'Impact Arena',
      status: 'REGISTRATION_OPEN',
      prize: '1,000,000 THB',
      maxParticipants: 64,
      organizer: {
        name: 'Riot Games Thailand',
        contact: 'contact@riot.com',
        phone: '02-123-4567'
      },
      format: 'SINGLE_ELIMINATION',
      tags: ['esports', 'valorant', 'national'],
      createdBy: adminUser.id
    }
  })

  // Create sample event
  const event = await prisma.event.create({
    data: {
      tournamentId: tournament.id,
      name: 'VCL 2024 Qualifier',
      description: 'รอบคัดเลือกเข้าสู่รอบชิงชนะเลิศ',
      category: 'qualifier',
      competitionType: 'TEAM',
      teamSize: 5,
      minTeamSize: 5,
      maxTeamSize: 5,
      maxTeams: 32,
      date: new Date('2024-03-01'),
      startTime: '09:00',
      endTime: '18:00',
      location: 'Online',
      format: 'SINGLE_ELIMINATION',
      status: 'REGISTRATION_OPEN',
      entryFee: 2500,
      prizes: [
        { position: 1, amount: 100000, currency: 'THB' },
        { position: 2, amount: 60000, currency: 'THB' },
        { position: 3, amount: 40000, currency: 'THB' }
      ],
      requirements: {
        rankMinimum: 'Bronze',
        rankMaximum: 'Radiant',
        regionRestriction: 'Thailand',
        ageMinimum: 16
      },
      createdBy: adminUser.id
    }
  })

  // Create sample team registration
  const teamRegistration = await prisma.teamRegistration.create({
    data: {
      tournamentId: tournament.id,
      eventId: event.id,
      teamName: 'Phoenix Esports',
      teamTag: 'PHX',
      captainId: players[0].id,
      submittedBy: players[0].id,
      status: 'PENDING',
      priority: 'HIGH',
      teamDescription: 'ทีมที่มีประสบการณ์การแข่งขันมาแล้ว พร้อมสำหรับการแข่งขันระดับสูง',
      motivation: 'ต้องการพิสูจน์ความสามารถและเรียนรู้จากทีมอื่น',
      contactInfo: {
        primaryContact: players[0].id,
        alternateContact: players[1].id,
        preferredMethod: 'discord'
      },
      paymentMethod: 'BANK_TRANSFER',
      paymentAmount: 2500,
      paymentStatus: 'PAID',
      paidAt: new Date()
    }
  })

  // Create team members
  await Promise.all([
    prisma.teamMember.create({
      data: {
        teamRegistrationId: teamRegistration.id,
        userId: players[0].id,
        username: players[0].username,
        email: players[0].email,
        rank: 'Immortal 2',
        role: 'Duelist',
        isPrimary: true
      }
    }),
    prisma.teamMember.create({
      data: {
        teamRegistrationId: teamRegistration.id,
        userId: players[1].id,
        username: players[1].username,
        email: players[1].email,
        rank: 'Diamond 3',
        role: 'Controller',
        isPrimary: true
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: ${adminUser.email}`)
  console.log(`🏆 Tournament: ${tournament.name}`)
  console.log(`🎯 Event: ${event.name}`)
  console.log(`👥 Team Registration: ${teamRegistration.teamName}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })