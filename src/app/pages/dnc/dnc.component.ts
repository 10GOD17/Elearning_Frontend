import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dnc',
  standalone: true,
  imports: [CommonModule, TagModule, ChartModule],
  templateUrl: './dnc.component.html',
  styleUrls: ['./dnc.component.scss']
})
export class DncComponent {
  authService = inject(AuthService);

  dncItems = [
    { area: 'Operaciones', colaboradores: 45, brechas: 8, prioridad: 'Alta', estado: 'En revisión', cobertura: 82, tendencia: '+5%' },
    { area: 'Seguridad', colaboradores: 120, brechas: 3, prioridad: 'Crítica', estado: 'En progreso', cobertura: 97, tendencia: '+2%' },
    { area: 'Administración', colaboradores: 32, brechas: 12, prioridad: 'Media', estado: 'Pendiente', cobertura: 63, tendencia: '-1%' },
    { area: 'Logística', colaboradores: 67, brechas: 5, prioridad: 'Alta', estado: 'En revisión', cobertura: 78, tendencia: '+8%' },
    { area: 'Tecnología', colaboradores: 28, brechas: 6, prioridad: 'Media', estado: 'Completado', cobertura: 91, tendencia: '+3%' }
  ];

  chartData = {
    labels: ['Operaciones', 'Seguridad', 'Administ.', 'Logística', 'Tecnología'],
    datasets: [
      {
        label: 'Cobertura Actual %',
        data: [82, 97, 63, 78, 91],
        backgroundColor: ['rgba(79,124,172,0.8)', 'rgba(34,197,94,0.8)', 'rgba(245,158,11,0.8)', 'rgba(157,34,38,0.8)', 'rgba(124,58,237,0.8)'],
        borderRadius: 8,
        borderWidth: 0
      }
    ]
  };

  chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true, max: 100,
        grid: { color: '#f3f4f6' },
        ticks: { callback: (v: any) => v + '%', color: '#9ca3af', font: { size: 11 } }
      },
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 11 } } }
    }
  };

  getPrioridadSeverity(p: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    if (p === 'Crítica') return 'danger';
    if (p === 'Alta') return 'warn';
    return 'info';
  }

  getEstadoSeverity(e: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    if (e === 'Completado') return 'success';
    if (e === 'En progreso') return 'info';
    if (e === 'En revisión') return 'warn';
    return 'secondary';
  }
}
