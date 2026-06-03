import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  try {
    console.log('--- Testing File Upload API (ESM) ---');
    
    // Create a dummy image blob
    const dummyContent = 'DUMMY IMAGE DATA AT ' + new Date().toISOString();
    const blob = new Blob([dummyContent], { type: 'image/jpeg' });
    
    const formData = new FormData();
    formData.append('image', blob, 'test_image.jpg');

    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });

    console.log('Upload status:', res.status);
    const result = await res.json();
    console.log('Upload response:', JSON.stringify(result, null, 2));

    if (result.success && result.url) {
      const publicPath = path.join(__dirname, '..', 'public', result.url);
      console.log('Checking if file exists on disk:', publicPath);
      if (fs.existsSync(publicPath)) {
        console.log('File successfully written to disk! File content:', fs.readFileSync(publicPath, 'utf8'));
      } else {
        console.error('File does NOT exist on disk!');
      }
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

runTest();
