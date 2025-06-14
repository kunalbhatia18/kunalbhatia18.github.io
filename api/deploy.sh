#!/bin/bash

PROJECT_ID="kunalisme-portfolio"
SERVICE_NAME="kunal-chat-api"
REGION="us-central1"
REPO_NAME="kunal-chat-repo"
IMAGE_NAME="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$SERVICE_NAME"

echo "🚀 Deploying to Cloud Run"
echo "========================="

echo "🏗️  Building Docker image for Linux/AMD64..."
docker build --platform linux/amd64 -t $IMAGE_NAME .

echo "📤 Pushing to Artifact Registry..."
docker push $IMAGE_NAME

echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 1Gi \
    --cpu 1 \
    --timeout 300 \
    --concurrency 80 \
    --max-instances 10

SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')

echo ""
echo "🎉 Deployment successful!"
echo "📡 API URL: $SERVICE_URL"
echo ""
echo "🔑 Set API key: ./set-env.sh sk-your-key"
echo "🧪 Test: curl $SERVICE_URL/health"
