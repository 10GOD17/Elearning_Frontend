import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  level: string;
  instructor: string;
  progress: number;
  enrolled: boolean;
  isNew: boolean;
  color: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-learning-center',
  standalone: true,
  imports: [CommonModule, TagModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './learning-center.component.html',
  styleUrls: ['./learning-center.component.scss']
})
export class LearningCenterComponent {
  searchQuery = signal('');
  activeCategory = signal('Todos');

  categories = ['Todos', 'Seguridad', 'Tecnología', 'Liderazgo', 'Soft Skills', 'Cumplimiento'];

  courses: Course[] = [
    { id: 1, title: 'Seguridad en Faena y Prevención de Riesgos', category: 'Seguridad', duration: '8h', level: 'Básico', instructor: 'Ing. P. Rojas', progress: 85, enrolled: true, isNew: false, color: '#ef4444', icon: 'pi pi-shield', description: 'Protocolos esenciales de seguridad para trabajo en terreno y faena.' },
    { id: 2, title: 'Excel Avanzado para Gestión de Datos', category: 'Tecnología', duration: '12h', level: 'Avanzado', instructor: 'A. Morales', progress: 40, enrolled: true, isNew: true, color: '#22c55e', icon: 'pi pi-table', description: 'Tablas dinámicas, Power Query y automatización con macros.' },
    { id: 3, title: 'Liderazgo Situacional y Coaching', category: 'Liderazgo', duration: '16h', level: 'Intermedio', instructor: 'Dra. C. Vega', progress: 0, enrolled: false, isNew: true, color: '#4F7CAC', icon: 'pi pi-star', description: 'Herramientas prácticas de liderazgo adaptativo para equipos de trabajo.' },
    { id: 4, title: 'Comunicación Asertiva en el Trabajo', category: 'Soft Skills', duration: '6h', level: 'Básico', instructor: 'M. Torres', progress: 100, enrolled: true, isNew: false, color: '#a855f7', icon: 'pi pi-comments', description: 'Técnicas de comunicación efectiva y manejo de conflictos.' },
    { id: 5, title: 'Cumplimiento Normativa Laboral 2025', category: 'Cumplimiento', duration: '4h', level: 'Básico', instructor: 'Abg. F. Castro', progress: 0, enrolled: false, isNew: true, color: '#f59e0b', icon: 'pi pi-file', description: 'Actualización sobre la normativa laboral vigente en Chile.' },
    { id: 6, title: 'Power BI para Análisis de KPIs', category: 'Tecnología', duration: '20h', level: 'Avanzado', instructor: 'D. Fernández', progress: 15, enrolled: true, isNew: true, color: '#06b6d4', icon: 'pi pi-chart-bar', description: 'Dashboards profesionales y análisis de datos empresariales con Power BI.' }
  ];

  get filteredCourses(): Course[] {
    return this.courses.filter(c => {
      const matchCat = this.activeCategory() === 'Todos' || c.category === this.activeCategory();
      const matchSearch = !this.searchQuery() || c.title.toLowerCase().includes(this.searchQuery().toLowerCase());
      return matchCat && matchSearch;
    });
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  getLevelSeverity(level: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    if (level === 'Básico') return 'success';
    if (level === 'Intermedio') return 'info';
    return 'warn';
  }
}
