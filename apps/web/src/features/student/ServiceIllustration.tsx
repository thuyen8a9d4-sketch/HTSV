import type { StudentService } from './student-types';

const revisedIcons = new Set(['facility-report', 'scholarship', 'lost-found']);

// Decorative artwork; the adjacent service name is the accessible label.
export function ServiceIllustration({ service }: { service: StudentService }) {
  return <img
    src={`${import.meta.env.BASE_URL}assets/service-icons/${service.id}.svg${revisedIcons.has(service.id) ? '?v=2' : ''}`}
    alt=""
    width={80}
    height={80}
    className="student-service-illustration"
    loading="lazy"
    decoding="async"
    draggable={false}
  />;
}
