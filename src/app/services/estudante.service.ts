import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudante } from '../models/estudante';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class EstudanteService {

  private apiUrl = `${appSettings.apiBaseUrl}/estudantes`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

   listar(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  
  // 🔹 Listar paginado
  listarPaginado(page: number, size: number): Observable<any> {
    const params = { page, size };
    return this.http.get<any>(`${this.apiUrl}/page`, {
      ...this.loginService.gerarCabecalhoHTTP(),
      params
    });
  }

   salvar(estudante: Estudante): Observable<Estudante> {
    if (estudante.id) {
      return this.http.put<Estudante>(`${this.apiUrl}/${estudante.id}`, estudante, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Estudante>(this.apiUrl, estudante, this.loginService.gerarCabecalhoHTTP());
    }
  }

   // 🔹 Buscar por nome (paginado)
  buscarPorNome(nome: string, page: number = 0, size: number = 10): Observable<any> {
    const params = { nome, page, size };
    return this.http.get<any>(`${this.apiUrl}/search`, {
      ...this.loginService.gerarCabecalhoHTTP(),
      params
    });
  }

  buscarPorId(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  //  Contar estudantes ativos
  contarAtivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ativos/count`, this.loginService.gerarCabecalhoHTTP());
  }

}