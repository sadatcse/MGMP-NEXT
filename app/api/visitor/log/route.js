import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import VisitorLog from '../../../../src/models/VisitorLog';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    let { ip, country, referrer, path, userAgent } = body;

    // Fallback to headers for IP if it's missing or local loopback
    if (!ip || ip === 'Unknown' || ip === '127.0.0.1' || ip === '::1') {
      const forwarded = req.headers.get("x-forwarded-for");
      if (forwarded) {
        ip = forwarded.split(/, /)[0];
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
