"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet-polylinedecorator';
import L from 'leaflet';

// Fix default icon issue in Next.js/Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: typeof window !== 'undefined' ? require('leaflet/dist/images/marker-icon-2x.png') : undefined,
  iconUrl: typeof window !== 'undefined' ? require('leaflet/dist/images/marker-icon.png') : undefined,
  shadowUrl: typeof window !== 'undefined' ? require('leaflet/dist/images/marker-shadow.png') : undefined,
});

type Props = {
  crimeData: any[];
  startCoords?: [number, number] | null;
  destCoords?: [number, number] | null;
  route?: any;
  routeType?: 'direct' | 'optimized';
  avoidPolygons?: any;
};

const redDotIcon = new L.DivIcon({
  className: "custom-red-dot",
  html: `<div style="background:#d00;width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 2px #000;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -8],
});

function RouteWithArrows({ coordinates }: { coordinates: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!coordinates || coordinates.length < 2) return;

    // Remove previous decorators
    map.eachLayer(layer => {
      if (layer instanceof L.Layer && (layer as any)._isRouteArrow) {
        map.removeLayer(layer);
      }
    });

    // Create polyline
    const polyline = L.polyline(coordinates, {
      color: '#2563eb',
      weight: 5,
      dashArray: '10, 10', // dashed line
    }).addTo(map);

    // Add arrows
    const decorator = (L as any).polylineDecorator(polyline, {
      patterns: [
        {
          offset: 25,
          repeat: 50,
          symbol: (L as any).Symbol.arrowHead({
            pixelSize: 15,
            polygon: false,
            pathOptions: { stroke: true, color: '#2563eb', weight: 2 }
          })
        }
      ]
    }).addTo(map);

    // Mark as custom for cleanup
    (polyline as any)._isRouteArrow = true;
    (decorator as any)._isRouteArrow = true;

    return () => {
      map.removeLayer(polyline);
      map.removeLayer(decorator);
    };
  }, [coordinates, map]);

  return null;
}

export default function MapWithMarkers({
  crimeData,
  startCoords,
  destCoords,
  route,
  routeType,
  avoidPolygons,
}: Props) {
  const chicagoCenter = { lat: 41.8781, lng: -87.6298 };

  // Extract route geometry if available
  let routeCoords: [number, number][] = [];
  if (route && route.geometry && route.geometry.coordinates) {
    routeCoords = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
  }

  return (
    <MapContainer
      center={[chicagoCenter.lat, chicagoCenter.lng]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {crimeData.map((crime, idx) => (
        <Marker
          key={idx}
          position={[crime.latitude, crime.longitude]}
          icon={redDotIcon}
        >
          <Popup>
            <div>
              <b>{crime.primary_type || "Crime"}</b><br />
              {crime.date && <span>Date: {crime.date}<br /></span>}
              {crime.description && <span>{crime.description}</span>}
            </div>
          </Popup>
        </Marker>
      ))}
      {startCoords && (
        <Marker position={startCoords}>
          <Popup>Start</Popup>
        </Marker>
      )}
      {destCoords && (
        <Marker position={destCoords}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {route && route.geometry && route.geometry.coordinates && (
        <RouteWithArrows coordinates={route.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng])} />
      )}
      {routeType === 'optimized' && avoidPolygons && (
        <GeoJSON data={avoidPolygons} style={{ color: 'red', fillOpacity: 0.15 }} />
      )}
    </MapContainer>
  );
}

