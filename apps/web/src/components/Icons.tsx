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
export function Compass(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="m16 8-3 5-5 3 3-5 5-3Z" /></Svg>; }
export function FileText(props: IconProps) { return <Svg {...props}><path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8" /></Svg>; }
export function Settings(props: IconProps) { return <Svg {...props}><path d="m9 3-1 3-3 1-2 3 2 2-1 3 2 3 3-1 2 4h3l1-3 3-1 2-3-2-2 1-3-2-3-3 1-2-4H9Z" /><circle cx="12" cy="12" r="3" /></Svg>; }
export function Plus(props: IconProps) { return <Svg {...props}><path d="M12 5v14M5 12h14" /></Svg>; }
export function ArrowLeft(props: IconProps) { return <Svg {...props}><path d="m10 5-7 7 7 7M3 12h18" /></Svg>; }
export function ArrowRight(props: IconProps) { return <Svg {...props}><path d="m14 5 7 7-7 7M3 12h18" /></Svg>; }
export function ArrowUp(props: IconProps) { return <Svg strokeWidth="2" {...props}><path d="m5 12 7-7 7 7M12 5v14" /></Svg>; }
export function Mail(props: IconProps) { return <Svg {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></Svg>; }
export function Lock(props: IconProps) { return <Svg {...props}><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></Svg>; }
export function GraduationCap(props: IconProps) { return <Svg {...props}><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v8" /></Svg>; }
export function Trash(props: IconProps) { return <Svg {...props}><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" /></Svg>; }
export function Smile(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 14c2 4 6 4 8 0M8 8v1m8-1v1" /></Svg>; }
export function Sad(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 17c2-4 6-4 8 0M8 8v1m8-1v1" /></Svg>; }
export function Angry(props: IconProps) { return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="m7 7 3 2m7-2-3 2M8 17c2-3 6-3 8 0" /></Svg>; }
export function ThumbsUp(props: IconProps) { return <Svg {...props}><path d="M7 10v11H3V10h4Zm0 0 5-8c3 0 2 5 2 7h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2H7" /></Svg>; }
