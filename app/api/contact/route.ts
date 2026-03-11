import { NextResponse } from 'next/server';

const TO_EMAIL = 'skaplan@instinctrise.com';

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { businessName, contactName, phone, email, trade, zip, bestTime, message } = data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No email service configured yet — log the submission and return success.
    // To enable email delivery:
    //   1. Sign up free at https://resend.com
    //   2. Add RESEND_API_KEY to your Vercel environment variables
    console.log('[TerritoryIQ Contact]', { businessName, contactName, phone, email, trade, zip, bestTime, message });
    return NextResponse.json({ ok: true });
  }

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
      <div style="background:#1B3A6B;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;color:white;font-size:22px">New TerritoryIQ Inquiry</h1>
        <p style="margin:6px 0 0;color:#93c5fd;font-size:14px">${trade} — ZIP ${zip}</p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none">
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:8px 0;font-weight:600;color:#475569;width:160px">Business</td><td style="padding:8px 0">${businessName}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#475569">Contact</td><td style="padding:8px 0">${contactName}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#475569">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#E05C1A">${phone}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#475569">Email</td><td style="padding:8px 0">${email || '—'}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#475569">Trade</td><td style="padding:8px 0">${trade}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#475569">Target ZIP</td><td style="padding:8px 0"><strong>${zip}</strong></td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#475569">Best Time</td><td style="padding:8px 0">${bestTime}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;vertical-align:top">Notes</td><td style="padding:8px 0">${message}</td></tr>` : ''}
        </table>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TerritoryIQ <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: email || undefined,
        subject: `New Territory Inquiry: ${businessName} — ${trade} in ${zip}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[TerritoryIQ] Resend error:', err);
      // Still return success to user — we don't want to show errors on the form
    }
  } catch (err) {
    console.error('[TerritoryIQ] Email send failed:', err);
  }

  return NextResponse.json({ ok: true });
}
