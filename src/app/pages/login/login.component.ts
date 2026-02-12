import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { AuthService, UserRole } from '../../services/auth.service';

type LoginStep = 'method' | 'role';

interface LoginMethod {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface RoleOption {
  id: UserRole;
  label: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule, TagModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentStep = signal<LoginStep>('method');
  selectedMethod = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  loginMethods: LoginMethod[] = [
    {
      id: 'google',
      label: 'Continuar con Google',
      icon: 'pi pi-google',
      description: 'Usa tu cuenta Google corporativa'
    },
    {
      id: 'email',
      label: 'Otros Correos',
      icon: 'pi pi-envelope',
      description: 'Accede con tu correo electrónico'
    },
    {
      id: 'corporate',
      label: 'Usuario Corporativo',
      icon: 'pi pi-building',
      description: 'Acceso con credenciales SalfaCorp'
    }
  ];

  roleOptions: RoleOption[] = [
    {
      id: 'colaborador',
      label: 'Colaborador',
      icon: 'pi pi-user',
      description: 'Accede a tus cursos y progreso personal',
      color: '#4F7CAC'
    },
    {
      id: 'jefatura',
      label: 'Jefatura',
      icon: 'pi pi-users',
      description: 'Monitorea el progreso de tu equipo',
      color: '#2D6A4F'
    },
    {
      id: 'capital_humano',
      label: 'Capital Humano',
      icon: 'pi pi-briefcase',
      description: 'Gestión completa del sistema LMS',
      color: '#9D2226'
    }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  selectMethod(methodId: string): void {
    this.selectedMethod.set(methodId);
    this.currentStep.set('role');
  }

  selectRole(role: UserRole): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.authService.login({
        name: role === 'capital_humano' ? 'Administrador CH' : role === 'jefatura' ? 'María González' : 'Carlos Mendoza',
        email: `${role}@salfacorp.cl`,
        role: role
      });
      this.router.navigate(['/app/dashboard']);
      this.isLoading.set(false);
    }, 1200);
  }

  goBack(): void {
    this.currentStep.set('method');
  }
}
