import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { GastosDashboardComponent } from './features/gastos/gastos-dashboard/gastos-dashboard.component';
import { CategoriasDashboardComponent } from './features/categorias/categorias-dashboard/categorias-dashboard.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: GastosDashboardComponent },
      { path: 'categorias', component: CategoriasDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
