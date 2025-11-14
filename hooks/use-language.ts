"use client"

import { useState, useEffect } from "react"
import { languageStore } from "@/lib/language-store"
import type { Language } from "@/lib/i18n"

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(languageStore.getLanguage())
  const [t, setTranslations] = useState(languageStore.getTranslations())

  useEffect(() => {
    const unsubscribe = languageStore.subscribe(() => {
      setLanguageState(languageStore.getLanguage())
      setTranslations(languageStore.getTranslations())
    })

    return unsubscribe
  }, [])

  const setLanguage = (lang: Language) => {
    languageStore.setLanguage(lang)
  }

  return {
    language,
    setLanguage,
    t,
  }
}
