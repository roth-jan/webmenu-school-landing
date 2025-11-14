const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_8Ah9abea_9dbQkYj54w8mqxcq3HPbwvYC');

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
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

    // Send email via Resend
    const emailData = await resend.emails.send({
      from: "WebMenü Kontakt <noreply@webmenu-caterer.de>",
      to: ["jhroth@ntconsult.de"],
      subject: `🍽️ Neue ROI-Analyse Anfrage von ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00a0f6 0%, #0066a3 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🍽️ Neue ROI-Analyse Anfrage</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">WebMenü für Caterer</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
            <h2 style="color: #333; margin-top: 0;">Kontaktdaten:</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">E-Mail:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #00a0f6; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Unternehmen:</td>
                <td style="padding: 8px 0; color: #333;">${company}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="tel:${phone}" style="color: #00a0f6; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ""}
            </table>

            ${message ? `
            <h3 style="color: #333; margin-top: 20px;">Nachricht:</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #00a0f6;">
              <p style="margin: 0; color: #333; line-height: 1.5;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            ` : ""}
          </div>
        </div>
      `,
      text: `Neue ROI-Analyse Anfrage - WebMenü für Caterer\n\nName: ${name}\nE-Mail: ${email}\nUnternehmen: ${company}\n${phone ? `Telefon: ${phone}` : ""}\n${message ? `\nNachricht:\n${message}` : ""}`
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        emailId: emailData.data?.id
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