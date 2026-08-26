import fs from 'fs';

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

async function inspectAll() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.log(`[${i+1}] ${url} -> HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();

      const ogTitle = (html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
      const ogDesc = (html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
      const imgMatch = (html.match(/class=["'][^"']*product_big_img[^"']*["'][^>]*src=["']([^"']+)["']/i) ||
                        html.match(/src=["']([^"']+)["'][^>]*class=["'][^"']*product_big_img[^"']*["']/i) ||
                        html.match(/<img[^>]+src=["'](https:\/\/shuafitness\.com\/wp-content\/uploads\/[^"']+)["']/i) || [])[1] || '';

      console.log(`[${i+1}] ${url}`);
      console.log(`    Title: ${ogTitle}`);
      console.log(`    Desc Snippet: ${ogDesc.substring(0, 70)}...`);
      console.log(`    Big Img: ${imgMatch}`);
    } catch (e) {
      console.log(`[${i+1}] ${url} -> Error: ${e.message}`);
    }
  }
}

inspectAll();
