import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Categoria {
  id: string;
  nombre: string;
  colorHex: string;
  icono: string;
  esDeuda: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = `${environment.apiUrl}/Categorias`;

  constructor(private http: HttpClient) { }

  getCategorias(usuarioId: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  createCategoria(categoria: Partial<Categoria> & { usuarioId: string }): Observable<string> {
    return this.http.post<string>(this.apiUrl, categoria);
  }
}
