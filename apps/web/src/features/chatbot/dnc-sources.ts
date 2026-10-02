/** Các dữ kiện được đối chiếu với website chính thức của Trường Đại học Nam Cần Thơ. */
const SOURCES = {
  admissions: 'https://tuyensinh.nctu.edu.vn/news/2026/thong-tin-tuyen-sinh-trinh-do-dai-hoc-nam-2026-hinh-thuc-dao-tao-chinh-quy',
  tuition: 'https://tuyensinh.nctu.edu.vn/news/2026/hoc-phi-dai-hoc-nam-can-tho-nam-2026-cap-nhat-moi-nhat-theo-tung-nhom-nganh',
  history: 'https://nctu.edu.vn/lich-su-hinh-thanh',
  majors: 'https://tuyensinh.nctu.edu.vn/events/2026/danh-muc-nganh-tuyen-sinh-dai-hoc-2026',
  scholarship: 'https://tuyensinh.nctu.edu.vn/news/2026/truong-dai-hoc-nam-can-tho-tuyen-sinh-2026-hoc-bong-2k8',
  additionalScholarship: 'https://tuyensinh.nctu.edu.vn/news/2026/co-hoi-nhan-hoc-bong-len-den-30-trieu-dong',
  mydnc: 'https://nctu.edu.vn/trang-sinh-vien/tan-sinh-vien/huong-dan-dang-nhap-mydnc',
  enrollment: 'https://nctu.edu.vn/trang-sinh-vien/tan-sinh-vien/huong-dan-thu-tuc-nhap-hoc',
  hospital: 'https://nctu.edu.vn/mo-hinh-doanh-nghiep/benh-vien',
  cutoff: 'https://tuyensinh.nctu.edu.vn/news/2026/truong-dai-hoc-nam-can-tho-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026',
  admissionConditions: 'https://tuyensinh.nctu.edu.vn/news/2026/truong-dai-hoc-nam-can-tho-cong-bo-diem-chuan-nam-2026',
  overview: 'https://www.nctu.edu.vn/',
  dorm: 'https://www.nctu.edu.vn/ky-tuc-xa',
  hospitalContact: 'https://www.benhviendhnct.com.vn/lien-he',
  hospitalAbout: 'https://benhviendhnct.com.vn/eng/about-us',
  itMajor: 'https://tuyensinh.nctu.edu.vn/news/2026/nganh-cong-nghe-thong-tin-tai-dai-hoc-nam-can-tho-hoc-gi-co-hoi-nghe-nghiep-co-rong-mo',
  aiMajor: 'https://tuyensinh.nctu.edu.vn/news/2026/nganh-tri-tue-nhan-tao-tai-dai-hoc-nam-can-tho-co-gi-noi-bat',
  showroom: 'https://nctu.edu.vn/mo-hinh-doanh-nghiep/showroom-o-to',
  library: 'https://thuvien.nctu.edu.vn/',
} as const;

export const DNC_UNKNOWN = 'Mình chưa thấy trường công bố rõ thông tin này trên website chính thức, nên chưa dám trả lời chắc chắn.';

export interface DncEvidence {
  answer: string;
  source: string;
}

export interface DncLookup {
  evidence: DncEvidence[];
  fallback: string;
}

interface Major {
  name: string;
  code: string;
  aliases: string[];
}

const MAJORS: Major[] = [
  { name: 'Y khoa', code: '7720101', aliases: ['y khoa', 'bac si da khoa'] },
  { name: 'Răng - Hàm - Mặt', code: '7720501', aliases: ['rang - ham - mat', 'rang ham mat', 'nha khoa'] },
  { name: 'Y học dự phòng', code: '7720110', aliases: ['y hoc du phong'] },
  { name: 'Dược học', code: '7720201', aliases: ['duoc hoc'] },
  { name: 'Điều dưỡng', code: '7720301', aliases: ['dieu duong'] },
  { name: 'Kỹ thuật xét nghiệm y học', code: '7720601', aliases: ['ky thuat xet nghiem y hoc', 'xet nghiem y hoc'] },
  { name: 'Kỹ thuật hình ảnh y học', code: '7720602', aliases: ['ky thuat hinh anh y hoc', 'hinh anh y hoc'] },
  { name: 'Quản lý bệnh viện', code: '7720802', aliases: ['quan ly benh vien'] },
  { name: 'Kỹ thuật y sinh', code: '7520212', aliases: ['ky thuat y sinh'] },
  { name: 'Công nghệ thông tin', code: '7480201', aliases: ['cong nghe thong tin', 'cntt'] },
  { name: 'Kỹ thuật phần mềm', code: '7480103', aliases: ['ky thuat phan mem'] },
  { name: 'Khoa học máy tính', code: '7480101', aliases: ['khoa hoc may tinh'] },
  { name: 'Mạng máy tính và truyền thông dữ liệu', code: '7480102', aliases: ['mang may tinh', 'truyen thong du lieu'] },
  { name: 'Trí tuệ nhân tạo', code: '7480107', aliases: ['tri tue nhan tao', 'nganh ai'] },
  { name: 'Thiết kế đồ họa', code: '7210403', aliases: ['thiet ke do hoa'] },
  { name: 'An toàn thông tin', code: '7480202', aliases: ['an toan thong tin'] },
  { name: 'Công nghệ kỹ thuật điện, điện tử', code: '7510301', aliases: ['cong nghe ky thuat dien, dien tu', 'cong nghe ky thuat dien dien tu', 'dien dien tu'] },
  { name: 'Công nghệ kỹ thuật cơ điện tử', code: '7510203', aliases: ['cong nghe ky thuat co dien tu', 'co dien tu'] },
  { name: 'Công nghệ kỹ thuật ô tô', code: '7510205', aliases: ['cong nghe ky thuat o to', 'cong nghe o to', 'o to dien'] },
  { name: 'Kỹ thuật cơ khí động lực', code: '7520116', aliases: ['ky thuat co khi dong luc', 'co khi dong luc'] },
  { name: 'Công nghệ kỹ thuật cơ khí', code: '7510201', aliases: ['cong nghe ky thuat co khi'] },
  { name: 'Công nghệ thực phẩm', code: '7540101', aliases: ['cong nghe thuc pham'] },
  { name: 'Công nghệ kỹ thuật hóa học', code: '7510401', aliases: ['cong nghe ky thuat hoa hoc'] },
  { name: 'Kiến trúc', code: '7580101', aliases: ['kien truc'] },
  { name: 'Kỹ thuật xây dựng', code: '7580201', aliases: ['ky thuat xay dung'] },
  { name: 'Quản lý xây dựng', code: '7580302', aliases: ['quan ly xay dung'] },
  { name: 'Kỹ thuật xây dựng công trình giao thông', code: '7580205', aliases: ['ky thuat xay dung cong trinh giao thong'] },
  { name: 'Quản lý tài nguyên và môi trường', code: '7850101', aliases: ['quan ly tai nguyen', 'tai nguyen moi truong'] },
  { name: 'Quản lý đất đai', code: '7850103', aliases: ['quan ly dat dai'] },
  { name: 'Luật', code: '7380101', aliases: ['nganh luat', 'luat hoc'] },
  { name: 'Luật kinh tế', code: '7380107', aliases: ['luat kinh te'] },
  { name: 'Luật quốc tế', code: '7380108', aliases: ['luat quoc te'] },
  { name: 'Quan hệ công chúng', code: '7320108', aliases: ['quan he cong chung', 'nganh pr'] },
  { name: 'Truyền thông đa phương tiện', code: '7320104', aliases: ['truyen thong da phuong tien'] },
  { name: 'Quản trị kinh doanh', code: '7340101', aliases: ['quan tri kinh doanh', 'qtkd'] },
  { name: 'Tài chính - Ngân hàng', code: '7340201', aliases: ['tai chinh - ngan hang', 'tai chinh ngan hang'] },
  { name: 'Kế toán', code: '7340301', aliases: ['ke toan'] },
  { name: 'Marketing', code: '7340115', aliases: ['marketing'] },
  { name: 'Kinh doanh quốc tế', code: '7340120', aliases: ['kinh doanh quoc te'] },
  { name: 'Kinh tế số', code: '7310109', aliases: ['kinh te so'] },
  { name: 'Thương mại điện tử', code: '7340122', aliases: ['thuong mai dien tu'] },
  { name: 'Bất động sản', code: '7340116', aliases: ['bat dong san'] },
  { name: 'Logistics và quản lý chuỗi cung ứng', code: '7510605', aliases: ['logistics', 'chuoi cung ung'] },
  { name: 'Quản lý công nghiệp', code: '7510601', aliases: ['quan ly cong nghiep'] },
  { name: 'Ngôn ngữ Anh', code: '7220201', aliases: ['ngon ngu anh'] },
  { name: 'Quản trị khách sạn', code: '7810201', aliases: ['quan tri khach san'] },
  { name: 'Quản trị nhà hàng và dịch vụ ăn uống', code: '7810202', aliases: ['quan tri nha hang', 'dich vu an uong'] },
  { name: 'Quản trị dịch vụ du lịch và lữ hành', code: '7810103', aliases: ['quan tri dich vu du lich', 'du lich lu hanh'] },
  { name: 'Công nghệ sinh học', code: '7420201', aliases: ['cong nghe sinh hoc'] },
];

const TUITION_GROUPS = [
  { fee: '12–13 triệu đồng', majors: ['quan ly tai nguyen', 'quan ly dat dai', 'quan ly cong nghiep', 'kinh te so', 'du lich', 'khach san', 'nha hang', 'ngon ngu anh', 'ke toan', 'tai chinh ngan hang', 'thuong mai dien tu', 'kinh doanh quoc te', 'marketing', 'quan tri kinh doanh', 'truyen thong da phuong tien', 'quan he cong chung', 'luat kinh te'] },
  { fee: '14–15 triệu đồng', majors: ['cong nghe thong tin', 'cntt', 'khoa hoc may tinh', 'ky thuat phan mem', 'mang may tinh', 'tri tue nhan tao', 'bat dong san', 'luat quoc te', 'nganh luat', 'thiet ke do hoa', 'logistics', 'ky thuat xay dung', 'quan ly xay dung', 'kien truc'] },
  { fee: '16–19 triệu đồng', majors: ['dieu duong', 'cong nghe ky thuat hoa hoc', 'cong nghe thuc pham', 'ky thuat xet nghiem', 'quan ly benh vien', 'co dien tu', 'dien dien tu', 'co khi dong luc'] },
  { fee: '20–23 triệu đồng', majors: ['cong nghe ky thuat o to', 'cong nghe o to', 'o to dien', 'vi mach ban dan', 'ky thuat y sinh', 'ky thuat hinh anh'] },
  { fee: '27 triệu đồng', majors: ['duoc hoc'] },
  { fee: '33 triệu đồng', majors: ['y hoc du phong'] },
  { fee: '48–50 triệu đồng', majors: ['y khoa', 'rang ham mat', 'nha khoa'] },
];

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function contains(query: string, terms: string[]): boolean {
  return terms.some((term) => query.includes(term));
}

function result(evidence: DncEvidence[]): DncLookup {
  return {
    evidence,
    fallback: evidence.length
      ? evidence.map(({ answer, source }) => `${answer} [Nguồn](${source})`).join('\n\n')
      : DNC_UNKNOWN,
  };
}

function findMajor(query: string): Major | undefined {
  return MAJORS.find((major) => major.aliases.some((alias) => query.includes(alias)) || query.includes(major.code));
}

function findMajors(query: string): Major[] {
  const candidates = MAJORS.flatMap((major) => [major.code, ...major.aliases].filter(Boolean).map((alias) => ({ major, alias })))
    .sort((a, b) => b.alias.length - a.alias.length);
  const occupied: Array<[number, number]> = [];
  const matches: Array<{ major: Major; start: number }> = [];
  for (const { major, alias } of candidates) {
    const start = query.indexOf(alias);
    if (start < 0 || occupied.some(([from, to]) => start < to && start + alias.length > from)) continue;
    if (matches.some((item) => item.major.code === major.code)) continue;
    occupied.push([start, start + alias.length]);
    matches.push({ major, start });
  }
  return matches.sort((a, b) => a.start - b.start).map((item) => item.major);
}

function tuitionFor(major: Major): string | null {
  const group = TUITION_GROUPS.find((item) => item.majors.some((alias) => major.aliases.some((name) => name.includes(alias) || alias.includes(name))));
  return group?.fee ?? null;
}

/** Chỉ trả về chứng cứ liên quan đến câu hỏi; không đưa dữ kiện chưa xác minh vào prompt. */
export function findDncEvidence(question: string, previousUserQuestion = ''): DncLookup | null {
  const query = normalize(question.trim());
  const previous = normalize(previousUserQuestion);
  const asksMajorInfo = contains(query, ['thong tin', 'gioi thieu', 'nganh ', 'hoc gi', 'dao tao', 'co nganh', 'tim hieu']);
  const asksAi = contains(query, ['tri tue nhan tao']) || /\bai\b/.test(query);
  if (query.includes('dai hoc can tho') && !query.includes('nam can tho')) return null;
  const hospital = contains(query, ['benh vien']) && !contains(query, ['quan ly benh vien']) ||
    !contains(query, ['truong', 'ky tuc xa', 'ktx', 'showroom', 'hoc phi', 'nganh']) &&
    contains(previous, ['benh vien']) && contains(query, ['no', 'do', 'o dau', 'dia chi', 'lien he', 'so dien thoai', 'them', 'con']);
  if (hospital) {
    if (contains(query, ['dia chi', 'o dau', 'toa lac', 'vi tri'])) return result([{ answer: 'Bệnh viện Đại học Nam Cần Thơ ở số 168 đường song hành Quốc lộ 1A, khu dân cư Hồng Loan, phường Cái Răng, TP. Cần Thơ.', source: SOURCES.hospitalContact }]);
    if (contains(query, ['hotline', 'so dien thoai', 'lien he', 'cap cuu'])) return result([{ answer: 'Bệnh viện Đại học Nam Cần Thơ: số hành chính 02923 886 168; cấp cứu 02923 686 115.', source: SOURCES.hospitalContact }]);
    if (contains(query, ['giuong'])) return result([{ answer: 'Bệnh viện Đại học Nam Cần Thơ có quy mô 300 giường.', source: SOURCES.hospitalAbout }]);
    if (/\b(gia|phi)\b/.test(query) || contains(query, ['bao nhieu tien', 'lich kham', 'bac si', 'chuyen khoa', 'gio mo cua'])) return result([]);
    return result([
      { answer: 'Bệnh viện Đại học Nam Cần Thơ khám chữa bệnh và là nơi thực hành cho sinh viên khối ngành Sức khỏe. Bệnh viện có quy mô 300 giường và khai trương ngày 08/06/2022.', source: SOURCES.hospitalAbout },
    ]);
  }
  if (contains(query, ['showroom', 'trung bay o to'])) {
    if (contains(query, ['dia chi', 'o dau', 'vi tri'])) return result([{ answer: 'Showroom Ô tô Nam Cần Thơ DNC ở số 166 đường song hành Quốc lộ 1A, khu dân cư Hồng Loan, phường Hưng Thạnh, TP. Cần Thơ.', source: SOURCES.showroom }]);
    if (contains(query, ['hotline', 'lien he', 'so dien thoai', 'gia xe', 'gio mo cua'])) return result([]);
    return result([{ answer: 'Showroom Ô tô Nam Cần Thơ DNC phục vụ trưng bày, kinh doanh ô tô và là nơi thực hành cho sinh viên ngành ô tô, cơ khí động lực.', source: SOURCES.showroom }]);
  }
  if (contains(query, ['thu vien'])) {
    if (contains(query, ['gio mo cua', 'may gio', 'phi', 'muon sach'])) return result([]);
    return result([{ answer: 'Trường có Thư viện điện tử phục vụ học tập, giảng dạy và nghiên cứu; bạn có thể tra cứu tại website thư viện.', source: SOURCES.library }]);
  }
  // Một quy tắc chung cho mọi ngành được trường công bố, kể cả câu hỏi nhiều ngành.
  const explicitMajors = findMajors(query);
  if (asksAi && !explicitMajors.some((major) => major.code === '7480107') &&
    (asksMajorInfo || contains(query, ['hoc phi', 'ma nganh', 'to hop', 'diem san', 'diem chuan']))) {
    explicitMajors.push(MAJORS.find((major) => major.code === '7480107')!);
  }
  const followUp = /^(con|the|vay|nganh|ma|bao nhieu)\b/.test(query);
  const majors = explicitMajors.length ? explicitMajors : followUp ? findMajors(previous) : [];
  const previousTuition = followUp && contains(previous, ['hoc phi', 'chi phi hoc']);
  if (majors.length && (asksMajorInfo || contains(query, ['hoc phi', 'chi phi hoc', 'ma nganh', 'ma xet tuyen', 'to hop', 'xet khoi', 'khoi nao', 'diem san', 'diem chuan']) || previousTuition)) {
    if (contains(query, ['hoc phi', 'chi phi hoc']) || previousTuition) {
      const evidence = majors.map((major) => ({ major, fee: tuitionFor(major) })).filter((item) => item.fee);
      if (evidence.length !== majors.length) return result([]);
      return result([{ answer: `Học phí học kỳ I năm 2026: ${evidence.map(({ major, fee }) => `${major.name} khoảng ${fee}`).join('; ')}. Mức thực tế tính theo số tín chỉ.`, source: SOURCES.tuition }]);
    }
    if (contains(query, ['ma nganh', 'ma xet tuyen'])) return result([{ answer: `Mã ngành tuyển sinh 2026: ${majors.map((major) => `${major.name} ${major.code}`).join('; ')}.`, source: SOURCES.admissions }]);
    if (contains(query, ['to hop', 'xet khoi', 'khoi nao'])) {
      if (majors.length === 1 && majors[0].code === '7720101') return result([{ answer: 'Tổ hợp xét tuyển Y khoa năm 2026: A00, A02, B00, B03, D07, D08.', source: SOURCES.admissions }]);
      if (majors.length === 1 && majors[0].code === '7480201') return result([{ answer: 'Tổ hợp xét tuyển Công nghệ thông tin năm 2026: A00, A01, A02, C01, D01, X06, X08, X25, X26.', source: SOURCES.admissions }]);
      return result([]);
    }
    if (contains(query, ['diem san', 'diem chuan'])) return result([]);
    if (contains(query, ['luong', 'viec lam', 'ra truong', 'hoc may nam', 'thoi gian dao tao', 'mon hoc'])) return result([]);
    if (contains(query, ['hoc gi']) && majors.some((major) => !['7480201', '7480107'].includes(major.code))) return result([]);
    return result(majors.map((major) => {
      if (major.code === '7480201') return { answer: 'Ngành Công nghệ thông tin tại DNC học nền tảng về cấu trúc dữ liệu, giải thuật, hệ điều hành, cơ sở dữ liệu và mạng máy tính; chương trình hướng tới xây dựng, phát triển và vận hành hệ thống công nghệ.', source: SOURCES.itMajor };
      if (major.code === '7480107') return { answer: 'Ngành Trí tuệ nhân tạo tại DNC đào tạo theo hướng ứng dụng, tập trung vào dữ liệu và tự động hóa. Đây là ngành riêng trong danh mục tuyển sinh 2026.', source: SOURCES.aiMajor };
      return { answer: `DNC tuyển sinh ngành ${major.name} (mã ${major.code}) năm 2026.`, source: SOURCES.admissions };
    }));
  }
  const campusTopic = contains(query, ['hoc phi', 'hoc bong', 'xet tuyen', 'tuyen sinh', 'hoc ba', 'ky tuc xa', 'ktx', 'ma nganh', 'ma truong', 'diem san', 'diem chuan', 'nganh hoc', 'thong tin nganh', 'cong thong tin sinh vien']) || (contains(query, ['truong']) && contains(query, ['o dau', 'dia chi', 'gioi thieu']));
  const hasDnc = contains(query, ['nam can tho', 'dnc', 'nctu', 'mydnc']) ||
    (contains(previous, ['nam can tho', 'dnc', 'nctu', 'mydnc']) &&
      (campusTopic || Boolean(findMajor(query)) || /^(con|the|vay|no|o dau|bao nhieu|ma)\b/.test(query)));
  if (!hasDnc && !campusTopic) return null;
  if (/\bdai hoc (?!nam can tho)/.test(query) && !contains(query, ['nam can tho', 'dnc', 'nctu'])) return null;
  if (query.includes('dai hoc can tho') && !query.includes('nam can tho')) return null;

  const evidence: DncEvidence[] = [];
  const add = (answer: string, source: string) => evidence.push({ answer, source });
  const major = findMajor(query) ?? findMajor(previous);

  if (contains(query, ['hoc bong'])) {
    add('Đợt tuyển sinh chính 2026, DNC công bố hơn 2.000 suất học bổng đầu vào, giá trị 6–27 triệu đồng tùy diện xét.', SOURCES.scholarship);
    add('Đợt bổ sung 22–31/08/2026 từng có học bổng 3,5–30 triệu đồng và hiện đã hết thời hạn công bố; chưa có căn cứ về đợt đang mở.', SOURCES.additionalScholarship);
  }

  if (contains(query, ['hoc phi', 'bao nhieu tien', 'chi phi hoc']) || (major && contains(previous, ['hoc phi']) && contains(query, ['con', 'the']))) {
    if (!contains(query, ['ktx', 'ky tuc xa', 'phong o', 'noi tru'])) {
      const groups = TUITION_GROUPS.filter((group) => group.majors.some((name) => query.includes(name)));
      const selected = groups.length ? groups : TUITION_GROUPS.filter((group) => group.majors.some((name) => previous.includes(name)));
      if (selected.length === 1) add(`Học phí học kỳ I năm 2026 của ngành được hỏi khoảng ${selected[0].fee}. Học phí thực tế = đơn giá tín chỉ × số tín chỉ; DNC công bố 2 học kỳ/năm.`, SOURCES.tuition);
      else if (selected.length > 1) {
        const fees = selected.map((group) => {
          const alias = group.majors.find((name) => query.includes(name)) || '';
          const name = MAJORS.find((item) => item.aliases.includes(alias))?.name || alias;
          return `${name}: ${group.fee}`;
        });
        add(`Học phí học kỳ I năm 2026: ${fees.join('; ')}. Học phí thực tế tính theo tín chỉ.`, SOURCES.tuition);
      } else if (!contains(query, ['nganh ']) || contains(query, ['cac nganh', 'bao nhieu nganh', 'hoc phi the nao'])) {
        add('Học phí học kỳ I năm 2026 khoảng 12–50 triệu đồng tùy ngành. Học phí tính theo tín chỉ; DNC công bố 2 học kỳ/năm.', SOURCES.tuition);
      }
    }
  }
  if (contains(query, ['ky tuc xa', 'ktx']) && contains(query, ['gia', 'phi', 'bao nhieu tien', 'chi phi'])) {
    add('Theo trang ký túc xá của trường, phòng 10 người có giá 435.000 đồng/tháng, tổng 2.610.000 đồng/6 tháng; mức này đã gồm điện, nước, phí vệ sinh, an ninh và tiện ích cơ bản. Giá và chỗ trống có thể thay đổi.', SOURCES.dorm);
  }

  if (contains(query, ['ma nganh', 'ma xet tuyen'])) {
    if (major) add(`Mã ngành ${major.name} năm 2026 là ${major.code}.`, SOURCES.admissions);
  } else if (contains(query, ['to hop', 'xet khoi', 'khoi nao'])) {
    if (major?.code === '7720101') add('Tổ hợp xét tuyển Y khoa năm 2026: A00, A02, B00, B03, D07, D08.', SOURCES.admissions);
    if (major?.code === '7480201') add('Tổ hợp xét tuyển Công nghệ thông tin năm 2026: A00, A01, A02, C01, D01, X06, X08, X25, X26.', SOURCES.cutoff);
  } else if (contains(query, ['phuong thuc', 'xet tuyen', 'hoc ba', 'v-sat', 'vsat'])) {
    if (contains(query, ['diem chuan', 'diem san', 'nguong', 'dieu kien'])) {
      // Các điểm số/điều kiện theo ngành không được suy ra từ phương thức chung.
    } else if (contains(query, ['hoc ba']) && !contains(query, ['phuong thuc', 'nhung cach'])) {
      add('Năm 2026, DNC xét học bạ theo điểm trung bình chung cả năm lớp 10, 11, 12 của ba môn trong tổ hợp xét tuyển (mã 200).', SOURCES.admissions);
    } else {
      add('Năm 2026, DNC có 5 phương thức: điểm thi THPT (100), học bạ (200), V-SAT (417), kết hợp thi THPT và học bạ (407), bằng THPT nước ngoài (411); xét tuyển thẳng theo quy chế.', SOURCES.admissions);
    }
  }

  if (contains(query, ['dieu kien', 'nguong dau vao']) && contains(query, ['hoc ba', 'xet tuyen', 'tuyen sinh'])) {
    if (major && ['7720101', '7720501', '7720201'].includes(major.code)) {
      add('Với Y khoa, Răng - Hàm - Mặt, Dược học năm 2026: học lực lớp 12 đạt loại tốt và tổng điểm ba môn thi tốt nghiệp THPT từ 20, hoặc điểm xét tốt nghiệp từ 8,5.', SOURCES.admissionConditions);
    } else if (major && ['7720110', '7720301'].includes(major.code)) {
      add('Với Y học dự phòng và Điều dưỡng năm 2026: học lực lớp 12 đạt loại khá và tổng điểm ba môn thi tốt nghiệp THPT từ 16,5, hoặc điểm xét tốt nghiệp từ 6,5.', SOURCES.admissionConditions);
    }
  }

  if (contains(query, ['diem san']) && !major) add('Năm 2026, các ngành ngoài nhóm Sức khỏe và Luật có điểm sàn thi THPT chung là 15; nhóm Sức khỏe và Luật theo ngưỡng riêng.', SOURCES.cutoff);

  if (contains(query, ['bao nhieu nganh', 'co nhung nganh', 'nganh nao', 'danh sach nganh', 'nganh hoc'])) {
    add('Theo danh mục tuyển sinh 2026, DNC công bố 49 ngành đại học chính quy ở các nhóm Sức khỏe, Công nghệ – Kỹ thuật, Kinh tế – Quản trị, Truyền thông, Du lịch – Dịch vụ và Luật.', SOURCES.majors);
  }
  if (major && contains(query, ['co nganh', 'dao tao nganh', 'co dao tao'])) {
    add(`DNC có tuyển sinh ngành ${major.name} năm 2026 (mã ${major.code}).`, SOURCES.admissions);
  }

  if (contains(query, ['dia chi', 'o dau', 'toa lac', 'vi tri'])) {
    if (contains(query, ['benh vien'])) {
      add('Bệnh viện Đại học Nam Cần Thơ ở số 168 đường song hành Quốc lộ 1A, khu dân cư Hồng Loan, phường Cái Răng, TP. Cần Thơ.', SOURCES.hospitalContact);
    } else if (contains(query, ['ky tuc xa', 'ktx'])) {
      add('Ký túc xá nằm trong khuôn viên Trường Đại học Nam Cần Thơ, 168 Nguyễn Văn Cừ (nối dài), Phường An Bình, TP. Cần Thơ.', SOURCES.dorm);
    } else if (!contains(query, ['resort', 'showroom', 'thu vien', 'phong ', 'khoa '])) {
      add('Trụ sở Trường Đại học Nam Cần Thơ: 168 Nguyễn Văn Cừ (nối dài), Phường An Bình, TP. Cần Thơ.', SOURCES.admissions);
    }
  }
  if (contains(query, ['ma truong'])) add('Mã trường tuyển sinh của Trường Đại học Nam Cần Thơ là DNC.', SOURCES.admissions);
  if (contains(query, ['hotline', 'so dien thoai', 'lien he'])) {
    if (contains(query, ['it ', 'mydnc', 'tai khoan sinh vien'])) add('Hỗ trợ tài khoản MyDNC: Trung tâm Phát triển & Ứng dụng phần mềm, số 02923 851 136, email ttphanmem@nctu.edu.vn.', SOURCES.mydnc);
    else if (contains(query, ['benh vien'])) add('Bệnh viện Đại học Nam Cần Thơ: số hành chính 02923 886 168; cấp cứu 02923 686 115.', SOURCES.hospitalContact);
    else if (contains(query, ['ky tuc xa', 'ktx'])) add('Liên hệ Ban Quản lý Ký túc xá: 0366 445 168 hoặc 02923 508 668; email bql.kytucxa@nctu.edu.vn.', SOURCES.dorm);
    else if (!contains(query, ['phong ', 'khoa '])) add('Liên hệ tuyển sinh: 02923 798 168; Hotline/Zalo: 0939 257 838.', SOURCES.admissions);
  }

  if (contains(query, ['thanh lap', 'lich su', 'nam nao ra doi'])) {
    add('Trường Đại học Nam Cần Thơ được thành lập ngày 25/01/2013 theo Quyết định 230/QĐ-TTg; được phép hoạt động đào tạo ngày 12/04/2013 theo Quyết định 1335/QĐ-BGDĐT.', SOURCES.history);
  }
  if (contains(query, ['truong thanh vien'])) {
    add('Năm 2026, DNC công bố bốn trường thành viên: Khoa học Sức khỏe, Luật – Kinh tế, Công nghệ số và Trí tuệ nhân tạo, Công nghệ – Kỹ thuật.', SOURCES.history);
  }
  if (contains(query, ['gioi thieu', 'truong nao', 'dnc la gi', 've truong']) && !contains(query, ['ky tuc xa', 'ktx', 'mydnc', 'thu vien', 'showroom', 'resort'])) {
    add('DNC là Trường Đại học Nam Cần Thơ, thành lập năm 2013, trụ sở tại 168 Nguyễn Văn Cừ (nối dài), Phường An Bình, TP. Cần Thơ.', SOURCES.history);
  }
  if (contains(query, ['truong tu', 'tu thuc', 'cong lap', 'ngoai cong lap'])) {
    add('Trường Đại học Nam Cần Thơ là cơ sở giáo dục đại học tư thục.', SOURCES.overview);
  }

  if (contains(query, ['mydnc', 'cong thong tin sinh vien', 'sv.nctu.edu.vn', 'email sinh vien', 'dang nhap']) && hasDnc) {
    add('MyDNC ở https://sv.nctu.edu.vn/login. Sinh viên chọn “Đăng nhập với Google” bằng email s[MSSV]@student.nctu.edu.vn; lần đầu dùng mật khẩu trường cấp và đổi mật khẩu mới.', SOURCES.mydnc);
    if (contains(query, ['chuc nang', 'lam duoc gi', 'xem diem', 'lich hoc', 'dang ky hoc phan'])) add('Trên MyDNC có thời khóa biểu, kết quả học tập, đăng ký học phần, chương trình khung, điểm rèn luyện, thông báo và dịch vụ giấy tờ.', SOURCES.mydnc);
  }
  if (contains(query, ['nhap hoc', 'tan sinh vien']) && hasDnc) {
    add('Hướng dẫn nhập học của trường gồm xác nhận nhập học trực tuyến, bổ sung hồ sơ, đóng học phí, nộp hồ sơ tại trường, nhận thẻ và tài khoản sinh viên; đăng ký ký túc xá nếu cần.', SOURCES.enrollment);
  }
  if (contains(query, ['benh vien']) && hasDnc && !contains(query, ['dia chi', 'o dau', 'hotline', 'vi tri', 'toa lac', 'so dien thoai'])) {
    add('Bệnh viện Đại học Nam Cần Thơ vừa khám chữa bệnh vừa là nơi thực hành thực tế cho sinh viên nhóm ngành Sức khỏe.', SOURCES.hospital);
  }
  if (contains(query, ['ky tuc xa', 'ktx']) && hasDnc && !contains(query, ['gia', 'phi', 'bao nhieu tien', 'dia chi', 'o dau'])) {
    if (contains(query, ['dang ky', 'thu tuc', 'lien he'])) add('Sinh viên có thể đăng ký ký túc xá trực tuyến trên trang ký túc xá của trường hoặc gọi 02923 798 123 trong giờ hành chính để được tư vấn.', SOURCES.dorm);
    else add('Trường có ký túc xá trong khuôn viên. Dự án Ký túc xá Quốc tế 15 tầng, dự kiến 2.500 chỗ, được khởi công tháng 01/2026; đây là dự án, không phải số chỗ đang vận hành.', SOURCES.history);
  }
  if (contains(query, ['thu vien']) && hasDnc) add('Trường có Trung tâm Thư viện điện tử phục vụ học tập và nghiên cứu.', SOURCES.history);

  if (!evidence.length && asksMajorInfo && major) add(`Theo thông tin tuyển sinh 2026, DNC có ngành ${major.name} (mã ${major.code}). Nếu bạn muốn biết học phí, tổ hợp xét tuyển hoặc nội dung học, hãy hỏi cụ thể mục đó.`, SOURCES.admissions);

  return result(evidence.slice(0, 3));
}
