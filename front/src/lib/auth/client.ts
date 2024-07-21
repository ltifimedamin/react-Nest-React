'use client';

import type { User } from '@/types/user';
import axios from 'axios';
import { useRouter } from 'next/router';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

interface SignUpParams {
  // name:string;
  email: string;
  password: string;
  nom: string;
  terms:boolean,
  prenom: string;
  role: string;
  tel: string;
  ddn: Date;
  genre: string;
  image: string;
  address: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(values: SignUpParams): Promise<{ data?: any; error?: string }> {
    try {
      // Convert date to required string format before sending the request
      const formattedDdn = formatDate(values.ddn);
      const {terms,...rest}=values
      const payload = { ...rest, ddn: formattedDdn };
      console.log(payload)
      const response = await axios.post('http://localhost:3000/auth/signup', payload);


      // Generate and store token (simulated here for illustration)
      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);
      const router = useRouter()
      router.push('/auth/signin')
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || 'Signup failed' };
      }
      return { error: 'An unexpected error occurred' };
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    return this.login(params);
  }

  async login(values: any): Promise<{ data?: any; error?: string }> {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      const { accessToken, refreshToken, userId } = response.data;
      console.log(response.data)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);

      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || 'Login failed' };
      }
      return { error: 'An unexpected error occurred' };
    }
  }


  //   async  verifDateToken() {
  //    const userId = localStorage.getItem('userId');

  // try {
  //   const response = await axios.get(`http://localhost:3000/auth/verify-token/${userId}`);
  //   const tokenStatus = response.data; 

  //   if (tokenStatus === 0) {
  //     console.log('Token has expired.');
  //     return 0;
  //   } else {
  //     console.log('Token is still valid.');
  //     return 1;
  //   }
  // } catch (error) {
  //   console.error('Error verifying token:', error);
  //   return 0; 
  // }
  // }
  async verifDateToken(): Promise<number> {
    const userId = localStorage.getItem('userId');
  
    try {
      const response = await axios.get(`http://localhost:3000/auth/verify-token/${userId}`);
      const tokenStatus = response.data; 
  
      if (tokenStatus === 0) {
        console.log('Token has expired.');
        return 0;
      } else {
        console.log('Token is still valid.');
        return 1;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return 0; 
    }
  }
  
  async refreshTokens(): Promise<{ data?: any; error?: string }> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://localhost:3000/auth/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || 'Token refresh failed' };
      }
      return { error: 'An unexpected error occurred' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    return {};
  }
}

export const authClient = new AuthClient();
