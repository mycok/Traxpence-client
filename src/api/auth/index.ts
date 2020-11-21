async function signin(data: any): Promise<any> {
  const resp = await fetch('http://localhost:8081/api/v1/auth/sign-in', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return resp.json();
}

async function signup(data: any): Promise<any> {
  const resp = await fetch('http://localhost:8081/api/v1/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return resp.json();
}

function signout(cb: () => void): void {
  if (window !== undefined) {
    localStorage.removeItem('auth');
    cb();
  }
}

function authenticate(authData: any, cb: () => void): void {
  if (window !== undefined) {
    localStorage.setItem('authData', JSON.stringify(authData));
    cb();
  }
}

function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  if (!localStorage.getItem('authData')) return false;

  return JSON.parse(localStorage.getItem('authData') as string);
}

export {
  signin, signup, signout, authenticate, isAuthenticated,
};
