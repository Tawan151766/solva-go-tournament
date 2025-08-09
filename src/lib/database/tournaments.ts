import { prisma } from '../prisma'
import { Tournament, TournamentStatus, TournamentType } from '@prisma/client'

export interface TournamentWithStats extends Tournament {
  _count: {
    events: number
    teamRegistrations: number
  }
}

export interface TournamentFilters {
  status?: TournamentStatus[]
  type?: TournamentType[]
  search?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export class TournamentService {
  // Get all tournaments with filters and pagination
  static async getTournaments(
    filters: TournamentFilters = {},
    page: number = 1,
    limit: number = 10
  ) {
    const where: any = {}

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      where.status = { in: filters.status }
    }

    if (filters.type && filters.type.length > 0) {
      where.type = { in: filters.type }
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    if (filters.dateRange) {
      where.startDate = {
        gte: filters.dateRange.start,
        lte: filters.dateRange.end
      }
    }

    const [tournaments, total] = await Promise.all([
      prisma.tournament.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              displayName: true
            }
          },
          _count: {
            select: {
              events: true,
              teamRegistrations: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.tournament.count({ where })
    ])

    return {
      tournaments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

  // Get tournament by ID with full details
  static async getTournamentById(id: string) {
    return prisma.tournament.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
          }
        },
        events: {
          include: {
            _count: {
              select: {
                teamRegistrations: true
              }
            }
          }
        },
        teamRegistrations: {
          include: {
            captain: {
              select: {
                id: true,
                username: true,
                displayName: true
              }
            },
            event: {
              select: {
                id: true,
                name: true
              }
            },
            _count: {
              select: {
                teamMembers: true
              }
            }
          }
        },
        _count: {
          select: {
            events: true,
            teamRegistrations: true
          }
        }
      }
    })
  }

  // Create new tournament
  static async createTournament(data: any, createdBy: string) {
    return prisma.tournament.create({
      data: {
        ...data,
        createdBy,
        currentParticipants: 0
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        }
      }
    })
  }

  // Update tournament
  static async updateTournament(id: string, data: any) {
    return prisma.tournament.update({
      where: { id },
      data,
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        }
      }
    })
  }

  // Delete tournament
  static async deleteTournament(id: string) {
    return prisma.tournament.delete({
      where: { id }
    })
  }

  // Get tournament statistics
  static async getTournamentStats() {
    const [
      totalTournaments,
      activeTournaments,
      upcomingTournaments,
      completedTournaments
    ] = await Promise.all([
      prisma.tournament.count(),
      prisma.tournament.count({
        where: {
          status: {
            in: ['REGISTRATION_OPEN', 'ONGOING']
          }
        }
      }),
      prisma.tournament.count({
        where: { status: 'UPCOMING' }
      }),
      prisma.tournament.count({
        where: { status: 'COMPLETED' }
      })
    ])

    return {
      totalTournaments,
      activeTournaments,
      upcomingTournaments,
      completedTournaments
    }
  }
}