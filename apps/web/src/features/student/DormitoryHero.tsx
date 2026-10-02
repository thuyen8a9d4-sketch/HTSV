import { Link } from 'react-router-dom';
import { Home } from '../../components/Icons';
import dormitoryBannerImg from '../../assets/dormitory-banner.jpg';

export function DormitoryHero() {
  return (
    <div className="w-full bg-slate-900">
      {/* Full-bleed Hero Banner without outer rounding */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96 lg:h-[420px] xl:h-[460px]">
        <img
          src={dormitoryBannerImg}
          alt="Ký túc xá Trường Đại học Nam Cần Thơ"
          className="h-full w-full object-cover object-[center_35%] select-none transition-transform duration-700 ease-out hover:scale-[1.02]"
          loading="eager"
        />

        {/* Gradient overlay for optimal contrast and dark mode comfort */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent dark:from-black/80 dark:via-black/35 dark:to-black/25"
          aria-hidden="true"
        />

        {/* Floating Liquid Frosted Glass Card: "Ký túc xá" */}
        <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 md:bottom-10 md:left-10 lg:left-14">
          <div className="dormitory-title-glass inline-flex items-center rounded-2xl sm:rounded-3xl px-7 py-3.5 sm:px-9 sm:py-4.5">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Ký túc xá
            </h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation Bar — Full-width with centered content */}
      <nav
        aria-label="Breadcrumb"
        className="w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-900/95"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 flex-wrap px-4 py-3 text-xs sm:px-6 sm:py-3.5 sm:text-sm lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            <Home className="h-4 w-4 shrink-0 text-slate-500 transition-colors dark:text-gray-400" />
            <span>Trang chủ</span>
          </Link>
          <span className="text-slate-300 dark:text-gray-600" aria-hidden="true">/</span>
          <span className="font-medium text-slate-600 transition-colors dark:text-gray-300">
            Đời sống sinh viên
          </span>
          <span className="text-slate-300 dark:text-gray-600" aria-hidden="true">/</span>
          <span className="font-semibold text-red-600 dark:text-red-400" aria-current="page">
            Ký túc xá
          </span>
        </div>
      </nav>
    </div>
  );
}
