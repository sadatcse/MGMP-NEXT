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

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const urls = [
  "https://shuafitness.com/product/facility-cardio/treadmills/sh-t901z/",
  "https://shuafitness.com/product/facility-cardio/bikes/sh-b8860sl/",
  "https://shuafitness.com/product/facility-cardio/ellipticals/sh-b9100e/",
  "https://shuafitness.com/product/facility-cardio/stair-climber/sh-s8901/",
  "https://shuafitness.com/product/facility-cardio/rowers/sh-r8100/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6801/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6804/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6806/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6807/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6808/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6809/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6810/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6813/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6816/",
  "https://shuafitness.com/product/facility-strength/68-core-series/sh-g6819/",
  "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6903/",
  "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6907/",
  "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6908/",
  "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6910/",
  "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6921/",
  "https://shuafitness.com/product/facility-strength/69-standard-series/sh-g6975/",
  "https://shuafitness.com/product/facility-strength/98-apex-connect-series/sh-g9809/",
  "https://shuafitness.com/product/facility-strength/benchrack-foundation-series/sh-g6358/",
  "https://shuafitness.com/product/facility-strength/benchrack-foundation-series/sh-g6386/"
];

function determineCategory(url, title) {
  const lowerUrl = url.toLowerCase();
  const lowerTitle = title.toLowerCase();

  if (lowerUrl.includes('facility-cardio')) {
    return "Cardio Machines";
  }

  if (lowerTitle.includes('chest') || lowerTitle.includes('pectoral') || lowerTitle.includes('dip')) {
    return "Chest Machines";
  }
  if (lowerTitle.includes('biceps') || lowerTitle.includes('triceps') || lowerTitle.includes('arm curl')) {
    return "Biceps and Triceps Machines";
  }
  if (lowerTitle.includes('pulldown') || lowerTitle.includes('row') || lowerTitle.includes('rear delt') || lowerTitle.includes('lat ') || lowerTitle.includes('back')) {
    return "Back Machines";
  }
  if (lowerTitle.includes('leg') || lowerTitle.includes('calf') || lowerTitle.includes('abductor') || lowerTitle.includes('squat') || lowerTitle.includes('hip')) {
    return "Leg Machines";
  }
  if (lowerTitle.includes('abdominal') || lowerTitle.includes('core') || lowerTitle.includes('crunch') || lowerTitle.includes('knee raise')) {
    return "Core Training Equipment";
  }

  return "Strength Training Machines";
}

function cleanTitle(rawTitle) {
  let title = rawTitle.replace(/&#\d+;/g, '').replace(/&amp;/g, '&').trim();
  title = title.replace(/\s*[-–|].*$/i, '').trim(); // Remove brand suffix like "- SHUA Fitness"
  return title;
}

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
  const results = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n[${i + 1}/${urls.length}] Fetching ${url}...`);

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.error(` ❌ Failed to fetch page: HTTP ${res.status}`);
        continue;
      }

      const html = await res.text();

      // Extract Title
      let rawTitle = '';
      const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/<meta\s+name=["']title["']\s+content=["']([^"']+)["']/i);
      if (ogTitleMatch) {
        rawTitle = ogTitleMatch[1];
      } else {
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (h1Match) {
          rawTitle = h1Match[1].replace(/<[^>]+>/g, '').trim();
        }
      }

      if (!rawTitle) {
        console.error(` ❌ Title not found for ${url}`);
        continue;
      }

      const name = cleanTitle(rawTitle);

      // Extract Image URL
      let imgUrl = '';
      const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
      if (ogImgMatch) {
        imgUrl = ogImgMatch[1];
      } else {
        const wcImgMatch = html.match(/class=["'][^"']*woocommerce-product-gallery__image[^"']*["'][^>]*href=["']([^"']+)["']/i) ||
                           html.match(/<img[^>]+src=["']([^"']+\.(?:png|jpg|jpeg|webp))["']/i);
        if (wcImgMatch) {
          imgUrl = wcImgMatch[1];
        }
      }

      if (!imgUrl) {
        console.error(` ❌ Image URL not found for ${url}`);
        continue;
      }

      console.log(` 📌 Name: ${name}`);
      console.log(` 🖼️ Image URL: ${imgUrl}`);

      const category = determineCategory(url, name);
      console.log(` 🏷️ Category: ${category}`);

      // Fetch Image Buffer
      const imgRes = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!imgRes.ok) {
        console.error(` ❌ Failed to fetch image: HTTP ${imgRes.status}`);
        continue;
      }

      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to AWS S3
      const cleanName = name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      let ext = path.extname(imgUrl.split('?')[0]) || '.webp';
      if (ext.length > 5) ext = '.webp';
      const filename = `shuafitness_${cleanName}_${Date.now()}${ext}`;

      console.log(` 📤 Uploading to S3 (${filename})...`);
      const { s3Url } = await uploadBufferToS3(buffer, 'explore', filename);
      console.log(` ✅ S3 URL: ${s3Url}`);

      results.push({
        name,
        image: s3Url,
        category
      });

    } catch (err) {
      console.error(` ❌ Error processing ${url}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log(`Total successfully processed: ${results.length} / ${urls.length}`);
  console.log('========================================');

  const dataPath = path.join(process.cwd(), 'public', 'Data.json');
  fs.writeFileSync(dataPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Updated ${dataPath} with fresh scraped S3-hosted product data!`);
}

run();
