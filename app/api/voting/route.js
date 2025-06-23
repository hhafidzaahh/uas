// app/api/voting/route.js
let votes = {}

export async function GET() {
  return Response.json(votes)
}

export async function POST(req) {
  const { ukm } = await req.json()
  if (!ukm) return new Response('Invalid', { status: 400 })

  if (!votes[ukm]) votes[ukm] = 0
  votes[ukm]++

  return new Response('Vote ditambahkan', { status: 200 })
}
