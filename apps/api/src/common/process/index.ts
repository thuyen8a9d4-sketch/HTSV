/**
 * Process Infrastructure - Cấu trúc 3 tầng (điều kiện - xử lý - điều phối)
 *
 * Sử dụng:
 * 1. Tạo các ProcessStep implement từng tầng logic
 * 2. Thêm vào ProcessOrchestrator
 * 3. Chạy pipeline với orchestrator.run(input)
 *
 * Ví dụ:
 * ```ts
 * const orchestrator = createProcessOrchestrator<LoginInput>();
 *
 * // Step 1: Kiểm tra user tồn tại
 * orchestrator.addStep({
 *   name: 'find-user',
 *   validate: (input) => !!input.username,
 *   execute: async (input) => ({
 *     ...input,
 *     user: await usersService.findByUsername(input.username),
 *   }),
 * });
 *
 * // Step 2: Kiểm tra mật khẩu
 * orchestrator.addStep({
 *   name: 'verify-password',
 *   validate: (input) => !!input.user && !!input.password,
 *   execute: async (input) => ({
 *     ...input,
 *     passwordValid: await argon2.verify(input.user.passwordHash, input.password),
 *   }),
 * });
 *
 * // Chạy
 * const result = await orchestrator.run({ username: 'john', password: 'secret' });
 * if (result.success) {
 *   const loginData = result.data as LoginInput;
 * }
 * ```
 */

export { ProcessModule } from './process.module';
export {
  ProcessStep,
  ProcessInput,
  ProcessResult,
  ProcessOrchestrator,
} from './process-step.interface';
export { DefaultProcessOrchestrator, createProcessOrchestrator } from './process-orchestrator';
