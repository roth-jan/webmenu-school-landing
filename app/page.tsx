import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section-simple"
import { ProblemsSection } from "@/components/problems-section"
import { SolutionsSection } from "@/components/solutions-section"
import { ROISection } from "@/components/roi-section"
import { TechnologySection } from "@/components/technology-section"
import { SecuritySection } from "@/components/security-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "WebMenü - Digitale Schulverpflegung | NT Consult",
  description:
    "Das führende Internetbestellsystem für Schulen. Automatische Bestellungen, bargeldlose Bezahlung und exakte Mengenplanung. Über 900 Schulen vertrauen bereits darauf.",
  keywords: "Schulverpflegung, digitale Schulverpflegung, RFID Schulessen, WebMenü, Schulcatering Software, BuT Abrechnung",
  generator: "v0.dev",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProblemsSection />
        <SolutionsSection />
        <ROISection />
        <TechnologySection />
        <SecuritySection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
