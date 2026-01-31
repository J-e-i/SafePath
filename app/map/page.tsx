'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';

const MapWithMarkers = dynamic(() => import('./MapWithMarkers'), { ssr: false });

const DEFAULT_START = "233 S Wacker Dr, Chicago, IL"; // Willis Tower

export default function SafetyMap() {
  const [crimeData, setCrimeData] = useState<any[]>([]);
  const [start, setStart] = useState(DEFAULT_START);
  const [destination, setDestination] = useState('');
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [destCoords, setDestCoords] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [routeType, setRouteType] = useState<'direct' | 'optimized'>('direct');
  const [avoidPolygons, setAvoidPolygons] = useState<any>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    axios
      .get('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=1000')
      .then(res => {
        if (isMounted.current) {
          const allowedTypes = [
            'THEFT',
            'ASSAULT',
            'CRIM SEXUAL ASSAULT',
            'SEX OFFENSE',
            'HARASSMENT',
            'ACCIDENT'
          ];
            const filtered = res.data
            .filter(
              (d: any) =>
                d.latitude &&
                d.longitude &&
                d.primary_type &&
                allowedTypes.includes(d.primary_type.toUpperCase())
            )
            .map((d: any) => ({
              ...d,
              latitude: Number(d.latitude),
              longitude: Number(d.longitude)
            }));
          setCrimeData(filtered);
        }
      })
      .catch(err => {
        console.error('Error fetching crime data:', err);
      });
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Geocode with Nominatim
  const geocode = async (address: string) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address + ', Chicago, IL'
    )}`;
    const res = await axios.get(url);
    if (res.data && res.data.length > 0) {
      return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
    }
    return null;
  };

  // Direct route (OpenRouteService)
  const fetchRoute = async (start: [number, number], end: [number, number]) => {
    const apiKey =
      "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjNkNmMzMjZhMDdlMjRiYjFiNTVkZTgzM2FkNGZmNmZhIiwiaCI6Im11cm11cjY0In0=";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;
    const res = await axios.get(url);
    if (res.data?.features?.length > 0) return res.data.features[0];
    return null;
  };

  // Handle form submit
  const handleRoute = async (e: any) => {
    e.preventDefault();
    const sCoords = await geocode(start);
    const dCoords = await geocode(destination);
    setStartCoords(sCoords as [number, number] | null);
    setDestCoords(dCoords as [number, number] | null);
    if (sCoords && dCoords) {
      let routeData = null;
      if (routeType === 'direct') {
        setAvoidPolygons(null);
        routeData = await fetchRoute(
          sCoords as [number, number],
          dCoords as [number, number]
        );
      } else if (routeType === 'optimized') {
        const directRoute = await fetchRoute(
          sCoords as [number, number],
          dCoords as [number, number]
        );
        const routeLine = turf.lineString(directRoute.geometry.coordinates);
        const routeBuffer = turf.buffer(routeLine, 0.05, { units: 'kilometers' }) as any;
        const closeCrimes = crimeData.filter(crime => {
          const pt = turf.point([crime.longitude, crime.latitude]);
            return turf.booleanPointInPolygon(pt, routeBuffer);
        });
        const buffers = closeCrimes.map(crime =>
          turf.buffer(
            turf.point([crime.longitude, crime.latitude]),
            0.05,
            { units: 'kilometers' }
          )
        );
        let unioned: any = null;
        if (buffers.length > 0) {
          unioned = buffers[0];
          for (let i = 1; i < buffers.length; i++) {
            try {
              unioned = turf.union(unioned, buffers[i]);
            } catch {}
          }
        }
        let avoid = null;
        if (unioned?.geometry?.coordinates?.length > 0) {
          avoid = unioned.geometry;
        }
        setAvoidPolygons(avoid);
        routeData = await fetchOptimizedRoute(
          sCoords as [number, number],
          dCoords as [number, number],
          avoid
        );
      }
      setRoute(routeData);
    }
  };

  // Optimized route (avoid polygons)
  const fetchOptimizedRoute = async (
    start: [number, number],
    end: [number, number],
    avoidPolygons: any
  ) => {
    const apiKey =
      "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjNkNmMzMjZhMDdlMjRiYjFiNTVkZTgzM2FkNGZmNmZhIiwiaCI6Im11cm11cjY0In0=";
    const body: any = {
      coordinates: [
        [start[1], start[0]],
        [end[1], end[0]]
      ],
      options: {}
    };
    if (avoidPolygons) {
      body.options.avoid_polygons = avoidPolygons;
    }
    const res = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      body,
      {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.data?.features?.length > 0) return res.data.features[0];
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-4 pb-4">
        <form onSubmit={handleRoute} className="flex gap-2 justify-center mb-2">
          <input
            type="text"
            value={start}
            onChange={e => setStart(e.target.value)}
            placeholder="Start address"
            className="p-2 rounded border"
          />
          <input
            type="text"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder="Destination address"
            className="p-2 rounded border"
          />
          <select
            value={routeType}
            onChange={e =>
              setRouteType(e.target.value as 'direct' | 'optimized')
            }
            className="p-2 rounded border"
            aria-label="Route type"
          >
            <option value="direct">Direct Path (Shortest)</option>
            <option value="optimized">Optimized Path (Avoid Risk Zones)</option>

          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Route
          </button>
        </form>
        <div className="relative h-[90vh] bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
          <MapWithMarkers
            crimeData={crimeData}
            startCoords={startCoords}
            destCoords={destCoords}
            route={route}
            routeType={routeType}
            avoidPolygons={avoidPolygons}
          />
        </div>
      </main>
    </div>
  );
}
