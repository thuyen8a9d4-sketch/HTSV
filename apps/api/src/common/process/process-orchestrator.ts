import { Logger } from '@nestjs/common';
import {
  ProcessInput,
  ProcessOrchestrator,
  ProcessResult,
  ProcessStep,
} from './process-step.interface';

/**
 * Cài đặt chuẩn Orchestrator - điều phối pipeline xử lý
 *
 * Quy trình:
 * 1. Lặp qua các step tuần tự
 * 2. Với mỗi step: validate → execute → trả input cho step tiếp
 * 3. Nếu exception, log + dừng (hoặc retry nếu được chỉ định)
 */
export class DefaultProcessOrchestrator<T extends ProcessInput = ProcessInput>
  implements ProcessOrchestrator<T>
{
  private readonly logger = new Logger(DefaultProcessOrchestrator.name);
  private steps: ProcessStep<T>[] = [];

  addStep(step: ProcessStep<T>): void {
    this.steps.push(step);
  }

  removeStep(name: string): void {
    this.steps = this.steps.filter((s) => s.name !== name);
  }

  async run(input: T, maxRetries = 3): Promise<ProcessResult> {
    let currentInput = input;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        for (const step of this.steps) {
          this.logger.debug(`[${step.name}] Validating...`);

          // Tầng 1: Kiểm tra điều kiện
          let shouldExecute: boolean;
          try {
            shouldExecute = await Promise.resolve(step.validate(currentInput));
          } catch (validateError) {
            this.logger.error(
              `[${step.name}] Validation failed: ${validateError}`,
            );
            throw validateError;
          }

          // Nếu điều kiện không đáp ứng, bỏ qua bước này
          if (!shouldExecute) {
            this.logger.debug(`[${step.name}] Condition not met, skipping.`);
            continue;
          }

          this.logger.debug(`[${step.name}] Executing...`);

          // Tầng 2: Thực hiện xử lý
          try {
            currentInput = await Promise.resolve(
              step.execute(currentInput),
            );
            this.logger.debug(`[${step.name}] Completed successfully.`);
          } catch (executeError) {
            this.logger.error(
              `[${step.name}] Execution failed: ${executeError}`,
            );
            throw executeError;
          }
        }

        // Tầng 3: Điều phối thành công
        return {
          success: true,
          data: currentInput,
        };
      } catch (error) {
        retryCount++;
        this.logger.warn(
          `Process failed (retry ${retryCount}/${maxRetries}): ${error}`,
        );

        // Nếu vượt quá số lần retry, trả lỗi
        if (retryCount >= maxRetries) {
          return {
            success: false,
            error: `Process failed after ${maxRetries} attempts: ${error instanceof Error ? error.message : String(error)}`,
          };
        }

        // Đợi trước khi retry (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retryCount) * 100),
        );
      }
    }

    return {
      success: false,
      error: 'Unknown error',
    };
  }
}

/**
 * Tạo orchestrator mới
 */
export function createProcessOrchestrator<T extends ProcessInput = ProcessInput>(): ProcessOrchestrator<T> {
  return new DefaultProcessOrchestrator<T>();
}
