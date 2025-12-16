import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-emprestimo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emprestimo.component.html',
  styleUrl: './emprestimo.component.css'
})
export class EmprestimoComponent {

    lista: Emprestimo[] = [];
    mensagemDados = false;
  
    constructor (private service: EmprestimoService, private router: Router){
  
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
      if (confirm('Tem certeza que deseja excluir o empréstimo ?')) {
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
      this.router.navigate(['/add-emprestimo', id]);    
    }
  
}
