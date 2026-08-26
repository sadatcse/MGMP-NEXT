import { NextResponse } from 'next/server';
import { sendMonthlyReport } from '../../../../src/lib/sendMonthlyReport';

export async function GET(req) {
  try {
    const result = await sendMonthlyReport();
    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Monthly website report compiled and sent to email successfully',
          data: result.summary,
          messageId: result.messageId,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to send monthly report' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Monthly report GET API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error generating monthly report' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const result = await sendMonthlyReport();
    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Monthly website report compiled and sent to email successfully',
          data: result.summary,
          messageId: result.messageId,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to send monthly report' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Monthly report POST API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error generating monthly report' },
      { status: 500 }
    );
  }
}
