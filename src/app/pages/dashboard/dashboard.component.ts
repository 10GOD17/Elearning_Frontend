import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule, ProgressBarModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  authService = inject(AuthService);

  role = computed(() => this.authService.user()?.role);
  userName = computed(() => this.authService.user()?.name?.split(' ')[0] || '');

  statsByRole: Record<string, any[]> = {
    colaborador: [
      { label: 'Cursos Inscritos', value: '8', icon: 'pi pi-book', color: '#4F7CAC', bg: '#EFF6FF', change: '+2 este mes' },
      { label: 'Horas Completadas', value: '24h', icon: 'pi pi-clock', color: '#7C3AED', bg: '#F5F3FF', change: '+6h esta semana' },
      { label: 'Certificados', value: '3', icon: 'pi pi-verified', color: '#22c55e', bg: '#F0FDF4', change: '1 pendiente' },
      { label: 'Mi Progreso', value: '67%', icon: 'pi pi-chart-line', color: '#9D2226', bg: '#FFF1F1', change: 'Buen ritmo' }
    ],
    jefatura: [
      { label: 'Colaboradores', value: '18', icon: 'pi pi-users', color: '#4F7CAC', bg: '#EFF6FF', change: 'A cargo' },
      { label: 'Promedio Avance', value: '72%', icon: 'pi pi-chart-line', color: '#22c55e', bg: '#F0FDF4', change: '+5% vs mes ant.' },
      { label: 'Cursos Activos', value: '12', icon: 'pi pi-book', color: '#7C3AED', bg: '#F5F3FF', change: 'En el equipo' },
      { label: 'Alertas DNC', value: '3', icon: 'pi pi-exclamation-triangle', color: '#f59e0b', bg: '#FFFBEB', change: 'Requieren acción' }
    ],
    capital_humano: [
      { label: 'Total Colaboradores', value: '2.4K', icon: 'pi pi-users', color: '#4F7CAC', bg: '#EFF6FF', change: '+48 este trimestre' },
      { label: 'Cursos Publicados', value: '182', icon: 'pi pi-book', color: '#7C3AED', bg: '#F5F3FF', change: '+12 este mes' },
      { label: 'Tasa Completitud', value: '84%', icon: 'pi pi-chart-pie', color: '#22c55e', bg: '#F0FDF4', change: '+3% vs mes ant.' },
      { label: 'DNC Pendientes', value: '14', icon: 'pi pi-flag', color: '#9D2226', bg: '#FFF1F1', change: 'En revisión' }
    ]
  };

  coursesByRole: Record<string, any[]> = {
    colaborador: [
      { title: 'Seguridad en Faena', category: 'Seguridad', progress: 85, status: 'En progreso', color: '#4F7CAC' },
      { title: 'Excel Avanzado para Gestión', category: 'Tecnología', progress: 40, status: 'En progreso', color: '#7C3AED' },
      { title: 'Liderazgo y Comunicación', category: 'Soft Skills', progress: 100, status: 'Completado', color: '#22c55e' }
    ],
    jefatura: [
      { title: 'Gestión de Equipos de Alto Desempeño', category: 'Liderazgo', progress: 75, status: 'En progreso', color: '#4F7CAC' },
      { title: 'Herramientas de Feedback Efectivo', category: 'Soft Skills', progress: 100, status: 'Completado', color: '#22c55e' },
      { title: 'KPIs y Métricas de Productividad', category: 'Gestión', progress: 20, status: 'Iniciado', color: '#f59e0b' }
    ],
    capital_humano: [
      { title: 'Metodologías de DNC 2025', category: 'Capital Humano', progress: 60, status: 'En progreso', color: '#4F7CAC' },
      { title: 'Diseño Instruccional Digital', category: 'E-Learning', progress: 90, status: 'En progreso', color: '#7C3AED' },
      { title: 'Normativa Laboral Actualizada', category: 'Legal', progress: 100, status: 'Completado', color: '#22c55e' }
    ]
  };

  chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Horas de aprendizaje',
      data: [12, 18, 14, 22, 28, 24],
      backgroundColor: 'rgba(157, 34, 38, 0.15)',
      borderColor: '#9D2226',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#9D2226',
      pointRadius: 4
    }]
  };

  chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6', drawBorder: false },
        ticks: { color: '#9ca3af', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 11 } }
      }
    }
  };

  get stats() {
    return this.statsByRole[this.role() as string] || this.statsByRole['colaborador'];
  }

  get courses() {
    return this.coursesByRole[this.role() as string] || this.coursesByRole['colaborador'];
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    if (status === 'Completado') return 'success';
    if (status === 'En progreso') return 'info';
    return 'warn';
  }
}
