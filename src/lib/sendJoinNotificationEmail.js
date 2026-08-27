import nodemailer from 'nodemailer';
import { generateMembershipFormPdf } from '../utils/generateMembershipFormPdf.js';

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

    // 1. Generate PDF buffer safely (pure JS pdfkit, zero native browser binaries)
    let pdfBuffer = null;
    const sanitizedFilename = `Membership_Form_${fullName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
    try {
      pdfBuffer = await generateMembershipFormPdf(applicationData);
    } catch (pdfErr) {
      console.error('[sendJoinNotificationEmail] Error generating PDF attachment:', pdfErr);
    }

    // 2. Setup Hostinger SMTP Transporter
    const host = process.env.SMTP_HOST;
    const rawPort = process.env.SMTP_PORT;
    const port = rawPort ? parseInt(rawPort) : 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.JOIN_NOTIFICATION_EMAIL || user || 'info@multigympremium.com';

    if (!host || !user || !pass) {
      console.warn('[sendJoinNotificationEmail] SMTP credentials incomplete in environment. Skipping email sending safely.');
      return { success: false, error: 'SMTP environment configuration incomplete' };
    }

    const transporter = nodemailer.createTransport({
      host,
      port: isNaN(port) ? 465 : port,
      secure: port === 465 || isNaN(port),
      auth: {
        user,
        pass
      }
    });

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

        ${
          pdfBuffer
            ? `<div style="margin-top: 25px; padding: 15px; background: rgba(227, 6, 19, 0.15); border-left: 4px solid #e30613; border-radius: 6px; font-size: 13px; color: #cccccc;">
                📌 <strong>Attached Document:</strong> The pre-filled 2-page <strong>${sanitizedFilename}</strong> is attached to this email for instant printing and archive.
              </div>`
            : ''
        }

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
        contentType: 'application/pdf',
      });
    }

    const mailOptions = {
      from: `"Multigym Premium Join" <${user}>`,
      to: recipient,
      cc: user,
      subject: `${fullName} - Join Now Form`,
      html: htmlBody,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Dispatched] Join application email for "${fullName}" sent to ${recipient} with PDF attachment. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending join notification email:', error);
    return { success: false, error: error.message };
  }
}
