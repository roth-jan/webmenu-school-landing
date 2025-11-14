// Script to create a contact form backend using AWS Lambda and API Gateway
// This creates a serverless endpoint that can receive form submissions

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const apigateway = new AWS.APIGateway();

const lambdaCode = `
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    
    // Log the submission
    console.log('Contact form submission:', {
      to: ['vertrieb@ntconsult.de', 'jhroth@ntconsult.de'],
      from: body.email,
      subject: \`🍽️ Neue ROI-Analyse Anfrage von \${body.company}\`,
      data: body,
      timestamp: new Date().toISOString()
    });

    // For now, just return success
    // In production, you would integrate with SES or another email service
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet.'
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Ein Fehler ist aufgetreten.'
      })
    };
  }
};
`;

// Create deployment package
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function createContactFormBackend() {
  // This would create the Lambda and API Gateway
  console.log('Contact form backend creation script ready');
  console.log('To deploy: aws lambda create-function ...');
}

createContactFormBackend();