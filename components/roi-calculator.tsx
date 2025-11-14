"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react"

export function ROICalculator() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    dailyPortions: "",
    currentWastePercent: "15",
    avgPortionCost: "4.50",
    adminHoursPerWeek: "10",
  })

  const calculatePotential = () => {
    const dailyPortions = Number(formData.dailyPortions) || 0
    const wastePercent = Number(formData.currentWastePercent) || 15
    const portionCost = Number(formData.avgPortionCost) || 4.5
    const adminHours = Number(formData.adminHoursPerWeek) || 10

    // Vorsichtige Potenzial-Berechnung ohne konkrete Garantien
    const currentWasteCost = dailyPortions * (wastePercent / 100) * portionCost * 30
    const currentAdminCost = adminHours * 25 * 4.33 // 25€/h, 4.33 Wochen/Monat

    return {
      currentWasteCost,
      currentAdminCost,
      totalCurrentCosts: currentWasteCost + currentAdminCost,
      dailyPortions,
    }
  }

  const results = formData.dailyPortions
    ? calculatePotential()
    : {
        currentWasteCost: 0,
        currentAdminCost: 0,
        totalCurrentCosts: 0,
        dailyPortions: 0,
      }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const scrollToContact = () => {
    setIsOpen(false)
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="lg"
        className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm"
      >
        <Calculator className="mr-2 h-5 w-5" />
        Einsparpotenzial prüfen
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-custom-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Einsparpotenzial-Rechner
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-custom-blue-600"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Wichtiger Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Wichtiger Hinweis:</p>
                <p>
                  Diese Berechnung dient nur der groben Orientierung und stellt keine Garantie dar. Tatsächliche
                  Einsparungen können je nach Betrieb stark variieren. Für eine präzise Analyse kontaktieren Sie uns für
                  eine individuelle Beratung.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ihre aktuellen Betriebsdaten:</h3>

              <div>
                <Label htmlFor="dailyPortions">Portionen pro Tag *</Label>
                <Input
                  id="dailyPortions"
                  name="dailyPortions"
                  type="number"
                  value={formData.dailyPortions}
                  onChange={handleInputChange}
                  placeholder="z.B. 500"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="currentWastePercent">Geschätzte Verschwendung (%)</Label>
                <Input
                  id="currentWastePercent"
                  name="currentWastePercent"
                  type="number"
                  value={formData.currentWastePercent}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">Branchendurchschnitt: 10-20%</p>
              </div>

              <div>
                <Label htmlFor="avgPortionCost">Durchschnittliche Kosten pro Portion (€)</Label>
                <Input
                  id="avgPortionCost"
                  name="avgPortionCost"
                  type="number"
                  step="0.10"
                  value={formData.avgPortionCost}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="adminHoursPerWeek">Verwaltungsaufwand pro Woche (Stunden)</Label>
                <Input
                  id="adminHoursPerWeek"
                  name="adminHoursPerWeek"
                  type="number"
                  value={formData.adminHoursPerWeek}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ihre aktuellen monatlichen Kosten:</h3>

              {formData.dailyPortions ? (
                <>
                  <div className="space-y-4">
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            {results.currentWasteCost.toLocaleString("de-DE")}€
                          </div>
                          <div className="text-red-700 text-sm">Kosten durch Verschwendung</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            {results.currentAdminCost.toLocaleString("de-DE")}€
                          </div>
                          <div className="text-orange-700 text-sm">Verwaltungskosten</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-100 border-gray-300">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-700 mb-1">
                            {results.totalCurrentCosts.toLocaleString("de-DE")}€
                          </div>
                          <div className="text-gray-600 text-sm">Gesamtkosten pro Monat</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-custom-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-custom-blue-900 mb-2">
                      <TrendingUp className="inline h-4 w-4 mr-1" />
                      Mögliches Einsparpotenzial:
                    </h4>
                    <ul className="text-sm text-custom-blue-700 space-y-1">
                      <li>• Reduzierung der Lebensmittelverschwendung durch präzise Planung</li>
                      <li>• Automatisierung von Verwaltungsprozessen</li>
                      <li>• Optimierte Warenwirtschaft und Bestellwesen</li>
                      <li>• Transparente Kostenkontrolle in Echtzeit</li>
                    </ul>
                    <p className="text-xs text-custom-blue-600 mt-3 font-medium">
                      → Lassen Sie uns gemeinsam Ihr individuelles Einsparpotenzial ermitteln
                    </p>
                  </div>

                  <Button
                    onClick={scrollToContact}
                    className="w-full bg-success-500 hover:bg-success-600 text-white"
                    size="lg"
                  >
                    Kostenlose Potenzial-Analyse buchen
                  </Button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Geben Sie Ihre Daten ein, um Ihr Kostenpotenzial zu analysieren</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              * Diese Berechnung basiert auf Branchendurchschnittswerten und dient nur der groben Orientierung.
              Individuelle Ergebnisse können abweichen. Keine Garantie für tatsächliche Einsparungen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
