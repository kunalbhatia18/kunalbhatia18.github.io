// API Configuration - Always use production URL since we have a live API
const API_BASE_URL = 'https://kunal-chat-api-mdf4jwglsq-uc.a.run.app';

export interface ChatResponse {
  response: string;
  timestamp: string;
  response_time_ms?: number;
}

export interface ApiError {
  detail: string;
}

/**
 * Chat API client for Kunal's portfolio
 */
export class ChatAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Send a message to the chat API
   */
  async sendMessage(message: string): Promise<ChatResponse> {
    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (message.length > 500) {
      throw new Error('Message too long (max 500 characters)');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        
        // Handle specific HTTP status codes with user-friendly messages
        if (response.status === 429) {
          const detail = typeof errorData.detail === 'object' ? errorData.detail.message : errorData.detail;
          throw new Error(detail || 'Daily request limit exceeded');
        } else if (response.status >= 500) {
          throw new Error('The AI service is temporarily unavailable. Please try again in a few moments.');
        } else if (response.status === 400) {
          throw new Error('Message too long or invalid format');
        }
        
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific network errors
        if (error.message.includes('fetch')) {
          throw new Error('Unable to connect to the AI service. Please check your internet connection and try again.');
        }
        throw error;
      }
      throw new Error('Something went wrong while sending your message. Please try again.');
    }
  }

  /**
   * Check API health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Global API instance
export const chatAPI = new ChatAPI();
