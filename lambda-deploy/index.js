const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: 'eu-central-1' });

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  // Handle OPTIONS for API Gateway v2
  if (event.requestContext && event.requestContext.http && event.requestContext.http.method === 'OPTIONS') {
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
          success: false,
          error: "Name, E-Mail und Unternehmen sind Pflichtfelder" 
        })
      };
    }

    // Create email content
    const emailParams = {
      Source: 'noreply@ntconsult.de',
      Destination: {
        ToAddresses: ['vertrieb@ntconsult.de', 'jhroth@ntconsult.de']
      },
      Message: {
        Subject: {
          Data: `🍽️ Neue ROI-Analyse Anfrage von ${company}`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                      🍽️ Neue ROI-Analyse Anfrage - WebMenü
                    </h2>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h3 style="margin-top: 0; color: #1f2937;">Kontaktdaten:</h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                          <td style="padding: 8px 0;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold;">E-Mail:</td>
                          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold;">Unternehmen:</td>
                          <td style="padding: 8px 0;">${company}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
                          <td style="padding: 8px 0;">${phone || 'Nicht angegeben'}</td>
                        </tr>
                      </table>
                    </div>
                    
                    ${message ? `
                      <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1f2937;">Nachricht:</h3>
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                      </div>
                    ` : ''}
                    
                    <div style="margin-top: 30px; padding: 20px; background-color: #10b981; color: white; border-radius: 8px; text-align: center;">
                      <h3 style="margin: 0 0 10px 0;">Nächste Schritte:</h3>
                      <p style="margin: 5px 0;">✓ ROI-Analyse für ${company} erstellen</p>
                      <p style="margin: 5px 0;">✓ Innerhalb von 24h kontaktieren</p>
                      <p style="margin: 5px 0;">✓ Demo-Termin vereinbaren</p>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
                      Diese E-Mail wurde automatisch vom WebMenü Kontaktformular generiert.<br>
                      Zeitstempel: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
                    </p>
                  </div>
                </body>
              </html>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `
Neue ROI-Analyse Anfrage - WebMenü für Caterer

Kontaktdaten:
Name: ${name}
E-Mail: ${email}
Unternehmen: ${company}
Telefon: ${phone || 'Nicht angegeben'}

${message ? `Nachricht:\n${message}\n` : ''}

Nächste Schritte:
- ROI-Analyse für ${company} erstellen
- Innerhalb von 24h kontaktieren
- Demo-Termin vereinbaren

---
Diese E-Mail wurde automatisch vom WebMenü Kontaktformular generiert.
Zeitstempel: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
            `,
            Charset: 'UTF-8'
          }
        }
      }
    };

    // Send email using v3 SDK
    const command = new SendEmailCommand(emailParams);
    await ses.send(command);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      })
    };
  }
};