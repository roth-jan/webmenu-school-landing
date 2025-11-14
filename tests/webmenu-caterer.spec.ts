import { test, expect } from '@playwright/test';

test.describe('WebMenu Caterer Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/WebMenü/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should display hero section with CTA buttons', async ({ page }) => {
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    const ctaButton = page.getByRole('button', { name: /ROI berechnen/i });
    await expect(ctaButton).toBeVisible();
    
    const demoButton = page.getByRole('link', { name: /Demo anfragen/i });
    await expect(demoButton).toBeVisible();
  });

  test('should navigate to caterer page', async ({ page }) => {
    await page.goto('/caterer');
    await expect(page).toHaveURL('/caterer');
    await expect(page.locator('h1')).toContainText(/WebMenü für Caterer/i);
  });

  test('should show ROI calculator', async ({ page }) => {
    const roiSection = page.locator('section').filter({ hasText: /ROI-Rechner/i });
    await expect(roiSection).toBeVisible();
    
    // Test input fields
    const monthlyOrdersInput = page.locator('input[type="number"]').first();
    await expect(monthlyOrdersInput).toBeVisible();
    await monthlyOrdersInput.fill('500');
    
    // Check if calculation updates
    await page.waitForTimeout(500);
    const savingsText = page.locator('text=/€/').first();
    await expect(savingsText).toBeVisible();
  });

  test('should submit contact form', async ({ page }) => {
    // Scroll to contact section
    await page.evaluate(() => {
      const contactSection = document.querySelector('#contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    });
    
    await page.waitForTimeout(1000);
    
    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Catering GmbH');
    await page.fill('input[name="phone"]', '+49 123 456789');
    await page.fill('textarea[name="message"]', 'Dies ist eine Testnachricht für Playwright E2E Tests.');
    
    // Submit form
    const submitButton = page.getByRole('button', { name: /Nachricht senden/i });
    await submitButton.click();
    
    // Check for success message
    await expect(page.locator('text=/erfolgreich gesendet/i')).toBeVisible({ timeout: 10000 });
  });

  test('should display all main sections', async ({ page }) => {
    const sections = [
      'Ihre Herausforderungen',
      'Unsere Lösung',
      'Technologie',
      'Sicherheit',
      'Preise',
      'Was unsere Kunden sagen'
    ];
    
    for (const section of sections) {
      const sectionElement = page.locator(`text=/${section}/i`);
      await expect(sectionElement).toBeVisible();
    }
  });

  test('should show pricing cards', async ({ page }) => {
    const pricingSection = page.locator('section').filter({ hasText: /Preise/i });
    await pricingSection.scrollIntoViewIfNeeded();
    
    const pricingCards = pricingSection.locator('.grid > div');
    await expect(pricingCards).toHaveCount(3);
    
    // Check for pricing tiers
    await expect(page.locator('text=/Starter/i')).toBeVisible();
    await expect(page.locator('text=/Professional/i')).toBeVisible();
    await expect(page.locator('text=/Enterprise/i')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check mobile menu button
      const menuButton = page.getByRole('button', { name: /menu/i });
      await expect(menuButton).toBeVisible();
      
      // Check that content adapts to mobile
      const heroSection = page.locator('section').first();
      const heroWidth = await heroSection.boundingBox();
      expect(heroWidth?.width).toBeLessThan(768);
    }
  });

  test('should take screenshots of key features', async ({ page }) => {
    // Hero section
    await page.screenshot({ 
      path: 'tests/screenshots/hero-section.png',
      fullPage: false 
    });
    
    // ROI Calculator
    const roiSection = page.locator('section').filter({ hasText: /ROI-Rechner/i });
    await roiSection.scrollIntoViewIfNeeded();
    await page.screenshot({ 
      path: 'tests/screenshots/roi-calculator.png',
      fullPage: false 
    });
    
    // Pricing
    const pricingSection = page.locator('section').filter({ hasText: /Preise/i });
    await pricingSection.scrollIntoViewIfNeeded();
    await page.screenshot({ 
      path: 'tests/screenshots/pricing-section.png',
      fullPage: false 
    });
    
    // Full page
    await page.screenshot({ 
      path: 'tests/screenshots/full-page.png',
      fullPage: true 
    });
  });
});