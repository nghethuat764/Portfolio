import { Trophy, GraduationCap, ShieldCheck } from 'lucide-react';
import type { ProjectItem } from '../data/profile';

export function HTMonogram({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const textColor = variant === 'light' ? '#1D4ED8' : '#FFFFFF';
  const arcColor = variant === 'light' ? '#0EA5E9' : '#38BDF8';

  return (
    <svg
      viewBox="0 0 44 36"
      className="w-10 h-8 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M5 27 C 11 9, 27 5, 39 10"
        fill="none"
        stroke={arcColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <text
        x="4"
        y="27"
        fill={textColor}
        fontFamily="Bricolage Grotesque, Plus Jakarta Sans, sans-serif"
        fontWeight="800"
        fontSize="24"
        fontStyle="italic"
        letterSpacing="-1.5"
      >
        HT
      </text>
    </svg>
  );
}

export function HighlightIcon({
  type,
}: {
  type: 'trophy' | 'grad' | 'oracle' | 'windows' | 'arcgis' | 'shield';
}) {
  if (type === 'trophy') {
    return <Trophy className="w-6 h-6 text-[#1D4ED8] shrink-0" strokeWidth={1.9} />;
  }
  if (type === 'grad') {
    return <GraduationCap className="w-7 h-7 text-[#1D4ED8] shrink-0" strokeWidth={1.9} />;
  }
  if (type === 'oracle') {
    return (
      <span className="font-display text-[15px] font-extrabold tracking-wider text-[#C74634] leading-none shrink-0">
        ORACLE
      </span>
    );
  }
  if (type === 'windows') {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0284C7] shrink-0" aria-hidden="true">
        <rect x="2" y="2" width="9" height="9" fill="currentColor" rx="0.8" />
        <rect x="13" y="2" width="9" height="9" fill="currentColor" rx="0.8" />
        <rect x="2" y="13" width="9" height="9" fill="currentColor" rx="0.8" />
        <rect x="13" y="13" width="9" height="9" fill="currentColor" rx="0.8" />
      </svg>
    );
  }
  if (type === 'arcgis') {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0" aria-hidden="true">
        <circle cx="14" cy="14" r="11.5" fill="#16A34A" fillOpacity="0.16" stroke="#15803D" strokeWidth="1.6" />
        <ellipse cx="14" cy="14" rx="5.5" ry="11.5" fill="none" stroke="#15803D" strokeWidth="1.4" />
        <path d="M3 14 H25 M5.5 8.5 H22.5 M5.5 19.5 H22.5" stroke="#15803D" strokeWidth="1.3" />
        <circle cx="14" cy="14" r="11.5" fill="none" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="3 2" />
      </svg>
    );
  }
  return <ShieldCheck className="w-6 h-6 text-[#1D4ED8] shrink-0" strokeWidth={1.9} />;
}

export function ProjectCardArtwork({
  visualType,
}: {
  visualType: ProjectItem['visualType'];
}) {
  if (visualType === 'archive-system') {
    return (
      <svg viewBox="0 0 240 136" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="bg-srv" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width="240" height="136" fill="url(#bg-srv)" />
        {/* Server corridor perspective racks */}
        <g opacity="0.9">
          <rect x="18" y="16" width="38" height="104" rx="2" fill="#0B1938" stroke="#38BDF8" strokeOpacity="0.4" />
          <rect x="64" y="24" width="28" height="88" rx="2" fill="#0D2149" stroke="#38BDF8" strokeOpacity="0.35" />
          <rect x="184" y="16" width="38" height="104" rx="2" fill="#0B1938" stroke="#38BDF8" strokeOpacity="0.4" />
          <rect x="148" y="24" width="28" height="88" rx="2" fill="#0D2149" stroke="#38BDF8" strokeOpacity="0.35" />
        </g>
        {/* Illuminated rack status bars */}
        <g fill="#38BDF8">
          <rect x="24" y="28" width="24" height="2" rx="1" opacity="0.8" />
          <rect x="24" y="40" width="24" height="2" rx="1" opacity="0.5" />
          <rect x="24" y="52" width="24" height="2" rx="1" opacity="0.85" />
          <rect x="24" y="64" width="24" height="2" rx="1" opacity="0.6" />
          <rect x="190" y="28" width="24" height="2" rx="1" opacity="0.8" />
          <rect x="190" y="40" width="24" height="2" rx="1" opacity="0.6" />
          <rect x="190" y="52" width="24" height="2" rx="1" opacity="0.9" />
          <rect x="190" y="64" width="24" height="2" rx="1" opacity="0.5" />
        </g>
        {/* Central floating archive card */}
        <rect x="96" y="34" width="48" height="68" rx="4" fill="#FFFFFF" fillOpacity="0.16" stroke="#BAE6FD" strokeWidth="1.2" />
        <rect x="104" y="46" width="32" height="4" rx="2" fill="#E0F2FE" />
        <rect x="104" y="56" width="24" height="3" rx="1.5" fill="#7DD3FC" />
        <rect x="104" y="64" width="28" height="3" rx="1.5" fill="#7DD3FC" />
        <rect x="104" y="72" width="20" height="3" rx="1.5" fill="#7DD3FC" />
        <text x="120" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          C# .NET
        </text>
      </svg>
    );
  }

  if (visualType === 'oracle-dataguard') {
    return (
      <svg viewBox="0 0 240 136" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="bg-db" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#09152E" />
            <stop offset="100%" stopColor="#0E4A86" />
          </linearGradient>
        </defs>
        <rect width="240" height="136" fill="url(#bg-db)" />
        {/* Grid lines */}
        <path d="M0 106 H240 M0 118 H240 M40 100 L15 136 M200 100 L225 136" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="1" />
        {/* Primary Cylinder */}
        <g transform="translate(46, 30)">
          <ellipse cx="28" cy="12" rx="26" ry="9" fill="#38BDF8" />
          <path d="M2 12 V56 A26 9 0 0 0 54 56 V12" fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.2" />
          <ellipse cx="28" cy="27" rx="26" ry="7" fill="none" stroke="#BAE6FD" strokeOpacity="0.45" />
          <ellipse cx="28" cy="42" rx="26" ry="7" fill="none" stroke="#BAE6FD" strokeOpacity="0.45" />
        </g>
        {/* Sync link */}
        <path d="M104 60 H136" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 3" />
        <polygon points="135,55 144,60 135,65" fill="#38BDF8" />
        {/* Standby Cylinder */}
        <g transform="translate(142, 30)">
          <ellipse cx="28" cy="12" rx="26" ry="9" fill="#0EA5E9" />
          <path d="M2 12 V56 A26 9 0 0 0 54 56 V12" fill="#0369A1" stroke="#7DD3FC" strokeWidth="1.2" />
          <ellipse cx="28" cy="27" rx="26" ry="7" fill="none" stroke="#BAE6FD" strokeOpacity="0.45" />
          <ellipse cx="28" cy="42" rx="26" ry="7" fill="none" stroke="#BAE6FD" strokeOpacity="0.45" />
        </g>
        <text x="120" y="114" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          ORACLE DATA GUARD · HA
        </text>
      </svg>
    );
  }

  if (visualType === 'mobile-app') {
    return (
      <svg viewBox="0 0 240 136" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="bg-mob" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width="240" height="136" fill="url(#bg-mob)" />
        {/* Subtle API network arcs */}
        <path
          d="M20 96 Q 60 55, 95 72 M220 40 Q 175 75, 145 64"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.7"
        />
        <circle cx="34" cy="84" r="14" fill="#0B2A63" stroke="#38BDF8" strokeOpacity="0.45" />
        <text x="34" y="87" textAnchor="middle" fill="#BAE6FD" fontSize="7" fontFamily="JetBrains Mono, monospace">
          API
        </text>
        <circle cx="204" cy="48" r="14" fill="#0B2A63" stroke="#38BDF8" strokeOpacity="0.45" />
        <text x="204" y="51" textAnchor="middle" fill="#BAE6FD" fontSize="7" fontFamily="JetBrains Mono, monospace">
          SQL
        </text>

        {/* Central Smartphone Frame */}
        <rect
          x="88"
          y="14"
          width="64"
          height="108"
          rx="10"
          fill="#09152E"
          stroke="#7DD3FC"
          strokeWidth="1.6"
        />
        <rect x="93" y="22" width="54" height="92" rx="6" fill="#F8FAFC" />
        {/* Dynamic Notch */}
        <rect x="110" y="17" width="20" height="2.5" rx="1.25" fill="#38BDF8" opacity="0.7" />
        {/* App Header Card */}
        <rect x="97" y="27" width="46" height="22" rx="4" fill="#1D4ED8" />
        <rect x="102" y="32" width="22" height="3.5" rx="1.5" fill="#FFFFFF" />
        <rect x="102" y="39" width="32" height="2.5" rx="1.25" fill="#93C5FD" />
        {/* App Mini Metrics */}
        <rect x="97" y="53" width="21" height="22" rx="3.5" fill="#E0F2FE" />
        <rect x="122" y="53" width="21" height="22" rx="3.5" fill="#DBEAFE" />
        <circle cx="107.5" cy="61" r="4" fill="#0284C7" />
        <circle cx="132.5" cy="61" r="4" fill="#1D4ED8" />
        <rect x="101" y="68" width="13" height="2.5" rx="1" fill="#0F172A" opacity="0.5" />
        <rect x="126" y="68" width="13" height="2.5" rx="1" fill="#0F172A" opacity="0.5" />
        {/* App List Rows */}
        <rect x="97" y="80" width="46" height="10" rx="2.5" fill="#E2E8F0" />
        <rect x="97" y="94" width="46" height="10" rx="2.5" fill="#E2E8F0" />
        <text x="120" y="130" textAnchor="middle" fill="#BAE6FD" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          iOS · ANDROID
        </text>
      </svg>
    );
  }

  if (visualType === 'command-operations') {
    return (
      <svg viewBox="0 0 240 136" className="w-full h-full object-cover" aria-hidden="true">
        <defs>
          <linearGradient id="bg-cmd" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#071330" />
            <stop offset="55%" stopColor="#0B3B8C" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <rect width="240" height="136" fill="url(#bg-cmd)" />
        {/* Command Dashboard Window */}
        <rect
          x="18"
          y="14"
          width="204"
          height="98"
          rx="8"
          fill="#09193D"
          stroke="#7DD3FC"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        {/* Window Top Bar */}
        <rect x="18" y="14" width="204" height="16" rx="8" fill="#0F2657" />
        <circle cx="30" cy="22" r="2.2" fill="#38BDF8" />
        <circle cx="38" cy="22" r="2.2" fill="#34D399" />
        <circle cx="46" cy="22" r="2.2" fill="#FBBF24" />
        <rect x="64" y="19.5" width="76" height="5" rx="2.5" fill="#1E40AF" />
        {/* 3 Executive KPI Mini Cards */}
        <rect x="26" y="36" width="58" height="26" rx="4" fill="#102A63" stroke="#38BDF8" strokeOpacity="0.3" />
        <rect x="32" y="42" width="24" height="3" rx="1.5" fill="#7DD3FC" />
        <rect x="32" y="49" width="38" height="6" rx="2" fill="#34D399" />

        <rect x="91" y="36" width="58" height="26" rx="4" fill="#102A63" stroke="#38BDF8" strokeOpacity="0.3" />
        <rect x="97" y="42" width="28" height="3" rx="1.5" fill="#7DD3FC" />
        <rect x="97" y="49" width="34" height="6" rx="2" fill="#38BDF8" />

        <rect x="156" y="36" width="58" height="26" rx="4" fill="#102A63" stroke="#38BDF8" strokeOpacity="0.3" />
        <rect x="162" y="42" width="22" height="3" rx="1.5" fill="#7DD3FC" />
        <rect x="162" y="49" width="36" height="6" rx="2" fill="#FBBF24" />

        {/* Live Throughput Bars & Status Panel */}
        <rect x="26" y="68" width="110" height="36" rx="4" fill="#0D2252" />
        <rect x="34" y="88" width="10" height="11" rx="1.5" fill="#38BDF8" opacity="0.6" />
        <rect x="48" y="81" width="10" height="18" rx="1.5" fill="#38BDF8" opacity="0.8" />
        <rect x="62" y="76" width="10" height="23" rx="1.5" fill="#22D3EE" />
        <rect x="76" y="84" width="10" height="15" rx="1.5" fill="#38BDF8" opacity="0.75" />
        <rect x="90" y="74" width="10" height="25" rx="1.5" fill="#34D399" />
        <rect x="104" y="79" width="10" height="20" rx="1.5" fill="#38BDF8" opacity="0.9" />
        <rect x="118" y="72" width="10" height="27" rx="1.5" fill="#22D3EE" />

        <rect x="142" y="68" width="72" height="36" rx="4" fill="#0D2252" />
        <circle cx="152" cy="78" r="2.5" fill="#34D399" />
        <rect x="159" y="76" width="46" height="4" rx="2" fill="#BAE6FD" opacity="0.8" />
        <circle cx="152" cy="88" r="2.5" fill="#38BDF8" />
        <rect x="159" y="86" width="38" height="4" rx="2" fill="#93C5FD" opacity="0.7" />
        <circle cx="152" cy="98" r="2.5" fill="#FBBF24" />
        <rect x="159" y="96" width="42" height="4" rx="2" fill="#93C5FD" opacity="0.7" />

        <text x="120" y="128" textAnchor="middle" fill="#BAE6FD" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          COMMAND &amp; OPS · KPI HUB
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 136" className="w-full h-full object-cover" aria-hidden="true">
      <defs>
        <linearGradient id="bg-gis" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="55%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#65A30D" />
        </linearGradient>
      </defs>
      <rect width="240" height="136" fill="url(#bg-gis)" />
      {/* Terrain / map river & parcel overlays */}
      <path
        d="M-10 92 Q 55 72, 115 95 T 250 78 L250 136 L-10 136 Z"
        fill="#0369A1"
        fillOpacity="0.55"
      />
      <path
        d="M-10 42 Q 75 68, 145 36 T 255 58"
        fill="none"
        stroke="#BAE6FD"
        strokeWidth="2.5"
        opacity="0.7"
      />
      <g stroke="#DCFCE7" strokeWidth="1" strokeOpacity="0.75" fill="#22C55E" fillOpacity="0.25">
        <polygon points="28,24 76,18 92,48 38,54" />
        <polygon points="84,22 142,26 132,62 96,52" />
        <polygon points="148,30 212,20 202,68 140,66" />
        <polygon points="48,66 112,68 106,104 42,96" />
      </g>
      {/* Spatial pins */}
      <circle cx="115" cy="48" r="5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2.5" />
      <circle cx="176" cy="45" r="4" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="76" cy="82" r="4" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="64" y="108" width="112" height="18" rx="4" fill="#09152E" fillOpacity="0.72" />
      <text x="120" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        ARCGIS ENTERPRISE
      </text>
    </svg>
  );
}

// Deterministic crisp QR Matrix SVG (21x21 modules with 3 finder patterns)
const QR_MATRIX: number[][] = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
  [1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1],
  [0,1,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,1,0,1,0],
  [1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
  [0,1,0,0,1,0,0,1,1,0,1,0,0,1,1,0,1,0,0,1,0],
  [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1],
  [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,0,1],
  [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,1,0,1,0,1,1,1,0,0,1,1,0],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,1,0,1,1],
  [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,1,0,1,1,0,0],
  [1,0,1,1,1,0,1,0,1,0,0,1,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,1,0,1,1,1,0,0,1,1,0,1,0,0,1,0],
  [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,0,1,1,0,1],
];

export function QrCodeGraphic() {
  return (
    <svg
      viewBox="0 0 23 23"
      className="w-20 h-20 bg-white p-1 rounded-lg border border-zinc-200 shrink-0"
      aria-label="QR Code"
    >
      <rect width="23" height="23" fill="#FFFFFF" />
      {QR_MATRIX.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x + 1}
              y={y + 1}
              width="1"
              height="1"
              fill="#09090B"
            />
          ) : null
        )
      )}
    </svg>
  );
}
