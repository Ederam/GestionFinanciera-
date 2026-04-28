import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  fecha: Date;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'https://localhost:7150/api/Gastos';

  constructor(private http: HttpClient) { }

  getGastos(usuarioId: string): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  createGasto(gasto: Partial<Gasto>): Observable<any> {
    return this.http.post(this.apiUrl, gasto);
  }
}
