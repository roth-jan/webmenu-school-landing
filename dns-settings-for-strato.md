# DNS-Einstellungen für Strato

## CloudFront Distribution Details

- **Distribution ID**: EWXZ0AWCPZJVB
- **CloudFront Domain**: d318wlq77rvkj0.cloudfront.net
- **Status**: Aktiv und funktionsfähig

## SSL-Zertifikat Validierung (WICHTIG - ZUERST DURCHFÜHREN!)

Bevor die Domain mit CloudFront funktioniert, muss das SSL-Zertifikat validiert werden. Fügen Sie folgenden DNS-Eintrag bei Strato hinzu:

### CNAME-Eintrag für SSL-Validierung:
- **Name**: _587ef5ed263a95c0b12ea25667db5aff.webmenue-catering.de
- **Typ**: CNAME
- **Wert**: _e4ba408be45a8f551893f4411737a988.xlfgrmvvlj.acm-validations.aws.

**Hinweis**: Nach dem Hinzufügen dieses Eintrags kann es 5-30 Minuten dauern, bis das Zertifikat validiert ist.

## DNS-Einträge für die Domain (NACH Zertifikatsvalidierung)

Nach erfolgreicher Validierung des SSL-Zertifikats, fügen Sie folgende DNS-Einträge hinzu:

### Hauptdomain (webmenue-catering.de):
- **Name**: @ (oder leer lassen für Hauptdomain)
- **Typ**: CNAME
- **Wert**: d318wlq77rvkj0.cloudfront.net

### WWW-Subdomain (www.webmenue-catering.de):
- **Name**: www
- **Typ**: CNAME
- **Wert**: d318wlq77rvkj0.cloudfront.net

## Wichtige Hinweise

1. **Reihenfolge beachten**: 
   - Zuerst den SSL-Validierungs-CNAME hinzufügen
   - Warten bis das Zertifikat validiert ist (Status in AWS Certificate Manager prüfen)
   - Dann erst die Domain-CNAMEs hinzufügen

2. **Propagierungszeit**: DNS-Änderungen können bis zu 48 Stunden dauern, bis sie weltweit wirksam sind.

3. **SSL-Zertifikat ARN**: arn:aws:acm:us-east-1:135704376586:certificate/9616993a-fa85-4ce2-aea4-ae8abd885d70

4. **Nach Zertifikatsvalidierung**: Die CloudFront Distribution muss noch aktualisiert werden, um die Custom Domains (Aliases) zu aktivieren.

## Nächste Schritte

1. SSL-Validierungs-CNAME bei Strato eintragen
2. Auf Zertifikatsvalidierung warten
3. CloudFront Distribution mit Custom Domains aktualisieren
4. Domain-CNAMEs bei Strato eintragen
5. Website über https://webmenue-catering.de testen