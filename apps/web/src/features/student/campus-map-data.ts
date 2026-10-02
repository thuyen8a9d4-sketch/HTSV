export interface CampusBuilding {
  code: string;
  name: string;
  description: string;
  rooms: string[];
}

// Sơ đồ khuôn viên mẫu — dùng mã tòa nhà/phòng đã xuất hiện trong thời khóa biểu (student-mock-data.ts) để nhất quán.
export const campusBuildings: CampusBuilding[] = [
  { code: 'A4', name: 'Khu giảng đường A4', description: 'Phòng học lý thuyết dùng chung cho nhiều khoa.', rooms: ['A4-01', 'A4-02', 'A4-03'] },
  { code: 'I2', name: 'Khu phòng máy I2', description: 'Phòng thực hành Công nghệ thông tin.', rooms: ['I2-01 · Phòng máy 1', 'I2-02 · Phòng máy 2', 'I2-03 · Phòng máy 3'] },
  { code: 'I3', name: 'Khu phòng máy I3', description: 'Phòng thực hành Công nghệ thông tin & Thiết kế đồ họa.', rooms: ['I3-02 · Phòng máy 2', 'I3-03 · Phòng máy 3'] },
  { code: 'TV', name: 'Thư viện', description: 'Khu đọc sách, mượn trả tài liệu và phòng tự học.', rooms: ['Tầng 1 · Quầy mượn trả', 'Tầng 2 · Phòng tự học'] },
  { code: 'KTX', name: 'Ký túc xá', description: 'Khu nhà ở nội trú dành cho sinh viên.', rooms: ['Dãy A', 'Dãy B'] },
  { code: 'YT', name: 'Trạm y tế', description: 'Sơ cứu và khám sức khỏe định kỳ cho sinh viên.', rooms: ['Phòng khám', 'Phòng nghỉ'] },
  { code: 'CT', name: 'Căn tin', description: 'Khu ẩm thực phục vụ sinh viên và giảng viên.', rooms: ['Khu A', 'Khu B'] },
];

export const universityAddress = 'Số 168, Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ';
