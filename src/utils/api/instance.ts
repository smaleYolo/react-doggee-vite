import Cookies from 'js-cookie';
import { IRefreshResponse } from '@utils/contexts';

type BaseUrl = string;
const baseUrl: BaseUrl = 'http://localhost:3001';

export class API {
  readonly baseUrl: BaseUrl;

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = Cookies.get('access_token');

    let response = await fetch(this.baseUrl + endpoint, {
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...(options.headers && options.headers),
      },
    });

    if (response.status === 401) {
      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (!refreshResponse.ok) {
            throw new Error('Failed to refresh token');
          }

          const refreshData = (await refreshResponse.json()) as IRefreshResponse;
          const { access_token, refresh_token: newRefreshToken } = refreshData;
          Cookies.set('access_token', access_token);
          Cookies.set('refresh_token', newRefreshToken);

          // Повторный запрос с новым токеном
          response = await fetch(this.baseUrl + endpoint, {
            credentials: 'include',
            ...options,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
              ...(options.headers && options.headers),
            },
          });
        } catch (err) {
          throw new Error('Failed to refresh token and retry request');
        }
      }
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = (await response.json()) as T;
    return responseData;
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T, B>(endpoint: string, body: B, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T, B>(endpoint: string, body: B, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T, B>(endpoint: string, body: B, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

export const api = new API(baseUrl);
