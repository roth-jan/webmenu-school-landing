"use client"

import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, School } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Light Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-kitchen.png')",
          filter: "blur(1px)",
          transform: "scale(1.02)",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/65" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200/50">
            <School className="h-4 w-4" />
            Über 900 Schulen vertrauen auf WebMenü
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Digitale <span className="text-custom-blue-500">Schulverpflegung</span> für die Zukunft
          </h1>

          <p className="text-xl lg:text-2xl text-gray-700 font-semibold mb-6">
            Das führende Internetbestellsystem für Schulen
          </p>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            <strong>Automatische Bestellungen, bargeldlose Bezahlung und exakte Mengenplanung.</strong> Mit WebMenü
            profitieren Schulen, Eltern und Schüler von einem modernen, sicheren System für die Schulverpflegung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md bg-custom-blue-500 hover:bg-custom-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Kostenlose Beratung für Schulen
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-11 rounded-md border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Demo anfordern
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
              <div className="text-3xl font-bold text-custom-blue-500 mb-2">RFID</div>
              <div className="text-gray-700 font-medium">Kontaktlose Bezahlung</div>
              <div className="text-sm text-gray-600 mt-1">Schnell und hygienisch</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
              <div className="text-3xl font-bold text-custom-blue-500 mb-2">BuT</div>
              <div className="text-gray-700 font-medium">Bildung und Teilhabe</div>
              <div className="text-sm text-gray-600 mt-1">Automatische Abrechnung</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
              <div className="text-3xl font-bold text-custom-blue-500 mb-2">App</div>
              <div className="text-gray-700 font-medium">Eltern-Portal</div>
              <div className="text-sm text-gray-600 mt-1">Überall und jederzeit</div>
            </div>
          </div>

          <div className="mt-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6">
            <p className="text-gray-800 font-semibold text-lg mb-2">✓ Vertrauen Sie auf Erfahrung seit 1998</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>• Über 900 Schulen in Deutschland</div>
              <div>• DSGVO-konform und sicher</div>
              <div>• Einfache Integration</div>
              <div>• Professioneller Support</div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-300/50">
          <div className="text-center mb-8">
            <p className="text-gray-700 font-medium">
              <strong>Seit 1998</strong> entwickelt NT Consult professionelle Lösungen für Schulverpflegung
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/30">
              <div className="text-2xl font-bold text-custom-blue-500">900+</div>
              <div className="text-xs text-gray-600">Schulen</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/30">
              <div className="text-2xl font-bold text-custom-blue-500">DSGVO</div>
              <div className="text-xs text-gray-600">Konform</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/30">
              <div className="text-2xl font-bold text-custom-blue-500">RFID</div>
              <div className="text-xs text-gray-600">Technologie</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/30">
              <div className="text-2xl font-bold text-custom-blue-500">24/7</div>
              <div className="text-xs text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
