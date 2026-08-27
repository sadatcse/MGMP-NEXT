import PDFDocument from 'pdfkit';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

export function generateMembershipFormPdf(item = {}) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 0,
        bufferPages: true,
      });

      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      const fullName = item.full_name || '';
      const phone = item.telephone_number || item.contact_no || '';
      const email = item.email || '';
      const address = item.address || '';
      const weight = item.weight || '';
      const height = item.height || `${item.feet || ''} ${item.inch || ''}`.trim();
      const age = item.age || '';
      const packageName = item.package_name || '';
      const packagePrice = item.package_price || '';

      const dateStr = item.createdAt ? moment(item.createdAt).format('DDMMYYYY') : moment().format('DDMMYYYY');
      const d1 = dateStr[0] || '', d2 = dateStr[1] || '', m1 = dateStr[2] || '', m2 = dateStr[3] || '';
      const y1 = dateStr[4] || '', y2 = dateStr[5] || '', y3 = dateStr[6] || '', y4 = dateStr[7] || '';

      const isWeekly = packageName.toLowerCase().includes('weekly');
      const isDaily = packageName.toLowerCase().includes('daily');
      const isPackage = !isWeekly && !isDaily;
      const isRegular = packageName.toLowerCase().includes('regular') || packageName.toLowerCase().includes('admission');

      // BRAND COLORS
      const darkColor = '#1a1a1a';
      const goldColor = '#f2a900';
      const redColor = '#e30613';
      const sectionBg = '#fdf1d8';
      const fieldBg = '#fcfcfc';
      const strokeColor = '#333333';

      // =========================================================================
      // PAGE 1: REGISTRATION & MEMBERSHIP FORM
      // =========================================================================

      // HEADER
      doc.rect(0, 0, 595.28, 65).fill(darkColor);
      doc.rect(0, 65, 595.28, 5).fill(goldColor);

      // Header Text
      doc.fillColor('#ffffff').fontSize(24).font('Helvetica-BoldOblique').text('MEMBERSHIP FORM', 30, 14);
      doc.fillColor(goldColor).fontSize(14).font('Helvetica-BoldOblique').text('MULTI GYM PREMIUM', 30, 42);

      // Header Logo Box (Right side)
      doc.rect(450, 12, 115, 42).lineWidth(1.5).stroke(redColor);
      doc.rect(452, 14, 111, 38).fill('#000000');

      try {
        const logoPngPath = path.join(process.cwd(), 'public', 'logo.png');
        if (fs.existsSync(logoPngPath)) {
          doc.image(logoPngPath, 455, 16, { fit: [105, 34], align: 'center', valign: 'center' });
        } else {
          doc.fillColor('#ffffff').fontSize(12).font('Helvetica-BoldOblique').text('MULTI GYM', 460, 20);
          doc.fillColor(goldColor).fontSize(9).font('Helvetica-BoldOblique').text('PREMIUM', 460, 35);
        }
      } catch (imgErr) {
        doc.fillColor('#ffffff').fontSize(12).font('Helvetica-BoldOblique').text('MULTI GYM', 460, 20);
        doc.fillColor(goldColor).fontSize(9).font('Helvetica-BoldOblique').text('PREMIUM', 460, 35);
      }

      let y = 80;

      // Helper function for Section Titles
      const drawSectionTitle = (title) => {
        doc.rect(30, y, 535.28, 20).fill(sectionBg);
        doc.rect(30, y, 6, 20).fill(redColor);
        doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold').text(title.toUpperCase(), 44, y + 5);
        y += 26;
      };

      // Helper function to draw date digit boxes
      const drawDateBoxes = (startX, startY, digits) => {
        let x = startX;
        digits.forEach((char) => {
          doc.rect(x, startY, 15, 18).lineWidth(0.8).stroke(strokeColor);
          doc.fillColor(darkColor).fontSize(10).font('Helvetica-Bold').text(char || '', x, startY + 4, { width: 15, align: 'center' });
          x += 17;
        });
      };

      // Helper function to draw checkbox option
      const drawCheckboxOpt = (x, yPos, label, isChecked = false) => {
        doc.rect(x, yPos, 12, 12).lineWidth(0.8).stroke(strokeColor);
        if (isChecked) {
          doc.rect(x, yPos, 12, 12).fill(redColor);
          doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold').text('✓', x, yPos + 1, { width: 12, align: 'center' });
        }
        doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text(label, x + 16, yPos + 1);
      };

      // Helper function to draw field row
      const drawField = (x, yPos, width, height, textVal = '') => {
        doc.rect(x, yPos, width, height).lineWidth(0.8).fillAndStroke(fieldBg, strokeColor);
        if (textVal) {
          const str = String(textVal);
          const fSize = str.length > 28 ? 7.5 : str.length > 18 ? 8.5 : 9.5;
          doc.fillColor(darkColor).fontSize(fSize).font('Helvetica-Bold').text(str, x + 4, yPos + (fSize < 9 ? 5 : 4), { width: width - 8, lineBreak: false });
        }
      };

      // SECTION 1: REGISTRATION FORM
      drawSectionTitle('Registration Form');

      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Membership ID:', 30, y + 3);
      drawField(125, y, 140, 20);

      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Date:', 285, y + 3);
      drawDateBoxes(320, y + 1, [d1, d2, m1, m2, y1, y2, y3, y4]);

      y += 24;

      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Membership Type:', 30, y + 1);
      drawCheckboxOpt(140, y, 'Regular', isRegular);
      drawCheckboxOpt(210, y, 'Package', isPackage);
      drawCheckboxOpt(285, y, 'Weekly', isWeekly);
      drawCheckboxOpt(355, y, 'Daily', isDaily);

      y += 22;

      // SECTION 2: PERSONAL INFORMATION
      drawSectionTitle('Personal Information');

      // Row 1: Full Name
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Full Name', 30, y + 3);
      drawField(125, y, 440, 20, fullName);
      y += 24;

      // Row 2: Contact No & Date of Birth
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Contact No', 30, y + 3);
      drawField(125, y, 200, 20, phone);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Date of Birth', 340, y + 3);
      drawDateBoxes(415, y + 1, ['', '', '', '', '', '', '', '']);
      y += 24;

      // Row 3: Full Address
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Full Address', 30, y + 3);
      drawField(125, y, 440, 20, address);
      y += 24;

      // Row 4: Status & NID No
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Status', 30, y + 1);
      drawCheckboxOpt(125, y, 'Single', true);
      drawCheckboxOpt(185, y, 'Married', false);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('NID No:', 270, y + 3);
      drawField(320, y, 245, 20);
      y += 24;

      // Row 5: Blood Group & Weight
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Blood Group', 30, y + 3);
      drawField(125, y, 200, 20);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Weight:', 340, y + 3);
      drawField(415, y, 150, 20, weight);
      y += 24;

      // Row 6: Emergency No & Height
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Emergency No', 30, y + 3);
      drawField(125, y, 200, 20);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Height:', 340, y + 3);
      drawField(415, y, 150, 20, height);
      y += 24;

      // Row 7: Religion & Age
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Religion', 30, y + 3);
      drawField(125, y, 200, 20);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Age:', 340, y + 3);
      drawField(415, y, 150, 20, age);
      y += 24;

      // Row 8: Profession & Gender
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Profession', 30, y + 3);
      drawField(125, y, 200, 20);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Gender:', 340, y + 1);
      drawCheckboxOpt(415, y, 'Male', false);
      drawCheckboxOpt(475, y, 'Female', false);
      y += 24;

      // SECTION 3: ADMISSION DETAILS
      drawSectionTitle('Admission Details');

      // Grid 1: Admission Fee & Starting Date
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Admission Fee', 30, y + 3);
      drawField(125, y, 150, 20, packageName.includes('Admission') ? 'BDT 3,500' : 'N/A');
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Starting Date', 300, y + 3);
      drawField(395, y, 170, 20);
      y += 24;

      // Grid 2: Category & Expiry Date
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Category', 30, y + 3);
      drawField(125, y, 150, 20, packageName);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Expiry Date', 300, y + 3);
      drawField(395, y, 170, 20);
      y += 24;

      // Paid Amount
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Paid Amount', 30, y + 3);
      drawField(125, y, 440, 20, packagePrice);
      y += 24;

      // Due Amount & Payment
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Due Amount', 30, y + 3);
      drawField(125, y, 120, 20, '0 BDT');
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Payment', 275, y + 1);
      drawCheckboxOpt(340, y, 'Cash', true);
      drawCheckboxOpt(400, y, 'Card', false);
      drawCheckboxOpt(460, y, 'Bkash', false);
      y += 24;

      // Branches
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text('Branch', 30, y + 1);
      drawCheckboxOpt(125, y, 'Multi Gym Premium Shiya Masjid', false);
      drawCheckboxOpt(330, y, 'Multi Gym Premium Lalmatia', false);
      y += 18;
      drawCheckboxOpt(125, y, 'Multi Gym Premium Power Fit', false);
      y += 22;

      // SECTION 4: REFERRAL & INFLUENCE LOG
      drawSectionTitle('Referral & Influence Log (Mark The Appropriate Below)');

      let refY = y;
      // Col 1
      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Front Desk Officer:', 30, refY);
      drawCheckboxOpt(30, refY + 14, 'Morning Shift', false);
      drawCheckboxOpt(110, refY + 14, 'Evening Shift', false);

      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text("Existing Member's Reference:", 30, refY + 32);
      drawCheckboxOpt(30, refY + 46, 'Yes', false);
      drawCheckboxOpt(80, refY + 46, 'No', false);

      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Promotional Offer (Limited time):', 30, refY + 64);
      drawCheckboxOpt(30, refY + 78, 'Yes', false);
      drawCheckboxOpt(80, refY + 78, 'No', false);

      // Col 2
      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Trainer (Who Motivated):', 215, refY);
      drawCheckboxOpt(215, refY + 14, 'Morning Shift', false);
      drawCheckboxOpt(295, refY + 14, 'Evening Shift', false);

      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Walk-In / Self Decision:', 215, refY + 32);
      drawCheckboxOpt(215, refY + 46, 'Online Registration', true);
      drawCheckboxOpt(320, refY + 46, 'No', false);

      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Others (Please Specify):', 215, refY + 64);
      drawField(215, refY + 78, 160, 18, 'Website Registration');

      // Col 3
      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Social Media Campaign:', 400, refY);
      drawCheckboxOpt(400, refY + 14, 'Yes', false);
      drawCheckboxOpt(450, refY + 14, 'No', false);

      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('Phone Call / Inquiry:', 400, refY + 32);
      drawCheckboxOpt(400, refY + 46, 'Yes', false);
      drawCheckboxOpt(450, refY + 46, 'No', false);

      y = refY + 105;

      // Authorised Signature
      doc.moveTo(380, y).lineTo(545, y).lineWidth(0.8).stroke(strokeColor);
      doc.fillColor(darkColor).fontSize(9).font('Helvetica').text('Authorised Signature', 380, y + 4, { width: 165, align: 'right' });

      // FOOTER PAGE 1
      const footerY = 765;
      doc.rect(0, footerY, 595.28, 72).fill(darkColor);
      doc.rect(0, footerY, 595.28, 4).fill(goldColor);

      const colW = 175;
      // Branch 1
      doc.fillColor('#ffffff').fontSize(9.5).font('Helvetica-BoldOblique').text('MULTI GYM PREMIUM', 30, footerY + 8);
      doc.fillColor(goldColor).fontSize(8.5).font('Helvetica-BoldOblique').text('SHIYA MASJID', 30, footerY + 20);
      doc.fillColor('#dddddd').fontSize(7.5).font('Helvetica').text('24/1,24/2(3rd & 4th floor), Ring Road, Mohammadpur, Dhaka-1207\nPh: +880 1313 197 435 | Email: Info@multigymbd.com', 30, footerY + 32, { width: colW });

      // Branch 2
      doc.fillColor('#ffffff').fontSize(9.5).font('Helvetica-BoldOblique').text('MULTI GYM PREMIUM', 215, footerY + 8);
      doc.fillColor(goldColor).fontSize(8.5).font('Helvetica-BoldOblique').text('POWER FIT', 215, footerY + 20);
      doc.fillColor('#dddddd').fontSize(7.5).font('Helvetica').text('48/49 (5th & 6th Floors), Janata Co-op, Adabor, Shyamoli, Dhaka-1207\nPh: +880 1313 197 426 | Email: Info@multigympremium.com', 215, footerY + 32, { width: colW });

      // Branch 3
      doc.fillColor('#ffffff').fontSize(9.5).font('Helvetica-BoldOblique').text('MULTI GYM PREMIUM', 400, footerY + 8);
      doc.fillColor(goldColor).fontSize(8.5).font('Helvetica-BoldOblique').text('LALMATIA', 400, footerY + 20);
      doc.fillColor('#dddddd').fontSize(7.5).font('Helvetica').text('Lalmatia Shopping Center (2nd floor), New Colony, Dhaka-1207\nPh: +880 1313 197 427 | Email: Info@multigympremium.com', 400, footerY + 32, { width: colW });

      // Footer Bar bottom
      doc.rect(0, 836, 297.64, 5).fill(redColor);
      doc.rect(297.64, 836, 297.64, 5).fill(goldColor);

      // =========================================================================
      // PAGE 2: TERMS AND CONDITIONS
      // =========================================================================
      doc.addPage();

      // HEADER PAGE 2
      let tY = 30;
      doc.rect(210, tY, 175, 26).fill(goldColor);
      doc.fillColor(darkColor).fontSize(11).font('Helvetica-Bold').text('TERMS AND CONDITIONS', 210, tY + 7, { width: 175, align: 'center' });

      tY += 34;
      doc.fillColor(darkColor).fontSize(16).font('Helvetica-BoldOblique').text('MULTI GYM ', 180, tY, { continued: true });
      doc.fillColor(goldColor).text('PREMIUM');

      tY += 28;

      const terms = [
        'Members must carry their individual Door Access Punch Card to check In - Out of the gym.',
        'Clean Shoes, Towel, Water Bottle and other personal Gym Gear are mandatory.',
        'Membership cannot be Transferred and payment is Non-Refundable.',
        'Workout time is maximum of 02 hours per day.',
        'Each gym Machine including Treadmills can be used for a maximum of 20 minutes.',
        'Membership must be renewed within one day of the expiry date.',
        'A fine of 500 Tk will be charged to replace a damaged or lost membership card.',
        'Membership for minors requires parental permission.',
        'Payments for Steam or Sauna must be made in advance.',
        'Members are individually responsible for their valuables.',
        'The gym authority doesn\'t carry any responsibility in case of any loss of items/belongings.',
        'Locker keys must be returned to the Front Desk after use. 500Tk will be charged in case of loss/damage.',
        'Renewal, reactivation, or continuation of membership refers to the acknowledgement and acceptance of the Gym\'s prevailing Terms & Conditions.',
        'Gym Authority reserves the right to refuse entry, restrict access, suspend privileges, or take any necessary administrative action to maintain a safe, disciplined, conducive, and professional environment.',
        'Gym Authority reserves the right to change or modify the rules and regulations from time to time. Such changes shall apply to all existing and future members.',
        'Compliance from all our Valued Members shall be highly appreciated.'
      ];

      terms.forEach((termText, idx) => {
        doc.circle(45, tY + 6, 9).fill(goldColor);
        doc.fillColor(darkColor).fontSize(8.5).font('Helvetica-Bold').text(String(idx + 1), 36, tY + 3, { width: 18, align: 'center' });

        doc.fillColor('#222222').fontSize(9).font('Helvetica').text(termText, 62, tY + 1, { width: 495 });
        tY += 32;
      });

      tY += 10;

      // AGREEMENT CHECKBOX
      doc.rect(45, tY, 14, 14).fill(redColor);
      doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text('✓', 45, tY + 1, { width: 14, align: 'center' });
      doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('I HAVE READ, UNDERSTOOD AND AGREED TO ALL THE TERMS AND CONDITIONS STATED ABOVE.', 68, tY + 2);

      tY += 45;

      // MEMBER SIGNATURE LINE
      doc.moveTo(350, tY).lineTo(545, tY).lineWidth(0.8).stroke(strokeColor);
      doc.fillColor(darkColor).fontSize(9.5).font('Helvetica').text(`Signature Of Member (${fullName})`, 350, tY + 4, { width: 195, align: 'right' });

      // Footer Bar bottom Page 2
      doc.rect(0, 836, 297.64, 5).fill(redColor);
      doc.rect(297.64, 836, 297.64, 5).fill(goldColor);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
