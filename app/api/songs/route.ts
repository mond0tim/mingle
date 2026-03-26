import { NextResponse } from 'next/server'
import { initialTracks } from '@/data/data'

export async function GET() {
  return NextResponse.json(initialTracks)
}