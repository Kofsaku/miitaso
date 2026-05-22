type IllustrationProps = {
  className?: string;
};

export function CoastalVillaIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky-coastal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="sea-coastal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-coastal)" />
      <circle cx="320" cy="80" r="28" fill="#fbbf24" opacity="0.85" />
      <rect x="0" y="180" width="400" height="120" fill="url(#sea-coastal)" opacity="0.85" />
      <path
        d="M0 200 Q 50 195 100 200 T 200 200 T 300 200 T 400 200 L 400 220 Q 350 215 300 220 T 200 220 T 100 220 T 0 220 Z"
        fill="#bae6fd"
        opacity="0.6"
      />
      {/* villa roof */}
      <path d="M120 170 L 200 130 L 280 170 Z" fill="#44403c" />
      <path d="M115 170 L 285 170 L 280 175 L 120 175 Z" fill="#292524" />
      {/* villa body */}
      <rect x="135" y="170" width="130" height="55" fill="#f5f5f4" />
      <rect x="135" y="170" width="130" height="55" fill="none" stroke="#a8a29e" strokeWidth="1" />
      {/* windows */}
      <rect x="148" y="183" width="22" height="22" fill="#0c4a6e" opacity="0.7" />
      <rect x="178" y="183" width="22" height="22" fill="#0c4a6e" opacity="0.7" />
      <rect x="208" y="183" width="22" height="22" fill="#0c4a6e" opacity="0.7" />
      <rect x="238" y="183" width="22" height="22" fill="#0c4a6e" opacity="0.7" />
      {/* door */}
      <rect x="190" y="208" width="20" height="17" fill="#78350f" />
      {/* trees */}
      <circle cx="80" cy="195" r="22" fill="#15803d" opacity="0.85" />
      <rect x="77" y="195" width="6" height="20" fill="#451a03" />
      <circle cx="320" cy="195" r="18" fill="#166534" opacity="0.85" />
      <rect x="318" y="195" width="4" height="18" fill="#451a03" />
    </svg>
  );
}

export function MountainCottageIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-mountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#f5f3ff" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-mountain)" />
      {/* far mountains */}
      <path d="M0 220 L 80 130 L 160 200 L 240 110 L 320 190 L 400 140 L 400 300 L 0 300 Z" fill="#a5b4fc" opacity="0.5" />
      <path d="M120 180 L 180 150 L 240 180 Z" fill="#ffffff" opacity="0.6" />
      <path d="M260 145 L 300 125 L 340 145 Z" fill="#ffffff" opacity="0.6" />
      {/* foreground */}
      <path d="M0 250 L 400 250 L 400 300 L 0 300 Z" fill="#84cc16" opacity="0.3" />
      {/* cottage */}
      <path d="M130 215 L 200 175 L 270 215 Z" fill="#7c2d12" />
      <rect x="140" y="215" width="120" height="55" fill="#fef3c7" />
      <rect x="140" y="215" width="120" height="55" fill="none" stroke="#a16207" strokeWidth="1" />
      <rect x="152" y="228" width="18" height="20" fill="#1e3a8a" opacity="0.75" />
      <rect x="180" y="228" width="18" height="20" fill="#1e3a8a" opacity="0.75" />
      <rect x="210" y="228" width="18" height="20" fill="#1e3a8a" opacity="0.75" />
      <rect x="238" y="228" width="18" height="20" fill="#1e3a8a" opacity="0.75" />
      <rect x="190" y="252" width="20" height="18" fill="#451a03" />
      {/* pine trees */}
      <path d="M70 230 L 80 200 L 90 230 Z" fill="#14532d" />
      <path d="M65 245 L 80 215 L 95 245 Z" fill="#14532d" />
      <rect x="78" y="244" width="4" height="14" fill="#451a03" />
      <path d="M320 235 L 330 205 L 340 235 Z" fill="#14532d" />
      <path d="M315 250 L 330 220 L 345 250 Z" fill="#14532d" />
      <rect x="328" y="249" width="4" height="14" fill="#451a03" />
    </svg>
  );
}

export function OnsenTownhouseIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-onsen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fee2e2" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-onsen)" />
      <circle cx="80" cy="80" r="32" fill="#fb923c" opacity="0.7" />
      {/* hills */}
      <path d="M0 220 Q 100 180 200 210 T 400 200 L 400 300 L 0 300 Z" fill="#84cc16" opacity="0.35" />
      {/* traditional house with curved roof */}
      <path
        d="M110 200 Q 130 165 200 155 Q 270 165 290 200 L 110 200 Z"
        fill="#1c1917"
      />
      <rect x="125" y="200" width="150" height="65" fill="#fafaf9" />
      <rect x="125" y="200" width="150" height="65" fill="none" stroke="#78716c" strokeWidth="1" />
      {/* shoji windows grid */}
      <g stroke="#a8a29e" strokeWidth="0.5">
        <rect x="140" y="215" width="30" height="30" fill="#fef3c7" opacity="0.8" />
        <line x1="155" y1="215" x2="155" y2="245" />
        <line x1="140" y1="230" x2="170" y2="230" />
        <rect x="185" y="215" width="30" height="30" fill="#fef3c7" opacity="0.8" />
        <line x1="200" y1="215" x2="200" y2="245" />
        <line x1="185" y1="230" x2="215" y2="230" />
        <rect x="230" y="215" width="30" height="30" fill="#fef3c7" opacity="0.8" />
        <line x1="245" y1="215" x2="245" y2="245" />
        <line x1="230" y1="230" x2="260" y2="230" />
      </g>
      {/* steam from onsen */}
      <g fill="#ffffff" opacity="0.65">
        <ellipse cx="335" cy="225" rx="16" ry="6" />
        <ellipse cx="345" cy="210" rx="14" ry="5" />
        <ellipse cx="330" cy="195" rx="12" ry="4" />
        <ellipse cx="340" cy="180" rx="10" ry="4" />
      </g>
      {/* bamboo */}
      <g stroke="#15803d" strokeWidth="3">
        <line x1="60" y1="160" x2="62" y2="270" />
        <line x1="50" y1="180" x2="52" y2="270" />
      </g>
    </svg>
  );
}

export function FarmhouseIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky-farm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecfccb" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky-farm)" />
      {/* rice fields */}
      <path d="M0 240 L 400 240 L 400 300 L 0 300 Z" fill="#a3e635" opacity="0.45" />
      <g stroke="#65a30d" strokeWidth="0.5" opacity="0.5">
        <line x1="0" y1="250" x2="400" y2="250" />
        <line x1="0" y1="262" x2="400" y2="262" />
        <line x1="0" y1="274" x2="400" y2="274" />
        <line x1="0" y1="286" x2="400" y2="286" />
      </g>
      {/* traditional kominka roof */}
      <path d="M110 180 L 200 130 L 290 180 L 270 200 L 200 165 L 130 200 Z" fill="#292524" />
      <path d="M120 200 L 200 165 L 280 200 Z" fill="#1c1917" />
      {/* body */}
      <rect x="130" y="200" width="140" height="50" fill="#f5f5f4" />
      <rect x="130" y="200" width="140" height="50" fill="none" stroke="#78716c" strokeWidth="1" />
      <g stroke="#a8a29e" strokeWidth="0.5">
        <rect x="145" y="212" width="32" height="26" fill="#fef3c7" opacity="0.85" />
        <line x1="161" y1="212" x2="161" y2="238" />
        <line x1="145" y1="225" x2="177" y2="225" />
        <rect x="220" y="212" width="32" height="26" fill="#fef3c7" opacity="0.85" />
        <line x1="236" y1="212" x2="236" y2="238" />
        <line x1="220" y1="225" x2="252" y2="225" />
      </g>
      <rect x="186" y="220" width="24" height="30" fill="#1c1917" />
      <line x1="198" y1="220" x2="198" y2="250" stroke="#78716c" strokeWidth="0.5" />
      {/* trees */}
      <circle cx="65" cy="200" r="26" fill="#15803d" opacity="0.8" />
      <rect x="62" y="200" width="6" height="22" fill="#451a03" />
      <circle cx="335" cy="210" r="20" fill="#166534" opacity="0.85" />
      <rect x="332" y="208" width="5" height="20" fill="#451a03" />
    </svg>
  );
}

export function VillaHeroIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#hero-sky)" />
      <circle cx="290" cy="120" r="46" fill="#fbbf24" opacity="0.9" />
      <circle cx="290" cy="120" r="62" fill="#fbbf24" opacity="0.18" />
      {/* mountains far */}
      <path d="M0 320 L 100 220 L 180 290 L 260 200 L 340 280 L 400 240 L 400 360 L 0 360 Z" fill="#94a3b8" opacity="0.35" />
      {/* sea */}
      <rect x="0" y="330" width="400" height="170" fill="url(#hero-sea)" opacity="0.85" />
      {/* sea reflection lines */}
      <g stroke="#ffffff" strokeWidth="1" opacity="0.5">
        <line x1="50" y1="360" x2="120" y2="360" />
        <line x1="240" y1="365" x2="320" y2="365" />
        <line x1="80" y1="380" x2="180" y2="380" />
        <line x1="220" y1="385" x2="300" y2="385" />
        <line x1="40" y1="410" x2="140" y2="410" />
        <line x1="260" y1="415" x2="350" y2="415" />
      </g>
      {/* foreground cliff */}
      <path d="M0 360 Q 80 340 160 355 L 160 500 L 0 500 Z" fill="#84cc16" opacity="0.5" />
      <path d="M240 355 Q 320 340 400 360 L 400 500 L 240 500 Z" fill="#65a30d" opacity="0.5" />
      {/* villa */}
      <g transform="translate(110, 280)">
        <path d="M0 30 L 90 0 L 180 30 L 165 40 L 90 12 L 15 40 Z" fill="#1c1917" />
        <path d="M10 35 L 90 5 L 170 35 L 170 40 L 10 40 Z" fill="#0c0a09" />
        <rect x="20" y="40" width="140" height="70" fill="#fafaf9" />
        <rect x="20" y="40" width="140" height="70" fill="none" stroke="#78716c" strokeWidth="1" />
        {/* large picture windows */}
        <rect x="32" y="52" width="38" height="42" fill="#0c4a6e" opacity="0.75" />
        <rect x="80" y="52" width="38" height="42" fill="#0c4a6e" opacity="0.75" />
        <rect x="128" y="52" width="20" height="42" fill="#0c4a6e" opacity="0.75" />
        {/* deck */}
        <rect x="10" y="110" width="160" height="6" fill="#78350f" />
        <g stroke="#a16207" strokeWidth="0.5">
          <line x1="40" y1="110" x2="40" y2="116" />
          <line x1="70" y1="110" x2="70" y2="116" />
          <line x1="100" y1="110" x2="100" y2="116" />
          <line x1="130" y1="110" x2="130" y2="116" />
        </g>
      </g>
      {/* trees */}
      <g>
        <circle cx="55" cy="345" r="28" fill="#14532d" opacity="0.85" />
        <rect x="51" y="345" width="8" height="28" fill="#451a03" />
        <circle cx="340" cy="350" r="24" fill="#166534" opacity="0.85" />
        <rect x="337" y="350" width="6" height="25" fill="#451a03" />
      </g>
    </svg>
  );
}

export type PropertyVisualType =
  | "coastal"
  | "mountain"
  | "onsen"
  | "farmhouse";

export function PropertyVisual({ type, className }: { type: PropertyVisualType; className?: string }) {
  switch (type) {
    case "coastal":
      return <CoastalVillaIllustration className={className} />;
    case "mountain":
      return <MountainCottageIllustration className={className} />;
    case "onsen":
      return <OnsenTownhouseIllustration className={className} />;
    case "farmhouse":
      return <FarmhouseIllustration className={className} />;
  }
}
