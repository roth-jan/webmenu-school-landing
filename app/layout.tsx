import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { GTMScript, GTMNoScript } from "@/components/gtm-script"
import { LeadinfoScript } from "@/components/leadinfo-script"
import { HotjarScript } from "@/components/hotjar-script"

export const metadata: Metadata = {
  title: "WebMenü für Caterer - Mehr Gewinn durch präzise Mengenplanung",
  description:
    "Professionelle RFID-Lösung für Caterer und Küchenbetriebe. Reduzieren Sie Verschwendung und steigern Sie Ihre Gewinnmargen durch exakte Portionserfassung.",
  keywords: "Caterer, Küchenbetrieb, RFID, Mengenplanung, Warenwirtschaft, Lebensmittelverschwendung",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <GTMScript gtmId="GTM-T95B9NB7" />
        <LeadinfoScript leadinfoId="LI-68806B307A31E" />
        <HotjarScript hjid={6477469} hjsv={6} />
      </head>
      <body>
        <GTMNoScript gtmId="GTM-T95B9NB7" />
        {children}
      </body>
    </html>
  )
}
