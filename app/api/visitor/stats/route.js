import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import VisitorLog from '../../../../src/models/VisitorLog';

export async function GET(req) {
  try {
    await connectDB();

    const now = new Date();

    // Start of Today (local time context for server, or UTC start of day)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Start of Yesterday
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    
    // Start of Month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Start of Year
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Queries in parallel for speed
    const [
      todayCount,
      yesterdayCount,
      monthCount,
      yearCount,
      sourceBreakdown,
      recentVisitors,
      topCountries
    ] = await Promise.all([
      VisitorLog.countDocuments({ createdAt: { $gte: startOfToday } }),
      VisitorLog.countDocuments({ createdAt: { $gte: startOfYesterday, $lt: startOfToday } }),
      VisitorLog.countDocuments({ createdAt: { $gte: startOfMonth } }),
      VisitorLog.countDocuments({ createdAt: { $gte: startOfYear } }),
      VisitorLog.aggregate([
        { $group: { _id: "$source", count: { $sum: 1 } } }
      ]),
      VisitorLog.find().sort({ createdAt: -1 }).limit(30),
      VisitorLog.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 }
      ])
    ]);

    // Format source breakdown
    const sources = {
      direct: 0,
      searchEngine: 0,
      referral: 0
    };

    sourceBreakdown.forEach(item => {
      if (item._id === 'Direct') sources.direct = item.count;
      else if (item._id === 'Search Engine') sources.searchEngine = item.count;
      else if (item._id === 'Referral') sources.referral = item.count;
    });

    return NextResponse.json({
      success: true,
      stats: {
        today: todayCount,
        yesterday: yesterdayCount,
        month: monthCount,
        year: yearCount,
        sources,
        recent: recentVisitors,
        countries: topCountries.map(c => ({ name: c._id, count: c.count }))
      }
    });
  } catch (error) {
    console.error('Visitor Stats GET Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
