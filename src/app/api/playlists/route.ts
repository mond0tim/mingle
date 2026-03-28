import { NextResponse } from 'next/server'
import { initialPlaylists } from '@/data/data'

export async function GET() {
  return NextResponse.json(initialPlaylists)
}