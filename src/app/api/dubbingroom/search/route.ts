import { NextRequest } from 'next/server'
import { commonGet } from '../common-api'

export async function GET(request: NextRequest) {
  return await commonGet(`search`, request.nextUrl.search)
}
