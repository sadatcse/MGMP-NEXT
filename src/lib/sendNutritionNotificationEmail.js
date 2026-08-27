import nodemailer from 'nodemailer';

export async function sendNutritionNotificationEmail(nutritionData) {
  try {
    const fullName = nutritionData.full_name || 'Member';
    const phone = nutritionData.mobile_number || nutritionData.phone || 'N/A';
    const email = nutritionData.email || 'N/A';

    const host = process.env.SMTP_HOST;
    const rawPort = process.env.SMTP_PORT;
    const port = rawPort ? parseInt(rawPort) : 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.JOIN_NOTIFICATION_EMAIL || user || 'info@multigympremium.com';

    if (!host || !user || !pass) {
      console.warn('[sendNutritionNotificationEmail] SMTP credentials incomplete in environment. Skipping email sending safely.');
      return { success: false, error: 'SMTP environment configuration incomplete' };
    }

    const transporter = nodemailer.createTransport({
      host,
      port: isNaN(port) ? 465 : port,
      secure: port === 465 || isNaN(port),
      auth: { user, pass },
    });

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 25px; background: #111111; color: #ffffff; border-radius: 16px; border: 1px solid #333333; max-width: 650px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 2px solid #e30613; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-style: italic;">MULTI GYM <span style="color: #f4cb71;">PREMIUM</span></h1>
          <p style="color: #f4cb71; margin: 5px 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Nutrition Now Consultation Request</p>
        </div>

        <p style="color: #dddddd; font-size: 14px; line-height: 1.5;">
          A new request has been submitted for <strong>Nutrition Now Consultation</strong>. Below are the client details:
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
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Status:</td>
            <td style="padding: 12px; border-bottom: 1px solid #222222; color: #f4cb71; font-weight: bold;">Pending Consultation</td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #222222; font-size: 11px; color: #777777;">
          Multigym Premium Automated Nutrition System &bull; info@multigympremium.com
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Multigym Nutrition" <${user}>`,
      to: recipient,
      cc: user,
      subject: `🥗 Nutrition Consultation Request: ${fullName}`,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Dispatched] Nutrition consultation email for "${fullName}" sent to ${recipient}. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending nutrition notification email:', error);
    return { success: false, error: error.message };
  }
}
