import { NextRequest, NextResponse } from 'next/server'
import { TournamentService } from '@/lib/database/tournaments'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tournament = await TournamentService.getTournamentById(params.id)

    if (!tournament) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tournament not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: tournament
    })
  } catch (error) {
    console.error('Error fetching tournament:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tournament'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const tournament = await TournamentService.updateTournament(params.id, body)

    return NextResponse.json({
      success: true,
      data: tournament
    })
  } catch (error) {
    console.error('Error updating tournament:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update tournament'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await TournamentService.deleteTournament(params.id)

    return NextResponse.json({
      success: true,
      message: 'Tournament deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting tournament:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete tournament'
      },
      { status: 500 }
    )
  }
}