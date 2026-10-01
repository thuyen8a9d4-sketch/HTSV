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
      className={`relative inline-flex shrink-0 items-center justify-center rounded-2xl overflow-hidden shadow-md shadow-indigo-500/25 transition-transform ${isAnimated ? 'hover:scale-105 active:scale-95' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          {/* Nền gradient hiện đại AI: Xanh Dương -> Tím Neon -> Cyan */}
          <linearGradient id="ai-bg-grad" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Vầng sáng lõi AI */}
          <radialGradient id="ai-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#a5f3fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>

          {/* Viền bóng bẩy */}
          <linearGradient id="ai-specular" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Nền bo góc công nghệ */}
        <rect width="48" height="48" rx="14" fill="url(#ai-bg-grad)" />

        {/* Viền specular */}
        <rect
          x="0.75"
          y="0.75"
          width="46.5"
          height="46.5"
          rx="13.25"
          stroke="url(#ai-specular)"
          strokeWidth="1.5"
        />

        {/* Vầng sáng trung tâm */}
        <circle cx="24" cy="24" r="16" fill="url(#ai-core-glow)" />

        {/* Ngôi sao AI 4 cánh đặc trưng (Biểu tượng Trí Tuệ Nhân Tạo toàn cầu giống Gemini/ChatGPT) */}
        <path
          d="M24 8C24 16.8366 16.8366 24 8 24C16.8366 24 24 31.1634 24 40C24 31.1634 31.1634 24 40 24C31.1634 24 24 16.8366 24 8Z"
          fill="#ffffff"
        />

        {/* Ngôi sao lấp lánh AI phụ góc trên bên phải */}
        <path
          d="M37 7C37 10.3137 34.3137 13 31 13C34.3137 13 37 15.6863 37 19C37 15.6863 39.6863 13 43 13C39.6863 13 37 10.3137 37 7Z"
          fill="#cffafe"
        />

        {/* Hạt photon AI phụ góc dưới bên trái */}
        <circle cx="11" cy="35" r="2" fill="#e0e7ff" />
      </svg>
    </div>
  );
}
