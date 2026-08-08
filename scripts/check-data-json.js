import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'public', 'Data.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const items = JSON.parse(raw);

console.log(`Total items in Data.json: ${items.length}\n`);

async function checkUrls() {
  const broken = [];
  const ok = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const img = item.image;
    try {
      if (img.startsWith('http')) {
        const res = await fetch(img, { method: 'HEAD' });
        if (res.ok) {
          ok.push({ name: item.name, img });
        } else {
          broken.push({ name: item.name, img, status: res.status });
        }
      } else if (img.startsWith('/')) {
        const localPath = path.join(process.cwd(), 'public', img);
        if (fs.existsSync(localPath)) {
          ok.push({ name: item.name, img });
        } else {
          broken.push({ name: item.name, img, status: 'FILE_NOT_FOUND' });
        }
      } else {
        broken.push({ name: item.name, img, status: 'INVALID_PATH' });
      }
    } catch (err) {
      broken.push({ name: item.name, img, status: err.message });
    }
  }

  console.log(`=== BROKEN IMAGE LINKS (${broken.length}) ===`);
  broken.forEach(b => {
    console.log(`- ${b.name}: ${b.img} [${b.status}]`);
  });

  console.log(`\nOK Images Count: ${ok.length}`);
}

checkUrls();
