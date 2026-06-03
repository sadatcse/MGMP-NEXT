import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import VisitorLog from '../../../../src/models/VisitorLog';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    let { referrer, path, userAgent } = body;

    // Resolve IP address
    let ip = 'Unknown';
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      ip = forwarded.split(/, /)[0];
    } else {
      ip = req.ip || 'Unknown';
    }

    // Resolve Country
    let country = 'Unknown';
    const vercelCountry = req.headers.get("x-vercel-ip-country");
    if (vercelCountry) {
      country = vercelCountry;
    }

    // Server-side GeoIP resolution fallback for non-Vercel environments
    if ((!country || country === 'Unknown') && ip && ip !== 'Unknown' && ip !== '127.0.0.1' && ip !== '::1') {
      try {
        const geoRes = await fetch(`https://ipwho.is/${ip}`);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData && geoData.success) {
            country = geoData.country || 'Unknown';
          }
        }
      } catch (e) {
        console.warn("Server-side GeoIP resolution failed:", e);
      }
    }

    // Traffic source categorisation logic
    let source = 'Direct';
    let sourceName = 'Direct';

    if (referrer && referrer !== '') {
      try {
        const url = new URL(referrer);
        const host = url.hostname.toLowerCase();
        sourceName = host;
        source = 'Referral';

        const searchEngines = [
          { name: 'Google', pattern: 'google.' },
          { name: 'Bing', pattern: 'bing.com' },
          { name: 'Yahoo', pattern: 'yahoo.com' },
          { name: 'DuckDuckGo', pattern: 'duckduckgo.com' },
          { name: 'Baidu', pattern: 'baidu.com' },
          { name: 'Yandex', pattern: 'yandex.' },
          { name: 'Ecosia', pattern: 'ecosia.org' },
          { name: 'Ask.com', pattern: 'ask.com' },
          { name: 'Naver', pattern: 'naver.com' }
        ];

        for (const se of searchEngines) {
          if (host.includes(se.pattern)) {
            source = 'Search Engine';
            sourceName = se.name;
            break;
          }
        }
      } catch (e) {
        // Fallback or ignore invalid URI
      }
    }

    const newLog = await VisitorLog.create({
      ip: ip || 'Unknown',
      country: country || 'Unknown',
      referrer: referrer || '',
      source,
      sourceName,
      path: path || '/',
      userAgent: userAgent || 'Unknown',
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error) {
    console.error('Visitor Log POST Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
