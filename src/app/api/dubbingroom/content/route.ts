import { NextRequest } from 'next/server'
import { commonGet, commonPost } from '../common-api'

export async function GET(request: NextRequest) {
  return await commonGet(`content`, request.nextUrl.search)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  return await commonPost(`content`, data)
}
