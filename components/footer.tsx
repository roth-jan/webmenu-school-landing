"use client"

import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { t } = useLanguage()

  const trackCopyEvent = (type: "phone" | "email", value: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "copy_contact", {
        event_category: "Contact",
        event_label: type,
        contact_type: type,
        contact_value: value,
        custom_parameter: `${type}_copied`,
      })
    }

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

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-custom-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold">WebMenü</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Die professionelle Lösung für Schulverpflegung. Digitalisieren Sie Ihre Prozesse durch moderne
              Mengenplanung und reduzieren Sie Verschwendung.
            </p>
            <div className="text-gray-400 text-sm">
              <div className="font-semibold text-white mb-2">{t.footer.company}</div>
              <div>{t.footer.address}</div>
              <div
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => copyToClipboard(t.footer.phone, "phone")}
                title="Klicken zum Kopieren"
              >
                Tel: {t.footer.phone}
              </div>
              <div
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => copyToClipboard(t.footer.email, "email")}
                title="Klicken zum Kopieren"
              >
                E-Mail: {t.footer.email}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Lösungen</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Für Küchen
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Für Schulen
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Für Verwaltung
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  Technologie
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  ROI-Analyse
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Demo buchen
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Preise
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 NT Consult Software & Service GmbH. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Datenschutz
            </a>
            <a href="#" className="hover:text-white transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
