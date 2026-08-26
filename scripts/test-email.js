import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { generateMembershipFormHtml } from '../src/utils/generateMembershipFormHtml.js';

const testApp = {
  _id: '6a8f148ec250796b69a6bcb5',
  full_name: 'Test Member',
  feet: '5 feet',
  inch: '10 inch',
  height: '5 feet 10 inch',
  weight: '75 kg',
  age: '25 years',
  address: 'House 4, Road 12, Dhanmondi',
  email: 'testmember@example.com',
  telephone_number: '01711223344',
  package_name: 'Admission Fee + Regular Monthly Fee',
  package_price: 'BDT 6,000',
  createdAt: new Date()
};

async function run() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe'
  ];
  let executablePath = paths.find(p => p && fs.existsSync(p));

  const browser = await puppeteer.launch({ 
    executablePath, 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const formHtml = generateMembershipFormHtml(testApp);
  await page.setContent(formHtml, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@multigympremium.com',
      pass: 'Premium@7426'
    }
  });

  const mailOptions = {
    from: '"Multigym Premium" <info@multigympremium.com>',
    to: 'multigympremiumpowerfit@gmail.com',
    subject: `${testApp.full_name} - Join Now Form`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 25px; background: #111111; color: #ffffff; border-radius: 12px; border: 1px solid #333;">
        <h2 style="color: #f4cb71; margin-top: 0; text-transform: uppercase;">New Join Application Received</h2>
        <p style="color: #ccc;">A new member has submitted a registration application on the Multigym Premium website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; color: #fff;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold; width: 140px;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222;">${testApp.full_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold;">Mobile Number:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222;">${testApp.telephone_number}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222;">${testApp.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold;">Height & Weight:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222;">${testApp.height} | ${testApp.weight}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold;">Age:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222;">${testApp.age}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold;">Address:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222;">${testApp.address}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #f4cb71; font-weight: bold;">Selected Package:</td>
            <td style="padding: 8px; border-bottom: 1px solid #222; color: #e30613; font-weight: bold;">${testApp.package_name} (${testApp.package_price})</td>
          </tr>
        </table>

        <p style="margin-top: 20px; font-size: 12px; color: #888;">
          📎 Attached: Pre-filled A4 Membership Form PDF for <strong>${testApp.full_name}</strong>.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: `Membership_Form_${testApp.full_name.replace(/\s+/g, '_')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ SUCCESS! Email dispatched with attached PDF. Message ID:', info.messageId);
}

run().catch(console.error);
