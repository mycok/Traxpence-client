const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

async function create(url: string, data: any, token?: string): Promise<any> {
  const resp = await fetch(`${url}`, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return resp.json();
}

async function update(url: string, resourceId: string, data: any, token: string): Promise<any> {
  const resp = await fetch(`${url}/${resourceId}`, {
    method: 'PATCH',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return resp.json();
}

async function list(url: string, token?: string): Promise<any> {
  const resp = await fetch(`${url}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

async function read(url: string, resourceId: string, token: string): Promise<any> {
  const resp = await fetch(`${url}/${resourceId}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

async function remove(url: string, resourceId: string, token: string): Promise<any> {
  const resp = await fetch(`${url}/${resourceId}`, {
    method: 'DELETE',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

export {
  create, read, update, remove, list,
};
