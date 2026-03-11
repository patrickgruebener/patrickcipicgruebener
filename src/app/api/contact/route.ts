import { NextRequest, NextResponse } from 'next/server';

// Simple HTML sanitization for plain text fields
function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Server-side rate limiting: max 3 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 3) return true;

  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warte eine Stunde.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, phone, message, email, website } = body;

    // SPAM PROTECTION: Honeypot check
    if (website) {
      // Bot detected - pretend success to avoid revealing detection
      console.warn('Honeypot triggered');
      return NextResponse.json(
        { success: true, message: 'Anfrage erfolgreich gesendet' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (
      String(firstName).length > 100 ||
      String(lastName).length > 100 ||
      (phone && String(phone).length > 20) ||
      (message && String(message).length > 2000) ||
      String(email).length > 254
    ) {
      return NextResponse.json(
        { error: 'Eingabe zu lang' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS
    const cleanFirstName = sanitizeText(firstName.trim());
    const cleanLastName = sanitizeText(lastName.trim());
    const cleanPhone = phone ? sanitizeText(String(phone).trim()) : '';
    const cleanMessage = message ? sanitizeText(String(message).trim()) : '';
    const cleanEmail = sanitizeText(email.trim());

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // Demo mode: do not log PII
      console.log('Contact form submission received (demo mode - RESEND_API_KEY not configured)');
      return NextResponse.json(
        { success: true, message: 'Anfrage erfolgreich (Demo-Modus)' },
        { status: 200 }
      );
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Beratungsanfrage <onboarding@resend.dev>',
        to: ['patrickgruebener@gmail.com'],
        subject: `Neue Beratungsanfrage von ${cleanFirstName} ${cleanLastName}`,
        html: `
          <h2>Neue Beratungsanfrage</h2>
          <p><strong>Name:</strong> ${cleanFirstName} ${cleanLastName}</p>
          <p><strong>E-Mail:</strong> ${cleanEmail}</p>
          ${cleanPhone ? `<p><strong>Telefon:</strong> ${cleanPhone}</p>` : ''}
          ${cleanMessage ? `<p><strong>Nachricht:</strong><br>${cleanMessage}</p>` : ''}
          <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'Fehler beim Senden der E-Mail' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Anfrage erfolgreich gesendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
