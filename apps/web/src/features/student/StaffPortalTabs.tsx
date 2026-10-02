import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/staff/lecturer', label: 'Giảng viên' },
  { to: '/staff/advisor', label: 'Cố vấn học tập' },
  { to: '/staff/office', label: 'Phòng ban' },
];

export function StaffPortalTabs() {
  return (
    <nav aria-label="Chuyển vai trò cổng demo" className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) => `focus-ring rounded-full border px-3 py-1.5 text-xs font-semibold ${isActive ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
