export default function ChurchLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Scalloped outer edge (simplified as an outer circle for now) */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#2B4C9B" strokeWidth="2" />
      
      {/* Main blue ring */}
      <circle cx="100" cy="100" r="85" fill="#2B4C9B" />
      
      {/* Inner white circle */}
      <circle cx="100" cy="100" r="55" fill="white" />

      {/* Outer Ring Text (Top Arc) - "예수교대한성결교회" */}
      <path id="topArc" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
      <text fill="white" fontSize="18" fontWeight="bold" letterSpacing="2">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          예수교대한성결교회
        </textPath>
      </text>

      {/* Outer Ring Text (Bottom Arc) - "HOLINESS UNTO THE LORD" */}
      <path id="bottomArc" d="M 160,110 A 60,60 0 0,1 40,110" fill="none" />
      <text fill="#C92A2A" fontSize="11" fontWeight="bold" letterSpacing="1">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          HOLINESS UNTO THE LORD
        </textPath>
      </text>

      {/* Year "1907" at the bottom */}
      <text x="100" y="175" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
        1907
      </text>

      {/* Red Cross at the top inside */}
      <path d="M 96,40 h 8 v 6 h 6 v 8 h -6 v 14 h -8 v -14 h -6 v -8 h 6 z" fill="#C92A2A" />

      {/* Inner Text "여호와께 성결" */}
      <path id="innerArc" d="M 60,85 A 40,40 0 0,1 140,85" fill="none" />
      <text fill="#2B4C9B" fontSize="11" fontWeight="bold" letterSpacing="1">
        <textPath href="#innerArc" startOffset="50%" textAnchor="middle">
          여호와께성결
        </textPath>
      </text>

      {/* Center Blue Shield */}
      <path d="M 70,85 Q 100,95 130,85 V 110 Q 100,145 70,110 Z" fill="#2B4C9B" />

      {/* Open Book in the shield */}
      <path d="M 80,95 Q 90,90 100,95 V 125 Q 90,120 80,125 Z" fill="white" />
      <path d="M 120,95 Q 110,90 100,95 V 125 Q 110,120 120,125 Z" fill="white" />
      
      {/* Green line in the middle of the book */}
      <line x1="100" y1="95" x2="100" y2="125" stroke="#27AE60" strokeWidth="1.5" />

      {/* Book Text (Left page: 중생, 신유) */}
      <text x="90" y="108" fill="#2B4C9B" fontSize="8" fontWeight="bold" textAnchor="middle">중생</text>
      <text x="90" y="118" fill="#2B4C9B" fontSize="8" fontWeight="bold" textAnchor="middle">신유</text>

      {/* Book Text (Right page: 성결, 재림) */}
      <text x="110" y="108" fill="#2B4C9B" fontSize="8" fontWeight="bold" textAnchor="middle">성결</text>
      <text x="110" y="118" fill="#2B4C9B" fontSize="8" fontWeight="bold" textAnchor="middle">재림</text>

    </svg>
  );
}
