/**
 * Process Step Interface - Cấu trúc 3 tầng (điều kiện - xử lý - điều phối)
 *
 * Nguyên tắc: Nếu tình huống xảy ra → xử lý → trả kết quả.
 * Mỗi bước kiểm tra trước khi thực hiện, nếu lỗi throw exception.
 */

/**
 * Dữ liệu đầu vào cho bước xử lý
 */
export interface ProcessInput {
  [key: string]: unknown;
}

/**
 * Kết quả sau khi xử lý
 */
export interface ProcessResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

/**
 * Step xử lý - mỗi bước có 2 hàm: kiểm tra + xử lý
 */
export interface ProcessStep<T extends ProcessInput = ProcessInput> {
  /**
   * Kiểm tra điều kiện trước khi xử lý
   * @returns true nếu điều kiện đáp ứng, false nếu bỏ qua bước này
   * @throws Exception nếu input không hợp lệ
   */
  validate(input: T): Promise<boolean> | boolean;

  /**
   * Thực hiện xử lý chính
   * @returns kết quả sau xử lý (hoặc input mới cho bước tiếp theo)
   * @throws Exception nếu có lỗi trong xử lý
   */
  execute(input: T): Promise<T> | T;

  /**
   * Tên bước (để log / debug)
   */
  name: string;
}

/**
 * Orchestrator - điều phối pipeline xử lý
 */
export interface ProcessOrchestrator<T extends ProcessInput = ProcessInput> {
  /**
   * Chạy pipeline tuần tự
   * @param input dữ liệu đầu vào
   * @param maxRetries số lần retry khi gặp lỗi
   * @returns kết quả cuối cùng
   */
  run(input: T, maxRetries?: number): Promise<ProcessResult>;

  /**
   * Thêm step vào pipeline
   */
  addStep(step: ProcessStep<T>): void;

  /**
   * Xóa step khỏi pipeline
   */
  removeStep(name: string): void;
}
