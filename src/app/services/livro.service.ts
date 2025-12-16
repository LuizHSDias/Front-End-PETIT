import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private apiUrl = `${appSettings.apiBaseUrl}/livros`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Livro[]>{
    return this.http.get<Livro[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(livro: Livro): Observable<Livro>{
    if(livro.id){
      return this.http.put<Livro>(`${this.apiUrl}/${livro.id}`, livro, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Livro>(this.apiUrl, livro, this.loginService.gerarCabecalhoHTTP());
    }
  }

  buscarPorId(id: number){
    return this.http.get(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

}