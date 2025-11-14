"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileCheck, Lock, Cloud } from "lucide-react"

export function SecuritySection() {
  const { t } = useLanguage()

  const icons = [Shield, FileCheck, Lock, Cloud]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.security.title}</h2>
          <p className="text-xl text-gray-600">{t.security.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.security.features.map((feature, index) => {
            const Icon = icons[index]
            return (
              <Card
                key={index}
                className="bg-white border-2 border-gray-100 hover:border-success-200 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-success-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature}</h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rechtssicherheit für Ihren Betrieb</h3>
            <p className="text-gray-600 mb-6">
              WebMenü erfüllt alle gesetzlichen Anforderungen für Caterer und Küchenbetriebe. Unsere Lösung ist
              vollständig HACCP-konform und entspricht allen relevanten Lebensmittelverordnungen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Compliance:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• HACCP-Dokumentation</li>
                  <li>• Lebensmittelverordnung</li>
                  <li>• Hygieneverordnung</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Datenschutz:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• DSGVO-konform</li>
                  <li>• Deutsche Server</li>
                  <li>• Verschlüsselte Übertragung</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
