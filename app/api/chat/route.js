import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import connectDB from '../../../src/lib/db';
import ChatSession from '../../../src/models/ChatSession';

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
    const chatdata = JSON.parse(fs.readFileSync(chatdataPath, 'utf8'));

    let apiKey = process.env.GEMINI_API_KEY;
    
    // Self-healing fallback: read .env directly if key is not yet loaded in process.env
    if (!apiKey) {
      try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const match = envContent.match(/^GEMINI_API_KEY\s*=\s*([^\r\n]*)/m);
          if (match && match[1]) {
            apiKey = match[1].trim().replace(/^["']|["']$/g, ''); // remove potential quotes
          }
        }
      } catch (err) {
        console.error('Self-healing env read failed:', err);
      }
    }

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not defined in environment variables');
      return NextResponse.json({ error: 'AI Service is temporarily unavailable' }, { status: 500 });
    }

    // Formulate system instruction context
    const gymName = chatdata.gymProfile?.name || "Multigym Premium";
    const tagline = chatdata.gymProfile?.tagline || "";
    const description = chatdata.gymProfile?.description || "";
    const email = chatdata.gymProfile?.support?.email || "";
    const iOSApp = chatdata.gymProfile?.support?.iosApp || "";
    const androidApp = chatdata.gymProfile?.support?.androidApp || "";

    const branchesText = (chatdata.branches || [])
      .map(b => `- ${b.branchName} (${b.floor} Floor, effective from ${b.effectiveDate})`)
      .join('\n');

    const hoursText = `
- Co-Ed Sessions: Saturday to Thursday (${chatdata.operatingHours?.coEd?.saturdayToThursday}), Friday (${chatdata.operatingHours?.coEd?.friday})
- Ladies-Only Sessions: Saturday to Thursday (${chatdata.operatingHours?.ladiesOnly?.saturdayToThursday}), Friday (${chatdata.operatingHours?.ladiesOnly?.friday})
- Ramadan Schedule: ${chatdata.operatingHours?.ramadanSchedule?.description}
    `.trim();

    const pricingText = (chatdata.membershipPlans || [])
      .map(p => `- ${p.planName}: ৳${p.price}${p.regularPrice ? ` (Regular price ৳${p.regularPrice})` : ''} for ${p.duration}.${p.admissionFeeRequired ? ` Admission fee is ৳${p.admissionFee}.` : ' No admission fee.'} Benefits: ${p.benefits?.join(', ')}`)
      .join('\n');

    const servicesText = `
- Fitness Programs: ${(chatdata.services?.fitnessPrograms || []).join(', ')}
- Specialized Training: ${(chatdata.services?.specializedTraining || []).join(', ')}
- Wellness Amenities: ${(chatdata.services?.wellnessAmenities || []).join(', ')}
- Additional Services: ${(chatdata.services?.additionalServices || []).join(', ')}
    `.trim();

    const scheduleText = (chatdata.regularClassSchedule?.weeklySchedule || [])
      .map(dayInfo => `* ${dayInfo.day}:\n` + (dayInfo.classes || []).map(c => `  - ${c.time}: ${c.name} (Instructor: ${c.instructor})`).join('\n'))
      .join('\n');

    const policiesText = `
- Dress Code & Modesty: ${chatdata.policies?.modestyCompliance?.dressCode} (Female trainer available: ${chatdata.policies?.modestyCompliance?.femaleTrainerAvailable ? 'Yes' : 'No'}, Private workout space: ${chatdata.policies?.modestyCompliance?.privateWorkoutSpaces ? 'Yes' : 'No'})
- Pricing & VAT: VAT included: ${chatdata.policies?.membershipPolicies?.vatIncluded ? 'Yes' : 'No'}. Standard Admission Fee: ৳${chatdata.policies?.membershipPolicies?.admissionFee}
    `.trim();

    const staffText = (chatdata.staff || [])
      .map(s => `- ${s.name} (${s.role})`)
      .join('\n');

    const faqsText = (chatdata.faq || [])
      .map(f => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n\n');

    const systemPrompt = `
You are a warm, enthusiastic, and highly professional AI receptionist and fitness assistant for "Multigym Premium", an elite gym brand in Dhaka, Bangladesh.

Use the following official gym facts to guide your answers:
- Gym Name: ${gymName}
- Chairman: ${chatdata.gymProfile?.chairman || "Abul Kalam Azad"}
- Tagline: ${tagline}
- Overview: ${description}
- Support Email: ${email}
- Apps: Android (${androidApp}), iOS (${iOSApp})

BRANCHES & FLOORS:
${branchesText}

OPERATING HOURS:
${hoursText}

PRICING PLANS & MEMBERSHIPS (in Bangladeshi Taka - BDT/৳):
${pricingText}

WEEKLY CLASS SCHEDULE (Shia Masjid Ladies floor):
${scheduleText}

OUR SERVICES & FACILITIES:
${servicesText}

STAFF & INSTRUCTORS:
${staffText}

POLICIES:
${policiesText}

FREQUENTLY ASKED QUESTIONS (FAQs):
${faqsText}

RULES & GUIDELINES:
1. Always be welcoming, polite, and encouraging (use fitness emojis: 💪, 🏋️, 🥗, 🚴).
2. Answer based on the facts provided above. If the exact answer is not present, answer professionally using general fitness knowledge and refer the user to our support email or branch contact for precise assistance.
3. Keep responses structured, neat, and brief so they are easy to read in a small chat window. Use bullet points.
4. Support both English and Bengali queries (respond in the language the user uses).
    `.trim();

    // Map chat history to Gemini API format
    const contents = (history || []).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Google Gemini API (gemini-2.5-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const responseData = await response.json();
    const replyText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I'm having trouble responding right now. Please try again.";

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
    return NextResponse.json({ error: 'Server error, please try again later' }, { status: 500 });
  }
}
