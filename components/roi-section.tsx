"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, DollarSign } from "lucide-react"

export function ROISection() {
  const { t } = useLanguage()

  const icons = [TrendingUp, Clock, DollarSign]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-success-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.roi.title}</h2>
          <p className="text-xl text-gray-600">{t.roi.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.roi.stats.map((stat, index) => {
            const Icon = icons[index]
            return (
              <Card
                key={index}
                className="bg-white border-2 border-success-200 hover:border-success-300 transition-colors"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-success-600" />
                  </div>
                  <div className="text-4xl font-bold text-success-600 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-success-200">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Beispielrechnung für eine mittelgroße Schule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Monatliche Einsparungen:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Weniger Lebensmittelverschwendung: 2.500€</li>
                  <li>• Reduzierte Personalkosten: 1.800€</li>
                  <li>• Optimierte Warenwirtschaft: 700€</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Jährliche Ersparnis:</h4>
                <div className="text-2xl font-bold text-success-600">60.000€</div>
                <div className="text-gray-600">bei 1.000 Portionen/Tag</div>
              </div>
            </div>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-success-500 hover:bg-success-600 text-white px-8 py-4"
            >
              Ihre individuelle ROI-Berechnung anfordern
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
