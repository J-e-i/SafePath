import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { start, end, avoid_polygons } = await req.json();

    if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 2 || end.length !== 2) {
      return NextResponse.json({ error: 'Invalid start/end' }, { status: 400 });
    }

    const key = process.env.OPENROUTESERVICE_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Missing OPENROUTESERVICE_KEY' }, { status: 500 });
    }

    const body: any = {
      coordinates: [
        [start[1], start[0]],
        [end[1], end[0]]
      ],
      options: {}
    };

    if (avoid_polygons) {
      body.options.avoid_polygons = avoid_polygons;
    }

    const resp = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: 'ORS error', detail: text }, { status: resp.status });
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: 'Server failure', detail: e.message }, { status: 500 });
  }
}