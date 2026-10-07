import { Link } from 'react-router-dom';
import { Home } from '../../components/Icons';

interface StudentPageHeroProps {
  title: string;
  image: string;
  imageSrcSet?: string;
  imageAlt: string;
  category: string;
  imagePosition?: string;
}

export function StudentPageHero({ title, image, imageSrcSet, imageAlt, category, imagePosition = 'center' }: StudentPageHeroProps) {
  return <header className="student-page-hero w-full">
    <div className="relative h-64 w-full overflow-hidden bg-slate-900 sm:h-80 md:h-96 lg:h-[420px] xl:h-[460px]">
      <img src={image} srcSet={imageSrcSet} sizes="100vw" alt={imageAlt} width={1920} height={1080} loading="eager" decoding="async" fetchPriority="high"
        className="h-full w-full object-cover select-none" style={{ objectPosition: imagePosition }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent dark:from-black/80 dark:via-black/35 dark:to-black/25" aria-hidden="true" />
      <div className="absolute right-4 bottom-6 left-4 sm:right-6 sm:bottom-8 sm:left-6 md:right-10 md:bottom-10 md:left-10 lg:right-14 lg:left-14">
        <div className="dormitory-title-glass inline-flex max-w-full items-center rounded-2xl px-5 py-3.5 sm:rounded-3xl sm:px-9 sm:py-4.5">
          <h1 className="student-page-hero-title text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h1>
        </div>
      </div>
    </div>
    <nav aria-label="Đường dẫn trang" className="student-page-breadcrumb border-b">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-xs sm:px-6 sm:py-3.5 sm:text-sm lg:px-8">
        <li><Link to="/" className="focus-ring inline-flex min-h-11 items-center gap-1.5 rounded font-medium">
          <Home className="h-4 w-4 shrink-0" aria-hidden="true" />Trang chủ
        </Link></li>
        <li aria-hidden="true">/</li>
        {category !== title && <><li>{category}</li><li aria-hidden="true">/</li></>}
        <li aria-current="page" className="student-page-breadcrumb-current font-semibold">{title}</li>
      </ol>
    </nav>
  </header>;
}
