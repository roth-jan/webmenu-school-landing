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
declare global {
  interface Window {
    emailjs: any;
  }
}

export function ContactSection() {
  const { t } = useLanguage()
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)
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

  // Initialize EmailJS
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init("xfrN6Db7TH5f83mrK") // Public Key
        setIsEmailJSReady(true)
      }
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const trackCopyEvent = (type: "phone" | "email", value: string) => {
    // GTM tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "copy_contact", {
        event_category: "Contact",
        event_label: type,
        contact_type: type,
        contact_value: value,
        custom_parameter: `${type}_copied`,
      })
    }

    // Alternative: dataLayer push for GTM
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: "contact_copy",
        contact_type: type,
        contact_value: value,
        event_category: "engagement",
        event_action: "copy",
        event_label: `${type}_copied`,
      })
    }
  }

  const copyToClipboard = async (text: string, type: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text)
      trackCopyEvent(type, text)
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      trackCopyEvent(type, text)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Check if EmailJS is ready
      if (!isEmailJSReady || !window.emailjs) {
        throw new Error("E-Mail-Service wird noch geladen. Bitte versuchen Sie es in wenigen Sekunden erneut.")
      }

      // Send email using EmailJS
      const templateParams = {
        to_email: "jhroth@ntconsult.de,vertrieb@ntconsult.de",
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone || "Nicht angegeben",
        message: formData.message || "Keine zusätzliche Nachricht",
        subject: `🍽️ Neue Online-Präsentation Anfrage von ${formData.company}`,
        reply_to: formData.email
      }

      console.log('Sending with EmailJS:', {
        serviceId: "service_l15losq",
        templateId: "template_v2vxqid",
        params: templateParams
      })
      
      const response = await window.emailjs.send(
        "service_l15losq",      // Service ID
        "template_v2vxqid",     // Template ID
        templateParams
      )

      if (response.status === 200) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", company: "", phone: "", message: "" })
        // GTM Event für erfolgreiche Formular-Übermittlung
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          ;(window as any).dataLayer.push({
            event: "form_submit_success",
            form_type: "roi_analysis_request",
            company: formData.company,
            event_category: "conversion",
            event_action: "form_submit",
            event_label: "roi_analysis_request",
          })
        }
      } else {
        throw new Error('Fehler beim Senden der Nachricht')
      }

      // Log form submission for monitoring
      console.log('Form submitted:', {
        company: formData.company,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus("error")
      setErrorMessage(error.message || "Ein Fehler ist aufgetreten. Bitte kontaktieren Sie uns direkt unter vertrieb@ntconsult.de")
    } finally {
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 bg-custom-blue-50">
      {/* Hidden form for Netlify */}
      <form name="roi-analysis" netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
        <input type="text" name="subject" />
        <input type="text" name="_to" />
      </form>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{t.contact.title}</h2>
          <p className="text-xl text-gray-600">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white border-2 border-custom-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Online-Präsentation anfordern</CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-success-600 mb-2">Anfrage erfolgreich gesendet!</h3>
                  <p className="text-gray-600 mb-4">
                    Vielen Dank für Ihr Interesse an WebMenü. Wir melden uns innerhalb von 24 Stunden bei Ihnen, um
                    einen Termin für Ihre persönliche Online-Präsentation zu vereinbaren.
                  </p>
                  <div className="bg-success-50 p-4 rounded-lg">
                    <p className="text-success-700 text-sm">
                      <strong>Was passiert jetzt?</strong>
                      <br />• Ihre Anfrage wurde erfolgreich registriert
                      <br />• Unser Vertriebsteam wurde benachrichtigt
                      <br />• Wir bereiten Ihre Online-Präsentation vor
                      <br />• Sie erhalten innerhalb von 24h einen Terminvorschlag
                    </p>
                  </div>
                  <div className="mt-4 p-3 bg-custom-blue-50 rounded-lg border border-custom-blue-200">
                    <p className="text-custom-blue-700 text-xs">
                      <strong>Wichtig:</strong> Falls Sie keine Antwort erhalten, kontaktieren Sie uns bitte direkt:
                      <br />📧 vertrieb@ntconsult.de | 📞 +49 (0) 123 456789
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="ihre@email.de"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Unternehmen *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Ihre Schule / Einrichtung"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1"
                      placeholder="Erzählen Sie uns von Ihrer Schule: Wie viele Schüler nehmen täglich am Essen teil? Welche Herausforderungen haben Sie bei der Schulverpflegung?"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-custom-red-600 text-sm bg-custom-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {errorMessage || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-success-500 hover:bg-success-600 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        ROI-Analyse kostenlos anfordern
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white border-2 border-custom-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Direkter Kontakt</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-custom-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-custom-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Telefon</div>
                      <div
                        className="text-gray-600 cursor-pointer hover:text-custom-blue-600 transition-colors"
                        onClick={() => copyToClipboard(t.footer.phone, "phone")}
                        title="Klicken zum Kopieren"
                      >
                        {t.footer.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-custom-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-custom-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">E-Mail</div>
                      <div
                        className="text-gray-600 cursor-pointer hover:text-custom-blue-600 transition-colors"
                        onClick={() => copyToClipboard(t.footer.email, "email")}
                        title="Klicken zum Kopieren"
                      >
                        {t.footer.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-custom-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-custom-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Adresse</div>
                      <div className="text-gray-600">{t.footer.address}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-success-50 border-2 border-success-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-success-700 mb-4">Ihre persönliche Online-Präsentation</h3>
                <p className="text-success-600 mb-4">
                  Unsere Schul-Experten zeigen Ihnen live, wie WebMenü in Ihrer Schule funktioniert.
                </p>
                <ul className="text-success-600 space-y-2">
                  <li>• Live-Demo der Software-Funktionen</li>
                  <li>• Individuelle Anpassung an Ihre Bedürfnisse</li>
                  <li>• Konkrete ROI-Berechnung für Ihren Betrieb</li>
                  <li>• Alle Ihre Fragen werden beantwortet</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
