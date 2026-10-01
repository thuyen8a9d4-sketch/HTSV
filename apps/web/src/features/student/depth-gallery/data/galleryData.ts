import student01 from '../../../../assets/gallery/student-01-learning.jpg';
import student02 from '../../../../assets/gallery/student-02-community.png';
import student03 from '../../../../assets/gallery/student-03-library.jpg';
import student04 from '../../../../assets/gallery/student-04-innovation.png';
import student05 from '../../../../assets/gallery/student-05-campus.jpg';

export interface SlideLayout {
  top: string;
  left?: string;
  right?: string;
  transform: string;
  alignment?: 'left' | 'right';
}

export interface GalleryPlaneItem {
  id: string;
  fallbackColor: string;
  accentColor: string;
  textureSrc: string;
  position: { x: number; y: number };
  backgroundColor: string;
  blob1Color: string;
  blob2Color: string;
  layout: SlideLayout;
  label: {
    word: string;
    subword: string;
    tag: string;
    description: string;
    pms: string;
    color: string;
  };
  action: {
    label: string;
    path: string;
  };
}

export const galleryPlaneData: GalleryPlaneItem[] = [
  {
    id: 'learning',
    fallbackColor: '#f59e0b',
    accentColor: '#f59e0b',
    textureSrc: student01,
    position: { x: 0.65, y: 0 },
    backgroundColor: '#fffaf0',
    blob1Color: '#fde047',
    blob2Color: '#fb923c',
    layout: {
      top: '38%',
      left: 'clamp(1.5rem, 7vw, 6rem)',
      transform: 'translateY(-38%)',
      alignment: 'left',
    },
    label: {
      word: 'GIẢNG ĐƯỜNG',
      subword: 'Học tập · Hỗ trợ sinh viên',
      tag: 'HỌC VỤ & KHẢO THÍ',
      description: 'Tìm hướng dẫn học vụ, tạo yêu cầu hỗ trợ mẫu và theo dõi hồ sơ ngay trên HTSV.',
      pms: 'PMS 137 C',
      color: '#1f2937',
    },
    action: {
      label: 'Tìm hỗ trợ học vụ',
      path: '/support',
    },
  },
  {
    id: 'community',
    fallbackColor: '#0284c7',
    accentColor: '#0284c7',
    textureSrc: student02,
    position: { x: -0.72, y: 0 },
    backgroundColor: '#f0f9ff',
    blob1Color: '#38bdf8',
    blob2Color: '#818cf8',
    layout: {
      top: '46%',
      right: 'clamp(1.5rem, 8vw, 8rem)',
      transform: 'translateY(-46%)',
      alignment: 'right',
    },
    label: {
      word: 'DIỄN ĐÀN',
      subword: 'Confession · Kết nối',
      tag: 'CỘNG ĐỒNG SINH VIÊN',
      description: 'Không gian an toàn, ẩn danh để chia sẻ những câu chuyện giảng đường, tìm kiếm sự thấu hiểu và kết nối.',
      pms: 'PMS 2925 C',
      color: '#0f172a',
    },
    action: {
      label: 'Vào diễn đàn HTSV',
      path: '/forum',
    },
  },
  {
    id: 'services',
    fallbackColor: '#059669',
    accentColor: '#059669',
    textureSrc: student03,
    position: { x: 0.6, y: -0.05 },
    backgroundColor: '#f0fdf4',
    blob1Color: '#34d399',
    blob2Color: '#6ee7b7',
    layout: {
      top: '26%',
      left: 'clamp(1.5rem, 6vw, 5.5rem)',
      transform: 'translateY(-20%)',
      alignment: 'left',
    },
    label: {
      word: 'TIỆN ÍCH',
      subword: 'Biểu mẫu · Dịch vụ',
      tag: 'DỊCH VỤ TRỰC TUYẾN',
      description: 'Tìm tiện ích, hướng dẫn cộng đồng và trải nghiệm tạo hồ sơ mẫu về giấy tờ sinh viên.',
      pms: 'PMS 341 C',
      color: '#064e3b',
    },
    action: {
      label: 'Khám phá tiện ích',
      path: '/services',
    },
  },
  {
    id: 'innovation',
    fallbackColor: '#6366f1',
    accentColor: '#6366f1',
    textureSrc: student04,
    position: { x: 0.8, y: 0.05 },
    backgroundColor: '#f5f3ff',
    blob1Color: '#818cf8',
    blob2Color: '#c084fc',
    layout: {
      top: '64%',
      left: 'clamp(2rem, 13vw, 10.5rem)',
      transform: 'translateY(-50%)',
      alignment: 'left',
    },
    label: {
      word: 'SÁNG TẠO',
      subword: 'Nghiên cứu · Câu lạc bộ',
      tag: 'NGHIÊN CỨU & HOẠT ĐỘNG',
      description: 'Tìm thông tin hoạt động sinh viên từ nhà trường và kết nối với cộng đồng qua diễn đàn HTSV.',
      pms: 'PMS 2726 C',
      color: '#312e81',
    },
    action: {
      label: 'Khám phá đời sống',
      path: '/dorm',
    },
  },
  {
    id: 'campus',
    fallbackColor: '#e11d48',
    accentColor: '#e11d48',
    textureSrc: student05,
    position: { x: -0.70, y: 0 },
    backgroundColor: '#fff1f2',
    blob1Color: '#fb7185',
    blob2Color: '#f472b6',
    layout: {
      top: '45%',
      right: 'clamp(1.5rem, 8vw, 8rem)',
      transform: 'translateY(-45%)',
      alignment: 'right',
    },
    label: {
      word: 'ĐỜI SỐNG',
      subword: 'Ký túc xá · Khuôn viên',
      tag: 'ĐỜI SỐNG HỌC ĐƯỜNG',
      description: 'Tìm thông tin ký túc xá và hoạt động sinh viên qua các nguồn chính thức của nhà trường.',
      pms: 'PMS 1925 C',
      color: '#881337',
    },
    action: {
      label: 'Ký túc xá & Đời sống',
      path: '/dorm',
    },
  },
];
