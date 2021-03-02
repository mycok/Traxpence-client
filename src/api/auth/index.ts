import { config } from '../../config';

const { baseUrl } = config;

const requestConfig = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export type SignupRequestData = {
  username: string,
  email: string,
  password: string,
}

export type SigninRequestData = {
  email: string,
  password: string,
}

async function signin(data: SigninRequestData): Promise<any> {
  const resp = await fetch(`${baseUrl}/auth/sign-in`, {
    ...requestConfig,
    body: JSON.stringify(data),
  });

  return resp.json();
}

async function signup(data: SignupRequestData): Promise<any> {
  const resp = await fetch(`${baseUrl}/users`, {
    ...requestConfig,
    body: JSON.stringify(data),
  });

  return resp.json();
}

function signout(cb: () => void): void {
  if (window !== undefined) {
    localStorage.removeItem('authData');
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
  signin,
  signup,
  signout,
  authenticate,
  isAuthenticated,
};
