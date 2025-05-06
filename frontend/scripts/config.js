const isProd = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');

export const API_URL = isProd
  ? '/api/orders/' 
  : 'http://localhost:8000/api/orders/';

export async function fetchCsrfToken() {
  try {
    const response = await fetch(isProd ? '/api/csrf/' : 'http://localhost:8000/api/csrf/', {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.status}`);
    }
    
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.warn('Failed to fetch CSRF token:', error);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', fetchCsrfToken);