import { ProcessStep } from '../process-step.interface';
import { DefaultProcessOrchestrator } from '../process-orchestrator';

describe('Process Orchestrator', () => {
  it('should execute steps in order', async () => {
    const orchestrator = new DefaultProcessOrchestrator<{
      value: number;
    }>();

    const step1: ProcessStep<{ value: number }> = {
      name: 'step-1',
      validate: async (input) => input.value > 0,
      execute: async (input) => ({ ...input, value: input.value + 1 }),
    };

    const step2: ProcessStep<{ value: number }> = {
      name: 'step-2',
      validate: async (input) => input.value > 1,
      execute: async (input) => ({ ...input, value: input.value * 2 }),
    };

    orchestrator.addStep(step1);
    orchestrator.addStep(step2);

    const result = await orchestrator.run({ value: 1 });

    expect(result.success).toBe(true);
    expect((result.data as { value: number }).value).toBe(4); // (1 + 1) * 2
  });

  it('should handle validation errors', async () => {
    const orchestrator = new DefaultProcessOrchestrator<{
      value: number;
    }>();

    const step: ProcessStep<{ value: number }> = {
      name: 'failing-step',
      validate: async () => false, // Always fail validation
      execute: async (input) => input,
    };

    orchestrator.addStep(step);

    const result = await orchestrator.run({ value: 1 }, 1);

    expect(result.success).toBe(false);
  });
});
