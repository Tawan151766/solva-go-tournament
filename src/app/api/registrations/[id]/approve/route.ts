import { NextRequest, NextResponse } from 'next/server'
import { TeamRegistrationService } from '@/lib/database/teamRegistrations'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { adminId, notes } = body

    if (!adminId) {
      return NextResponse.json(
        {
          success: false,
          error: 'adminId is required'
        },
        { status: 400 }
      )
    }

    const registration = await TeamRegistrationService.updateRegistrationStatus(
      params.id,
      'APPROVED',
      adminId,
      notes
    )

    return NextResponse.json({
      success: true,
      data: registration,
      message: 'Registration approved successfully'
    })
  } catch (error) {
    console.error('Error approving registration:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to approve registration'
      },
      { status: 500 }
    )
  }
}