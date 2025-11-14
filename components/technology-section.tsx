"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Database, BarChart, ShoppingCart } from "lucide-react"

export function TechnologySection() {
  const { t } = useLanguage()

  const icons = [Zap, Database, BarChart, ShoppingCart]

  return (
    <section id="technology" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.technology.title}</h2>
          <p className="text-xl text-gray-600">{t.technology.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.technology.features.map((feature, index) => {
            const Icon = icons[index]
            return (
              <Card key={index} className="border-2 border-gray-100 hover:border-custom-blue-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-custom-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-custom-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature}</h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-custom-blue-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-custom-blue-900 mb-6 text-center">
              So funktioniert WebMenü in Ihrem Betrieb
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-custom-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold text-custom-blue-900 mb-2">RFID-Erfassung</h4>
                <p className="text-custom-blue-700">Jede Portion wird automatisch per RFID erfasst</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-custom-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold text-custom-blue-900 mb-2">Echtzeit-Analyse</h4>
                <p className="text-custom-blue-700">Sofortige Auswertung und Kostenkontrolle</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-custom-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold text-custom-blue-900 mb-2">Optimierung</h4>
                <p className="text-custom-blue-700">Automatische Bestellvorschläge und Mengenplanung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
