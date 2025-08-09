import { NextRequest, NextResponse } from 'next/server'
import { TeamRegistrationService } from '@/lib/database/teamRegistrations'
import { RegistrationStatus, Priority } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || undefined
    const status = searchParams.getAll('status') as RegistrationStatus[]
    const priority = searchParams.getAll('priority') as Priority[]
    const tournamentId = searchParams.get('tournamentId') || undefined
    const eventId = searchParams.get('eventId') || undefined
    
    // Parse date range
    let dateRange
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    if (startDate && endDate) {
      dateRange = {
        start: new Date(startDate),
        end: new Date(endDate)
      }
    }

    const filters = {
      status: status.length > 0 ? status : undefined,
      priority: priority.length > 0 ? priority : undefined,
      tournamentId,
      eventId,
      search,
      dateRange
    }

    const result = await TeamRegistrationService.getTeamRegistrations(filters, page, limit)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch registrations'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submittedBy, ...registrationData } = body

    // Validate required fields
    if (!submittedBy) {
      return NextResponse.json(
        {
          success: false,
          error: 'submittedBy is required'
        },
        { status: 400 }
      )
    }

    const registration = await TeamRegistrationService.createTeamRegistration(
      registrationData,
      submittedBy
    )

    return NextResponse.json({
      success: true,
      data: registration
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create registration'
      },
      { status: 500 }
    )
  }
}