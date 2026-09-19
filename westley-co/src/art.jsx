// Brand artwork drawn as SVG so the page ships with zero third-party imagery.

const heroScene = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="vig" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#33543f"/>
      <stop offset="62%" stop-color="#28422f"/>
      <stop offset="100%" stop-color="#1d2f24"/>
    </radialGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c89b5e"/>
      <stop offset="100%" stop-color="#8a6230"/>
    </linearGradient>
    <linearGradient id="amberDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a87b3e"/>
      <stop offset="100%" stop-color="#6f4e26"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
    </filter>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <g transform="translate(${w / 2} ${h * 0.46})">
    <ellipse cx="0" cy="150" rx="${w * 0.28}" ry="34" fill="#16241b" opacity="0.55" filter="url(#soft)"/>
    <!-- ledger line -->
    <line x1="${-w * 0.34}" y1="182" x2="${w * 0.34}" y2="182" stroke="#f4f2e9" stroke-opacity="0.25" stroke-width="2"/>
    <!-- left jar -->
    <g transform="translate(-190 18)">
      <rect x="-62" y="-10" width="124" height="140" rx="18" fill="url(#amberDark)"/>
      <rect x="-52" y="-38" width="104" height="34" rx="8" fill="#1c1a15"/>
      <rect x="-40" y="28" width="80" height="64" rx="4" fill="#f4f2e9"/>
      <text x="0" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#1c1a15">W&amp;Co</text>
      <text x="0" y="76" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#4a463c">No. 04</text>
    </g>
    <!-- center bottle -->
    <g transform="translate(0 -40)">
      <rect x="-46" y="-30" width="92" height="200" rx="14" fill="url(#amber)"/>
      <rect x="-16" y="-92" width="32" height="66" rx="6" fill="#1c1a15"/>
      <rect x="-32" y="14" width="64" height="102" rx="4" fill="#f4f2e9"/>
      <text x="0" y="48" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#1c1a15">W&amp;Co</text>
      <line x1="-18" y1="62" x2="18" y2="62" stroke="#a87b3e" stroke-width="2"/>
      <text x="0" y="84" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#4a463c">SCALP</text>
      <text x="0" y="100" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#4a463c">No. 07</text>
    </g>
    <!-- right bar -->
    <g transform="translate(185 62)">
      <rect x="-70" y="0" width="140" height="96" rx="10" fill="#ddd7c2"/>
      <rect x="-70" y="0" width="140" height="96" rx="10" fill="none" stroke="#8a6230" stroke-opacity="0.4" stroke-width="2"/>
      <text x="0" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#1c1a15">W&amp;Co</text>
      <text x="0" y="66" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#4a463c">No. 01 BAR</text>
    </g>
  </g>
  <text x="${w / 2}" y="${h * 0.16}" text-anchor="middle" font-family="Georgia,serif" font-size="26" letter-spacing="14" fill="#f4f2e9" fill-opacity="0.85">THE FORMULARY</text>
  <text x="${w / 2}" y="${h * 0.205}" text-anchor="middle" font-family="Georgia,serif" font-size="13" letter-spacing="6" fill="#c89b5e">FIVE BOTANICALS · EST. 2026</text>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>
</svg>`

const toDataUri = (svg) =>
  `data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`

export const heroDesktop = toDataUri(heroScene(1600, 1000))
export const heroMobile = toDataUri(heroScene(820, 1220))

// Product illustrations for the shop grid.

export function JarIllustration(props) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="172" rx="64" ry="10" fill="#1c1a15" opacity="0.12" />
      <rect x="42" y="62" width="116" height="108" rx="16" fill="#a87b3e" />
      <rect x="42" y="62" width="116" height="30" rx="16" fill="#8a6230" />
      <rect x="52" y="34" width="96" height="26" rx="7" fill="#1c1a15" />
      <rect x="60" y="96" width="80" height="58" rx="4" fill="#f4f2e9" />
      <text x="100" y="120" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fill="#1c1a15">W&amp;Co</text>
      <text x="100" y="142" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#4a463c">No. 04</text>
    </svg>
  )
}

export function DropperIllustration(props) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="176" rx="52" ry="9" fill="#1c1a15" opacity="0.12" />
      <rect x="64" y="58" width="72" height="118" rx="12" fill="#2e4b3c" />
      <rect x="86" y="22" width="28" height="40" rx="5" fill="#1c1a15" />
      <rect x="92" y="10" width="16" height="16" rx="8" fill="#a87b3e" />
      <rect x="74" y="86" width="52" height="72" rx="4" fill="#f4f2e9" />
      <text x="100" y="112" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#1c1a15">W&amp;Co</text>
      <text x="100" y="132" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#4a463c">No. 07</text>
    </svg>
  )
}

export function BarIllustration(props) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="164" rx="66" ry="10" fill="#1c1a15" opacity="0.12" />
      <rect x="34" y="74" width="132" height="84" rx="12" fill="#ddd7c2" />
      <rect x="34" y="74" width="132" height="84" rx="12" fill="none" stroke="#8a6230" strokeOpacity="0.45" strokeWidth="3" />
      <text x="100" y="112" textAnchor="middle" fontFamily="Georgia,serif" fontSize="17" fill="#1c1a15">W&amp;Co</text>
      <text x="100" y="136" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#4a463c">No. 01 BAR</text>
    </svg>
  )
}

export function KitIllustration(props) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="176" rx="76" ry="10" fill="#1c1a15" opacity="0.12" />
      <rect x="26" y="96" width="64" height="78" rx="10" fill="#a87b3e" />
      <rect x="32" y="76" width="52" height="18" rx="5" fill="#1c1a15" />
      <rect x="84" y="50" width="44" height="124" rx="9" fill="#2e4b3c" />
      <rect x="96" y="26" width="20" height="26" rx="4" fill="#1c1a15" />
      <rect x="134" y="112" width="46" height="62" rx="8" fill="#ddd7c2" />
      <rect x="36" y="118" width="44" height="40" rx="3" fill="#f4f2e9" />
      <rect x="90" y="86" width="32" height="62" rx="3" fill="#f4f2e9" />
      <text x="58" y="142" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#1c1a15">W&amp;Co</text>
      <text x="106" y="122" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#1c1a15">W&amp;Co</text>
    </svg>
  )
}
