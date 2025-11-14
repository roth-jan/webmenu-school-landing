"use client"

import { translations, type Language } from "@/lib/i18n"

class LanguageStore {
  private language: Language = "de"
  private listeners: Set<() => void> = new Set()

  getLanguage(): Language {
    return this.language
  }

  setLanguage(lang: Language): void {
    this.language = lang
    this.notifyListeners()
  }

  getTranslations() {
    return translations[this.language]
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener())
  }
}

export const languageStore = new LanguageStore()
