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
    .categorias-container { animation: fadeIn 0.5s ease; }
    .header-section { padding: 30px; margin-bottom: 30px; }
    .main-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; }
    
    .form-card, .list-card { padding: 30px; }
    h3 { margin-bottom: 20px; color: var(--color-primary-light); }
    
    .form-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
    input[type="text"] { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: var(--radius-md); color: white; }
    .color-input { width: 100%; height: 50px; border: none; background: none; cursor: pointer; }
    
    .cat-list { display: flex; flex-direction: column; gap: 15px; }
    .cat-item { 
      display: flex; justify-content: space-between; align-items: center; 
      padding: 15px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);
      border: 1px solid rgba(255,255,255,0.05);
    }
    .cat-info { display: flex; align-items: center; gap: 15px; }
    .color-badge { width: 15px; height: 15px; border-radius: 50%; }
    .btn-delete { background: none; border: none; cursor: pointer; font-size: 1.2rem; opacity: 0.6; transition: 0.3s; }
    .btn-delete:hover { opacity: 1; transform: scale(1.1); }
    
    .center { text-align: center; padding: 40px 0; }
    .text-muted { color: var(--color-text-muted); font-size: 0.9rem; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 900px) { .main-grid { grid-template-columns: 1fr; } }
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

      const newCat = { ...this.catForm.value, usuarioId: userId };
      this.categoriasService.createCategoria(newCat).subscribe({
        next: () => {
          this.isLoading = false;
          this.catForm.reset({ colorHex: '#10b981' });
          this.loadCategorias();
        },
        error: () => this.isLoading = false
      });
    }
  }
}
