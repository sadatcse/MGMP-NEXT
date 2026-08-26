import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { generateMembershipFormHtml } from '../utils/generateMembershipFormHtml.js';

export async function sendJoinNotificationEmail(applicationData) {
  try {
    const fullName = applicationData.full_name || 'Member';
    const phone = applicationData.telephone_number || applicationData.contact_no || 'N/A';
    const email = applicationData.email || 'N/A';
    const height = applicationData.height || `${applicationData.feet || ''} ${applicationData.inch || ''}`.trim() || 'N/A';
    const weight = applicationData.weight || 'N/A';
    const age = applicationData.age || 'N/A';
    const address = applicationData.address || 'N/A';
    const packageName = applicationData.package_name || 'Single Membership';
    const packagePrice = applicationData.package_price || 'N/A';

    // 1. Generate PDF buffer using Puppeteer & system browser executable
    const paths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe'
    ];
    let executablePath = paths.find(p => p && fs.existsSync(p));

    let pdfBuffer = null;
    try {
      const launchOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      };
      if (executablePath) {
        launchOptions.executablePath = executablePath;
      }

      const browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();
      const formHtml = generateMembershipFormHtml(applicationData);
      await page.setContent(formHtml, { waitUntil: 'networkidle0' });
      pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      await browser.close();
    } catch (pdfErr) {
      console.error('Error generating PDF with Puppeteer:', pdfErr);
    }

    // 2. Setup Hostinger SMTP Transporter
    const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const user = process.env.SMTP_USER || 'info@multigympremium.com';
    const pass = process.env.SMTP_PASS || 'Premium@7426';
    const recipient = process.env.JOIN_NOTIFICATION_EMAIL || 'multigympremiumpowerfit@gmail.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    });

    const sanitizedFilename = `Membership_Form_${fullName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 25px; background: #111111; color: #ffffff; border-radius: 16px; border: 1px solid #333333; max-width: 650px; margin: 0 auto;">
        <div style="text-align: center; border-b: 2px solid #e30613; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-style: italic;">MULTI GYM <span style="color: #f4cb71;">PREMIUM</span></h1>
          <p style="color: #f4cb71; margin: 5px 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">New Join Now Membership Registration</p>
        </div>

        <p style="color: #dddddd; font-size: 14px; line-height: 1.5;">
          A new customer has filled out and submitted the <strong>Join Now Form</strong> on the website. Below are the registration details:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; color: #ffffff; background: rgba(255,255,255,0.03); border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold; width: 160px;">Full Name:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222; font-weight: bold; font-size: 15px;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Mobile Number:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Email:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Height & Weight:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222;">${height} &nbsp;|&nbsp; ${weight}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Age:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222;">${age}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Address:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222;">${address}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Selected Package:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #e30613; font-weight: bold; font-size: 15px;">${packageName} (${packagePrice})</td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding: 15px; background: rgba(227, 6, 19, 0.15); border-left: 4px solid #e30613; border-radius: 6px; font-size: 13px; color: #cccccc;">
          📌 <strong>Attached Document:</strong> The pre-filled 2-page <strong>${sanitizedFilename}</strong> is attached to this email for instant printing and archive.
        </div>

        <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #222222; font-size: 11px; color: #777777;">
          Multigym Premium Automated Registration System &bull; info@multigympremium.com
        </div>
      </div>
    `;

    const attachments = [];
    if (pdfBuffer) {
      attachments.push({
        filename: sanitizedFilename,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
    }

    const mailOptions = {
      from: `"Multigym Premium Join" <${user}>`,
      to: recipient,
      cc: user,
      subject: `${fullName} - Join Now Form`,
      html: htmlBody,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Dispatched] Join application email for "${fullName}" sent to ${recipient}. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending join notification email:', error);
    return { success: false, error: error.message };
  }
}
