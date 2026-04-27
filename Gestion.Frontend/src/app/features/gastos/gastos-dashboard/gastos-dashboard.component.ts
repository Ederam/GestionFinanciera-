import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="glass-panel navbar">
        <div class="logo">Finance<span class="text-primary">Pro</span></div>
        <button class="btn-logout" (click)="logout()">Cerrar Sesión</button>
      </nav>
      
      <main class="content">
        <div class="glass-panel main-card">
          <h2>Dashboard de Gastos</h2>
          <p class="text-muted">¡Has iniciado sesión con éxito! Tu Token JWT está siendo inyectado en cada petición.</p>
          <div class="empty-state">
            <div class="icon">📊</div>
            <p>Pronto conectaremos los gráficos y la tabla de gastos aquí.</p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; margin-bottom: 30px; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .text-primary { color: var(--color-primary); }
    .btn-logout { background: transparent; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 16px; border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s; }
    .btn-logout:hover { background: rgba(239, 68, 68, 0.1); }
    .content { animation: floatIn 0.6s ease-out forwards; }
    .main-card { padding: 40px; text-align: center; }
    .text-muted { color: var(--color-text-muted); margin-bottom: 40px; }
    .empty-state { padding: 60px 0; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px dashed rgba(255,255,255,0.1); }
    .icon { font-size: 3rem; margin-bottom: 10px; }
    @keyframes floatIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class GastosDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
