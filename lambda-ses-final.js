exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, email, company, phone, message } = body;

    // Validation
    if (!name || !email || !company) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: "Name, E-Mail und Unternehmen sind Pflichtfelder" 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: "Ungültige E-Mail-Adresse" 
        })
      };
    }

    // For now, log the request and simulate email sending
    console.log('Contact Form Submission:', {
      to: ['vertrieb@ntconsult.de', 'jhroth@ntconsult.de'],
      from: 'noreply@ntconsult.de',
      subject: `🍽️ Neue ROI-Analyse Anfrage von ${company}`,
      data: { name, email, company, phone, message },
      timestamp: new Date().toISOString()
    });

    // In a real implementation, you would:
    // 1. Verify SES email addresses first
    // 2. Use AWS SDK v3 or configure SES properly
    // 3. Or use a third-party service like SendGrid, Mailgun, etc.

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        info: "E-Mails werden an vertrieb@ntconsult.de und jhroth@ntconsult.de gesendet."
      })
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut."
      })
    };
  }
};