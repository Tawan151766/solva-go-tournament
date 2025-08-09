import { prisma } from '../prisma'
import { EventStatus, CompetitionType, CompetitionFormat } from '@prisma/client'

export interface EventFilters {
  status?: EventStatus[]
  competitionType?: CompetitionType[]
  tournamentId?: string
  search?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export class EventService {
  // Get all events with filters and pagination
  static async getEvents(
    filters: EventFilters = {},
    page: number = 1,
    limit: number = 10
  ) {
    const where: any = {}

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      where.status = { in: filters.status }
    }

    if (filters.competitionType && filters.competitionType.length > 0) {
      where.competitionType = { in: filters.competitionType }
    }

    if (filters.tournamentId) {
      where.tournamentId = filters.tournamentId
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { category: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    if (filters.dateRange) {
      where.date = {
        gte: filters.dateRange.start,
        lte: filters.dateRange.end
      }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          tournament: {
            select: {
              id: true,
              name: true,
              status: true
            }
          },
          creator: {
            select: {
              id: true,
              username: true,
              displayName: true
            }
          },
          _count: {
            select: {
              teamRegistrations: true
            }
          }
        },
        orderBy: { date: 'asc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.event.count({ where })
    ])

    return {
      events,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

  // Get event by ID
  static async getEventById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        tournament: true,
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
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
            _count: {
              select: {
                teamMembers: true
              }
            }
          },
          orderBy: { registrationDate: 'desc' }
        },
        _count: {
          select: {
            teamRegistrations: true
          }
        }
      }
    })
  }

  // Get events by tournament ID
  static async getEventsByTournamentId(tournamentId: string) {
    return prisma.event.findMany({
      where: { tournamentId },
      include: {
        _count: {
          select: {
            teamRegistrations: true
          }
        }
      },
      orderBy: { date: 'asc' }
    })
  }

  // Create new event
  static async createEvent(data: any, createdBy: string) {
    return prisma.event.create({
      data: {
        ...data,
        createdBy,
        currentTeams: 0
      },
      include: {
        tournament: {
          select: {
            id: true,
            name: true
          }
        },
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

  // Update event
  static async updateEvent(id: string, data: any) {
    return prisma.event.update({
      where: { id },
      data,
      include: {
        tournament: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }

  // Delete event
  static async deleteEvent(id: string) {
    return prisma.event.delete({
      where: { id }
    })
  }

  // Update event team count
  static async updateEventTeamCount(id: string, increment: number = 1) {
    return prisma.event.update({
      where: { id },
      data: {
        currentTeams: {
          increment
        }
      }
    })
  }

  // Get available events for registration
  static async getAvailableEvents() {
    return prisma.event.findMany({
      where: {
        status: 'REGISTRATION_OPEN',
        tournament: {
          status: {
            in: ['REGISTRATION_OPEN', 'UPCOMING']
          }
        }
      },
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
            registrationEnd: true
          }
        },
        _count: {
          select: {
            teamRegistrations: true
          }
        }
      },
      orderBy: { date: 'asc' }
    })
  }

  // Get event statistics
  static async getEventStats() {
    const [
      totalEvents,
      activeEvents,
      upcomingEvents,
      completedEvents
    ] = await Promise.all([
      prisma.event.count(),
      prisma.event.count({
        where: {
          status: {
            in: ['REGISTRATION_OPEN', 'ONGOING']
          }
        }
      }),
      prisma.event.count({
        where: { status: 'REGISTRATION_OPEN' }
      }),
      prisma.event.count({
        where: { status: 'COMPLETED' }
      })
    ])

    return {
      totalEvents,
      activeEvents,
      upcomingEvents,
      completedEvents
    }
  }
}