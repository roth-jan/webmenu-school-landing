"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "de" ? "en" : "de")}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {language === "de" ? "EN" : "DE"}
    </Button>
  )
}
