import { config } from '../config';
import { isAuthenticated } from './auth';

export const { baseUrl } = config;
const { token } = isAuthenticated();

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function create<T>(endpoint: string, data: T): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return resp.json();
}

export async function update<T>(
  endpoint: string,
  resourceId: string,
  data: Partial<T>,
): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}/${resourceId}`, {
    method: 'PATCH',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return resp.json();
}

export async function list(endpoint: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

export async function read(endpoint: string, resourceId: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}/${resourceId}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

export async function remove(endpoint: string, resourceId: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}/${resourceId}`, {
    method: 'DELETE',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}
