# 🚨 COMMON ISSUES - Troubleshooting

## Issue 1: Still See Red Lines After Restart

### Symptom
Red underlines in files even after Restart TS Server

### Solution
```
Step 1: Ctrl+Shift+P → Restart TS Server
Step 2: Wait 3-5 seconds
Step 3: Close VS Code completely
Step 4: Reopen VS Code
Step 5: Wait 10 seconds for indexing
Step 6: Check file again
```

If still red:
```bash
rm -rf apps/api/.tsbuildinfo
rm -rf apps/api/dist
# Then restart VS Code again
```

---

## Issue 2: "Cannot find module" Error

### Symptom
```
Cannot find module '../../common/process'
```

### Cause & Fix
1. **Check export in index.ts:**
   ```bash
   grep "DefaultProcessOrchestrator" apps/api/src/common/process/index.ts
   ```
   Expected: `export { DefaultProcessOrchestrator, ...`
   If missing → See `03-CODE_CHANGES.md`

2. **Check import path:**
   ```typescript
   // ✅ CORRECT
   import { ... } from '../../common/process';
   
   // ❌ WRONG
   import { ... } from '../../common/process/index.ts';
   ```

---

## Issue 3: Build Fails

### Command
```bash
pnpm --filter api build
```

### Check Error
```bash
# See full error
pnpm --filter api build 2>&1 | head -100
```

### Common Errors

| Error | Fix |
|-------|-----|
| "Expected ','" | Check braces: `{ }` balanced |
| "Expression expected" | Function not complete - has return? |
| "Cannot find name X" | Missing import statement |
| "Module not found" | File doesn't exist or path wrong |

### Fix Process
1. Find error file and line number
2. Open file at that line
3. Fix the issue
4. Retry build
5. Clear cache if stuck: `rm -rf apps/api/dist`

---

## Issue 4: Lint Fails

### Command
```bash
pnpm --filter api lint
```

### Auto-Fix
```bash
pnpm --filter api lint --fix
```

---

## Issue 5: TypeScript Errors

### Common Errors

**TS2304: Cannot find name 'X'**
```typescript
// ADD MISSING IMPORT
import { ProcessStep } from '../../common/process';
```

**TS2305: Module has no exported member 'X'**
1. Check source file exports it
2. Check import path
3. If needed, add export to source file

---

## Issue 6: Process Pipeline Fails (Runtime)

### Check Orchestrator
```typescript
// Must provide in module
@Module({
  providers: [MyOrchestrator, MyService],
})
```

### Check Service Injection
```typescript
constructor(
  private readonly orch: MyOrchestrator,  // Inject it
) {}
```

### Check Steps
```typescript
// Steps added in correct order?
addStep(step1);  // Check dependencies
addStep(step2);
addStep(step3);
```

### Check Return Values
```typescript
// Each step must return modified input
execute(input) {
  return { ...input, newField: value };  // MUST return!
}
```

---

## Quick Recovery (Step-by-Step)

```
1. Close VS Code

2. Clear caches
   rm -rf apps/api/.tsbuildinfo
   rm -rf apps/api/dist

3. Reopen VS Code
   Wait 10 seconds

4. Restart TS Server
   Ctrl+Shift+P → Restart TS Server
   Wait 3-5 seconds

5. Check file
   Should be green ✅

6. Build
   pnpm --filter api build

7. Still error?
   → Find matching issue above
   → Apply fix
   → Repeat from Step 1
```

---

## 📚 Reference Files

| Need | Read |
|------|------|
| Quick start | `01-QUICK_START.md` |
| Understand issue | `02-WHAT_WAS_WRONG.md` |
| See code changes | `03-CODE_CHANGES.md` |
| Maintenance | `05-MAINTENANCE_GUIDE.md` |
| Verify all | `06-VERIFICATION_CHECKLIST.md` |

---

**Keep this file handy for troubleshooting!**
