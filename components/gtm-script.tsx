"use client"

import Script from "next/script"

interface GTMScriptProps {
  gtmId: string
}

export function GTMScript({ gtmId }: GTMScriptProps) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Initialize dataLayer for contact tracking */}
      <Script
        id="gtm-contact-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            
            // Custom event for contact interactions
            function trackContactInteraction(type, action, value) {
              window.dataLayer.push({
                event: 'contact_interaction',
                contact_type: type,
                contact_action: action,
                contact_value: value,
                event_category: 'Contact',
                event_label: type + '_' + action
              });
            }
            
            // Make function globally available
            window.trackContactInteraction = trackContactInteraction;
          `,
        }}
      />
    </>
  )
}

export function GTMNoScript({ gtmId }: GTMScriptProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}
