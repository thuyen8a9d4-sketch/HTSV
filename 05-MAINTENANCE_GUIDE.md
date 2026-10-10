# 🔧 MAINTENANCE GUIDE - Hướng Dẫn Bảo Trì (Phần 1)

## 📐 Cấu Trúc Process Infrastructure

### Folder Structure
```
apps/api/src/common/process/
├── process-step.interface.ts     (Interfaces)
├── process-orchestrator.ts       (Main class)
├── index.ts                      (Exports)
├── process.module.ts             (NestJS module)
└── __tests__/
    └── process-orchestrator.spec.ts (Tests)
```

### Modules Using Infrastructure
```
Auth Module
├── auth-orchestrator.ts
├── auth-process-steps.ts
├── auth.module.ts
└── auth.service.ts

Forum Module
├── forum-orchestrator.ts
├── forum-process-*.ts
├── forum.module.ts
└── forum.service.ts

(Tương tự: Moderation, Roles, Permissions)
```

---

## 🔄 Cách Hoạt Động: 3-Layer Architecture

```
Input Data
    ↓
[1] VALIDATION (ProcessStep.validate)
    ├─ Check condition
    ├─ Return true/false
    └─ Throw if invalid
    ↓
[2] EXECUTION (ProcessStep.execute)
    ├─ Do the work
    ├─ Modify data
    └─ Return transformed data
    ↓
[3] ORCHESTRATION (ProcessOrchestrator.run)
    ├─ Run steps sequentially
    ├─ Pass output → input
    ├─ Handle errors & retry
    └─ Return result
    ↓
Result { success, data, error }
```

---

## 🐛 Cách Debug - Common Issues

### Issue 1: Red Lines in VS Code

```
Solution:
1. Ctrl+Shift+P
2. Type: "TypeScript: Restart TS Server"
3. Wait 3-5 seconds
4. Check file again
```

### Issue 2: Build Fails

```bash
# See full error
pnpm --filter api build

# Check specifically
pnpm --filter api exec tsc --noEmit
```

### Issue 3: "Cannot find module" Error

**Check:**
1. File exists at path?
2. Export in index.ts?
3. Import path correct?
4. Restart TS Server?

### Issue 4: Process Pipeline Fails

**Debug checklist:**
- [ ] Orchestrator in @Module providers?
- [ ] Service injects orchestrator?
- [ ] All steps added to orchestrator?
- [ ] Steps in correct order?
- [ ] Each step returns data?
- [ ] Errors thrown on invalid data?

---

## ➕ Cách Thêm Feature Mới

### Pattern: New Orchestrator

**File 1: Process Steps**
```typescript
// newmodule-process-steps.ts
import { ProcessStep, ProcessInput } from '../../common/process';

export interface MyInput extends ProcessInput {
  data: string;
  result?: unknown;
}

export const myStep: ProcessStep<MyInput> = {
  name: 'my-step',
  validate: (input) => !!input.data,
  execute: async (input) => {
    return { ...input, result: 'done' };
  },
};
```

**File 2: Orchestrator**
```typescript
// newmodule-orchestrator.ts
import { Injectable } from '@nestjs/common';
import { createProcessOrchestrator } from '../../common/process';
import { myStep, MyInput } from './newmodule-process-steps';

@Injectable()
export class NewModuleOrchestrator {
  async orchestrate(input: MyInput) {
    const orch = createProcessOrchestrator<MyInput>();
    orch.addStep(myStep);
    
    const result = await orch.run(input);
    if (!result.success) throw new Error(result.error);
    return result.data;
  }
}
```

**File 3: Module**
```typescript
// newmodule.module.ts
@Module({
  providers: [NewModuleOrchestrator, NewModuleService],
})
export class NewModuleModule {}
```

**File 4: Service**
```typescript
// newmodule.service.ts
@Injectable()
export class NewModuleService {
  constructor(
    private readonly orch: NewModuleOrchestrator,
  ) {}

  async doSomething() {
    return this.orch.orchestrate({ data: 'hello' });
  }
}
```

---

## 🚨 Common Mistakes

### ❌ Forget return in execute
```typescript
// WRONG
execute(input) {
  const data = getData();
  // No return!
}

// RIGHT
execute(input) {
  const data = getData();
  return { ...input, data };
}
```

### ❌ Not spread input
```typescript
// WRONG - loses previous data
return { data: newData };

// RIGHT
return { ...input, data: newData };
```

### ❌ Don't add step
```typescript
// WRONG
const orch = createProcessOrchestrator();
// Step not added!
await orch.run(input);

// RIGHT
orch.addStep(myStep);
await orch.run(input);
```

### ❌ Wrong step order
```typescript
// WRONG - uses roles before getting them
addStep(useRolesStep);
addStep(getRolesStep);

// RIGHT
addStep(getRolesStep);      // First
addStep(useRolesStep);      // Then use
```

---

## ✅ Verification Checklist

After changes:
- [ ] Functions complete (return value)
- [ ] Braces balanced ({ = })
- [ ] Imports present
- [ ] Exports added
- [ ] Orchestrator provided
- [ ] Service injects
- [ ] Steps in order
- [ ] No duplicate code
- [ ] `pnpm --filter api build` passes
- [ ] `pnpm --filter api lint` passes

---

## 📖 Quick Reference

| Need | See |
|------|-----|
| Quick start | `01-QUICK_START.md` |
| Understand issue | `02-WHAT_WAS_WRONG.md` |
| See code changes | `03-CODE_CHANGES.md` |
| File list | `04-FILES_MODIFIED.md` |
| Verify all | `06-VERIFICATION_CHECKLIST.md` |
| Troubleshoot | `07-COMMON_ISSUES.md` |

---

Tiếp tục: `06-VERIFICATION_CHECKLIST.md`
