import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <!-- Sidebar de Navegación -->
      <aside class="glass-panel sidebar">
        <div class="sidebar-header">
          <div class="logo">Finance<span class="text-primary">Pro</span></div>
        </div>
        
        <nav class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span class="icon">📊</span> Dashboard
          </a>
          <a routerLink="/categorias" routerLinkActive="active" class="nav-item">
            <span class="icon">🏷️</span> Categorías
          </a>
          <a class="nav-item disabled">
            <span class="icon">💳</span> Deudas
          </a>
          <a class="nav-item disabled">
            <span class="icon">📈</span> Presupuestos
          </a>
        </nav>

        <div class="sidebar-footer">
          <button class="btn-logout" (click)="logout()">
            <span class="icon">🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <!-- Área de Contenido -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-shell { display: flex; min-height: 100vh; background: var(--color-bg); }
    
    .sidebar {
      width: 280px; height: 100vh; position: fixed; left: 0; top: 0;
      display: flex; flex-direction: column; border-radius: 0;
      border-right: 1px solid rgba(255,255,255,0.05);
      z-index: 100;
    }
    
    .sidebar-header { padding: 40px 30px; }
    .logo { font-size: 1.6rem; font-weight: 800; letter-spacing: -1px; }
    .text-primary { color: var(--color-primary); }
    
    .nav-links { flex: 1; padding: 0 15px; display: flex; flex-direction: column; gap: 8px; }
    .nav-item {
      display: flex; align-items: center; gap: 15px; padding: 14px 20px;
      color: var(--color-text-muted); text-decoration: none; border-radius: var(--radius-md);
      transition: all 0.3s ease; cursor: pointer;
    }
    .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
    .nav-item.active { background: rgba(16, 185, 129, 0.1); color: var(--color-primary); font-weight: 600; }
    .nav-item.disabled { opacity: 0.3; cursor: not-allowed; }
    
    .icon { font-size: 1.2rem; }
    
    .sidebar-footer { padding: 30px; }
    .btn-logout {
      width: 100%; display: flex; align-items: center; gap: 10px;
      background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px; border-radius: var(--radius-md); cursor: pointer; transition: 0.3s;
    }
    .btn-logout:hover { background: #ef4444; color: white; }
    
    .main-content { flex: 1; margin-left: 280px; padding: 40px; min-height: 100vh; }

    @media (max-width: 900px) {
      .sidebar { width: 80px; padding: 20px 10px; }
      .logo, .nav-item span:not(.icon), .sidebar-footer { display: none; }
      .main-content { margin-left: 80px; }
      .nav-item { justify-content: center; padding: 15px; }
    }
  `]
})
export class MainLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
