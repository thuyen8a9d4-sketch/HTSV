# Load Test - HTSV

**Usage:**
```bash
# Terminal 1
pnpm dev:web

# Terminal 2 (after 5-10 sec)
pnpm load-test
```

**Customize** `load-test.js`:
```javascript
const URL = 'http://localhost:5173';  // Change URL
const NUM_REQUESTS = 50;               // Change requests
const CONCURRENCY = 10;                // Change concurrency
```

**Output:**
- Response times (Min, Max, Mean, P95)
- Success/Failed ratio
- Error rate %
- Throughput (req/s)
- Status (✅ OK / ⚠️ WARNING / ❌ FAILED)
