"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { Menu, X } from "lucide-react"

export function Header() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-custom-blue-50 border-b border-custom-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-custom-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-custom-blue-900">WebMenü für Caterer</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("solutions")}
              className="text-custom-blue-700 hover:text-custom-blue-900 font-medium transition-colors"
            >
              {t.nav.solutions}
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="text-custom-blue-700 hover:text-custom-blue-900 font-medium transition-colors"
            >
              {t.nav.technology}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-custom-blue-700 hover:text-custom-blue-900 font-medium transition-colors"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-custom-blue-700 hover:text-custom-blue-900 font-medium transition-colors"
            >
              {t.nav.contact}
            </button>
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-success-500 hover:bg-success-600 text-white"
            >
              {t.nav.demo}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-custom-blue-100 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("solutions")}
                className="text-custom-blue-700 hover:text-custom-blue-900 font-medium text-left"
              >
                {t.nav.solutions}
              </button>
              <button
                onClick={() => scrollToSection("technology")}
                className="text-custom-blue-700 hover:text-custom-blue-900 font-medium text-left"
              >
                {t.nav.technology}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-custom-blue-700 hover:text-custom-blue-900 font-medium text-left"
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-custom-blue-700 hover:text-custom-blue-900 font-medium text-left"
              >
                {t.nav.contact}
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-success-500 hover:bg-success-600 text-white w-full"
              >
                {t.nav.demo}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
