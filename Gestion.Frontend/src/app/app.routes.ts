import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { GastosDashboardComponent } from './features/gastos/gastos-dashboard/gastos-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: GastosDashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
