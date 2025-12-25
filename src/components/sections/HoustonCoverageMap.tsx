'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { officeLocations, houstonMetroCenter, getFullAddress, OfficeLocation } from '@/data/officeLocations';

// Generate Google Maps directions URL
const getDirectionsUrl = (office: OfficeLocation) => {
  const address = encodeURIComponent(getFullAddress(office));
  return `https://www.google.com/maps/dir/?api=1&destination=${address}`;
};

interface HoustonCoverageMapProps {
  activeOffice: string | null;
  onOfficeHover: (office: string | null) => void;
  openPopup?: string | null;
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

// Component to handle map view changes and popup opening
function MapController({
  activeOffice,
  openPopup,
  markerRefs
}: {
  activeOffice: string | null;
  openPopup?: string | null;
  markerRefs: React.MutableRefObject<Map<string, L.Marker>>;
}) {
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

  // Open popup programmatically when openPopup changes
  useEffect(() => {
    if (openPopup) {
      const marker = markerRefs.current.get(openPopup);
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 600); // Wait for flyTo animation
      }
    }
  }, [openPopup, markerRefs]);

  return null;
}

export default function HoustonCoverageMap({ activeOffice, onOfficeHover, openPopup }: HoustonCoverageMapProps) {
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden">
      <MapContainer
        center={houstonMetroCenter}
        zoom={9}
        className="h-[380px] md:h-[450px] w-full"
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        {/* Light map tiles from CartoDB */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Map controller for flying to active offices and opening popups */}
        <MapController activeOffice={activeOffice} openPopup={openPopup} markerRefs={markerRefs} />

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
            ref={(ref) => {
              if (ref) {
                markerRefs.current.set(office.name, ref);
              }
            }}
            eventHandlers={{
              mouseover: () => onOfficeHover(office.name),
              click: () => onOfficeHover(office.name),
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '4px', minWidth: '180px' }}>
                <strong style={{ fontSize: '15px', color: '#00AEEF', display: 'block', marginBottom: '4px' }}>
                  {office.name}
                </strong>
                <p style={{ margin: '0 0 8px 0', color: '#64748B', fontSize: '12px', lineHeight: '1.4' }}>
                  {office.address}<br />
                  {office.city}, {office.state} {office.zip}
                </p>
                <a
                  href={getDirectionsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    background: '#00AEEF',
                    color: 'white',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textDecoration: 'none',
                  }}
                >
                  Get Directions
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend overlay - hidden on mobile (pills in AreasServed serve this purpose) */}
      <div className="hidden md:block absolute bottom-4 left-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-xl p-4 z-[1000]">
        <p className="text-neutral-500 dark:text-neutral-400 text-[10px] mb-3 font-semibold uppercase tracking-wider">
          Office Locations
        </p>
        <div className="space-y-2">
          {officeLocations.map((office) => (
            <button
              key={office.name}
              onClick={() => onOfficeHover(office.name)}
              onMouseEnter={() => onOfficeHover(office.name)}
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
              <span className="text-neutral-700 dark:text-neutral-400 text-xs font-medium">
                {office.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
