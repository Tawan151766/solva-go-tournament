import { prisma } from '../prisma'
import { UserRole, UserStatus } from '@prisma/client'

export interface UserFilters {
  role?: UserRole[]
  status?: UserStatus[]
  search?: string
  verified?: boolean
}

export class UserService {
  // Get all users with filters and pagination
  static async getUsers(
    filters: UserFilters = {},
    page: number = 1,
    limit: number = 10
  ) {
    const where: any = {}

    // Apply filters
    if (filters.role && filters.role.length > 0) {
      where.role = { in: filters.role }
    }

    if (filters.status && filters.status.length > 0) {
      where.status = { in: filters.status }
    }

    if (filters.search) {
      where.OR = [
        { username: { contains: filters.search, mode: 'insensitive' } },
        { displayName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    if (filters.verified !== undefined) {
      where.emailVerified = filters.verified
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          displayName: true,
          avatar: true,
          role: true,
          status: true,
          gameProfiles: true,
          emailVerified: true,
          phoneVerified: true,
          kycVerified: true,
          createdAt: true,
          lastLoginAt: true,
          _count: {
            select: {
              teamRegistrations: true,
              captainRegistrations: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.user.count({ where })
    ])

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

  // Get user by ID
  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        teamRegistrations: {
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
            }
          }
        },
        captainRegistrations: {
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
            }
          }
        },
        teamMembers: {
          include: {
            teamRegistration: {
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
                }
              }
            }
          }
        }
      }
    })
  }

  // Get user by email
  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  // Get user by username
  static async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username }
    })
  }

  // Create new user
  static async createUser(data: any) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true
      }
    })
  }

  // Update user
  static async updateUser(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        role: true,
        status: true,
        gameProfiles: true,
        updatedAt: true
      }
    })
  }

  // Update user login timestamp
  static async updateLastLogin(id: string) {
    return prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date()
      }
    })
  }

  // Update user verification status
  static async updateVerificationStatus(
    id: string,
    type: 'email' | 'phone' | 'kyc',
    verified: boolean
  ) {
    const updateData: any = {}
    
    switch (type) {
      case 'email':
        updateData.emailVerified = verified
        break
      case 'phone':
        updateData.phoneVerified = verified
        break
      case 'kyc':
        updateData.kycVerified = verified
        break
    }

    return prisma.user.update({
      where: { id },
      data: updateData
    })
  }

  // Get user statistics
  static async getUserStats() {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      adminUsers,
      playersCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.user.count({
        where: { emailVerified: true }
      }),
      prisma.user.count({
        where: { role: 'ADMIN' }
      }),
      prisma.user.count({
        where: { role: 'PLAYER' }
      })
    ])

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      adminUsers,
      playersCount
    }
  }

  // Search users for team registration
  static async searchUsersForTeam(search: string, limit: number = 10) {
    return prisma.user.findMany({
      where: {
        AND: [
          { status: 'ACTIVE' },
          { role: 'PLAYER' },
          {
            OR: [
              { username: { contains: search, mode: 'insensitive' } },
              { displayName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatar: true,
        gameProfiles: true
      },
      take: limit
    })
  }
}