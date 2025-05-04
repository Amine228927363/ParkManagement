// src/services/authService.ts
export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    role: string;
    id: number;
  }
  
  export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
  
    return data;
  };
  
  