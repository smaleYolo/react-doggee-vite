import Cookies from 'js-cookie';

type BaseUrl = string;
const baseUrl: BaseUrl = 'http://localhost:3001';

export class API {
  readonly baseUrl: BaseUrl;

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = Cookies.get('access_token');

    const response = await fetch(this.baseUrl + endpoint, {
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...(options.headers && options.headers),
      },
    });

    if (!response.ok) throw new Error(response.statusText);

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
