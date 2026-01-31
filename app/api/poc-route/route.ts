import { NextResponse } from 'next/server';

// PoC route disabled: local Dijkstra pathfinding has been removed.
export async function POST() {
  return NextResponse.json({ error: 'poc-route disabled' }, { status: 410 });
}

export async function GET() {
  return NextResponse.json({ status: 'gone', message: 'poc-route disabled' }, { status: 410 });
}
