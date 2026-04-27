import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { GastosService, Gasto } from '../../../core/services/gastos.service';
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
          <div class="card-header">
            <h2>Tus Gastos Recientes</h2>
            <button class="btn-primary">+ Nuevo Gasto</button>
          </div>

          <div class="table-container" *ngIf="gastos.length > 0; else emptyState">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Fecha</th>
                  <th class="text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let gasto of gastos" class="table-row">
                  <td>{{ gasto.descripcion }}</td>
                  <td><span class="badge">{{ gasto.categoria }}</span></td>
                  <td>{{ gasto.fecha | date:'dd/MM/yyyy' }}</td>
                  <td class="text-right bold">{{ gasto.monto | currency:'USD':'symbol':'1.0-0' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ng-template #emptyState>
            <div class="empty-state">
              <div class="icon">📊</div>
              <p>No hay gastos registrados aún.</p>
            </div>
          </ng-template>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; margin-bottom: 30px; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .text-primary { color: var(--color-primary); }
    .btn-logout { background: transparent; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 16px; border-radius: var(--radius-md); cursor: pointer; }
    
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .main-card { padding: 30px; }
    
    .table-container { overflow-x: auto; }
    .custom-table { width: 100%; border-collapse: collapse; text-align: left; }
    .custom-table th { padding: 15px; color: var(--color-text-muted); font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .custom-table td { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    
    .table-row:hover { background: rgba(255,255,255,0.02); }
    .text-right { text-align: right; }
    .bold { font-weight: 600; color: var(--color-primary); }
    
    .badge { background: rgba(16, 185, 129, 0.1); color: var(--color-primary); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; }
    
    .empty-state { padding: 60px 0; text-align: center; background: rgba(0,0,0,0.1); border-radius: var(--radius-md); }
    .icon { font-size: 3rem; }
  `]
})
export class GastosDashboardComponent implements OnInit {
  gastos: Gasto[] = [];

  constructor(
    private authService: AuthService, 
    private gastosService: GastosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGastos();
  }

  loadGastos(): void {
    this.gastosService.getGastos().subscribe({
      next: (data) => this.gastos = data,
      error: (err) => console.error('Error cargando gastos', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
