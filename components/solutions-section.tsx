"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChefHat, Building2, Calendar, Check } from "lucide-react"

export function SolutionsSection() {
  const { t } = useLanguage()

  const icons = [ChefHat, Building2, Calendar]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.solutions.title}</h2>
          <p className="text-xl text-gray-600">{t.solutions.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.solutions.items.map((solution, index) => {
            const Icon = icons[index]
            return (
              <Card key={index} className="border-2 border-gray-100 hover:border-custom-blue-200 transition-colors">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-custom-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-custom-blue-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{solution.title}</CardTitle>
                  <CardDescription className="text-success-600 font-semibold">{solution.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-success-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={scrollToContact}
                    className="w-full bg-custom-blue-500 hover:bg-custom-blue-600 text-white"
                  >
                    Mehr erfahren
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
