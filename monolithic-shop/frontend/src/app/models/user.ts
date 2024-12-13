export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string; // Dacă parola este opțională
  }