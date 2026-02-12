import { Component, Input, Output, EventEmitter, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService, UserRole } from '../../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles: UserRole[];
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  authService = inject(AuthService);
  private router = inject(Router);

  currentRoute = '';

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/app/dashboard',
      roles: ['colaborador', 'jefatura', 'capital_humano']
    },
    {
      label: 'Centro de Aprendizaje',
      icon: 'pi pi-book',
      route: '/app/aprendizaje',
      roles: ['colaborador', 'jefatura', 'capital_humano'],
      badge: 'Nuevo'
    },
    {
      label: 'Gestión DNC',
      icon: 'pi pi-chart-bar',
      route: '/app/dnc',
      roles: ['jefatura', 'capital_humano']
    }
  ];

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => { this.currentRoute = e.url; });
  }

  get filteredNavItems(): NavItem[] {
    const role = this.authService.user()?.role;
    return this.navItems.filter(item => item.roles.includes(role as UserRole));
  }

  isActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.closeSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
