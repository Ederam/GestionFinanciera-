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
      <!-- Mobile Header -->
      <header class="mobile-header">
        <div class="logo">Finance<span class="text-primary">Pro</span></div>
        <button class="hamburger-btn" (click)="toggleMenu()">
          ☰
        </button>
      </header>

      <!-- Overlay para Mobile -->
      <div class="sidebar-overlay" *ngIf="isMobileMenuOpen" (click)="closeMenu()"></div>

      <!-- Sidebar de Navegación -->
      <aside class="glass-panel sidebar" [class.open]="isMobileMenuOpen">
        <div class="sidebar-header">
          <div class="logo">Finance<span class="text-primary">Pro</span></div>
          <button class="close-menu-btn" (click)="closeMenu()">✕</button>
        </div>
        
        <nav class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item" (click)="closeMenu()">
            <span class="icon">📊</span> Dashboard
          </a>
          <a routerLink="/categorias" routerLinkActive="active" class="nav-item" (click)="closeMenu()">
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
    :host {
      --sidebar-width: 280px;
      --content-padding: 40px;
      --mobile-header-height: 70px;
    }

    .app-shell { display: flex; min-height: 100vh; background: var(--color-bg); }
    
    .mobile-header {
      display: none;
      position: fixed; top: 0; left: 0; width: 100%; height: var(--mobile-header-height);
      background: var(--color-bg-glass); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
      z-index: 90; padding: 0 20px; align-items: center; justify-content: space-between;
      box-sizing: border-box;
    }

    .hamburger-btn {
      background: none; border: none; color: white; font-size: 1.8rem; cursor: pointer; padding: 5px;
    }

    .close-menu-btn {
      display: none; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;
    }

    .sidebar-overlay {
      display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); backdrop-filter: blur(3px); z-index: 95;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .sidebar {
      width: var(--sidebar-width); height: 100vh; position: fixed; left: 0; top: 0;
      display: flex; flex-direction: column; border-radius: 0;
      border-right: 1px solid rgba(255,255,255,0.05);
      z-index: 100;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .sidebar-header { padding: 40px 30px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.6rem; font-weight: 800; letter-spacing: -1px; white-space: nowrap; }
    .text-primary { color: var(--color-primary); }
    
    .nav-links { flex: 1; padding: 0 15px; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; }
    .nav-item {
      display: flex; align-items: center; gap: 15px; padding: 14px 20px;
      color: var(--color-text-muted); text-decoration: none; border-radius: var(--radius-md);
      transition: all 0.2s ease; cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
    }
    .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
    .nav-item.active { background: rgba(16, 185, 129, 0.1); color: var(--color-primary); font-weight: 600; }
    .nav-item.disabled { opacity: 0.3; cursor: not-allowed; }
    
    .icon { font-size: 1.2rem; min-width: 24px; text-align: center; }
    
    .sidebar-footer { padding: 30px; }
    .btn-logout {
      width: 100%; display: flex; align-items: center; gap: 10px;
      background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px; border-radius: var(--radius-md); cursor: pointer; transition: 0.3s;
      justify-content: center;
    }
    .btn-logout:hover { background: #ef4444; color: white; }
    
    .main-content { 
      flex: 1; 
      margin-left: var(--sidebar-width); 
      padding: var(--content-padding); 
      min-height: 100vh;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Tablet Breakpoint (992px) */
    @media (max-width: 992px) {
      :host {
        --sidebar-width: 80px;
        --content-padding: 30px;
      }
      .logo, .nav-item span:not(.icon), .sidebar-footer span { display: none; }
      .sidebar-header { padding: 30px 0; display: flex; justify-content: center; }
      .nav-links { padding: 0 10px; }
      .nav-item { justify-content: center; padding: 15px 0; }
      .btn-logout { padding: 12px 0; }
    }

    /* Mobile Breakpoint (600px) */
    @media (max-width: 600px) {
      :host {
        --sidebar-width: 280px; /* Restaurar ancho normal para el drawer móvil */
        --content-padding: 20px;
      }
      .mobile-header { display: flex; }
      .sidebar { transform: translateX(-100%); background: var(--color-bg-base); }
      .sidebar.open { transform: translateX(0); box-shadow: 10px 0 30px rgba(0,0,0,0.5); }
      .sidebar-overlay { display: block; }
      
      .main-content { margin-left: 0; padding-top: calc(var(--mobile-header-height) + 20px); }
      
      /* En mobile necesitamos mostrar el texto del nav de nuevo */
      .logo, .nav-item span:not(.icon), .sidebar-footer span { display: inline; }
      .sidebar-header { padding: 25px 20px; justify-content: space-between; }
      .close-menu-btn { display: block; }
      .nav-links { padding: 0 15px; }
      .nav-item { justify-content: flex-start; padding: 14px 20px; }
      .btn-logout { padding: 12px; }
    }
  `]
})
export class MainLayoutComponent {
  isMobileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
