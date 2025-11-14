"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_webmenu"
const EMAILJS_TEMPLATE_ID = "template_roi_request"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY" // Will be replaced with actual key

export function EmailJSContactSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Load EmailJS script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Initialize EmailJS with public key
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // For now, we'll use a webhook service that forwards to email
      const webhookUrl = "https://hook.eu2.make.com/YOUR_WEBHOOK_ID" // Placeholder
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_emails: ["vertrieb@ntconsult.de", "jhroth@ntconsult.de"],
          from_name: formData.name,
          from_email: formData.email,
          subject: `🍽️ Neue ROI-Analyse Anfrage von ${formData.company}`,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          timestamp: new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", company: "", phone: "", message: "" })
        
        // GTM tracking
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "form_submit_success",
            form_type: "roi_analysis_request",
            company: formData.company,
          })
        }
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Fehler beim Senden. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const copyToClipboard = async (text: string, type: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text)
      // GTM tracking
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "contact_copy",
          contact_type: type,
          contact_value: text,
        })
      }
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }
  }

  return (
    <section id="contact" className="py-20 bg-custom-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.contact.title}</h2>
          <p className="text-xl text-gray-600">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white border-2 border-custom-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">ROI-Analyse anfordern</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Max Mustermann"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="max@beispiel-catering.de"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Unternehmen *</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Beispiel Catering GmbH"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+49 123 456789"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Erzählen Sie uns von Ihren Herausforderungen..."
                    rows={4}
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Ihre Anfrage wurde erfolgreich gesendet!</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{errorMessage}</span>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Wird gesendet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Nachricht senden
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white border-2 border-custom-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Direkter Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-custom-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Telefon</p>
                    <button
                      onClick={() => copyToClipboard("+49 (0) 123 456789", "phone")}
                      className="text-custom-blue-600 hover:underline text-lg"
                    >
                      +49 (0) 123 456789
                    </button>
                    <p className="text-sm text-gray-600 mt-1">Mo-Fr 9:00 - 18:00 Uhr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-custom-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">E-Mail</p>
                    <button
                      onClick={() => copyToClipboard("vertrieb@ntconsult.de", "email")}
                      className="text-custom-blue-600 hover:underline text-lg"
                    >
                      vertrieb@ntconsult.de
                    </button>
                    <p className="text-sm text-gray-600 mt-1">Wir antworten innerhalb von 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-custom-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Adresse</p>
                    <p className="text-gray-600">
                      NT Consult GmbH<br />
                      Musterstraße 123<br />
                      12345 Musterstadt
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-custom-blue-600 to-custom-blue-700 text-white border-0">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Warum WebMenü?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Speziell für Caterer entwickelt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Bis zu 30% Zeitersparnis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Kostenlose Demo verfügbar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Persönlicher Support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// Add type declaration for window.emailjs
declare global {
  interface Window {
    emailjs: any
  }
}