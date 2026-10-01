const ADMISSIONS = 'https://tuyensinh.nctu.edu.vn/news/2026/thong-tin-tuyen-sinh-trinh-do-dai-hoc-nam-2026-hinh-thuc-dao-tao-chinh-quy';
const TUITION = 'https://tuyensinh.nctu.edu.vn/news/2026/hoc-phi-dai-hoc-nam-can-tho-nam-2026-cap-nhat-moi-nhat-theo-tung-nhom-nganh';
const UNKNOWN = 'Mình không biết thông tin này.';

const groups = [
  { fee: '12–13 triệu đồng', majors: ['quan ly tai nguyen', 'quan ly dat dai', 'quan ly cong nghiep', 'kinh te so', 'du lich', 'khach san', 'nha hang', 'ngon ngu anh', 'ke toan', 'tai chinh ngan hang', 'thuong mai dien tu', 'kinh doanh quoc te', 'marketing', 'quan tri kinh doanh', 'truyen thong da phuong tien', 'quan he cong chung', 'luat kinh te'] },
  { fee: '14–15 triệu đồng', majors: ['cong nghe thong tin', 'khoa hoc may tinh', 'ky thuat phan mem', 'mang may tinh', 'tri tue nhan tao', 'bat dong san', 'luat quoc te', 'thiet ke do hoa', 'logistics', 'ky thuat xay dung', 'quan ly xay dung', 'kien truc'] },
  { fee: '16–19 triệu đồng', majors: ['dieu duong', 'cong nghe ky thuat hoa hoc', 'cong nghe thuc pham', 'ky thuat xet nghiem', 'quan ly benh vien', 'co dien tu', 'dien dien tu', 'co khi dong luc'] },
  { fee: '20–23 triệu đồng', majors: ['cong nghe ky thuat o to', 'o to dien', 'vi mach ban dan', 'ky thuat y sinh', 'ky thuat hinh anh'] },
  { fee: '27 triệu đồng', majors: ['duoc hoc'] },
  { fee: '33 triệu đồng', majors: ['y hoc du phong'] },
  { fee: '48–50 triệu đồng', majors: ['y khoa', 'rang ham mat'] },
];

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

// Dữ liệu từ website chính thức của DNC, chỉ áp dụng cho tuyển sinh 2026.
export function answerVerifiedDnc(question: string): string | null {
  const query = normalize(question.trim());
  if (/dai hoc can tho/.test(query) && !/nam can tho/.test(query)) return UNKNOWN;
  if (!/\b(dnc|nctu|nam can tho)\b/.test(query) && !/\b(truong|dai hoc|tuyen sinh|hoc phi|hoc ba|ky tuc xa|ktx)\b/.test(query)) return null;
  if (/\b(dia chi|o dau|vi tri|toa lac|duong nao)\b/.test(query)) {
    if (/\b(benh vien|resort|showroom|ky tuc xa|ktx|thu vien|phong|khoa)\b/.test(query)) return UNKNOWN;
    return `Trường Đại học Nam Cần Thơ: 168 Nguyễn Văn Cừ (nối dài), Phường An Bình, TP. Cần Thơ. [Nguồn](${ADMISSIONS})`;
  }
  if (/\b(gioi thieu|truong nao|day la truong)\b/.test(query)) return `Đây là Trường Đại học Nam Cần Thơ (mã DNC), tại 168 Nguyễn Văn Cừ (nối dài), Phường An Bình, TP. Cần Thơ. [Nguồn](${ADMISSIONS})`;
  if (/\bma truong\b/.test(query)) return `Mã trường: DNC. [Nguồn](${ADMISSIONS})`;
  if (/\b(hotline|so dien thoai|lien he)\b/.test(query)) {
    if (/\b(benh vien|ky tuc xa|ktx|phong|khoa)\b/.test(query)) return UNKNOWN;
    return `Tuyển sinh: 02923 798 168; Hotline/Zalo: 0939 257 838. [Nguồn](${ADMISSIONS})`;
  }
  if (/\b(phuong thuc|xet tuyen|hoc ba|v.sat|v-sat)\b/.test(query)) {
    if (/\b(diem|dieu kien|nguong|to hop|nganh)\b/.test(query)) return UNKNOWN;
    return `Năm 2026, DNC xét điểm thi THPT (100), học bạ (200), V-SAT (417), kết hợp thi THPT và học bạ (407), bằng THPT nước ngoài (411); có xét tuyển thẳng theo quy chế. [Nguồn](${ADMISSIONS})`;
  }
  if (/\b(hoc phi|bao nhieu tien|chi phi hoc)\b/.test(query)) {
    if (/\b(ky tuc xa|ktx|phong)\b/.test(query)) return UNKNOWN;
    const found = groups.filter((group) => group.majors.some((major) => query.includes(major)));
    if (found.length === 1) return `Học phí học kỳ I năm 2026 khoảng ${found[0].fee}; học phí thực tế tính theo số tín chỉ. [Nguồn](${TUITION})`;
    if (found.length > 1) return UNKNOWN;
    if (!/\bnganh\b/.test(query) || /\b(cac nganh|nhom nganh|tong quan|bao nhieu)\b/.test(query)) return `Học phí học kỳ I năm 2026 khoảng 12–50 triệu đồng tùy ngành; mỗi năm có 2 học kỳ và học phí tính theo tín chỉ. [Nguồn](${TUITION})`;
    return UNKNOWN;
  }
  return UNKNOWN;
}
