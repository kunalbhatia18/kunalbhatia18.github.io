#!/bin/bash

# 🔧 Set OpenAI API key for Cloud Run service

PROJECT_ID="kunalisme-portfolio"
SERVICE_NAME="kunal-chat-api"
REGION="us-central1"

if [ -z "$1" ]; then
    echo "❌ Please provide your OpenAI API key"
    echo "Usage: ./set-env.sh sk-your-openai-api-key"
    exit 1
fi

echo "🔑 Setting OpenAI API key..."

gcloud run services update $SERVICE_NAME \
    --region $REGION \
    --set-env-vars OPENAI_API_KEY="$1",ENVIRONMENT=production

echo "✅ API key set successfully!"
echo "🧪 Test: curl https://kunal-chat-api-mdf4jwglsq-uc.a.run.app/health"
