import { Module } from '@nestjs/common';
import { createProcessOrchestrator } from './process-orchestrator';

/**
 * Module cung cấp Process Infrastructure
 * - ProcessStep interface
 * - ProcessOrchestrator (điều phối pipeline)
 */
@Module({
  providers: [
    {
      provide: 'ProcessOrchestrator',
      useFactory: () => createProcessOrchestrator(),
    },
  ],
  exports: ['ProcessOrchestrator'],
})
export class ProcessModule {}

// Export utilities cho sử dụng dễ dàng
export { ProcessStep, ProcessInput, ProcessResult } from './process-step.interface';
export { DefaultProcessOrchestrator, createProcessOrchestrator } from './process-orchestrator';
