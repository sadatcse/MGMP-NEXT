import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  envText.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      process.env[key] = val;
    }
  });
}

const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const region = process.env.AWS_S3_REGION || 'ap-southeast-1';
const bucketName = process.env.AWS_STORAGE_BUCKET_NAME || 'multigym-website';

console.log('=== AWS S3 Product Data Importer ===');
console.log('Target S3 Bucket:', bucketName);
console.log('Target S3 Region:', region);

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const productsMeta = [
  {
    url: "https://shuafitness.com/product/facility-cardio/treadmills/sh-t901z/",
    name: "Curved Treadmill",
    model: "SH-T901Z",
    category: "Cardio Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-cardio/bikes/sh-b8860sl/",
    name: "Spinning Bike",
    model: "SH-B8860SL",
    category: "Cardio Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-cardio/ellipticals/sh-b9100e/",
    name: "Commercial Elliptical",
    model: "SH-B9100E",
    category: "Cardio Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-cardio/stair-climber/sh-s8901/",
    name: "Stair Climber",
    model: "SH-S8901",
    category: "Cardio Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-cardio/rowers/sh-r8100/",
    name: "Commercial Rower",
    model: "SH-R8100",
    category: "Cardio Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6801/",
    name: "Chest Press",
    model: "SH-G6801",
    category: "Chest Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6804/",
    name: "Shoulder Press",
    model: "SH-G6804",
    category: "Strength Training Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6806/",
    name: "Lat Pulldown Machine",
    model: "SH-G6806",
    category: "Back Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6807/",
    name: "Biceps Curl Machine",
    model: "SH-G6807",
    category: "Biceps and Triceps Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6808/",
    name: "Triceps Press Machine",
    model: "SH-G6808",
    category: "Biceps and Triceps Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6809/",
    name: "Seated Leg Press",
    model: "SH-G6809",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6810/",
    name: "Leg Extension Machine",
    model: "SH-G6810",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6813/",
    name: "Pec Fly / Rear Deltoid",
    model: "SH-G6813",
    category: "Chest Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6816/",
    name: "Abdominal Machine",
    model: "SH-G6816",
    category: "Core Training Equipment"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6819/",
    name: "Abductor / Adductor",
    model: "SH-G6819",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6903/",
    name: "Standard Lat Pulldown",
    model: "SH-G6903",
    category: "Back Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6907/",
    name: "Triceps Pushdown",
    model: "SH-G6907",
    category: "Biceps and Triceps Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6908/",
    name: "Standard Leg Extension",
    model: "SH-G6908",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6910/",
    name: "Calf Raise Trainer",
    model: "SH-G6910",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6921/",
    name: "Smith Machine Multi-Gym",
    model: "SH-G6921",
    category: "Strength Training Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6975/",
    name: "Linear Leg Press",
    model: "SH-G6975",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/98-apex-connect-series/sh-g9809/",
    name: "Smart Glute Trainer",
    model: "SH-G9809",
    category: "Leg Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/benchrack-foundation-series/sh-g6358/",
    name: "Adjustable Bench Press",
    model: "SH-G6358",
    category: "Strength Training Machines"
  },
  {
    url: "https://shuafitness.com/product/facility-strength/benchrack-foundation-series/sh-g6386/",
    name: "Olympic Flat Bench",
    model: "SH-G6386",
    category: "Strength Training Machines",
    fallbackImg: "https://shuafitness.com/wp-content/uploads/2024/04/SH-G6878-1-1.png.webp"
  }
];

function getContentType(filename) {
  const ext = path.extname(filename.split('?')[0]).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.webp': return 'image/webp';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.jpg':
    case '.jpeg':
    default: return 'image/jpeg';
  }
}

async function uploadBufferToS3(buffer, folder, filename) {
  const rootPrefix = 'Multigym premium';
  const s3Key = `${rootPrefix}/${folder}/${filename}`;
  const contentType = getContentType(filename);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
  const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURI(s3Key)}`;
  return { s3Key, s3Url };
}

async function run() {
  const dataset = [];

  for (let i = 0; i < productsMeta.length; i++) {
    const item = productsMeta[i];
    console.log(`\n[${i + 1}/${productsMeta.length}] Processing "${item.name}" (${item.model})...`);

    let imgUrl = item.fallbackImg || '';

    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (res.ok) {
        const html = await res.text();
        const imgMatch = html.match(/class=["'][^"']*product_big_img[^"']*["'][^>]*src=["']([^"']+)["']/i) ||
                         html.match(/src=["']([^"']+)["'][^>]*class=["'][^"']*product_big_img[^"']*["']/i) ||
                         html.match(/<img[^>]+src=["'](https:\/\/shuafitness\.com\/wp-content\/uploads\/[^"']+)["']/i);
        if (imgMatch) {
          imgUrl = imgMatch[1];
        }
      } else {
        console.log(` ⚠️ HTTP ${res.status} when fetching page. Using fallback...`);
      }

      if (!imgUrl) {
        console.error(` ❌ No image URL found for ${item.name}`);
        continue;
      }

      console.log(` 🖼️ Source Image: ${imgUrl}`);

      // Fetch Image Buffer
      const imgRes = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (!imgRes.ok) {
        console.error(` ❌ Failed to download image HTTP ${imgRes.status}`);
        continue;
      }

      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.length < 500) {
        console.error(` ❌ Buffer too small (${buffer.length} bytes)`);
        continue;
      }

      // Upload to S3
      const cleanName = item.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      let ext = path.extname(imgUrl.split('?')[0]) || '.webp';
      if (ext.length > 5) ext = '.webp';
      const filename = `equipment_${cleanName}_${Date.now()}${ext}`;

      console.log(` 📤 Uploading to S3... (${filename})`);
      const { s3Url } = await uploadBufferToS3(buffer, 'explore', filename);
      console.log(` ✅ AWS S3 URL: ${s3Url}`);

      dataset.push({
        name: item.name,
        image: s3Url,
        category: item.category
      });

    } catch (err) {
      console.error(` ❌ Error processing ${item.name}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log(`SUCCESS: Imported ${dataset.length} / ${productsMeta.length} products to AWS S3`);
  console.log('========================================\n');

  const dataPath = path.join(process.cwd(), 'public', 'Data.json');
  fs.writeFileSync(dataPath, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Saved new Data.json to ${dataPath}`);
}

run();
