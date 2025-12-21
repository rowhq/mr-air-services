'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { officeLocations, houstonMetroCenter, getFullAddress } from '@/data/officeLocations';

interface HoustonCoverageMapProps {
  activeOffice: string | null;
  onOfficeHover: (office: string | null) => void;
}

// Custom marker icon - using design system colors
const createMarkerIcon = (isActive: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${isActive ? '40px' : '32px'};
        height: ${isActive ? '40px' : '32px'};
        background: #00AEEF;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,174,239,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        ${isActive ? 'transform: scale(1.1);' : ''}
      ">
        <svg width="${isActive ? '20' : '16'}" height="${isActive ? '20' : '16'}" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [isActive ? 40 : 32, isActive ? 40 : 32],
    iconAnchor: [isActive ? 20 : 16, isActive ? 40 : 32],
    popupAnchor: [0, -32],
  });
};

// Component to handle map view changes when active office changes
function MapController({ activeOffice }: { activeOffice: string | null }) {
  const map = useMap();

  useEffect(() => {
    const office = officeLocations.find(o => o.name === activeOffice);
    if (office) {
      map.flyTo(office.coordinates, 12, { duration: 0.5 });
    } else {
      // Reset to show all Houston metro
      map.flyTo(houstonMetroCenter, 9, { duration: 0.5 });
    }
  }, [activeOffice, map]);

  return null;
}

export default function HoustonCoverageMap({ activeOffice, onOfficeHover }: HoustonCoverageMapProps) {
  return (
    <div className="relative bg-neutral-100 border border-neutral-200 rounded-3xl overflow-hidden shadow-lg">
      <MapContainer
        center={houstonMetroCenter}
        zoom={9}
        style={{ height: '450px', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        {/* Light map tiles from CartoDB */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Map controller for flying to active offices */}
        <MapController activeOffice={activeOffice} />

        {/* Service area coverage circle */}
        <Circle
          center={houstonMetroCenter}
          radius={50000} // 50km radius
          pathOptions={{
            fillColor: '#00AEEF',
            fillOpacity: 0.08,
            color: '#00AEEF',
            weight: 2,
            opacity: 0.3,
            dashArray: '8, 8',
          }}
        />

        {/* Office location markers */}
        {officeLocations.map((office) => (
          <Marker
            key={office.name}
            position={office.coordinates}
            icon={createMarkerIcon(activeOffice === office.name)}
            eventHandlers={{
              mouseover: () => onOfficeHover(office.name),
              mouseout: () => onOfficeHover(null),
              click: () => onOfficeHover(office.name),
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '4px', minWidth: '180px' }}>
                <strong style={{ fontSize: '15px', color: '#00AEEF', display: 'block', marginBottom: '4px' }}>
                  {office.name}
                </strong>
                <p style={{ margin: 0, color: '#64748B', fontSize: '12px', lineHeight: '1.4' }}>
                  {office.address}<br />
                  {office.city}, {office.state} {office.zip}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 z-[1000] shadow-lg border border-neutral-200">
        <p className="text-neutral-500 text-[10px] mb-3 font-semibold uppercase tracking-wider">
          Office Locations
        </p>
        <div className="space-y-2">
          {officeLocations.map((office) => (
            <button
              key={office.name}
              onClick={() => onOfficeHover(office.name)}
              onMouseEnter={() => onOfficeHover(office.name)}
              onMouseLeave={() => onOfficeHover(null)}
              className={`flex items-center gap-2 transition-all duration-200 w-full text-left ${
                activeOffice === office.name
                  ? 'opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full transition-all ${
                  activeOffice === office.name ? 'bg-secondary scale-110' : 'bg-secondary'
                }`}
                style={{
                  boxShadow: activeOffice === office.name
                    ? '0 0 8px #00AEEF'
                    : 'none'
                }}
              />
              <span className="text-neutral-700 text-xs font-medium">
                {office.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
