import { prisma } from '../prisma'
import { RegistrationStatus, Priority, PaymentStatus } from '@prisma/client'

export interface RegistrationFilters {
  status?: RegistrationStatus[]
  priority?: Priority[]
  tournamentId?: string
  eventId?: string
  search?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export class TeamRegistrationService {
  // Get all team registrations with filters and pagination
  static async getTeamRegistrations(
    filters: RegistrationFilters = {},
    page: number = 1,
    limit: number = 10
  ) {
    const where: any = {}

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      where.status = { in: filters.status }
    }

    if (filters.priority && filters.priority.length > 0) {
      where.priority = { in: filters.priority }
    }

    if (filters.tournamentId) {
      where.tournamentId = filters.tournamentId
    }

    if (filters.eventId) {
      where.eventId = filters.eventId
    }

    if (filters.search) {
      where.OR = [
        { teamName: { contains: filters.search, mode: 'insensitive' } },
        { teamTag: { contains: filters.search, mode: 'insensitive' } },
        { captain: { username: { contains: filters.search, mode: 'insensitive' } } }
      ]
    }

    if (filters.dateRange) {
      where.registrationDate = {
        gte: filters.dateRange.start,
        lte: filters.dateRange.end
      }
    }

    const [registrations, total] = await Promise.all([
      prisma.teamRegistration.findMany({
        where,
        include: {
          tournament: {
            select: {
              id: true,
              name: true,
              type: true,
              prize: true
            }
          },
          event: {
            select: {
              id: true,
              name: true,
              date: true,
              location: true
            }
          },
          captain: {
            select: {
              id: true,
              username: true,
              displayName: true,
              gameProfiles: true
            }
          },
          submitter: {
            select: {
              id: true,
              username: true,
              displayName: true
            }
          },
          reviewer: {
            select: {
              id: true,
              username: true,
              displayName: true
            }
          },
          approver: {
            select: {
              id: true,
              username: true,
              displayName: true
            }
          },
          teamMembers: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  gameProfiles: true
                }
              }
            }
          },
          _count: {
            select: {
              teamMembers: true
            }
          }
        },
        orderBy: [
          { priority: 'desc' },
          { registrationDate: 'desc' }
        ],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.teamRegistration.count({ where })
    ])

    return {
      registrations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

  // ...existing code...
  static async getPendingApprovals() {
    return prisma.teamRegistration.findMany({
      where: {
        status: 'PENDING'
      },
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
            type: true,
            prize: true
          }
        },
        event: {
          select: {
            id: true,
            name: true,
            date: true,
            location: true
          }
        },
        captain: {
          select: {
            id: true,
            username: true,
            displayName: true,
            gameProfiles: true
          }
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                gameProfiles: true
              }
            }
          }
        },
        _count: {
          select: {
            teamMembers: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { registrationDate: 'desc' }
      ]
    })
  }

  // Get registration by ID
  static async getRegistrationById(id: string) {
    return prisma.teamRegistration.findUnique({
      where: { id },
      include: {
        tournament: true,
        event: true,
        captain: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true,
            phone: true,
            gameProfiles: true
          }
        },
        submitter: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
          }
        },
        reviewer: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        },
        approver: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                email: true,
                gameProfiles: true
              }
            }
          },
          orderBy: { isPrimary: 'desc' }
        }
      }
    })
  }

  // Create team registration
  static async createTeamRegistration(data: any, submittedBy: string) {
    const { teamMembers, ...registrationData } = data

    return prisma.$transaction(async (tx) => {
      // Create team registration
      const registration = await tx.teamRegistration.create({
        data: {
          ...registrationData,
          submittedBy,
          status: 'SUBMITTED'
        }
      })

      // Create team members
      if (teamMembers && teamMembers.length > 0) {
        await tx.teamMember.createMany({
          data: teamMembers.map((member: any) => ({
            ...member,
            teamRegistrationId: registration.id
          }))
        })
      }

      // Update event current teams count
      await tx.event.update({
        where: { id: registrationData.eventId },
        data: {
          currentTeams: {
            increment: 1
          }
        }
      })

      // Update tournament current participants count
      await tx.tournament.update({
        where: { id: registrationData.tournamentId },
        data: {
          currentParticipants: {
            increment: teamMembers?.length || 1
          }
        }
      })

      return registration
    })
  }

  // Update registration status
  static async updateRegistrationStatus(
    id: string,
    status: RegistrationStatus,
    adminId: string,
    notes?: string,
    rejectionReason?: string
  ) {
    const updateData: any = {
      status,
      reviewedBy: adminId,
      reviewedAt: new Date(),
      adminNotes: notes
    }

    if (status === 'APPROVED') {
      updateData.approvedBy = adminId
      updateData.approvedAt = new Date()
    } else if (status === 'REJECTED') {
      updateData.rejectionReason = rejectionReason
    }

    return prisma.teamRegistration.update({
      where: { id },
      data: updateData,
      include: {
        tournament: {
          select: {
            id: true,
            name: true
          }
        },
        event: {
          select: {
            id: true,
            name: true
          }
        },
        captain: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
          }
        }
      }
    })
  }

  // Update payment status
  static async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
    transactionId?: string,
    paymentSlip?: string
  ) {
    const updateData: any = {
      paymentStatus
    }

    if (paymentStatus === 'PAID') {
      updateData.paidAt = new Date()
      if (transactionId) updateData.transactionId = transactionId
      if (paymentSlip) updateData.paymentSlip = paymentSlip
    }

    return prisma.teamRegistration.update({
      where: { id },
      data: updateData
    })
  }

  // Get registration statistics
  static async getRegistrationStats() {
    const [
      totalRegistrations,
      pendingApprovals,
      approvedRegistrations,
      rejectedRegistrations,
      paidRegistrations
    ] = await Promise.all([
      prisma.teamRegistration.count(),
      prisma.teamRegistration.count({
        where: { status: 'PENDING' }
      }),
      prisma.teamRegistration.count({
        where: { status: 'APPROVED' }
      }),
      prisma.teamRegistration.count({
        where: { status: 'REJECTED' }
      }),
      prisma.teamRegistration.count({
        where: { paymentStatus: 'PAID' }
      })
    ])

    return {
      totalRegistrations,
      pendingApprovals,
      approvedRegistrations,
      rejectedRegistrations,
      paidRegistrations
    }
  }

  // Get recent activities
  static async getRecentActivities(limit: number = 10) {
    const registrations = await prisma.teamRegistration.findMany({
      include: {
        tournament: {
          select: {
            name: true
          }
        },
        event: {
          select: {
            name: true
          }
        },
        captain: {
          select: {
            username: true,
            displayName: true
          }
        },
        submitter: {
          select: {
            username: true,
            displayName: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      take: limit
    })

    return registrations.map(reg => ({
      id: reg.id,
      type: 'team_registration',
      action: reg.status.toLowerCase(),
      title: `${reg.teamName} สมัครเข้าร่วม ${reg.event.name}`,
      user: reg.captain.displayName || reg.captain.username,
      timestamp: reg.updatedAt,
      status: reg.status === 'APPROVED' ? 'success' : 
              reg.status === 'REJECTED' ? 'error' : 
              reg.status === 'PENDING' ? 'warning' : 'info'
    }))
  }
}