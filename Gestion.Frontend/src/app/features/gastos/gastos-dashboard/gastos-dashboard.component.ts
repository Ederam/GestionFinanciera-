import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { GastosService, Gasto } from '../../../core/services/gastos.service';
import { Router } from '@angular/router';
import { GastoFormComponent } from '../gasto-form/gasto-form.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gastos-dashboard',
  standalone: true,
  imports: [CommonModule, GastoFormComponent],
  template: `
    <div class="dashboard-container">
      <main class="content">
        <!-- Sección de Resumen Visual -->
        <div class="summary-grid">
          <div class="glass-panel chart-card">
            <h3>Distribución por Categoría</h3>
            <div class="chart-container">
              <canvas id="expensesChart"></canvas>
            </div>
          </div>
          
          <div class="glass-panel stats-card">
            <h3>Resumen Total</h3>
            <div class="total-amount">{{ totalGastos | currency:'USD':'symbol':'1.0-0' }}</div>
            <p class="text-muted">Total de gastos registrados este mes</p>
            <div class="stats-list">
              <div class="stat-item">
                <span>Transacciones</span>
                <span class="bold">{{ gastos.length }}</span>
              </div>
              <div class="stat-item">
                <span>Promedio</span>
                <span class="bold">{{ (totalGastos / (gastos.length || 1)) | currency:'USD':'symbol':'1.0-0' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-panel main-card">
          <div class="card-header">
            <h2>Tus Gastos Recientes</h2>
            <button class="btn-primary" (click)="showForm = true">+ Nuevo Gasto</button>
          </div>

          <!-- Componente del Formulario (Modal) -->
          <app-gasto-form 
            *ngIf="showForm" 
            (onClose)="showForm = false"
            (onSave)="handleSave()">
          </app-gasto-form>

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
    .dashboard-container { animation: fadeIn 0.5s ease; }
    
    .summary-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 30px; }
    .chart-card, .stats-card { padding: 25px; min-height: 300px; }
    .chart-container { position: relative; height: 200px; width: 100%; display: flex; justify-content: center; }
    
    .total-amount { font-size: 2.5rem; font-weight: 800; color: var(--color-primary-light); margin: 20px 0 5px 0; }
    .stats-list { margin-top: 25px; display: flex; flex-direction: column; gap: 12px; }
    .stat-item { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .text-muted { color: var(--color-text-muted); font-size: 0.9rem; }

    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .main-card { padding: 30px; }
    
    .table-container { overflow-x: auto; }
    .custom-table { width: 100%; border-collapse: collapse; text-align: left; }
    .custom-table th { padding: 15px; color: var(--color-primary-light); font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; border-bottom: 2px solid rgba(255,255,255,0.05); }
    .custom-table td { padding: 18px 15px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ffffff; font-size: 0.95rem; }
    
    .table-row:hover { background: rgba(255,255,255,0.04); }
    .text-right { text-align: right; }
    .bold { font-weight: 700; color: var(--color-primary-light); font-size: 1.05rem; }
    
    .badge { background: rgba(16, 185, 129, 0.1); color: var(--color-primary); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; }
    
    .empty-state { padding: 60px 0; text-align: center; background: rgba(0,0,0,0.1); border-radius: var(--radius-md); }
    .icon { font-size: 3rem; }

    @media (max-width: 768px) {
      .summary-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class GastosDashboardComponent implements OnInit, OnDestroy {
  gastos: Gasto[] = [];
  showForm = false;
  totalGastos = 0;
  chart: any;

  constructor(
    private authService: AuthService, 
    private gastosService: GastosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGastos();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadGastos(): void {
    const usuarioId = this.authService.getUserIdFromToken();
    if (!usuarioId) return;

    this.gastosService.getGastos(usuarioId).subscribe({
      next: (data) => {
        this.gastos = data;
        this.calculateTotals();
        this.updateChart();
      },
      error: (err) => console.error('Error cargando gastos', err)
    });
  }

  calculateTotals(): void {
    this.totalGastos = this.gastos.reduce((acc, curr) => acc + Number(curr.monto), 0);
  }

  updateChart(): void {
    // Agrupar por categoría
    const categories: { [key: string]: number } = {};
    this.gastos.forEach(g => {
      categories[g.categoria] = (categories[g.categoria] || 0) + Number(g.monto);
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('expensesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#10b981', '#059669', '#34d399', '#0f766e', '#064e3b', '#6ee7b7'
          ],
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#94a3b8',
              font: { family: 'Inter', size: 12 }
            }
          }
        }
      }
    });
  }

  handleSave() {
    this.showForm = false;
    this.loadGastos(); // Recargar la tabla y gráfico
  }
}
