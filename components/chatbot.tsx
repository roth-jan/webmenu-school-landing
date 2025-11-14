"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hallo! Ich bin Ihr WebMenü-Assistent für Schulen. Wie kann ich Ihnen helfen?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const quickReplies = ["Preise für Schulen", "ROI-Berechnung", "Demo buchen", "BuT-Abrechnung"]

  const botResponses: { [key: string]: string } = {
    preis:
      "Transparente Cent-Abrechnung - Sie zahlen nur für tatsächlich ausgegebene Portionen. Keine Grundgebühren, keine versteckten Kosten.",
    roi: "Durchschnittlich 20% weniger Lebensmittelverschwendung und 15h weniger Verwaltung pro Woche. Möchten Sie eine individuelle ROI-Analyse?",
    integration:
      "Nahtlose Integration in bestehende Warenwirtschaftssysteme. WebMenü arbeitet mit allen gängigen ERP-Systemen zusammen.",
    demo: "Gerne! Buchen Sie eine kostenlose ROI-Analyse mit konkreten Einsparungspotenzialen für Ihren Betrieb. Soll ich Sie zum Kontaktformular weiterleiten?",
    caterer:
      "WebMenü ist speziell für Schulen entwickelt: Digitale Bestellung, BuT-Abrechnung und Verwaltungsentlastung für moderne Schulverpflegung.",
    default:
      "Das ist eine interessante Frage! Für eine detaillierte Beratung empfehle ich Ihnen, unser Kontaktformular auszufüllen oder uns direkt anzurufen: +49 (0)2064 4765-0",
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("preis") || message.includes("kosten") || message.includes("cent")) {
      return botResponses.preis
    }
    if (message.includes("roi") || message.includes("ersparnis") || message.includes("gewinn")) {
      return botResponses.roi
    }
    if (message.includes("integration") || message.includes("warenwirtschaft") || message.includes("erp")) {
      return botResponses.integration
    }
    if (message.includes("demo") || message.includes("termin") || message.includes("beratung")) {
      return botResponses.demo
    }
    if (message.includes("caterer") || message.includes("küche") || message.includes("gastronomie")) {
      return botResponses.caterer
    }

    return botResponses.default
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputValue("")
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
    handleSendMessage()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-custom-blue-500 hover:bg-custom-blue-600 text-white shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="bg-custom-blue-500 text-white rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" />
            WebMenü Assistent
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-custom-blue-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-custom-blue-500 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  <span className="text-sm">{message.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {messages.length === 1 && (
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 mb-2">Häufige Fragen:</div>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ihre Frage..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="bg-custom-blue-500 hover:bg-custom-blue-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
