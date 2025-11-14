# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.2.4 static website for WebMenü Caterer, deployed on AWS S3 + CloudFront. The site is a single-page application (SPA) with multi-language support (German/English) and a contact form integrated with EmailJS.

## Build and Deploy Commands

```bash
# Development
npm run dev                   # Start development server on localhost:3000

# Build
npm run build                # Create static export in /out directory

# Deploy to AWS
aws s3 sync out/ s3://webmenu-catering --delete
aws cloudfront create-invalidation --distribution-id EWXZ0AWCPZJVB --paths "/*"

# Run Tests
npx playwright test          # Run all Playwright E2E tests
npx playwright test --ui     # Run tests in UI mode
```

## Architecture

### Static Export Configuration
- **next.config.mjs**: Configured with `output: 'export'` for static site generation
- No server-side features (API routes disabled)
- Images unoptimized for S3 hosting
- Trailing slashes enabled for proper S3 routing

### Multi-Language System
- **lib/i18n.ts**: Contains all translations (de/en)
- **lib/language-store.ts**: Singleton pattern for language state management
- **hooks/use-language.ts**: React hook for accessing translations
- Language switcher in header, defaults to German

### Contact Form Integration
- **components/contact-section.tsx**: Main contact form using EmailJS
- EmailJS configuration:
  - Service ID: `service_l15losq`
  - Template ID: `template_v2vxqid`  
  - Public Key: `xfrN6Db7TH5f83mrK`
- Emails sent to: jhroth@ntconsult.de, vertrieb@ntconsult.de
- Dynamic script loading for EmailJS library

### AWS Infrastructure
- **S3 Bucket**: webmenu-catering (eu-central-1)
- **CloudFront Distribution**: EWXZ0AWCPZJVB
- **Custom Domain**: webmenue-catering.de (via Strato DNS)
- **SSL Certificate**: ACM in us-east-1 for CloudFront

### Component Structure
- Shadcn/ui components in `components/ui/`
- Main sections: hero, problems, solutions, roi, technology, security, pricing, testimonials, contact
- All components are client-side rendered with "use client"

## Important Notes

- TypeScript and ESLint errors are ignored during build (see next.config.mjs)
- Playwright tests configured but baseURL points to old Vercel deployment
- AWS Lambda files present but not used (switched to EmailJS)
- GTM, Hotjar, and LeadInfo tracking scripts integrated