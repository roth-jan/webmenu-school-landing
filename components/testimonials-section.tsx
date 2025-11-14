"use client"

import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.testimonials.title}</h2>
          <p className="text-xl text-gray-600">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {t.testimonials.items.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border-2 border-gray-100 hover:border-custom-blue-200 transition-colors"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-custom-blue-300 mb-4" />
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-custom-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-custom-blue-600 font-semibold">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-custom-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Weitere Erfolgsgeschichten</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-success-500 mb-2">95%</div>
              <div className="text-gray-600">Kundenzufriedenheit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-500 mb-2">€2.8M</div>
              <div className="text-gray-600">Gesamtersparnis unserer Kunden</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-500 mb-2">150+</div>
              <div className="text-gray-600">Zufriedene Caterer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
