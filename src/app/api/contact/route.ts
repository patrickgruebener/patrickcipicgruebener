import { NextRequest, NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, website } = body;

    // SPAM PROTECTION: Honeypot check
    if (website) {
      // Bot detected - pretend success to avoid revealing detection
      console.warn('Honeypot triggered:', { email, timestamp: new Date().toISOString() });
      return NextResponse.json(
        { success: true, message: 'Anfrage erfolgreich gesendet' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
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
    const cleanFirstName = DOMPurify.sanitize(firstName.trim());
    const cleanLastName = DOMPurify.sanitize(lastName.trim());
    const cleanPhone = DOMPurify.sanitize(phone.trim());
    const cleanEmail = DOMPurify.sanitize(email.trim());

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // If no API key, log the submission and return success
      // This allows testing without the API key
      console.log('Contact form submission (no RESEND_API_KEY configured):');
      console.log({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        phone: cleanPhone,
        email: cleanEmail,
        timestamp: new Date().toISOString()
      });

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
          <p><strong>Telefon:</strong> ${cleanPhone}</p>
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
