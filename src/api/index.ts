import { config } from '../config';

const { baseUrl } = config;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function create(endpoint: string, data: any, token?: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return resp.json();
}

export async function update(
  endpoint: string,
  resourceId: string,
  data: any,
  token: string,
): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}/${resourceId}`, {
    method: 'PATCH',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return resp.json();
}

export async function list(endpoint: string, token?: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

export async function read(endpoint: string, resourceId: string, token: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}/${resourceId}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

export async function remove(endpoint: string, resourceId: string, token: string): Promise<any> {
  const resp = await fetch(`${baseUrl}/${endpoint}/${resourceId}`, {
    method: 'DELETE',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}
