import { Injectable, signal, computed } from '@angular/core';

export type UserRole = 'colaborador' | 'jefatura' | 'capital_humano' | null;

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  private _isAuthenticated = signal<boolean>(false);

  user = this._user.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();

  login(user: User): void {
    this._user.set(user);
    this._isAuthenticated.set(true);
  }

  logout(): void {
    this._user.set(null);
    this._isAuthenticated.set(false);
  }

  getRoleLabel(): string {
    const role = this._user()?.role;
    switch (role) {
      case 'colaborador': return 'Colaborador';
      case 'jefatura': return 'Jefatura';
      case 'capital_humano': return 'Capital Humano';
      default: return '';
    }
  }
}
