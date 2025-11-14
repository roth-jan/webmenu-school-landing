"use client"

import { useLanguage } from "@/hooks/use-language"
import { AlertTriangle, Clock, BarChart3, TrendingDown } from "lucide-react"

export function ProblemsSection() {
  const { t } = useLanguage()

  const icons = [AlertTriangle, Clock, BarChart3, TrendingDown]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.problems.title}</h2>
          <p className="text-xl text-gray-600">{t.problems.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.problems.items.map((problem, index) => {
            const Icon = icons[index]
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-custom-red-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-custom-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-custom-red-50 border border-custom-red-200 rounded-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-custom-red-700 mb-4">Das Ergebnis: Täglich verlorener Gewinn</h3>
            <p className="text-custom-red-600 text-lg">
              Ohne präzise Kontrolle verlieren Caterer durchschnittlich 15-25% ihres möglichen Gewinns durch
              ineffiziente Prozesse und Verschwendung.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
