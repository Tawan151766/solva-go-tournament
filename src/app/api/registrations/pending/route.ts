import { NextRequest, NextResponse } from 'next/server'
import { TeamRegistrationService } from '@/lib/database/teamRegistrations'

export async function GET(request: NextRequest) {
  try {
    const pendingApprovals = await TeamRegistrationService.getPendingApprovals()

    return NextResponse.json({
      success: true,
      data: pendingApprovals
    })
  } catch (error) {
    console.error('Error fetching pending approvals:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch pending approvals'
      },
      { status: 500 }
    )
  }
}