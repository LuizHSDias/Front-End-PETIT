import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetianoService } from '../../services/petiano.service';
import { Petiano } from '../../models/petiano';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-petiano',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './petiano.component.html',
  styleUrl: './petiano.component.css'
})
export class PetianoComponent {
   lista: Petiano[] = [];
      mensagemDados = false;
    
      constructor (private service: PetianoService, private router: Router){
    
      }
    
       ngOnInit(): void {
        this.carregarLista();
      }
    
      carregarLista(): void {
        this.mensagemDados = true;
        this.service.listar().subscribe({
          next: (retornoJson) => {
            this.lista = retornoJson;
          },
          error: () => {
            alert('Erro ao carregar a lista.');
          },
          complete: () => {
            this.mensagemDados = false;
          }
        });
      }
    
      excluir(id: number): void {
        if (confirm('Tem certeza que deseja excluir o registro?')) {
          this.service.excluir(id).subscribe({
            next: () => {
              this.carregarLista();
            },
            error: () => {
              alert('Erro ao excluir o registro. Tente novamente.');
            }
          });
        }
      }
    
       editar(id: number): void {    
        this.router.navigate(['/add-petiano', id]);    
      }
}