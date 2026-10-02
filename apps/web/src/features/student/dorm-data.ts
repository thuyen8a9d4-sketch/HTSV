export interface DormRoomType {
  id: string;
  name: string;
  capacity: number;
  pricePerMonth: number;
  amenities: string[];
  availableRooms: number;
}

// Thông tin ký túc xá mẫu — hệ thống chưa nối dữ liệu phòng/hợp đồng thật (P9 trong backlog).
export const dormRoomTypes: DormRoomType[] = [
  { id: '6-nguoi', name: 'Phòng 6 người', capacity: 6, pricePerMonth: 350_000, amenities: ['Quạt trần', 'Tủ cá nhân', 'Wifi'], availableRooms: 4 },
  { id: '4-nguoi', name: 'Phòng 4 người', capacity: 4, pricePerMonth: 450_000, amenities: ['Quạt trần', 'Tủ cá nhân', 'Wifi', 'Bình nóng lạnh'], availableRooms: 2 },
  { id: '2-nguoi-dieu-hoa', name: 'Phòng 2 người (có điều hòa)', capacity: 2, pricePerMonth: 900_000, amenities: ['Điều hòa', 'Tủ cá nhân', 'Wifi', 'Bình nóng lạnh'], availableRooms: 0 },
];
