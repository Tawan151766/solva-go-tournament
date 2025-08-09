import { NextRequest, NextResponse } from 'next/server'
import { TournamentService } from '@/lib/database/tournaments'
import { TeamRegistrationService } from '@/lib/database/teamRegistrations'
import { UserService } from '@/lib/database/users'
import { EventService } from '@/lib/database/events'

export async function GET(request: NextRequest) {
  try {
    const [
      tournamentStats,
      registrationStats,
      userStats,
      eventStats,
      recentActivities
    ] = await Promise.all([
      TournamentService.getTournamentStats(),
      TeamRegistrationService.getRegistrationStats(),
      UserService.getUserStats(),
      EventService.getEventStats(),
      TeamRegistrationService.getRecentActivities(10)
    ])

    const dashboardStats = {
      totalTournaments: tournamentStats.totalTournaments,
      activeTournaments: tournamentStats.activeTournaments,
      totalRegistrations: registrationStats.totalRegistrations,
      pendingApprovals: registrationStats.pendingApprovals,
      totalUsers: userStats.totalUsers,
      activeUsers: userStats.activeUsers,
      totalEvents: eventStats.totalEvents,
      activeEvents: eventStats.activeEvents,
      completedTournaments: tournamentStats.completedTournaments,
      approvedRegistrations: registrationStats.approvedRegistrations,
      rejectedRegistrations: registrationStats.rejectedRegistrations,
      paidRegistrations: registrationStats.paidRegistrations
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: dashboardStats,
        recentActivities
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard statistics'
      },
      { status: 500 }
    )
  }
}