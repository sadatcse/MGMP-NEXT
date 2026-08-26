import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import connectDB from '../../../src/lib/db';
import ChatSession from '../../../src/models/ChatSession';

function getSmartFallbackResponse(query, chatdata) {
  const q = (query || '').toLowerCase();

  // Personal training / trainer / coach
  if (q.includes('personal') || q.includes('trainer') || q.includes('instructor') || q.includes('coach') || q.includes('training')) {
    return `Yes! 💪 We offer private Personal Training and customized fitness guidance at Multigym Premium. Our passionate and certified personal trainers customize fitness & nutrition programs tailored to your specific goals.\n\nOur instructors include Fatema Begum, Karobi Sultana, and Jinat Ferdousi Jaky (Yoga & Cardio Specialist).\n\nFor trainer bookings or inquiries, call us at 01313-197435 / 01313-197427 or visit any of our branches! 🏋️‍♂️`;
  }

  // Price / Plan / Membership / Fee / Package
  if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('package') || q.includes('membership') || q.includes('plan') || q.includes('pay') || q.includes('discount') || q.includes('admission')) {
    return `Here are our Single Membership Plans at Multigym Premium 🏷️:\n\n` +
      `• **Admission Fee + Regular Monthly**: ৳6,000 (Admission: ৳3,500 + Monthly: ৳2,500)\n` +
      `• **Daily Pass**: ৳600 (No Admission Fee)\n` +
      `• **Weekly Pass**: ৳2,000 (Save ৳500)\n` +
      `• **Monthly No Admission**: ৳5,000 (Save ৳1,000)\n` +
      `• **3 Months**: ৳9,000\n` +
      `• **6 Months**: ৳16,000\n` +
      `• **1 Year (Best Value)**: ৳28,000\n\n` +
      `All membership fees include VAT & applicable taxes. You can click the "Join Now" button at the top of the website to apply! 🚀`;
  }

  // Branch / Location / Address / Contact
  if (q.includes('branch') || q.includes('location') || q.includes('address') || q.includes('where') || q.includes('place') || q.includes('contact') || q.includes('phone') || q.includes('number')) {
    return `Multigym Premium has 3 convenient branch locations in Dhaka 📍:\n\n` +
      `1. **Shiya Masjid Branch (Main)**: 24/1, 24/2 (3rd & 4th floor), Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka.\n` +
      `2. **Lalmatia Branch**: 2/1 Lalmatia, Block B, Ring Road, Dhaka.\n` +
      `3. **Power Fit — Adabor**: Jonota Housing, Ring Road, Shyamoli, Adabor, Dhaka.\n\n` +
      `📞 Contact Numbers: **01313-197435**, **01313-197427**, **01313-197426**.\n` +
      `✉️ Email: info@multigympremium.com`;
  }

  // Hours / Time / Schedule / Open / Ramadan
  if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('schedule') || q.includes('close') || q.includes('timing') || q.includes('friday') || q.includes('ramadan')) {
    return `Our Operating Hours ⏰:\n\n` +
      `• **Saturday to Thursday**: 6:00 AM – 11:00 PM\n` +
      `• **Friday**: 3:00 PM – 10:00 PM\n` +
      `• **Ladies-Only Floor**: Saturday to Thursday (7:00 AM – 11:00 PM) at Shia Masjid Branch.\n\n` +
      `Feel free to drop by anytime during open hours for a free club walkthrough! 🏋️‍♀️`;
  }

  // Ladies / Women / Female
  if (q.includes('lady') || q.includes('ladies') || q.includes('women') || q.includes('female') || q.includes('girl')) {
    return `Yes! 🌺 Multigym Premium features a dedicated **Ladies-Only Floor** at our Shia Masjid Branch, equipped with private workout spaces and certified female fitness instructors (Fatema Begum, Karobi Sultana, Jinat Ferdousi Jaky).\n\nTiming: Saturday to Thursday (7:00 AM - 11:00 PM).`;
  }

  // InBody / Assessment / Services / Nutrition
  if (q.includes('inbody') || q.includes('test') || q.includes('assessment') || q.includes('nutrition') || q.includes('food') || q.includes('service') || q.includes('locker') || q.includes('facility') || q.includes('zumba') || q.includes('yoga')) {
    return `Our Premier Services & Facilities 🌟:\n\n` +
      `• **InBody Composition Test**: Medical-grade body fat & muscle analysis (FREE on admission!).\n` +
      `• **Nutrition Service**: Personalized meal & diet guidance from certified nutritionists.\n` +
      `• **Free Weights & Cardio Center**: International SHUA machinery.\n` +
      `• **Group Exercise Classes**: Zumba, Yoga, Aerobics, Tabata, HIIT.\n` +
      `• **Personal Locker & Prayer Area**: Secure storage & dedicated spaces.\n` +
      `• **Ample Parking**: Easy access parking at all branches.`;
  }

  // Default friendly response
  return `Hello! 👋 Welcome to **Multigym Premium Customer Support** — Dhaka's #1 Elite Fitness Club!\n\n` +
    `We provide state-of-the-art SHUA gym equipment, InBody composition testing, certified Personal Trainers, Nutrition guidance, and group classes (Zumba, Yoga, HIIT).\n\n` +
    `Feel free to ask me about:\n` +
    `• Membership plans & prices 💳\n` +
    `• Branch locations & operating hours 📍\n` +
    `• Personal Training & Ladies Floor 🏋️‍♀️\n\n` +
    `You can also reach our team directly at **01313-197435** or **info@multigympremium.com**. How can I help you today? 💪`;
}

export async function POST(req) {
  try {
    const { message, history, sessionId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (sessionId) {
      try {
        await connectDB();
        await ChatSession.updateOne(
          { _id: sessionId },
          { 
            $push: { messages: { role: 'user', text: message, timestamp: new Date() } },
            $set: { updatedAt: new Date() }
          }
        );
      } catch (dbErr) {
        console.error('Failed to log user message to database:', dbErr);
      }
    }

    // Load chatdata dynamically
    const chatdataPath = path.resolve(process.cwd(), 'src/data/chatdata.json');
    let chatdata = {};
    try {
      chatdata = JSON.parse(fs.readFileSync(chatdataPath, 'utf8'));
    } catch (e) {
      console.warn('Could not read chatdata.json:', e);
    }

    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const match = envContent.match(/^GEMINI_API_KEY\s*=\s*([^\r\n]*)/m);
          if (match && match[1]) {
            apiKey = match[1].trim().replace(/^["']|["']$/g, '');
          }
        }
      } catch (err) {
        console.error('Self-healing env read failed:', err);
      }
    }

    let replyText = null;

    // Try calling Google Gemini API with fallback models if key exists
    if (apiKey) {
      const gymName = chatdata.gymProfile?.name || "Multigym Premium";
      const tagline = chatdata.gymProfile?.tagline || "";
      const description = chatdata.gymProfile?.description || "";
      const email = chatdata.gymProfile?.support?.email || "";

      const branchesText = (chatdata.branches || [])
        .map(b => `- ${b.branchName} (${b.floor ? `${b.floor} Floor` : ''})`)
        .join('\n');

      const hoursText = `
- Co-Ed Sessions: Saturday to Thursday (${chatdata.operatingHours?.coEd?.saturdayToThursday}), Friday (${chatdata.operatingHours?.coEd?.friday})
- Ladies-Only Sessions: Saturday to Thursday (${chatdata.operatingHours?.ladiesOnly?.saturdayToThursday})
      `.trim();

      const pricingText = (chatdata.membershipPlans || [])
        .map(p => `- ${p.planName}: ৳${p.price} for ${p.duration}`)
        .join('\n');

      const systemPrompt = `
You are a warm, enthusiastic, and highly professional AI receptionist and fitness assistant for "Multigym Premium", an elite gym brand in Dhaka, Bangladesh.

Use the following official gym facts to guide your answers:
- Gym Name: ${gymName}
- Chairman: ${chatdata.gymProfile?.chairman || "Abul Kalam Azad"}
- Tagline: ${tagline}
- Overview: ${description}
- Support Email: ${email}
- Branches: ${branchesText}
- Operating Hours: ${hoursText}
- Pricing Plans: ${pricingText}

RULES:
1. Always be welcoming, polite, and encouraging (use fitness emojis: 💪, 🏋️, 🥗, 🚴).
2. Keep responses structured, neat, and brief so they are easy to read in a small chat window.
3. Support both English and Bengali queries.
      `.trim();

      const contents = (history || []).map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      // Fallback model list
      const candidateModels = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

      for (const modelName of candidateModels) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
          const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              systemInstruction: { parts: [{ text: systemPrompt }] },
              generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
            })
          });

          if (response.ok) {
            const responseData = await response.json();
            const candidateText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (candidateText) {
              replyText = candidateText;
              break;
            }
          } else {
            console.warn(`Model ${modelName} returned status ${response.status}`);
          }
        } catch (modelErr) {
          console.warn(`Model ${modelName} fetch error:`, modelErr);
        }
      }
    }

    // Fallback to Smart Local Knowledge Engine if Gemini API didn't return text (e.g. quota 429)
    if (!replyText) {
      console.log('Using Smart Local Knowledge Base fallback response.');
      replyText = getSmartFallbackResponse(message, chatdata);
    }

    if (sessionId) {
      try {
        await ChatSession.updateOne(
          { _id: sessionId },
          { 
            $push: { messages: { role: 'model', text: replyText, timestamp: new Date() } },
            $set: { updatedAt: new Date() }
          }
        );
      } catch (dbErr) {
        console.error('Failed to log model message to database:', dbErr);
      }
    }

    return NextResponse.json({ response: replyText }, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    // Graceful fallback response instead of breaking Chatbox
    const fallbackText = getSmartFallbackResponse(req.message || '', {});
    return NextResponse.json({ response: fallbackText }, { status: 200 });
  }
}
