import PDFDocument from 'pdfkit';
import moment from 'moment';

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

      const fullName = item.full_name || 'N/A';
      const phone = item.telephone_number || item.contact_no || 'N/A';
      const email = item.email || 'N/A';
      const address = item.address || 'N/A';
      const weight = item.weight || 'N/A';
      const height = item.height || `${item.feet || ''} ${item.inch || ''}`.trim() || 'N/A';
      const age = item.age || 'N/A';
      const packageName = item.package_name || 'Single Membership';
      const packagePrice = item.package_price || 'N/A';
      const dateStr = item.createdAt ? moment(item.createdAt).format('DD / MM / YYYY') : moment().format('DD / MM / YYYY');

      const isWeekly = packageName.toLowerCase().includes('weekly');
      const isDaily = packageName.toLowerCase().includes('daily');
      const isPackage = !isWeekly && !isDaily;
      const isRegular = packageName.toLowerCase().includes('regular') || packageName.toLowerCase().includes('admission');

      // COLORS
      const darkColor = '#111111';
      const goldColor = '#f4cb71';
      const redColor = '#e30613';
      const lightBg = '#f9f9f9';
      const borderColor = '#dddddd';

      // ==========================================
      // PAGE 1
      // ==========================================

      // HEADER BANNER
      doc.rect(0, 0, 595.28, 75).fill(darkColor);
      doc.rect(0, 75, 595.28, 5).fill(goldColor);

      doc.fillColor('#ffffff').fontSize(22).font('Helvetica-BoldOblique').text('MEMBERSHIP FORM', 35, 18);
      doc.fillColor(goldColor).fontSize(13).font('Helvetica-BoldOblique').text('MULTI GYM PREMIUM', 35, 45);

      // Subheader badge
      doc.rect(380, 20, 180, 36).lineWidth(1.5).stroke(redColor);
      doc.fillColor(goldColor).fontSize(10).font('Helvetica-Bold').text('OFFICIAL REGISTRATION', 390, 32, { width: 160, align: 'center' });

      let y = 95;

      const renderSectionTitle = (title) => {
        doc.rect(35, y, 525.28, 22).fill('#fdf1d8');
        doc.rect(35, y, 5, 22).fill(redColor);
        doc.fillColor('#1a1a1a').fontSize(11).font('Helvetica-Bold').text(title.toUpperCase(), 48, y + 6);
        y += 30;
      };

      // 1. REGISTRATION FORM
      renderSectionTitle('1. Registration Details');

      // Registration info box
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#333333');
      doc.text(`Date of Submission: `, 45, y);
      doc.font('Helvetica').fillColor('#000000').text(dateStr, 150, y);

      y += 18;
      doc.font('Helvetica-Bold').fillColor('#333333').text('Membership Type:', 45, y);

      doc.font('Helvetica').fillColor('#000000');
      doc.text(`[ ${isRegular ? 'X' : '  '} ] Regular    [ ${isPackage ? 'X' : '  '} ] Package    [ ${isWeekly ? 'X' : '  '} ] Weekly    [ ${isDaily ? 'X' : '  '} ] Daily`, 150, y);

      y += 28;

      // 2. PERSONAL INFORMATION
      renderSectionTitle('2. Personal Information');

      const drawFieldRow = (label1, val1, label2 = '', val2 = '') => {
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#444444').text(label1 + ':', 45, y);
        doc.rect(130, y - 2, label2 ? 140 : 380, 18).fillAndStroke(lightBg, borderColor);
        doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text(String(val1), 136, y + 2, { width: label2 ? 130 : 370, lineBreak: false });

        if (label2) {
          doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#444444').text(label2 + ':', 290, y);
          doc.rect(370, y - 2, 140, 18).fillAndStroke(lightBg, borderColor);
          doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000').text(String(val2), 376, y + 2, { width: 130, lineBreak: false });
        }
        y += 24;
      };

      drawFieldRow('Full Name', fullName);
      drawFieldRow('Contact No', phone, 'Email', email);
      drawFieldRow('Height & Weight', `${height}  |  ${weight}`, 'Age', age);
      drawFieldRow('Full Address', address);

      y += 6;

      // 3. ADMISSION DETAILS
      renderSectionTitle('3. Selected Plan & Admission Details');

      drawFieldRow('Selected Package', packageName, 'Package Price', packagePrice);
      drawFieldRow('Status', 'Pending Activation', 'Payment Type', 'Online / Cash');

      y += 6;

      // 4. BRANCHES
      renderSectionTitle('4. Official Branches');

      doc.fontSize(9).font('Helvetica-Bold').fillColor('#333333');
      doc.text('[ X ] Shiya Masjid Branch (Mohammadpur)', 45, y);
      doc.text('[ X ] Lalmatia Branch (Lalmatia)', 280, y);
      y += 16;
      doc.text('[ X ] Power Fit Branch (Adabor / Shyamoli)', 45, y);

      y += 26;

      // AUTHORISED SIGNATURE
      doc.moveTo(380, y + 25).lineTo(520, y + 25).stroke('#444444');
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#333333').text('Authorised Signature & Seal', 380, y + 30, { width: 140, align: 'center' });

      // PAGE 1 FOOTER
      doc.rect(0, 792 - 45, 595.28, 45).fill(darkColor);
      doc.rect(0, 792 - 45, 595.28, 3).fill(redColor);

      doc.fillColor(goldColor).fontSize(9).font('Helvetica-Bold').text('MULTI GYM PREMIUM AUTOMATED REGISTRATION SYSTEM', 35, 792 - 32, { width: 525, align: 'center' });
      doc.fillColor('#aaaaaa').fontSize(8).font('Helvetica').text('Website: www.multigympremium.com  |  Email: info@multigympremium.com', 35, 792 - 18, { width: 525, align: 'center' });

      // ==========================================
      // PAGE 2 - TERMS & CONDITIONS
      // ==========================================
      doc.addPage();

      // HEADER
      doc.rect(0, 0, 595.28, 65).fill(darkColor);
      doc.rect(0, 65, 595.28, 4).fill(goldColor);

      doc.fillColor('#ffffff').fontSize(18).font('Helvetica-BoldOblique').text('TERMS AND CONDITIONS', 35, 18);
      doc.fillColor(goldColor).fontSize(12).font('Helvetica-BoldOblique').text('MULTI GYM PREMIUM RULES & REGULATIONS', 35, 42);

      let y2 = 85;

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

      terms.forEach((term, idx) => {
        doc.circle(45, y2 + 5, 8).fill(goldColor);
        doc.fillColor('#1a1a1a').fontSize(8.5).font('Helvetica-Bold').text(String(idx + 1), 40, y2 + 2, { width: 10, align: 'center' });

        doc.fillColor('#222222').fontSize(9).font('Helvetica').text(term, 60, y2, { width: 495 });
        y2 += 32;
      });

      y2 += 10;

      // AGREEMENT BOX
      doc.rect(35, y2, 525.28, 30).fillAndStroke('#fdf1d8', redColor);
      doc.fillColor(redColor).fontSize(8.5).font('Helvetica-Bold').text('[ X ]  I HAVE READ, UNDERSTOOD AND AGREED TO ALL THE TERMS AND CONDITIONS STATED ABOVE.', 45, y2 + 10, { width: 505, align: 'center' });

      y2 += 50;

      // MEMBER SIGNATURE
      doc.moveTo(350, y2 + 15).lineTo(520, y2 + 15).stroke('#444444');
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1a1a1a').text(`Signature Of Member (${fullName})`, 330, y2 + 22, { width: 200, align: 'center' });

      // PAGE 2 FOOTER
      doc.rect(0, 792 - 45, 595.28, 45).fill(darkColor);
      doc.rect(0, 792 - 45, 595.28, 3).fill(goldColor);

      doc.fillColor(goldColor).fontSize(9).font('Helvetica-Bold').text('MULTI GYM PREMIUM - MEMBER ACKNOWLEDGEMENT ARCHIVE', 35, 792 - 32, { width: 525, align: 'center' });
      doc.fillColor('#aaaaaa').fontSize(8).font('Helvetica').text('Dhaka Branches: Shiya Masjid | Lalmatia | Power Fit', 35, 792 - 18, { width: 525, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
