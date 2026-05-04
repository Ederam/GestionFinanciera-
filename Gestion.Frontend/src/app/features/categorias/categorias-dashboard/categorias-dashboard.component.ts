import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriasService, Categoria } from '../../../core/services/categorias.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-categorias-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="categorias-container">
      <div class="glass-panel header-section">
        <h2>Gestión de Categorías</h2>
        <p class="text-muted">Organiza tus gastos definiendo categorías personalizadas.</p>
      </div>

      <div class="main-grid">
        <!-- Formulario de Creación -->
        <div class="glass-panel form-card">
          <h3>Nueva Categoría</h3>
          <form [formGroup]="catForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" formControlName="nombre" placeholder="Ej. Viajes, Mascotas...">
            </div>
            <div class="form-group">
              <label>Color</label>
              <input type="color" formControlName="colorHex" class="color-input">
            </div>
            <button type="submit" class="btn-primary" [disabled]="catForm.invalid || isLoading">
              {{ isLoading ? 'Guardando...' : 'Crear Categoría' }}
            </button>
          </form>
        </div>

        <!-- Listado de Categorías -->
        <div class="glass-panel list-card">
          <h3>Tus Categorías</h3>
          <div class="cat-list" *ngIf="categorias.length > 0; else emptyState">
            <div class="cat-item" *ngFor="let cat of categorias">
              <div class="cat-info">
                <div class="color-badge" [style.background-color]="cat.colorHex"></div>
                <span>{{ cat.nombre }}</span>
              </div>
              <button class="btn-delete" title="Eliminar">🗑️</button>
            </div>
          </div>
          <ng-template #emptyState>
            <p class="text-muted center">No tienes categorías aún.</p>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categorias-container { 
      animation: fadeIn 0.5s ease; 
      max-width: 1400px; 
      margin: 0 auto;
    }
    .header-section { padding: 30px; margin-bottom: 30px; }
    
    .main-grid { 
      display: grid; 
      grid-template-columns: minmax(300px, 1fr) 2fr; 
      gap: 30px; 
      align-items: start;
    }
    
    .form-card, .list-card { padding: 30px; height: fit-content; }
    h3 { margin-bottom: 25px; color: var(--color-primary-light); font-weight: 700; }
    
    .form-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
    label { color: var(--color-text-muted); font-size: 0.9rem; font-weight: 500; }
    
    input[type="text"] { 
      background: rgba(255,255,255,0.05); 
      border: 1px solid rgba(255,255,255,0.1); 
      padding: 14px; 
      border-radius: var(--radius-md); 
      color: white;
      transition: all 0.3s ease;
    }
    input[type="text"]:focus { border-color: var(--color-primary); background: rgba(255,255,255,0.08); outline: none; }
    
    .color-input { width: 100%; height: 50px; border: none; background: none; cursor: pointer; border-radius: 8px; }
    
    .cat-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    
    .cat-item { 
      display: flex; justify-content: space-between; align-items: center; 
      padding: 20px; background: rgba(255,255,255,0.03); border-radius: var(--radius-lg);
      border: 1px solid rgba(255,255,255,0.05);
      transition: all 0.3s ease;
    }
    .cat-item:hover { transform: translateY(-3px); background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
    
    .cat-info { display: flex; align-items: center; gap: 15px; }
    .color-badge { width: 35px; height: 35px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
    
    .btn-delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: none; padding: 8px; border-radius: 8px; cursor: pointer; transition: 0.3s; }
    .btn-delete:hover { background: #ef4444; color: white; transform: scale(1.1); }
    
    .center { text-align: center; padding: 60px 0; grid-column: 1 / -1; }
    .text-muted { color: var(--color-text-muted); font-size: 0.9rem; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* Responsive Breakpoints */
    @media (max-width: 1200px) {
      .main-grid { grid-template-columns: 1fr; }
      .cat-list { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
    }
    
    @media (max-width: 600px) {
      .header-section { padding: 20px; }
      .form-card, .list-card { padding: 20px; }
      .cat-list { grid-template-columns: 1fr; }
    }
  `]
})
export class CategoriasDashboardComponent implements OnInit {
  categorias: Categoria[] = [];
  catForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private authService: AuthService
  ) {
    this.catForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      colorHex: ['#10b981', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.categoriasService.getCategorias(userId).subscribe(data => this.categorias = data);
    }
  }

  onSubmit(): void {
    if (this.catForm.valid) {
      this.isLoading = true;
      const userId = this.authService.getUserIdFromToken();
      if (!userId) return;

      const newCat = { 
        ...this.catForm.value, 
        usuarioId: userId,
        icono: 'tag', // Valor por defecto requerido por el Backend
        esDeuda: false // Valor por defecto
      };

      this.categoriasService.createCategoria(newCat).subscribe({
        next: () => {
          this.isLoading = false;
          this.catForm.reset({ colorHex: '#10b981' });
          this.loadCategorias();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error al crear categoría:', err);
          alert('Hubo un error al crear la categoría. Revisa la consola.');
        }
      });
    }
  }
}
