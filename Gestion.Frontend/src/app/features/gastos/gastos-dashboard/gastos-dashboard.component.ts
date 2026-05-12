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
                  <td data-label="Descripción"><span>{{ gasto.descripcion }}</span></td>
                  <td data-label="Categoría"><span class="badge">{{ gasto.categoria }}</span></td>
                  <td data-label="Fecha"><span>{{ gasto.fecha | date:'dd/MM/yyyy' }}</span></td>
                  <td data-label="Monto" class="text-right bold"><span>{{ gasto.monto | currency:'USD':'symbol':'1.0-0' }}</span></td>
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
    .dashboard-container { animation: fadeIn 0.5s ease; max-width: 1400px; margin: 0 auto; }
    
    .summary-grid { 
      display: grid; 
      grid-template-columns: 1.6fr 1fr; 
      gap: 30px; 
      margin-bottom: 30px; 
      align-items: start;
    }
    
    .chart-card, .stats-card { padding: 30px; min-height: 350px; display: flex; flex-direction: column; box-sizing: border-box; }
    .chart-container { flex: 1; position: relative; min-height: 250px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; }
    .chart-container canvas { max-width: 100% !important; height: auto !important; }
    
    .total-amount { font-size: 3rem; font-weight: 800; color: var(--color-primary-light); margin: 20px 0 5px 0; letter-spacing: -1px; }
    .stats-list { margin-top: auto; display: flex; flex-direction: column; gap: 15px; }
    .stat-item { display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .text-muted { color: var(--color-text-muted); font-size: 0.95rem; }

    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; gap: 20px; flex-wrap: wrap; }
    .main-card { padding: 35px; }
    
    .table-container { 
      overflow-x: auto; 
      margin: 0 -35px; 
      padding: 0 35px;
      -webkit-overflow-scrolling: touch;
    }
    .custom-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 600px; }
    .custom-table th { padding: 18px 15px; color: var(--color-primary-light); font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1.5px; border-bottom: 2px solid rgba(255,255,255,0.05); }
    .custom-table td { padding: 20px 15px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #ffffff; font-size: 0.95rem; }
    
    .table-row:hover { background: rgba(255,255,255,0.04); }
    .text-right { text-align: right; }
    .bold { font-weight: 700; color: var(--color-primary-light); font-size: 1.1rem; }
    
    .badge { background: rgba(16, 185, 129, 0.1); color: var(--color-primary); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
    
    .empty-state { padding: 80px 0; text-align: center; background: rgba(0,0,0,0.1); border-radius: var(--radius-lg); }
    .icon { font-size: 4rem; margin-bottom: 20px; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* Tablet/Mobile Breakpoints */
    @media (max-width: 1100px) {
      .summary-grid { grid-template-columns: 1fr; }
      .chart-card, .stats-card { min-height: auto; }
    }

    @media (max-width: 600px) {
      .dashboard-container { padding: 0 10px; overflow-x: hidden; }
      .summary-grid { gap: 15px; margin-bottom: 20px; }
      .chart-card, .stats-card { padding: 20px; }
      .main-card { padding: 20px; box-sizing: border-box; }
      .table-container { margin: 0; padding: 0; overflow-x: hidden; }
      .total-amount { font-size: 2.2rem; }
      .card-header h2 { font-size: 1.2rem; }
      .btn-primary { width: 100%; box-sizing: border-box; }
      
      /* Refactor de Tabla a Tarjetas */
      .custom-table, .custom-table tbody, .custom-table tr, .custom-table td {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }
      .custom-table thead { display: none; }
      
      .table-row {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: var(--radius-md);
        margin-bottom: 15px;
        padding: 10px 0;
      }
      
      .custom-table td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border-bottom: none;
        text-align: right;
      }
      
      .custom-table td::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--color-text-muted);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 1px;
        text-align: left;
      }
      
      .text-right { text-align: right !important; }
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
