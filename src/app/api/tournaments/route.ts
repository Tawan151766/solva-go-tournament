import { NextRequest, NextResponse } from 'next/server'
import { TournamentService } from '@/lib/database/tournaments'
import { TournamentStatus, TournamentType } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || undefined
    const status = searchParams.getAll('status') as TournamentStatus[]
    const type = searchParams.getAll('type') as TournamentType[]
    
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
      type: type.length > 0 ? type : undefined,
      search,
      dateRange
    }

    const result = await TournamentService.getTournaments(filters, page, limit)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching tournaments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tournaments'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { createdBy, ...tournamentData } = body

    // Validate required fields
    if (!createdBy) {
      return NextResponse.json(
        {
          success: false,
          error: 'createdBy is required'
        },
        { status: 400 }
      )
    }

    const tournament = await TournamentService.createTournament(tournamentData, createdBy)

    return NextResponse.json({
      success: true,
      data: tournament
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating tournament:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create tournament'
      },
      { status: 500 }
    )
  }
}