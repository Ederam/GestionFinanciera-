import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo interceptamos si la URL coincide con nuestra API
  const isAuth = req.url.endsWith('/login');
  const isGastos = req.url.includes('/api/Gastos');

  // SIMULACIÓN DE LOGIN
  if (isAuth) {
    console.log('--- [MOCK] Interceptando Login ---');
    return of(new HttpResponse({ 
      status: 200, 
      body: { token: 'mock-jwt-token-para-desarrollo-offline' } 
    })).pipe(delay(1000)); // Simulamos latencia de red
  }

  // SIMULACIÓN DE GASTOS
  if (isGastos && req.method === 'GET') {
    console.log('--- [MOCK] Interceptando GetGastos ---');
    const mockGastos = [
      { id: '1', descripcion: 'Suscripción Netflix', monto: 45000, fecha: new Date(), categoria: 'Entretenimiento' },
      { id: '2', descripcion: 'Almuerzo Ejecutivo', monto: 25000, fecha: new Date(), categoria: 'Alimentación' },
      { id: '3', descripcion: 'Pago Internet', monto: 95000, fecha: new Date(), categoria: 'Servicios' },
      { id: '4', descripcion: 'Gasolina', monto: 120000, fecha: new Date(), categoria: 'Transporte' },
      { id: '5', descripcion: 'Gimnasio', monto: 80000, fecha: new Date(), categoria: 'Salud' }
    ];
    return of(new HttpResponse({ status: 200, body: mockGastos })).pipe(delay(800));
  }

  if (isGastos && req.method === 'POST') {
    console.log('--- [MOCK] Interceptando CreateGasto ---', req.body);
    return of(new HttpResponse({ status: 201, body: { id: 'new-id-' + Math.random() } })).pipe(delay(1000));
  }

  // Si no es ninguna de las anteriores, que siga su camino real
  return next(req);
};
