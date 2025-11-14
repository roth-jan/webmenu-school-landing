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

    // Log the contact request for now (you can integrate with SES later)
    console.log('Contact Form Submission:', {
      name,
      email,
      company,
      phone,
      message,
      timestamp: new Date().toISOString()
    });

    // For now, just return success
    // In production, you would integrate with AWS SES or another email service
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        debug: "Email functionality will be added with AWS SES integration"
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