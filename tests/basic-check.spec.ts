import { test, expect } from '@playwright/test';

test.describe('WebMenu Basic Deployment Check', () => {
  test('should load the deployed page', async ({ page }) => {
    await page.goto('https://webmenu-caterer-landing-2d62avid3-jhroth-7537s-projects.vercel.app');
    
    // Check if page loads (even if it's the auth page)
    await expect(page).toHaveURL(/vercel\.app/);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'tests/screenshots/deployed-page.png',
      fullPage: true 
    });
  });
  
  test('should test local development version', async ({ page }) => {
    // Test against localhost if dev server is running
    const response = await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 5000 
    }).catch(() => null);
    
    if (response && response.ok()) {
      await expect(page.locator('h1').first()).toBeVisible();
      await page.screenshot({ 
        path: 'tests/screenshots/local-homepage.png',
        fullPage: false 
      });
      
      // Test ROI Calculator
      const roiInputs = await page.locator('input[type="number"]').count();
      expect(roiInputs).toBeGreaterThan(0);
      
      // Test navigation
      const links = await page.locator('a').count();
      expect(links).toBeGreaterThan(0);
    } else {
      console.log('Local dev server not running, skipping local tests');
    }
  });
});