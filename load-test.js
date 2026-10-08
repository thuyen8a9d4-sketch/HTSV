#!/usr/bin/env node
// HTSV Load Test - Usage: pnpm load-test

const http = require('http');
const URL = 'http://localhost:5173';
const NUM_REQUESTS = 50;
const CONCURRENCY = 10;

let successful = 0, failed = 0, times = [];

console.log('\n═══════════════════════════════════════════\n' +
            '  📊 HTSV Load Test\n' +
            '═══════════════════════════════════════════\n' +
            `  Target: ${URL}\n  Requests: ${NUM_REQUESTS} | Concurrency: ${CONCURRENCY}\n`);

async function makeRequest() {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(URL, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        const time = Date.now() - start;
        times.push(time);
        if (res.statusCode >= 200 && res.statusCode < 300) successful++;
        else failed++;
        resolve();
      });
    });

    req.on('error', () => { failed++; resolve(); });
    req.setTimeout(5000, () => {
      req.destroy();
      failed++;
      resolve();
    });
  });
}

async function run() {
  let done = 0;
  for (let i = 0; i < NUM_REQUESTS; i += CONCURRENCY) {
    const batch = [];
    for (let j = 0; j < CONCURRENCY && i + j < NUM_REQUESTS; j++) {
      batch.push(makeRequest().then(() => {
        done++;
        process.stdout.write(`\r⏳ ${done}/${NUM_REQUESTS} (${Math.round(done/NUM_REQUESTS*100)}%)`);
      }));
    }
    await Promise.all(batch);
  }

  console.log('\n\n═══════════════════════════════════════════');
  const total = successful + failed;
  const errRate = ((failed / total) * 100).toFixed(2);
  
  console.log(`✅ ${successful} success | ❌ ${failed} failed (${errRate}%)`);

  if (times.length > 0) {
    times.sort((a, b) => a - b);
    const mean = times.reduce((a, b) => a + b) / times.length;
    const p95 = times[Math.floor(times.length * 0.95)];
    console.log(`⏱️  ${times[0]}ms-${times[times.length - 1]}ms | Mean: ${mean.toFixed(0)}ms | P95: ${p95}ms`);
    const throughput = (total / (times.reduce((a, b) => a + b) / times.length / 1000)).toFixed(2);
    console.log(`🚀 ${throughput} req/s`);
  }
  
  console.log('═══════════════════════════════════════════');
  console.log(`  ${errRate <= 5 ? '✅ OK' : errRate <= 10 ? '⚠️  WARNING' : '❌ FAILED'}\n`);
  process.exit(errRate > 10 ? 1 : 0);
}

run().catch(err => {
  console.error('❌ Error:', err.message);
  console.log('⚠️  Make sure web app is running: pnpm dev:web\n');
  process.exit(1);
});
