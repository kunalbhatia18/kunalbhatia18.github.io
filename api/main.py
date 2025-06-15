#!/usr/bin/env python3
"""
Clean FastAPI backend for Kunal's portfolio chat widget
"""

import os
import time
import logging
from datetime import datetime, timezone
from typing import Optional
from collections import defaultdict

from fastapi import FastAPI, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global rate limiting storage (total requests across all users)
global_rate_limit = {"count": 0, "reset_time": 0}
hourly_rate_limit = {"count": 0, "reset_time": 0}

# Per-IP rate limiting storage
ip_rate_limits = defaultdict(lambda: {
    "hourly": {"count": 0, "reset_time": 0}, 
    "daily": {"count": 0, "reset_time": 0}
})

# Initialize FastAPI app
app = FastAPI(
    title="Kunal's Portfolio Chat API",
    description="Lightning-fast chat widget backend",
    version="1.0.0"
)

# Configure CORS - only allow specific domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://kunalis.me",                    # Production domain
        "https://kunal-website-kunalisme.vercel.app",  # Vercel deployment
        "http://localhost:3000",                 # Local dev (React)
        "http://localhost:5173",                 # Local dev (Vite)
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Global and per-IP rate limiting middleware
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Skip rate limiting for health check
    if request.url.path == "/health":
        return await call_next(request)
    
    # Get client IP (handle proxies)
    client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    if not client_ip:
        client_ip = request.headers.get("x-real-ip", "")
    if not client_ip:
        client_ip = request.client.host if request.client else "unknown"
    
    current_time = int(time.time())
    daily_reset = current_time // 86400 * 86400  # Reset at midnight UTC
    hourly_reset = current_time // 3600 * 3600   # Reset every hour
    
    # Reset global counters
    if global_rate_limit["reset_time"] != daily_reset:
        global_rate_limit["count"] = 0
        global_rate_limit["reset_time"] = daily_reset
        logger.info("Daily rate limit counter reset")
    
    if hourly_rate_limit["reset_time"] != hourly_reset:
        hourly_rate_limit["count"] = 0
        hourly_rate_limit["reset_time"] = hourly_reset
        logger.info("Hourly rate limit counter reset")
    
    # Reset per-IP counters
    ip_limits = ip_rate_limits[client_ip]
    if ip_limits["hourly"]["reset_time"] != hourly_reset:
        ip_limits["hourly"] = {"count": 0, "reset_time": hourly_reset}
    if ip_limits["daily"]["reset_time"] != daily_reset:
        ip_limits["daily"] = {"count": 0, "reset_time": daily_reset}
    
    # Check per-IP limits first (more specific)
    if ip_limits["hourly"]["count"] >= 100:
        logger.warning(f"Per-IP hourly rate limit exceeded for {client_ip}. Requests this hour: {ip_limits['hourly']['count']}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "error": "Hourly request limit exceeded for your IP",
                "ip_hourly_limit": 100,
                "ip_daily_limit": 200,
                "requests_used_this_hour": ip_limits["hourly"]["count"],
                "requests_used_today": ip_limits["daily"]["count"],
                "window": "1 hour",
                "reset_time": hourly_reset + 3600,
                "message": "You've reached your hourly limit of 100 requests. Please try again in the next hour."
            }
        )
    
    if ip_limits["daily"]["count"] >= 200:
        logger.warning(f"Per-IP daily rate limit exceeded for {client_ip}. Requests today: {ip_limits['daily']['count']}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "error": "Daily request limit exceeded for your IP",
                "ip_hourly_limit": 100,
                "ip_daily_limit": 200,
                "requests_used_this_hour": ip_limits["hourly"]["count"],
                "requests_used_today": ip_limits["daily"]["count"],
                "window": "24 hours",
                "reset_time": daily_reset + 86400,
                "message": "You've reached your daily limit of 200 requests. Please try again tomorrow."
            }
        )
    
    # Check global limits (fallback protection)
    if hourly_rate_limit["count"] >= 100:
        logger.warning(f"Global hourly rate limit exceeded. Requests this hour: {hourly_rate_limit['count']}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "error": "Global hourly request limit exceeded",
                "global_hourly_limit": 100,
                "global_daily_limit": 500,
                "requests_used_this_hour": hourly_rate_limit["count"],
                "requests_used_today": global_rate_limit["count"],
                "window": "1 hour",
                "reset_time": hourly_reset + 3600,
                "message": "The API has reached its global hourly limit of 100 requests. Please try again in the next hour."
            }
        )
    
    if global_rate_limit["count"] >= 500:
        logger.warning(f"Global daily rate limit exceeded. Total requests today: {global_rate_limit['count']}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "error": "Global daily request limit exceeded",
                "global_daily_limit": 500,
                "global_hourly_limit": 100,
                "requests_used_today": global_rate_limit["count"],
                "requests_used_this_hour": hourly_rate_limit["count"],
                "window": "24 hours",
                "reset_time": daily_reset + 86400,
                "message": "The API has reached its global daily limit of 500 requests. Please try again tomorrow."
            }
        )
    
    # Process request
    response = await call_next(request)
    
    # Increment all counters only for successful requests to chat endpoint
    if response.status_code < 400 and request.url.path == "/api/chat":
        global_rate_limit["count"] += 1
        hourly_rate_limit["count"] += 1
        ip_limits["hourly"]["count"] += 1
        ip_limits["daily"]["count"] += 1
        logger.info(f"Request from {client_ip} processed. IP: {ip_limits['hourly']['count']}/100 hourly, {ip_limits['daily']['count']}/200 daily. Global: {global_rate_limit['count']}/500 daily, {hourly_rate_limit['count']}/100 hourly")
    
    # Add rate limit headers (show IP-specific limits)
    response.headers["X-RateLimit-IP-Hourly-Limit"] = "100"
    response.headers["X-RateLimit-IP-Hourly-Used"] = str(ip_limits["hourly"]["count"])
    response.headers["X-RateLimit-IP-Hourly-Remaining"] = str(100 - ip_limits["hourly"]["count"])
    response.headers["X-RateLimit-IP-Hourly-Reset"] = str(hourly_reset + 3600)
    
    response.headers["X-RateLimit-IP-Daily-Limit"] = "200"
    response.headers["X-RateLimit-IP-Daily-Used"] = str(ip_limits["daily"]["count"])
    response.headers["X-RateLimit-IP-Daily-Remaining"] = str(200 - ip_limits["daily"]["count"])
    response.headers["X-RateLimit-IP-Daily-Reset"] = str(daily_reset + 86400)
    
    # Also include global limits for reference
    response.headers["X-RateLimit-Global-Daily-Limit"] = "500"
    response.headers["X-RateLimit-Global-Daily-Used"] = str(global_rate_limit["count"])
    response.headers["X-RateLimit-Global-Hourly-Limit"] = "100"
    response.headers["X-RateLimit-Global-Hourly-Used"] = str(hourly_rate_limit["count"])
    
    return response

# Pydantic models
class ChatRequest(BaseModel):
    message: str = Field(..., max_length=500)
    
class ChatResponse(BaseModel):
    response: str
    timestamp: str
    response_time_ms: Optional[int] = None

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    model: str
    rate_limit: dict
    cors_origins: list
    openai_configured: bool

# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        version="1.0.0",
        model="gpt-4.1-nano-2025-04-14",
        rate_limit={
            "per_ip": {
                "hourly_limit": 100,
                "daily_limit": 200,
                "window": "1 hour / 24 hours per IP"
            },
            "global": {
                "hourly_limit": 100,
                "daily_limit": 500,
                "requests_used_today": global_rate_limit["count"],
                "requests_remaining_today": 500 - global_rate_limit["count"],
                "requests_used_this_hour": hourly_rate_limit["count"],
                "requests_remaining_this_hour": 100 - hourly_rate_limit["count"]
            }
        },
        cors_origins=[
            "https://kunalis.me",
            "https://kunal-website-kunalisme.vercel.app", 
            "http://localhost:3000",
            "http://localhost:5173"
        ],
        openai_configured=bool(os.getenv("OPENAI_API_KEY"))
    )

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Kunal's Portfolio Chat API",
        "version": "1.0.0",
        "model": "gpt-4.1-nano-2025-04-14",
        "status": "running",
        "rate_limit": {
            "per_ip": {
                "hourly_limit": 100,
                "daily_limit": 200,
                "window": "1 hour / 24 hours per IP"
            },
            "global": {
                "hourly_limit": 100,
                "daily_limit": 500,
                "requests_used_today": global_rate_limit["count"],
                "requests_remaining_today": 500 - global_rate_limit["count"],
                "requests_used_this_hour": hourly_rate_limit["count"],
                "requests_remaining_this_hour": 100 - hourly_rate_limit["count"]
            }
        },
        "cors_origins": [
            "https://kunalis.me",
            "https://kunal-website-kunalisme.vercel.app"
        ],
        "openai_configured": bool(os.getenv("OPENAI_API_KEY")),
    }

# Chat endpoint
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint with global rate limiting"""
    start_time = time.time()
    
    # Check if OpenAI API key is configured
    if not os.getenv("OPENAI_API_KEY"):
        return ChatResponse(
            response="🔧 API is running but OpenAI API key needs to be configured.",
            timestamp=datetime.now(timezone.utc).isoformat(),
            response_time_ms=int((time.time() - start_time) * 1000)
        )
    
    try:
        # Handle warming/ping requests efficiently (no OpenAI call needed)
        if request.message.lower().strip() in ["ping", "warm", "warmup"]:
            return ChatResponse(
                response="🔥 API warmed up and ready!",
                timestamp=datetime.now(timezone.utc).isoformat(),
                response_time_ms=int((time.time() - start_time) * 1000)
            )
            
        import openai
        
        client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Kunal's context
        context = """You are Kunal Bhatia's AI assistant. Key facts:
- 4+ years ML engineer, Bangalore. Specializes in sub-100ms latency optimization
- Key projects: Quicksilver (35ms inference, 10M+ requests), Swanari (3M+ users), Voice Gmail (60 emails/min)
- Tech: FastAPI, GPT-4, FAISS, React, Redis, Kafka
- Personal: Sub-4hr marathoner, rock vocalist, Italian chef, coffee addict

Be conversational, helpful, occasionally witty. Max 150 tokens.

If user says "coffee": respond with "Fun fact: Kunal's code quality is directly proportional to his coffee intake! ☕ He's powered by espresso and has been known to debug complex ML pipelines at 2 AM with nothing but a double shot and sheer determination. Pro tip: Never schedule meetings before his morning coffee! 😄"
"""
        
        # Call OpenAI API
        response = await client.chat.completions.create(
            model="gpt-4.1-nano-2025-04-14",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": request.message}
            ],
            max_tokens=150,
            temperature=0.7,
            timeout=5
        )
        
        ai_response = response.choices[0].message.content.strip()
        response_time_ms = int((time.time() - start_time) * 1000)
        
        logger.info(f"Chat response generated in {response_time_ms}ms")
        
        return ChatResponse(
            response=ai_response,
            timestamp=datetime.now(timezone.utc).isoformat(),
            response_time_ms=response_time_ms
        )
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return ChatResponse(
            response=f"Sorry, I encountered an error: {str(e)}",
            timestamp=datetime.now(timezone.utc).isoformat(),
            response_time_ms=int((time.time() - start_time) * 1000)
        )

def main():
    port = int(os.getenv("PORT", 8080))
    logger.info(f"Starting server on port {port}")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info",
        access_log=True
    )

if __name__ == "__main__":
    main()
