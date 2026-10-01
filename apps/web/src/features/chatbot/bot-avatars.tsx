export const botAvatarTypes = ['clover', 'cat', 'robot', 'bear', 'star'] as const;
export type BotAvatarType = (typeof botAvatarTypes)[number];

interface BotAvatarProps {
  type?: BotAvatarType;
  state?: 'default' | 'working';
  size?: string | number;
  theme?: string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function BotAvatar({
  type = 'clover',
  state = 'default',
  size = '100%',
  className = '',
  'aria-hidden': ariaHidden,
}: BotAvatarProps) {
  const isWorking = state === 'working';

  const renderIcon = () => {
    switch (type) {
      case 'cat':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#cat-grad)" />
            {/* Tai mèo */}
            <polygon points="8,14 12,5 17,11" fill="#f59e0b" />
            <polygon points="10,13 12,8 15,11" fill="#fde68a" />
            <polygon points="28,14 24,5 19,11" fill="#f59e0b" />
            <polygon points="26,13 24,8 21,11" fill="#fde68a" />
            {/* Mắt */}
            {isWorking ? (
              <>
                <path d="M12 17Q14 15 16 17" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 17Q22 15 24 17" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="13" cy="17" r="2" fill="#1f2937" />
                <circle cx="23" cy="17" r="2" fill="#1f2937" />
              </>
            )}
            {/* Mũi & Miệng */}
            <polygon points="18,20 16.5,18.5 19.5,18.5" fill="#f43f5e" />
            <path d="M16 22Q18 23.5 20 22" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="cat-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'robot':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="url(#bot-grad)" />
            {/* Ăng ten */}
            <line x1="18" y1="6" x2="18" y2="10" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
            <circle cx="18" cy="5" r="2" fill={isWorking ? '#ef4444' : '#60a5fa'} />
            {/* Mặt */}
            <rect x="9" y="10" width="18" height="16" rx="4" fill="#1e293b" />
            {/* Mắt LED */}
            {isWorking ? (
              <>
                <line x1="12" y1="17" x2="16" y2="17" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="17" x2="24" y2="17" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <rect x="12" y="15" width="4" height="4" rx="1" fill="#38bdf8" />
                <rect x="20" y="15" width="4" height="4" rx="1" fill="#38bdf8" />
              </>
            )}
            {/* Miệng LED */}
            <rect x="14" y="21" width="8" height="2" rx="1" fill="#22c55e" />
            <defs>
              <linearGradient id="bot-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'bear':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#bear-grad)" />
            {/* Tai gấu */}
            <circle cx="9" cy="9" r="4" fill="#a16207" />
            <circle cx="9" cy="9" r="2.5" fill="#fde047" />
            <circle cx="27" cy="9" r="4" fill="#a16207" />
            <circle cx="27" cy="9" r="2.5" fill="#fde047" />
            {/* Mõm */}
            <ellipse cx="18" cy="21" rx="6" ry="4.5" fill="#fef08a" />
            <ellipse cx="18" cy="19" rx="2" ry="1.5" fill="#451a03" />
            <path d="M18 20.5V23" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
            {/* Mắt */}
            {isWorking ? (
              <>
                <path d="M12 15Q14 13 16 15" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M20 15Q22 13 24 15" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="13" cy="14.5" r="1.8" fill="#451a03" />
                <circle cx="23" cy="14.5" r="1.8" fill="#451a03" />
              </>
            )}
            <defs>
              <linearGradient id="bear-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ca8a04" />
                <stop offset="1" stopColor="#a16207" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'star':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#star-grad)" />
            {/* Ngôi sao */}
            <path
              d="M18 6L21.5 13.5L29.5 14.5L23.5 20L25 28L18 24L11 28L12.5 20L6.5 14.5L14.5 13.5L18 6Z"
              fill="#fbbf24"
            />
            {/* Mắt */}
            {isWorking ? (
              <>
                <circle cx="15" cy="17" r="1.5" fill="#78350f" />
                <circle cx="21" cy="17" r="1.5" fill="#78350f" />
              </>
            ) : (
              <>
                <circle cx="15" cy="17" r="1.5" fill="#78350f" />
                <circle cx="21" cy="17" r="1.5" fill="#78350f" />
                <path d="M16 20Q18 21.5 20 20" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
              </>
            )}
            <defs>
              <linearGradient id="star-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'clover':
      default:
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="url(#clover-grad)" />
            {/* Cỏ 4 lá */}
            <g transform="translate(18,18)">
              <circle cx="-5" cy="-5" r="4.5" fill="#86efac" />
              <circle cx="5" cy="-5" r="4.5" fill="#86efac" />
              <circle cx="-5" cy="5" r="4.5" fill="#86efac" />
              <circle cx="5" cy="5" r="4.5" fill="#86efac" />
              <path d="M0 4Q-2 11 -4 13" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
              {/* Mặt cười */}
              {isWorking ? (
                <>
                  <circle cx="-2" cy="-1" r="1" fill="#14532d" />
                  <circle cx="2" cy="-1" r="1" fill="#14532d" />
                </>
              ) : (
                <>
                  <circle cx="-2" cy="-1" r="1" fill="#14532d" />
                  <circle cx="2" cy="-1" r="1" fill="#14532d" />
                  <path d="M-1.5 1Q0 2.5 1.5 1" stroke="#14532d" strokeWidth="0.8" strokeLinecap="round" />
                </>
              )}
            </g>
            <defs>
              <linearGradient id="clover-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22c55e" />
                <stop offset="1" stopColor="#16a34a" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}
      aria-hidden={ariaHidden}
    >
      {renderIcon()}
    </div>
  );
}
