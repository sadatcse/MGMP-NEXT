import moment from 'moment';

export function generateMembershipFormHtml(item = {}) {
  const fullName = item.full_name || '';
  const phone = item.telephone_number || item.contact_no || '';
  const email = item.email || '';
  const address = item.address || '';
  const weight = item.weight || '';
  const height = item.height || `${item.feet || ''} ${item.inch || ''}`.trim();
  const age = item.age || '';
  const packageName = item.package_name || '';
  const packagePrice = item.package_price || '';
  
  const svgLogoUrl = '/multigym_premium_logo_v2.svg';

  // Format Date Boxes (DDMMYYYY) for submission date
  const dateStr = item.createdAt ? moment(item.createdAt).format('DDMMYYYY') : moment().format('DDMMYYYY');
  const d1 = dateStr[0] || '', d2 = dateStr[1] || '', m1 = dateStr[2] || '', m2 = dateStr[3] || '';
  const y1 = dateStr[4] || '', y2 = dateStr[5] || '', y3 = dateStr[6] || '', y4 = dateStr[7] || '';

  const isWeekly = packageName.toLowerCase().includes('weekly');
  const isDaily = packageName.toLowerCase().includes('daily');
  const isPackage = !isWeekly && !isDaily;
  const isRegular = packageName.toLowerCase().includes('regular') || packageName.toLowerCase().includes('admission');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Multi Gym Premium - Membership Form (${fullName})</title>
<style>
  :root{
    --gold:#f2a900;
    --dark:#1a1a1a;
    --red:#e30613;
  }
  *{box-sizing:border-box;}
  body{
    font-family:Arial, Helvetica, sans-serif;
    margin:0;
    background:#e9e9e9;
    color:#1a1a1a;
  }
  .page{
    width:210mm;
    min-height:297mm;
    margin:20px auto;
    background:#fff;
    box-shadow:0 0 12px rgba(0,0,0,.2);
    display:flex;
    flex-direction:column;
    page-break-after:always;
  }
  .page:last-child{page-break-after:auto;}
  .footer, .footer-bar{margin-top:auto;}

  @page{
    size:A4;
    margin:0;
  }
  @media print{
    body{background:#fff;}
    .page{
      margin:0;
      box-shadow:none;
      width:210mm;
      min-height:297mm;
    }
  }
  /* HEADER */
  .header{
    background:var(--dark);
    color:#fff;
    padding:14px 30px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:relative;
  }
  .header h1{
    font-size:28px;
    font-style:italic;
    margin:0;
    letter-spacing:1px;
  }
  .header .sub{
    color:var(--gold);
    font-size:17px;
    font-style:italic;
    font-weight:bold;
    margin-top:2px;
  }
  .header .logo{
    border:2px solid var(--red);
    padding:4px 8px;
    background:#000;
    display:flex;
    align-items:center;
    justify-content:center;
    min-width:100px;
    height:50px;
  }
  .header .logo img{
    max-height:42px;
    max-width:100%;
    object-fit:contain;
  }
  .gold-strip{
    height:6px;
    background:var(--gold);
  }

  /* SECTION TITLES */
  .section-title{
    background:#fdf1d8;
    border-left:6px solid var(--red);
    color:var(--dark);
    font-weight:bold;
    font-size:13px;
    padding:5px 12px;
    margin:12px 30px 8px;
    text-transform:uppercase;
  }

  .content{
    padding:0 30px;
  }

  .row{
    display:flex;
    align-items:center;
    gap:12px;
    margin-bottom:8px;
    font-size:13px;
  }
  .label{
    min-width:110px;
    font-weight:normal;
  }
  .field{
    flex:1;
    border:1px solid #333;
    border-radius:4px;
    min-height:24px;
    padding:2px 8px;
    font-weight:bold;
    font-size:13px;
    display:flex;
    align-items:center;
    background:#fcfcfc;
  }
  .field.small{flex:none; width:150px;}
  .inline-group{display:flex; align-items:center; gap:8px;}
  .checkbox{
    width:15px;height:15px;
    border:1px solid #333;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    border-radius:2px;
    vertical-align:middle;
    font-size:11px;
    font-weight:bold;
  }
  .checkbox.checked{
    background:var(--red);
    color:#fff;
    border-color:var(--red);
  }
  .opt{display:flex; align-items:center; gap:6px; margin-right:12px; font-size:13px;}
  .date-boxes{display:flex; gap:3px;}
  .date-boxes .b{
    width:18px;height:22px;border:1px solid #333;border-radius:2px;
    display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12px;
  }

  .grid-2{
    display:flex;
    gap:40px;
    margin-bottom:8px;
  }
  .grid-2 > .g{flex:1; display:flex; align-items:center; gap:10px; font-size:13px;}
  .grid-2 .label{min-width:105px;}

  .branch-row{display:flex; flex-wrap:wrap; gap:20px; margin:6px 0 8px;}

  /* REFERRAL */
  .referral-grid{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:18px;
    font-size:13px;
    margin-bottom:6px;
  }
  .referral-grid .heading{font-weight:bold; margin-bottom:4px;}
  .referral-grid .opts{display:flex; gap:14px; margin-bottom:10px;}

  .signature-line{
    text-align:right;
    margin:10px 0 6px;
    font-size:12px;
  }
  .signature-line .line{
    display:inline-block;
    width:200px;
    border-top:1px solid #333;
    margin-top:26px;
    padding-top:4px;
  }

  /* FOOTER */
  .footer{
    background:var(--dark);
    color:#fff;
    display:flex;
    justify-content:space-between;
    padding:12px 30px;
    font-size:11px;
  }
  .footer .branch{flex:1; padding:0 10px;}
  .footer .branch h3{
    font-style:italic;
    margin:0 0 2px;
    font-size:14px;
  }
  .footer .branch .b-sub{
    color:var(--gold);
    font-style:italic;
    font-weight:bold;
    font-size:12px;
    margin-bottom:6px;
  }
  .footer .branch p{margin:2px 0;}
  .footer-bar{
    height:6px;
    background:linear-gradient(90deg, var(--red) 0 50%, var(--gold) 50% 100%);
  }

  /* PAGE 2 - TERMS */
  .terms-header{
    text-align:center;
    padding:30px 0 10px;
  }
  .terms-header .tag{
    display:inline-block;
    background:var(--gold);
    color:#1a1a1a;
    font-weight:bold;
    padding:8px 20px;
    border-radius:4px 4px 4px 20px;
    font-size:18px;
  }
  .terms-header h2{
    font-style:italic;
    margin:12px 0 0;
    font-size:22px;
  }
  .terms-header h2 span{color:var(--gold);}
  .terms-list{
    padding:10px 50px 20px;
    font-size:14px;
    line-height:1.6;
    list-style:none;
    counter-reset:term;
  }
  .terms-list li{
    display:flex;
    gap:12px;
    margin-bottom:14px;
    counter-increment:term;
  }
  .terms-list li::before{
    content:counter(term);
    flex:none;
    width:20px;height:20px;
    border-radius:50%;
    background:var(--gold);
    color:var(--dark);
    font-weight:bold;
    font-size:12px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:1px;
  }
  .agree{
    display:flex;
    align-items:flex-start;
    gap:10px;
    font-weight:bold;
    font-size:13px;
    margin-top:6px;
    padding:0 50px;
  }
  .agree .chk{
    flex:none;
    width:18px;height:18px;
    border:1px solid #333;
    border-radius:3px;
    margin-top:2px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:var(--red);
    color:white;
  }
  .sig-member{
    text-align:right;
    margin:30px 50px 10px;
    font-size:13px;
  }
  .sig-member .line{
    display:inline-block;
    width:220px;
    border-top:1px solid #333;
    padding-top:4px;
  }
</style>
</head>
<body>

<!-- PAGE 1 -->
<div class="page">
  <div class="header">
    <div>
      <h1>MEMBERSHIP FORM</h1>
      <div class="sub">MULTI GYM PREMIUM</div>
    </div>
    <div class="logo">
      <img src="${svgLogoUrl}" alt="Multi Gym Premium" />
    </div>
  </div>
  <div class="gold-strip"></div>

  <div class="section-title">Registration Form</div>
  <div class="content">
    <div class="row">
      <div class="label">Membership ID:</div>
      <div class="field small"></div>
      <div class="label" style="min-width:40px;">Date:</div>
      <div class="date-boxes">
        <div class="b">${d1}</div><div class="b">${d2}</div>
        <div class="b">${m1}</div><div class="b">${m2}</div>
        <div class="b">${y1}</div><div class="b">${y2}</div><div class="b">${y3}</div><div class="b">${y4}</div>
      </div>
    </div>
    <div class="row">
      <div class="label">Membership Type:</div>
      <div class="opt"><span class="checkbox ${isRegular ? 'checked' : ''}">${isRegular ? '✓' : ''}</span>Regular</div>
      <div class="opt"><span class="checkbox ${isPackage ? 'checked' : ''}">${isPackage ? '✓' : ''}</span>Package</div>
      <div class="opt"><span class="checkbox ${isWeekly ? 'checked' : ''}">${isWeekly ? '✓' : ''}</span>Weekly</div>
      <div class="opt"><span class="checkbox ${isDaily ? 'checked' : ''}">${isDaily ? '✓' : ''}</span>Daily</div>
    </div>
  </div>

  <div class="section-title">Personal Information</div>
  <div class="content">
    <div class="row"><div class="label">Full Name</div><div class="field">${fullName}</div></div>
    <div class="row">
      <div class="label">Contact No</div><div class="field">${phone}</div>
      <div class="label" style="min-width:100px;">Date of Birth</div>
      <div class="date-boxes">
        <div class="b"></div><div class="b"></div><div class="b"></div>
        <div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div>
      </div>
    </div>
    <div class="row"><div class="label">Full Address</div><div class="field">${address}</div></div>
    <div class="row">
      <div class="label">Status</div>
      <div class="opt"><span class="checkbox checked">✓</span>Single</div>
      <div class="opt"><span class="checkbox"></span>Married</div>
      <div class="label" style="min-width:60px;">NID No:</div>
      <div class="field"></div>
    </div>
    <div class="row">
      <div class="label">Blood Group</div><div class="field"></div>
      <div class="label" style="min-width:60px;">Weight:</div><div class="field">${weight}</div>
    </div>
    <div class="row">
      <div class="label">Emergency No</div><div class="field"></div>
      <div class="label" style="min-width:60px;">Height:</div><div class="field">${height}</div>
    </div>
    <div class="row">
      <div class="label">Religion</div><div class="field"></div>
      <div class="label" style="min-width:40px;">Age:</div><div class="field">${age}</div>
    </div>
    <div class="row">
      <div class="label">Profession</div><div class="field"></div>
      <div class="label" style="min-width:60px;">Gender:</div>
      <div class="opt"><span class="checkbox"></span>Male</div>
      <div class="opt"><span class="checkbox"></span>Female</div>
    </div>
  </div>

  <div class="section-title">Admission Details</div>
  <div class="content">
    <div class="grid-2">
      <div class="g"><div class="label">Admission Fee</div><div class="field">${packageName.includes('Admission') ? 'BDT 3,500' : 'N/A'}</div></div>
      <div class="g"><div class="label">Starting Date</div><div class="field"></div></div>
    </div>
    <div class="grid-2">
      <div class="g"><div class="label">Category</div><div class="field">${packageName}</div></div>
      <div class="g"><div class="label">Expiry Date</div><div class="field"></div></div>
    </div>
    <div class="row"><div class="label">Paid Amount</div><div class="field">${packagePrice}</div></div>
    <div class="row">
      <div class="label">Due Amount</div><div class="field small">0 BDT</div>
      <div class="label" style="min-width:70px;">Payment</div>
      <div class="opt"><span class="checkbox checked">✓</span>Online / Pending Cash</div>
      <div class="opt"><span class="checkbox"></span>Card</div>
      <div class="opt"><span class="checkbox"></span>Bkash</div>
    </div>
    <div class="branch-row">
      <div class="label" style="min-width:60px;">Branch</div>
      <div class="opt"><span class="checkbox"></span>Multi Gym Premium Shiya Masjid</div>
      <div class="opt"><span class="checkbox"></span>Multi Gym Premium Lalmatia</div>
    </div>
    <div class="branch-row" style="margin-top:-14px;">
      <div style="min-width:60px;"></div>
      <div class="opt"><span class="checkbox"></span>Multi Gym Premium Power Fit</div>
    </div>
  </div>

  <div class="section-title">Referral &amp; Influence Log (Mark The Appropriate Below)</div>
  <div class="content">
    <div class="referral-grid">
      <div>
        <div class="heading">Front Desk Officer:</div>
        <div class="opts">
          <div class="opt"><span class="checkbox"></span>Morning Shift</div>
          <div class="opt"><span class="checkbox"></span>Evening Shift</div>
        </div>
        <div class="heading">Existing Member's Reference:</div>
        <div class="opts">
          <div class="opt"><span class="checkbox"></span>Yes</div>
          <div class="opt"><span class="checkbox"></span>No</div>
        </div>
        <div class="heading">Promotional Offer (Limited time):</div>
        <div class="opts">
          <div class="opt"><span class="checkbox"></span>Yes</div>
          <div class="opt"><span class="checkbox"></span>No</div>
        </div>
      </div>
      <div>
        <div class="heading">Trainer (Who Motivated):</div>
        <div class="opts">
          <div class="opt"><span class="checkbox"></span>Morning Shift</div>
          <div class="opt"><span class="checkbox"></span>Evening Shift</div>
        </div>
        <div class="heading">Walk-In / Self Decision:</div>
        <div class="opts">
          <div class="opt"><span class="checkbox checked">✓</span>Online Registration</div>
          <div class="opt"><span class="checkbox"></span>No</div>
        </div>
        <div class="heading">Others (Please Specify):</div>
        <div class="field" style="margin-top:4px;">Website Registration</div>
      </div>
      <div>
        <div class="heading">Social Media Campaign:</div>
        <div class="opts">
          <div class="opt"><span class="checkbox"></span>Yes</div>
          <div class="opt"><span class="checkbox"></span>No</div>
        </div>
        <div class="heading">Phone Call / Inquiry:</div>
        <div class="opts">
          <div class="opt"><span class="checkbox"></span>Yes</div>
          <div class="opt"><span class="checkbox"></span>No</div>
        </div>
      </div>
    </div>
    <div class="signature-line"><span class="line">Authorised Signature</span></div>
  </div>

  <div class="footer">
    <div class="branch">
      <h3>MULTI GYM PREMIUM</h3>
      <div class="b-sub">SHIYA MASJID</div>
      <p>24/1,24/2(3rd &amp; 4th floor), Ring Road, Shiya Masjid Mor, Mohammadpur, Dhaka-1207</p>
      <p>&#128222; +880 1313 197 435</p>
      <p>&#9993; Info@multigymbd.com</p>
    </div>
    <div class="branch">
      <h3>MULTI GYM PREMIUM</h3>
      <div class="b-sub">POWER FIT</div>
      <p>48/49 (5th &amp; 6th Floors), Janata Co-operative Housing Society, Ring Road, Adabor, Shyamoli, Dhaka-1207</p>
      <p>&#128222; +880 1313 197 426</p>
      <p>&#9993; Info@multigympremium.com</p>
    </div>
    <div class="branch">
      <h3>MULTI GYM PREMIUM</h3>
      <div class="b-sub">LALMATIA</div>
      <p>Lalmatia Shopping Center (2nd floor), Lalmatia New Colony Beside Fire Service &amp; Civil Defence (Fire Brigade), Dhaka-1207</p>
      <p>&#128222; +880 1313 197 427</p>
      <p>&#9993; Info@multigympremium.com</p>
    </div>
  </div>
  <div class="footer-bar"></div>
</div>

<!-- PAGE 2 -->
<div class="page">
  <div class="terms-header">
    <div class="tag">&#128227; TERMS AND CONDITIONS</div>
    <h2>MULTI GYM <span>PREMIUM</span></h2>
  </div>
  <ol class="terms-list">
    <li>Members must carry their individual Door Access Punch Card to check In - Out of the gym.</li>
    <li>Clean Shoes, Towel, Water Bottle and other personal Gym Gear are mandatory.</li>
    <li>Membership cannot be Transferred and payment is Non-Refundable.</li>
    <li>Workout time is maximum of 02 hours per day.</li>
    <li>Each gym Machine including Treadmills can be used for a maximum of 20 minutes.</li>
    <li>Membership must be renewed within one day of the expiry date.</li>
    <li>A fine of 500 Tk will be charged to replace a damaged or lost membership card.</li>
    <li>Membership for minors requires parental permission.</li>
    <li>Payments for Steam or Sauna must be made in advance.</li>
    <li>Members are individually responsible for their valuables.</li>
    <li>The gym authority doesn't carry any responsibility in case of any loss of items/belongings.</li>
    <li>Locker keys must be returned to the Front Desk after use. 500Tk will be charged in case of loss/damage.</li>
    <li>Renewal, reactivation, or continuation of membership refers to the acknowledgement and acceptance of the Gym's prevailing Terms &amp; Conditions.</li>
    <li>Gym Authority reserves the right to refuse entry, restrict access, suspend privileges, or take any necessary administrative action to maintain a safe, disciplined, conducive, and professional environment.</li>
    <li>Gym Authority reserves the right to change or modify the rules and regulations from time to time. Such changes shall apply to all existing and future members.</li>
    <li>Compliance from all our Valued Members shall be highly appreciated.</li>
  </ol>
  <div class="agree">
    <span class="chk">✓</span>
    <span>I HAVE READ, UNDERSTOOD AND AGREED TO ALL THE TERMS AND CONDITIONS STATED ABOVE.</span>
  </div>
  <div class="sig-member"><span class="line">Signature Of Member (${fullName})</span></div>
  <div class="footer-bar"></div>
</div>

</body>
</html>`;
}
