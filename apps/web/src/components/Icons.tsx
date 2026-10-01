import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
function Svg({ children, className = 'h-5 w-5', ...props }: IconProps) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className} {...props}>{children}</svg>;
}
export function Heart(props: IconProps) { return <Svg {...props}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></Svg>; }
export function ChatBubble(props: IconProps) { return <Svg {...props}><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8.5 8.5 0 0 1 8 8v.5Z" /></Svg>; }
export function Share(props: IconProps) { return <Svg {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4" /></Svg>; }
export function Shield(props: IconProps) { return <Svg {...props}><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></Svg>; }
export function User(props: IconProps) { return <Svg {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></Svg>; }
export function Logout(props: IconProps) { return <Svg {...props}><path d="M9 4H4v16h5m5-12 4 4-4 4m-7-4h13" /></Svg>; }
export function Menu(props: IconProps) { return <Svg {...props}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>; }
export function Close(props: IconProps) { return <Svg {...props}><path d="m6 6 12 12M18 6 6 18" /></Svg>; }
export function XMark(props: IconProps) { return <Close {...props} />; }
export function Check(props: IconProps) { return <Svg {...props}><path d="m5 12 4 4L19 6" /></Svg>; }
export function Eye(props: IconProps) { return <Svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Svg>; }
export function EyeOff(props: IconProps) { return <Svg {...props}><path d="m3 3 18 18M10 5h2c6 0 10 7 10 7a22 22 0 0 1-3 4M6 6a22 22 0 0 0-4 6s4 7 10 7a12 12 0 0 0 5-1M10 10a3 3 0 0 0 4 4" /></Svg>; }
export function Sparkles(props: IconProps) { return <Svg {...props}><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4" /></Svg>; }
export function Clock(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>; }
export function Bell(props: IconProps) { return <Svg {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></Svg>; }
export function Compass(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="m16 8-3 5-5 3 3-5 5-3Z" /></Svg>; }
export function FileText(props: IconProps) { return <Svg {...props}><path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8" /></Svg>; }
export function Settings(props: IconProps) { return <Svg {...props}><path d="m9 3-1 3-3 1-2 3 2 2-1 3 2 3 3-1 2 4h3l1-3 3-1 2-3-2-2 1-3-2-3-3 1-2-4H9Z" /><circle cx="12" cy="12" r="3" /></Svg>; }
export function Plus(props: IconProps) { return <Svg {...props}><path d="M12 5v14M5 12h14" /></Svg>; }
export function Search(props: IconProps) { return <Svg {...props}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></Svg>; }
export function GridSquares(props: IconProps) { return <Svg {...props}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Svg>; }
export function ArrowLeft(props: IconProps) { return <Svg {...props}><path d="m10 5-7 7 7 7M3 12h18" /></Svg>; }
export function ArrowRight(props: IconProps) { return <Svg {...props}><path d="m14 5 7 7-7 7M3 12h18" /></Svg>; }
export function ArrowUp(props: IconProps) { return <Svg strokeWidth="2" {...props}><path d="m5 12 7-7 7 7M12 5v14" /></Svg>; }
export function ArrowDown(props: IconProps) { return <Svg strokeWidth="2" {...props}><path d="m19 12-7 7-7-7M12 19V5" /></Svg>; }
export function Mail(props: IconProps) { return <Svg {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></Svg>; }
export function Lock(props: IconProps) { return <Svg {...props}><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></Svg>; }
export function GraduationCap(props: IconProps) { return <Svg {...props}><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v8" /></Svg>; }
export function Trash(props: IconProps) { return <Svg {...props}><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" /></Svg>; }
export function Smile(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 14c2 4 6 4 8 0M8 8v1m8-1v1" /></Svg>; }
export function Sad(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 17c2-4 6-4 8 0M8 8v1m8-1v1" /></Svg>; }
export function Angry(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="m7 7 3 2m7-2-3 2M8 17c2-3 6-3 8 0" /></Svg>; }
export function ThumbsUp(props: IconProps) { return <Svg {...props}><path d="M7 10v11H3V10h4Zm0 0 5-8c3 0 2 5 2 7h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2H7" /></Svg>; }
export function Send(props: IconProps) { return <Svg {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Svg>; }
export function Bot(props: IconProps) { return <Svg {...props}><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4M8 16v.01M16 16v.01" /></Svg>; }
export function RotateCcw(props: IconProps) { return <Svg {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></Svg>; }
export function Copy(props: IconProps) { return <Svg {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Svg>; }
export function MapPin(props: IconProps) { return <Svg {...props}><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22Z" /><circle cx="12" cy="9.5" r="2.5" /></Svg>; }
export function Phone(props: IconProps) { return <Svg {...props}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Svg>; }
export function Globe(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></Svg>; }
export function ExternalLink(props: IconProps) { return <Svg {...props}><path d="M14 4h6v6M20 4 10 14M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" /></Svg>; }
export function Flame(props: IconProps) { return <Svg {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></Svg>; }
export function BookOpen(props: IconProps) { return <Svg {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></Svg>; }
export function Home(props: IconProps) { return <Svg {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Svg>; }
export function Headset(props: IconProps) { return <Svg {...props}><path d="M3 14v-3a9 9 0 0 1 18 0v6c0 3-3 4-6 4" /><rect x="2" y="11" width="5" height="8" rx="2" /><rect x="17" y="11" width="5" height="8" rx="2" /></Svg>; }

