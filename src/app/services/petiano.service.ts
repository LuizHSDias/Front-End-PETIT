import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Petiano } from '../models/petiano';
import { appSettings } from '../app.config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PetianoService {

  private apiUrl = `${appSettings.apiBaseUrl}/petianos`;
  
    constructor(private http: HttpClient, private loginService: LoginService) { }
  
     listar(): Observable<Petiano[]> {
      return this.http.get<Petiano[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
    }
  
     salvar(petiano: Petiano): Observable<Petiano> {
      if (petiano.id) {
        return this.http.put<Petiano>(`${this.apiUrl}/${petiano.id}`, petiano, this.loginService.gerarCabecalhoHTTP());
      } else {
        return this.http.post<Petiano>(this.apiUrl, petiano, this.loginService.gerarCabecalhoHTTP());
      }
    }
  
    buscarPorId(id: number): Observable<Petiano> {
      return this.http.get<Petiano>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }

    excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }
  
     verificarLogin(login: string): Observable<boolean> {
    const url = `${this.apiUrl}/existe?login=${encodeURIComponent(login)}`;
    return this.http.get<boolean>(url, this.loginService.gerarCabecalhoHTTP());
  } 
  
}
