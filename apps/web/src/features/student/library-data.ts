export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  availableCopies: number;
}

// Danh mục sách mẫu — hệ thống chưa nối cơ sở dữ liệu thư viện thật (P9 trong backlog).
export const libraryCatalog: LibraryBook[] = [
  { id: 'sach-01', title: 'Lập trình C căn bản', author: 'Nguyễn Văn Linh', category: 'Công nghệ thông tin', availableCopies: 5 },
  { id: 'sach-02', title: 'Cấu trúc dữ liệu và giải thuật', author: 'Đinh Mạnh Tường', category: 'Công nghệ thông tin', availableCopies: 2 },
  { id: 'sach-03', title: 'Nhập môn Cơ sở dữ liệu', author: 'Nguyễn Kim Anh', category: 'Công nghệ thông tin', availableCopies: 0 },
  { id: 'sach-04', title: 'Thiết kế đồ họa với Photoshop', author: 'Trần Thu Hà', category: 'Thiết kế', availableCopies: 3 },
  { id: 'sach-05', title: 'Mạng máy tính căn bản', author: 'Nguyễn Thúc Hải', category: 'Mạng máy tính', availableCopies: 4 },
  { id: 'sach-06', title: 'Kỹ năng mềm cho sinh viên', author: 'Lê Thẩm Dương', category: 'Kỹ năng mềm', availableCopies: 8 },
  { id: 'sach-07', title: 'Tiếng Anh giao tiếp chuyên ngành IT', author: 'John Smith', category: 'Ngoại ngữ', availableCopies: 6 },
];

export const borrowDurationDays = 14;
export const lateFeePerDay = 2_000;
