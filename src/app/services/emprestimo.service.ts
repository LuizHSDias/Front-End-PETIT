import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

 private apiUrl = `${appSettings.apiBaseUrl}/emprestimos`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

   listar(): Observable<Emprestimo[]> {
      return this.http.get<Emprestimo[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
    }
  
     salvar(emprestimo: Emprestimo): Observable<Emprestimo> {
      if (emprestimo.id) {
        return this.http.put<Emprestimo>(`${this.apiUrl}/${emprestimo.id}`, emprestimo, this.loginService.gerarCabecalhoHTTP());
      } else {
        return this.http.post<Emprestimo>(this.apiUrl, emprestimo, this.loginService.gerarCabecalhoHTTP());
      }
    }
  
    buscarPorId(id: number): Observable<Emprestimo> {
      return this.http.get<Emprestimo>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }
  
    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }

}
