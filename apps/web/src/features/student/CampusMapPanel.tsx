import { useState } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { campusBuildings, universityAddress } from './campus-map-data';
import { normalizeSearch } from './student-mock-data';

export function CampusMapPanel() {
  const [query, setQuery] = useState('');
  const filtered = campusBuildings.filter((building) => normalizeSearch(`${building.code} ${building.name} ${building.rooms.join(' ')}`).includes(normalizeSearch(query)));

  return (
    <section aria-labelledby="campus-map-heading" id="campus-map" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Tòa nhà &amp; phòng trong khuôn viên</p>
          <h2 id="campus-map-heading">Sơ đồ khuôn viên</h2>
        </div>
      </div>

      <div className="liquid-glass-card space-y-2 p-5 sm:p-6">
        <p className="text-xs text-slate-600">Dữ liệu mẫu — hệ thống chưa nối sơ đồ chi tiết từ Phòng Quản trị - Thiết bị.</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(universityAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="student-text-link"
          >
            Xem vị trí trường trên Google Maps ↗
          </a>
          <a
            href="https://vtour.nctu.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="student-text-link"
          >
            Tham quan 360° khuôn viên trường ↗
          </a>
        </div>
      </div>

      <div>
        <label htmlFor="campus-search" className="sr-only">Tìm tòa nhà hoặc phòng</label>
        <input id="campus-search" className="form-input" placeholder="Tìm theo mã tòa nhà, tên hoặc phòng…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((building) => (
            <div key={building.code} className="liquid-glass-card space-y-3 p-5">
              <div className="flex items-center gap-2">
                <span className="liquid-pill font-mono">{building.code}</span>
                <h3 className="font-semibold">{building.name}</h3>
              </div>
              <p className="text-sm text-slate-600">{building.description}</p>
              <ul className="space-y-1 text-sm text-slate-700">
                {building.rooms.map((room) => <li key={room}>· {room}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Không tìm thấy tòa nhà/phòng phù hợp" description="Thử đổi từ khóa tìm kiếm." />
      )}
    </section>
  );
}
