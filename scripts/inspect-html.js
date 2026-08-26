import fs from 'fs';

async function test() {
  const url = 'https://shuafitness.com/product/facility-cardio/treadmills/sh-t901z/';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();

  console.log('=== ALL META TAGS ===');
  const metas = html.match(/<meta[^>]+>/gi) || [];
  metas.forEach(m => {
    if (m.includes('title') || m.includes('image') || m.includes('og:')) {
      console.log(m);
    }
  });

  console.log('\n=== H1 TAGS ===');
  const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  h1s.forEach(h => console.log(h));

  console.log('\n=== WOOCOMMERCE IMAGES ===');
  const imgs = html.match(/<img[^>]+>/gi) || [];
  imgs.slice(0, 15).forEach(img => console.log(img));
}

test();
