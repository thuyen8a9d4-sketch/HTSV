import { memo, useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Mail, MapPin, Phone } from '../../components/Icons';

// DNC contact sources:
// https://nctu.edu.vn/events/le-trao-bang-tot-nghiep-nam-2026-dot-2
// https://tuyensinh.nctu.edu.vn/news/2024/truyen-thong-da-phuong-tien1
const contact = {
  phone: '0292 3605 798',
  phoneHref: 'tel:02923605798',
  email: 'trungtamhtsv_htdn@nctu.edu.vn',
  address: '168 Nguyễn Văn Cừ nối dài, P. An Bình, TP. Cần Thơ',
};

const rows = [
  { id: 'phone', label: 'Điện thoại hỗ trợ sinh viên', value: contact.phone, href: contact.phoneHref, icon: Phone },
  { id: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
];

export const ChatContactPanel = memo(function ChatContactPanel() {
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setStatus('Đã sao chép thông tin liên hệ.');
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 2200);
    } catch {
      setStatus('Chưa sao chép được. Bạn có thể chọn và sao chép thông tin bên trên.');
    }
  };

  return (
    <div className="htsv-chat-contacts">
      <p className="htsv-chat-contact-intro">Trung tâm Khởi nghiệp sáng tạo – Hỗ trợ sinh viên & Hợp tác doanh nghiệp DNC</p>
      {rows.map((row) => (
        <section className="htsv-chat-contact-card" key={row.id} aria-label={row.label}>
          <row.icon className="h-6 w-6 shrink-0" />
          <div className="min-w-0">
            <h4>{row.label}</h4>
            <a className="htsv-chat-contact-value focus-ring" href={row.href}>{row.value}</a>
          </div>
          <button type="button" className="htsv-chat-contact-copy focus-ring" onClick={() => void copy(row.value, row.id)} aria-label={`Sao chép ${row.label.toLowerCase()}`}>
            {copied === row.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === row.id ? 'Đã sao chép' : 'Sao chép'}
          </button>
        </section>
      ))}
      <section className="htsv-chat-contact-card" aria-label="Địa chỉ nhà trường">
        <MapPin className="h-6 w-6 shrink-0" />
        <div className="min-w-0">
          <h4>Địa chỉ nhà trường</h4>
          <p className="htsv-chat-contact-value">{contact.address}</p>
          <p className="htsv-chat-contact-note">Văn phòng hỗ trợ sinh viên: E6-03</p>
        </div>
        <a className="htsv-chat-contact-copy focus-ring" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Đại học Nam Cần Thơ ${contact.address}`)}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" /> Mở bản đồ
        </a>
      </section>
      <section aria-labelledby="htsv-chat-social-title">
        <h4 className="htsv-chat-social-title" id="htsv-chat-social-title">Kết nối với DNC</h4>
        <div className="htsv-chat-social-grid">
          <a href="https://www.facebook.com/NamCanThoUniversity" target="_blank" rel="noopener noreferrer" className="htsv-chat-social-link focus-ring">
            <span className="htsv-chat-social-mark htsv-chat-facebook" aria-hidden="true">f</span> Facebook
          </a>
          <a href={`mailto:${contact.email}`} className="htsv-chat-social-link focus-ring">
            <Mail className="h-6 w-6" /> Gửi email
          </a>
          <button type="button" disabled className="htsv-chat-social-link" aria-label="Instagram: chưa có liên kết xác nhận">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            Instagram
          </button>
          <a href="https://zalo.me/daihocnamcantho" target="_blank" rel="noopener noreferrer" className="htsv-chat-social-link focus-ring">
            <span className="htsv-chat-social-mark htsv-chat-zalo" aria-hidden="true">Zalo</span> Zalo
          </a>
        </div>
        <p className="htsv-chat-contact-note">Instagram chưa có liên kết xác nhận.</p>
      </section>
      <p role="status" className="htsv-chat-contact-note">{status}</p>
    </div>
  );
});
