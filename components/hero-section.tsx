"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { ArrowRight, ChefHat } from "lucide-react"
import dynamic from "next/dynamic"

const ROICalculator = dynamic(() => import("@/components/roi-calculator").then((mod) => mod.ROICalculator), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export function HeroSection() {
  const { t } = useLanguage()

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
            <ChefHat className="h-4 w-4" />
            Speziell für Caterer entwickelt
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Mehr Gewinn für <span className="text-custom-blue-500">Caterer</span> und{" "}
            <span className="text-custom-blue-500">Küchenbetriebe</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-700 font-semibold mb-6">
            Schluss mit Überproduktion und unkalkulierbaren Verlusten
          </p>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            <strong>Sie kennen das Problem:</strong> Zu viel produziert = Verlust. Zu wenig produziert = unzufriedene
            Kunden. WebMenü löst dieses Dilemma mit präziser RFID-Technologie für exakte Mengenplanung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-custom-blue-500 hover:bg-custom-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Kostenlose Caterer-Beratung buchen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {ROICalculator && <ROICalculator />}
          </div>

          {/* Stats Row - Caterer-focused with PDF tech */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
              <div className="text-3xl font-bold text-custom-blue-500 mb-2">RFID</div>
              <div className="text-gray-700 font-medium">Manipulationsfreie Erfassung</div>
              <div className="text-sm text-gray-600 mt-1">Jede Portion automatisch getrackt</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
              <div className="text-3xl font-bold text-custom-blue-500 mb-2">Cent</div>
              <div className="text-gray-700 font-medium">Genaue Abrechnung</div>
              <div className="text-sm text-gray-600 mt-1">Pro ausgegebener Portion</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-200/50">
              <div className="text-3xl font-bold text-custom-blue-500 mb-2">App</div>
              <div className="text-gray-700 font-medium">Mobile Verwaltung</div>
              <div className="text-sm text-gray-600 mt-1">Überall und jederzeit</div>
            </div>
          </div>

          {/* Caterer Pain Points */}
          <div className="mt-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6">
            <p className="text-gray-800 font-semibold text-lg mb-2">⚠️ Kennen Sie diese Caterer-Probleme?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>• Unkalkulierbare Mengen bei Events</div>
              <div>• Hohe Personalkosten bei der Abrechnung</div>
              <div>• Schwankende Gewinnmargen</div>
              <div>• Warenwirtschafts-Chaos</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Realistic claims */}
        <div className="mt-20 pt-12 border-t border-gray-300/50">
          <div className="text-center mb-8">
            <p className="text-gray-700 font-medium">
              <strong>Seit 1998</strong> entwickelt NT Consult professionelle Küchenlösungen
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/30">
              <div className="text-2xl font-bold text-custom-blue-500">HACCP</div>
              <div className="text-xs text-gray-600">Konform</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/30">
              <div className="text-2xl font-bold text-custom-blue-500">DSGVO</div>
              <div className="text-xs text-gray-600">Rechtssicher</div>
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
