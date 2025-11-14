const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test the contact form
    console.log('Opening website...');
    await page.goto('https://d25e3962ub9og9.cloudfront.net');
    
    // Scroll to contact form
    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    await page.waitForTimeout(2000);
    
    // Fill the form
    console.log('Filling contact form...');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('input[name="phone"]', '+49 123 456789');
    await page.fill('textarea[name="message"]', 'Dies ist eine Testnachricht');
    
    // Open browser console to see errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console Error:', msg.text());
      } else if (msg.text().includes('EmailJS')) {
        console.log('Console Log:', msg.text());
      }
    });
    
    // Click submit button
    console.log('Submitting form...');
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(5000);
    
    // Check for error message
    const errorMessage = await page.locator('.text-custom-red-600').textContent().catch(() => null);
    if (errorMessage) {
      console.log('Error displayed:', errorMessage);
    }
    
    // Check for success message
    const successMessage = await page.locator('.text-success-600').first().textContent().catch(() => null);
    if (successMessage) {
      console.log('Success:', successMessage);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'emailjs-test-result.png', fullPage: true });
    console.log('Screenshot saved as emailjs-test-result.png');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
  
  // Keep browser open for manual inspection
  console.log('Browser will stay open for inspection. Press Ctrl+C to close.');
  await page.waitForTimeout(300000); // 5 minutes
})();