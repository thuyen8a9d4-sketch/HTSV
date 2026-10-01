import aiAvatarUrl from '../../assets/ai-avatar.png';

interface AiAvatarProps {
  size?: number | string;
  className?: string;
  isAnimated?: boolean;
}

export function AiAvatar({
  size = 40,
  className = '',
  isAnimated = false,
}: AiAvatarProps) {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      style={{ width: dimension, height: dimension }}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-2xl overflow-hidden bg-white/95 dark:bg-slate-800/95 border border-sky-400/35 shadow-md shadow-sky-500/25 p-1 transition-transform ${isAnimated ? 'hover:scale-105 active:scale-95' : ''} ${className}`}
      aria-hidden="true"
    >
      <img
        src={aiAvatarUrl}
        alt="AI Chatbot Avatar"
        className="h-full w-full object-contain select-none drop-shadow-xs"
        loading="eager"
        draggable={false}
      />
    </div>
  );
}
