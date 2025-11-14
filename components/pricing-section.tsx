"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Calculator } from "lucide-react"

export function PricingSection() {
  const { t } = useLanguage()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.pricing.title}</h2>
          <p className="text-xl text-gray-600 mb-4">{t.pricing.subtitle}</p>
          <p className="text-lg text-gray-600">{t.pricing.description}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-custom-blue-200 bg-custom-blue-50">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-custom-blue-900">Pay-per-Portion Modell</CardTitle>
              <div className="text-4xl font-bold text-custom-blue-600 mt-4">Nur 0,XX€</div>
              <div className="text-custom-blue-700">pro ausgegebener Portion</div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-custom-blue-900 mb-4">Inklusive:</h4>
                  <ul className="space-y-3">
                    {[
                      "RFID-Hardware (Leasing)",
                      "Software-Lizenz",
                      "Warenwirtschafts-Integration",
                      "Echtzeit-Reporting",
                      "HACCP-Dokumentation",
                      "Support & Updates",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-success-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-custom-blue-900 mb-4">Ihre Vorteile:</h4>
                  <ul className="space-y-3">
                    {[
                      "Keine Grundgebühren",
                      "Keine versteckten Kosten",
                      "Skalierbare Preisgestaltung",
                      "ROI bereits ab Tag 1",
                      "Monatlich kündbar",
                      "Kostenlose Testphase",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-success-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-success-500 hover:bg-success-600 text-white px-8 py-4 mr-4"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  {t.pricing.cta}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Beispiel-Kalkulation für verschiedene Betriebsgrößen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Kleiner Caterer</h4>
                <div className="text-2xl font-bold text-custom-blue-600 mb-2">200</div>
                <div className="text-gray-600 mb-4">Portionen/Tag</div>
                <div className="text-lg font-semibold text-gray-900">ca. 40€/Tag</div>
                <div className="text-gray-600">Einsparung: 150€/Tag</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Mittlerer Caterer</h4>
                <div className="text-2xl font-bold text-custom-blue-600 mb-2">1.000</div>
                <div className="text-gray-600 mb-4">Portionen/Tag</div>
                <div className="text-lg font-semibold text-gray-900">ca. 200€/Tag</div>
                <div className="text-gray-600">Einsparung: 750€/Tag</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Großcaterer</h4>
                <div className="text-2xl font-bold text-custom-blue-600 mb-2">5.000</div>
                <div className="text-gray-600 mb-4">Portionen/Tag</div>
                <div className="text-lg font-semibold text-gray-900">ca. 1.000€/Tag</div>
                <div className="text-gray-600">Einsparung: 3.750€/Tag</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
