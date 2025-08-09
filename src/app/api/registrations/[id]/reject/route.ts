import { NextRequest, NextResponse } from 'next/server'
import { TeamRegistrationService } from '@/lib/database/teamRegistrations'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { adminId, rejectionReason, notes } = body

    if (!adminId) {
      return NextResponse.json(
        {
          success: false,
          error: 'adminId is required'
        },
        { status: 400 }
      )
    }

    if (!rejectionReason) {
      return NextResponse.json(
        {
          success: false,
          error: 'rejectionReason is required'
        },
        { status: 400 }
      )
    }

    const registration = await TeamRegistrationService.updateRegistrationStatus(
      params.id,
      'REJECTED',
      adminId,
      notes,
      rejectionReason
    )

    return NextResponse.json({
      success: true,
      data: registration,
      message: 'Registration rejected successfully'
    })
  } catch (error) {
    console.error('Error rejecting registration:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to reject registration'
      },
      { status: 500 }
    )
  }
}