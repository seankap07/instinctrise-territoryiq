'use client';

import { useEffect, useRef } from 'react';

export type Trade = 'hvac' | 'roofing';

interface ZipFeature {
  zip: string;
  label: string;
  entering: number;
  critical: number;
  high: number;
  medium: number;
  total: number;
  coords: [number, number][][]; // polygon rings [lng, lat]
}

const ZIP_DATA: Record<Trade, ZipFeature[]> = {
  hvac: [
    {
      zip: '34997', label: 'Highest HVAC Replacement Density',
      total: 14750, entering: 1662, critical: 161, high: 694, medium: 807,
      coords: [[
        [-80.30, 27.08], [-80.18, 27.08], [-80.18, 27.20], [-80.30, 27.20], [-80.30, 27.08],
      ]],
    },
    {
      zip: '34990', label: 'Premium Coastal Territory',
      total: 12058, entering: 1560, critical: 143, high: 658, medium: 759,
      coords: [[
        [-80.38, 27.14], [-80.23, 27.14], [-80.23, 27.25], [-80.38, 27.25], [-80.38, 27.14],
      ]],
    },
    {
      zip: '33455', label: 'Strong Mid-Market Opportunity',
      total: 8108, entering: 1047, critical: 96, high: 417, medium: 534,
      coords: [[
        [-80.22, 27.00], [-80.09, 27.00], [-80.09, 27.12], [-80.22, 27.12], [-80.22, 27.00],
      ]],
    },
    {
      zip: '34957', label: 'Focused Install Territory',
      total: 6229, entering: 711, critical: 67, high: 298, medium: 346,
      coords: [[
        [-80.30, 27.22], [-80.21, 27.22], [-80.21, 27.30], [-80.30, 27.30], [-80.30, 27.22],
      ]],
    },
  ],
  roofing: [
    {
      zip: '34990', label: 'Best Roofing Territory',
      total: 12058, entering: 1871, critical: 897, high: 680, medium: 294,
      coords: [[
        [-80.38, 27.14], [-80.23, 27.14], [-80.23, 27.25], [-80.38, 27.25], [-80.38, 27.14],
      ]],
    },
    {
      zip: '34997', label: 'High Replacement Concentration',
      total: 14750, entering: 1595, critical: 841, high: 500, medium: 254,
      coords: [[
        [-80.30, 27.08], [-80.18, 27.08], [-80.18, 27.20], [-80.30, 27.20], [-80.30, 27.08],
      ]],
    },
    {
      zip: '33455', label: 'Insurance Cycle Territory',
      total: 8108, entering: 879, critical: 418, high: 301, medium: 160,
      coords: [[
        [-80.22, 27.00], [-80.09, 27.00], [-80.09, 27.12], [-80.22, 27.12], [-80.22, 27.00],
      ]],
    },
    {
      zip: '34957', label: 'Dense Roofing Opportunity',
      total: 6229, entering: 857, critical: 488, high: 266, medium: 103,
      coords: [[
        [-80.30, 27.22], [-80.21, 27.22], [-80.21, 27.30], [-80.30, 27.30], [-80.30, 27.22],
      ]],
    },
  ],
};

// Intensity: max entering across all zips for color scaling
const MAX_ENTERING = { hvac: 1662, roofing: 1871 };

function getColor(entering: number, max: number, trade: Trade) {
  const ratio = entering / max;
  if (trade === 'hvac') {
    // Navy shades
    const r = Math.round(27 + (1 - ratio) * 120);
    const g = Math.round(58 + (1 - ratio) * 100);
    const b = Math.round(107 + (1 - ratio) * 100);
    return `rgb(${r},${g},${b})`;
  } else {
    // Orange shades
    const r = Math.round(224 - (1 - ratio) * 60);
    const g = Math.round(92 + (1 - ratio) * 60);
    const b = Math.round(26);
    return `rgb(${r},${g},${b})`;
  }
}

interface Props {
  trade: Trade;
}

export default function MapComponent({ trade }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const layersRef = useRef<unknown[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let L: typeof import('leaflet');
    let cancelled = false;

    import('leaflet').then((leaflet) => {
      if (cancelled || !mapRef.current) return;
      L = leaflet.default;

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const map = L.map(mapRef.current!, {
          center: [27.15, -80.25],
          zoom: 11,
          zoomControl: true,
          scrollWheelZoom: false,
          attributionControl: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© CartoDB',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      // Remove existing layers
      layersRef.current.forEach((layer) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).removeLayer(layer);
      });
      layersRef.current = [];

      const features = ZIP_DATA[trade];
      const max = MAX_ENTERING[trade];

      features.forEach((feat) => {
        const color = getColor(feat.entering, max, trade);

        // Convert [lng, lat] to [lat, lng] for Leaflet
        const latLngs = feat.coords[0].map(([lng, lat]) => [lat, lng] as [number, number]);

        const polygon = L.polygon(latLngs, {
          color: '#fff',
          weight: 2,
          fillColor: color,
          fillOpacity: 0.75,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).addTo(mapInstanceRef.current as any);

        // Tooltip
        polygon.bindTooltip(
          `<div style="font-family:DM Sans,sans-serif;min-width:200px;">
            <div style="font-weight:700;font-size:15px;color:#1B3A6B;margin-bottom:6px;">ZIP ${feat.zip}</div>
            <div style="font-size:12px;color:#555;margin-bottom:8px;">${feat.label}</div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;">
              <span style="color:#666;">Total Homes:</span><span style="font-weight:600;">${feat.total.toLocaleString()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;">
              <span style="color:#E05C1A;font-weight:600;">Entering Replacement:</span><span style="font-weight:700;color:#E05C1A;">${feat.entering.toLocaleString()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#888;margin-bottom:2px;">
              <span>Critical:</span><span>${feat.critical.toLocaleString()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#888;margin-bottom:2px;">
              <span>High:</span><span>${feat.high.toLocaleString()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#888;">
              <span>Medium:</span><span>${feat.medium.toLocaleString()}</span>
            </div>
          </div>`,
          { sticky: true, className: 'tiq-tooltip' }
        );

        layersRef.current.push(polygon);

        // ZIP label
        const center = polygon.getBounds().getCenter();
        const label = L.divIcon({
          html: `<div style="font-family:DM Mono,monospace;font-weight:700;font-size:13px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.6);white-space:nowrap;text-align:center;">${feat.zip}</div>`,
          className: '',
          iconSize: [60, 20],
          iconAnchor: [30, 10],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const marker = L.marker(center, { icon: label }).addTo(mapInstanceRef.current as any);
        layersRef.current.push(marker);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [trade]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <style>{`
        .tiq-tooltip {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        }
        .tiq-tooltip::before { display: none; }
      `}</style>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
      />
    </>
  );
}
