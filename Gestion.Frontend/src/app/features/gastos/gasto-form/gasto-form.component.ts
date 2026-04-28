import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GastosService } from '../../../core/services/gastos.service';
import { AuthService } from '../../../core/services/auth.service';
import { CategoriasService, Categoria } from '../../../core/services/categorias.service';

@Component({
  selector: 'app-gasto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="close()">
      <div class="glass-panel modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Registrar Nuevo Gasto</h3>
          <button class="btn-close" (click)="close()">&times;</button>
        </div>

        <form [formGroup]="gastoForm" (ngSubmit)="onSubmit()" class="gasto-form">
          <div class="form-group">
            <label>Descripción</label>
            <input type="text" formControlName="descripcion" placeholder="Ej. Pago de Internet" 
                   [class.error]="isFieldInvalid('descripcion')">
            <small class="error-text" *ngIf="isFieldInvalid('descripcion')">
              La descripción es obligatoria (mín. 3 caracteres).
            </small>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Monto</label>
              <input type="number" formControlName="monto" placeholder="0.00"
                     step="0.01"
                     (keypress)="onlyNumbers($event)"
                     [class.error]="isFieldInvalid('monto')">
              <small class="error-text" *ngIf="isFieldInvalid('monto')">Monto inválido.</small>
            </div>
            <div class="form-group">
              <label>Fecha</label>
              <input type="date" formControlName="fecha" [class.error]="isFieldInvalid('fecha')">
              <small class="error-text" *ngIf="isFieldInvalid('fecha')">Fecha obligatoria.</small>
            </div>
          </div>

          <div class="form-group">
            <label>Categoría</label>
            <div class="category-select-wrapper">
              <select formControlName="categoriaId" [class.error]="isFieldInvalid('categoriaId')">
                <option value="">Selecciona una categoría</option>
                <option *ngFor="let cat of categorias" [value]="cat.id">{{ cat.nombre }}</option>
              </select>
              <p class="empty-categories" *ngIf="categorias.length === 0">
                No tienes categorías. Créalas en la gestión de categorías.
              </p>
            </div>
            <small class="error-text" *ngIf="isFieldInvalid('categoriaId')">Selecciona una categoría.</small>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="close()">Cancelar</button>
            <button type="submit" class="btn-primary" [disabled]="gastoForm.invalid || isLoading">
              {{ isLoading ? 'Guardando...' : 'Guardar Gasto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
      display: flex; justify-content: center; align-items: center; z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    .modal-content {
      width: 100%; max-width: 500px; padding: 30px; border: 1px solid rgba(255,255,255,0.1);
      animation: slideUp 0.3s ease-out;
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .btn-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
    
    .gasto-form { display: flex; flex-direction: column; gap: 20px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    label { color: var(--color-text-muted); font-size: 0.9rem; }
    
    input, select {
      background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 14px; border-radius: var(--radius-md); color: #ffffff; outline: none;
      font-size: 1rem; width: 100%; box-sizing: border-box;
      font-family: inherit;
      color-scheme: dark;
    }
    input:focus, select:focus { border-color: var(--color-primary); background: rgba(255, 255, 255, 0.12); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); }
    
    input.error, select.error { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
    .error-text { color: #ef4444; font-size: 0.75rem; margin-top: 4px; animation: shake 0.2s ease-in-out; }
    .empty-categories { font-size: 0.75rem; color: #fbbf24; margin-top: 5px; }

    input[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(128deg) brightness(96%) contrast(101%);
    }
    
    option { background-color: var(--color-bg-surface); color: white; }
    
    .form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 15px; }
    .btn-secondary { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 20px; border-radius: var(--radius-md); cursor: pointer; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
    }
  `]
})
export class GastoFormComponent implements OnInit {
  @Output() onSave = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  gastoForm: FormGroup;
  isLoading = false;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder, 
    private gastosService: GastosService,
    private authService: AuthService,
    private categoriasService: CategoriasService
  ) {
    this.gastoForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      monto: ['', [Validators.required, Validators.min(0.01)]],
      fecha: [new Date().toISOString().substring(0, 10), Validators.required],
      categoriaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    const usuarioId = this.authService.getUserIdFromToken();
    if (usuarioId) {
      this.categoriasService.getCategorias(usuarioId).subscribe({
        next: (data) => this.categorias = data,
        error: (err) => console.error('Error al cargar categorías', err)
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.gastoForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.gastoForm.valid) {
      this.isLoading = true;
      const usuarioId = this.authService.getUserIdFromToken();
      if (!usuarioId) {
        this.isLoading = false;
        return;
      }

      const gastoPayload = {
        ...this.gastoForm.value,
        usuarioId: usuarioId
      };

      this.gastosService.createGasto(gastoPayload).subscribe({
        next: () => {
          this.isLoading = false;
          this.onSave.emit();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error al guardar gasto', err);
        }
      });
    }
  }

  close() {
    this.onClose.emit();
  }
}
