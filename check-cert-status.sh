#!/bin/bash
echo "Prüfe SSL-Zertifikat Status..."
while true; do
  STATUS=$(aws acm describe-certificate \
    --certificate-arn arn:aws:acm:us-east-1:135704376586:certificate/9616993a-fa85-4ce2-aea4-ae8abd885d70 \
    --region us-east-1 \
    --query 'Certificate.Status' \
    --output text)
  
  echo "$(date): Status = $STATUS"
  
  if [ "$STATUS" = "ISSUED" ]; then
    echo "✅ Zertifikat erfolgreich validiert!"
    break
  fi
  
  sleep 60
done