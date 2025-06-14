FROM python:3.11-slim

WORKDIR /app

# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY main.py .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8080

# Run application
CMD ["python", "-c", "import uvicorn; import main; uvicorn.run(main.app, host='0.0.0.0', port=8080)"]
