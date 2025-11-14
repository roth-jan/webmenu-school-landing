# Strato DNS-Einträge für webmenue-catering.de

## ✅ Bereits erledigt:
**SSL-Validierung CNAME:**
- Präfix: `_587ef5ed263a95c0b12ea25667db5aff`
- Typ: CNAME
- Wert: `_e4ba408be45a8f551893f4411737a988.xlfgrmvvlj.acm-validations.aws.`

## 📝 Vorzubereiten (noch NICHT eintragen):

### 1. Hauptdomain (webmenue-catering.de)
**ACHTUNG**: Bei Strato kann die Hauptdomain möglicherweise nicht als CNAME eingetragen werden.

**Option A - Falls CNAME möglich:**
- Typ: CNAME
- Präfix: (leer lassen oder @)
- Wert: `d318wlq77rvkj0.cloudfront.net`

**Option B - Falls nur A-Record möglich:**
Wir müssten dann CloudFront mit statischen IPs konfigurieren.

### 2. WWW-Subdomain (www.webmenue-catering.de)
- Typ: CNAME
- Präfix: `www`
- Wert: `d318wlq77rvkj0.cloudfront.net`

### 3. Optional: Weitere Subdomains
Falls gewünscht, z.B. app.webmenue-catering.de:
- Typ: CNAME
- Präfix: `app`
- Wert: `d318wlq77rvkj0.cloudfront.net`

## ⚠️ Wichtige Hinweise:

1. **WARTEN Sie mit dem Eintragen** bis:
   - Das SSL-Zertifikat validiert ist (Status: ISSUED)
   - Ich die CloudFront Distribution aktualisiert habe

2. **Strato-Besonderheit**: 
   - Manche Hoster erlauben keinen CNAME für die Hauptdomain
   - In diesem Fall müssen wir eine andere Lösung finden

3. **Nach dem Eintragen**:
   - DNS-Propagierung kann bis zu 48 Stunden dauern
   - Meistens funktioniert es aber nach 5-30 Minuten

## 🚀 Nächste Schritte:

1. ⏳ Warten auf SSL-Zertifikat Validierung
2. ✅ CloudFront Distribution mit Domain-Aliases aktualisieren
3. 📝 DNS-Einträge bei Strato eintragen
4. 🌐 Website unter https://webmenue-catering.de testen

## 💡 Tipp:
Prüfen Sie bei Strato, ob Sie einen CNAME für die Hauptdomain setzen können. 
Falls nicht, sagen Sie mir Bescheid - dann richte ich eine Weiterleitung ein.