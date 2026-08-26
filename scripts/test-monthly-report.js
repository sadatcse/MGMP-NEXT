import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key && !key.startsWith('#')) {
      process.env[key] = val;
    }
  }
});

async function test() {
  const { sendMonthlyReport } = await import('../src/lib/sendMonthlyReport.js');
  console.log('Generating and sending current month report...');
  const result = await sendMonthlyReport(new Date());
  console.log('Result:', JSON.stringify(result, null, 2));
}

test().catch(console.error);
