import nodemailer from 'nodemailer';
import moment from 'moment';
import connectDB from './db.js';
import VisitorLog from '../models/VisitorLog.js';
import JoinApplication from '../models/JoinApplication.js';
import NutritionConsultation from '../models/NutritionConsultation.js';
import ContactMessage from '../models/ContactMessage.js';
import ChatSession from '../models/ChatSession.js';

export async function sendMonthlyReport(targetMonth = new Date()) {
  try {
    await connectDB();

    const startOfMonth = moment(targetMonth).startOf('month').toDate();
    const endOfMonth = moment(targetMonth).endOf('month').toDate();
    const monthLabel = moment(targetMonth).format('MMMM YYYY');
    const generatedTime = moment().format('MMMM DD, YYYY - hh:mm A');

    // 1. Traffic Analytics
    const visitorLogs = await VisitorLog.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).lean();

    const totalVisits = visitorLogs.length;
    const uniqueIPs = new Set(visitorLogs.map(l => l.ip).filter(Boolean));
    const uniqueVisitors = uniqueIPs.size;

    const sourcesCount = { Direct: 0, 'Search Engine': 0, Referral: 0 };
    visitorLogs.forEach(l => {
      const src = l.source || 'Direct';
      sourcesCount[src] = (sourcesCount[src] || 0) + 1;
    });

    // 2. Join Applications
    const joinApps = await JoinApplication.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).lean();

    const totalJoinApps = joinApps.length;
    const pendingJoinApps = joinApps.filter(a => a.status === 'Pending').length;
    const approvedJoinApps = joinApps.filter(a => a.status === 'Approved' || a.status === 'Completed').length;

    const packageCounts = {};
    joinApps.forEach(a => {
      const pkg = a.package_name || 'Single Membership Plan';
      packageCounts[pkg] = (packageCounts[pkg] || 0) + 1;
    });
    const topPackage = Object.entries(packageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Single Membership Plan';

    // 3. Nutrition Consultations ("Nutrition Now")
    const nutritionLeads = await NutritionConsultation.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).lean();

    const totalNutritionLeads = nutritionLeads.length;
    const pendingNutrition = nutritionLeads.filter(n => n.status === 'Pending').length;
    const contactedNutrition = nutritionLeads.filter(n => n.status === 'Contacted').length;

    // 4. Contact Messages
    const contactMessages = await ContactMessage.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).lean();

    const totalMessages = contactMessages.length;
    const unreadMessages = contactMessages.filter(m => m.status === 'unread').length;

    // 5. AI Chat Sessions
    const chatSessions = await ChatSession.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).lean();

    const totalChatSessions = chatSessions.length;
    let totalUserQueries = 0;
    chatSessions.forEach(session => {
      if (session.messages) {
        totalUserQueries += session.messages.filter(m => m.role === 'user').length;
      }
    });

    // Setup Hostinger SMTP Transporter
    const host = process.env.SMTP_HOST;
    const rawPort = process.env.SMTP_PORT;
    const port = rawPort ? parseInt(rawPort) : 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.JOIN_NOTIFICATION_EMAIL || user || 'info@multigympremium.com';

    if (!host || !user || !pass) {
      console.warn('[sendMonthlyReport] SMTP credentials incomplete in environment. Skipping email sending safely.');
      return { success: false, error: 'SMTP environment configuration incomplete' };
    }

    const transporter = nodemailer.createTransport({
      host,
      port: isNaN(port) ? 465 : port,
      secure: port === 465 || isNaN(port),
      auth: { user, pass }
    });

    const htmlTemplate = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 30px 15px; margin: 0;">
        <div style="max-width: 720px; margin: 0 auto; background: #111111; border: 1px solid #282828; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #161616 0%, #0d0d0d 100%); padding: 30px 25px; text-align: center; border-bottom: 3px solid #e30613;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; font-style: italic;">
              MULTI GYM <span style="color: #f4cb71;">PREMIUM</span>
            </h1>
            <p style="color: #f4cb71; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin: 6px 0 0 0;">
              MONTHLY EXECUTIVE WEBSITE REPORT
            </p>
            <p style="color: #888888; font-size: 12px; margin: 8px 0 0 0;">
              Reporting Period: <strong style="color: #ffffff;">${monthLabel}</strong> &bull; Generated: ${generatedTime}
            </p>
          </div>

          <!-- Executive Summary Cards -->
          <div style="padding: 25px;">
            <h2 style="color: #f4cb71; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #222222; padding-bottom: 8px;">
              📊 Key Monthly Metrics Overview
            </h2>

            <table style="width: 100%; border-collapse: separate; border-spacing: 10px; margin-bottom: 20px;">
              <tr>
                <td style="background: rgba(255,255,255,0.03); border: 1px solid #262626; border-radius: 12px; padding: 15px; text-align: center; width: 33%;">
                  <div style="font-size: 11px; color: #aaa; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Website Traffic</div>
                  <div style="font-size: 24px; font-weight: 900; color: #ffffff; margin-top: 4px;">${totalVisits}</div>
                  <div style="font-size: 10px; color: #f4cb71; margin-top: 2px;">${uniqueVisitors} Unique IPs</div>
                </td>
                <td style="background: rgba(227, 6, 19, 0.08); border: 1px solid rgba(227, 6, 19, 0.3); border-radius: 12px; padding: 15px; text-align: center; width: 33%;">
                  <div style="font-size: 11px; color: #aaa; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Join Applications</div>
                  <div style="font-size: 24px; font-weight: 900; color: #e30613; margin-top: 4px;">${totalJoinApps}</div>
                  <div style="font-size: 10px; color: #aaa; margin-top: 2px;">${pendingJoinApps} Pending</div>
                </td>
                <td style="background: rgba(244, 203, 113, 0.08); border: 1px solid rgba(244, 203, 113, 0.3); border-radius: 12px; padding: 15px; text-align: center; width: 33%;">
                  <div style="font-size: 11px; color: #aaa; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Nutrition Now</div>
                  <div style="font-size: 24px; font-weight: 900; color: #f4cb71; margin-top: 4px;">${totalNutritionLeads}</div>
                  <div style="font-size: 10px; color: #aaa; margin-top: 2px;">${pendingNutrition} Pending</div>
                </td>
              </tr>
              <tr>
                <td style="background: rgba(255,255,255,0.03); border: 1px solid #262626; border-radius: 12px; padding: 15px; text-align: center; width: 50%;">
                  <div style="font-size: 11px; color: #aaa; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Contact Messages</div>
                  <div style="font-size: 24px; font-weight: 900; color: #ffffff; margin-top: 4px;">${totalMessages}</div>
                  <div style="font-size: 10px; color: #aaa; margin-top: 2px;">${unreadMessages} Unread</div>
                </td>
                <td colSpan="2" style="background: rgba(255,255,255,0.03); border: 1px solid #262626; border-radius: 12px; padding: 15px; text-align: center;">
                  <div style="font-size: 11px; color: #aaa; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">AI Chatbot Conversations</div>
                  <div style="font-size: 24px; font-weight: 900; color: #38bdf8; margin-top: 4px;">${totalChatSessions} <span style="font-size: 14px; font-weight: normal; color: #aaa;">Sessions</span></div>
                  <div style="font-size: 10px; color: #aaa; margin-top: 2px;">${totalUserQueries} User Questions Handled</div>
                </td>
              </tr>
            </table>

            <!-- Itemized Breakdowns -->
            
            <!-- 1. Traffic Breakdown -->
            <div style="margin-top: 25px; background: #161616; border-radius: 12px; padding: 18px; border: 1px solid #222;">
              <h3 style="color: #ffffff; font-size: 14px; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                📈 <span>Traffic Analytics & Acquisition</span>
              </h3>
              <table style="width: 100%; font-size: 13px; color: #ccc; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Total Visits Logged:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #fff; text-align: right;">${totalVisits}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Unique Visitor IPs:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #fff; text-align: right;">${uniqueVisitors}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Direct Traffic:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #f4cb71; text-align: right;">${sourcesCount.Direct || 0}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Search Engine Traffic:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #38bdf8; text-align: right;">${sourcesCount['Search Engine'] || 0}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">Referral Links:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #4ade80; text-align: right;">${sourcesCount.Referral || 0}</td>
                </tr>
              </table>
            </div>

            <!-- 2. Join Applications Breakdown -->
            <div style="margin-top: 20px; background: #161616; border-radius: 12px; padding: 18px; border: 1px solid #222;">
              <h3 style="color: #ffffff; font-size: 14px; margin-top: 0; margin-bottom: 12px;">
                📝 <span>Join Applications Summary</span>
              </h3>
              <table style="width: 100%; font-size: 13px; color: #ccc; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Total Applications:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #e30613; text-align: right;">${totalJoinApps}</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Pending Action:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #f4cb71; text-align: right;">${pendingJoinApps}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">Top Demanded Package:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #fff; text-align: right;">${topPackage}</td>
                </tr>
              </table>
            </div>

            <!-- 3. Nutrition & Contact & Chat -->
            <div style="margin-top: 20px; background: #161616; border-radius: 12px; padding: 18px; border: 1px solid #222;">
              <h3 style="color: #ffffff; font-size: 14px; margin-top: 0; margin-bottom: 12px;">
                💬 <span>Inquiries, Nutrition & Chat Activity</span>
              </h3>
              <table style="width: 100%; font-size: 13px; color: #ccc; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Nutrition Now Consultations:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #f4cb71; text-align: right;">${totalNutritionLeads} (${pendingNutrition} Pending)</td>
                </tr>
                <tr style="border-bottom: 1px solid #262626;">
                  <td style="padding: 8px 0; color: #888;">Website Contact Form Submissions:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #fff; text-align: right;">${totalMessages} (${unreadMessages} Unread)</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888;">AI Chatbot Engagement:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #38bdf8; text-align: right;">${totalChatSessions} Chatters &bull; ${totalUserQueries} Queries</td>
                </tr>
              </table>
            </div>

            <!-- Admin Link Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://www.multigympremium.com/dashboard" style="display: inline-block; background: #e30613; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(227, 6, 19, 0.4);">
                OPEN ADMIN DASHBOARD
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #0d0d0d; border-top: 1px solid #222222; padding: 20px; text-align: center; font-size: 11px; color: #666666;">
            Multigym Premium Automated Monthly Reporting Engine &bull; info@multigympremium.com
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Multigym Premium Reports" <${user}>`,
      to: recipient,
      cc: user,
      subject: `📊 Executive Monthly Website Report - ${monthLabel}`,
      html: htmlTemplate
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Monthly Report Sent] Dispatched ${monthLabel} report to ${recipient}. ID: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
      summary: {
        month: monthLabel,
        totalVisits,
        uniqueVisitors,
        totalJoinApps,
        totalNutritionLeads,
        totalMessages,
        totalChatSessions
      }
    };
  } catch (error) {
    console.error('Error compiling/sending monthly report:', error);
    return { success: false, error: error.message };
  }
}
