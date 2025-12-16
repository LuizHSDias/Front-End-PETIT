import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {
  lista: Livro[] = [];
  mensagemDados = false;

  constructor (private service: LivroService, private router: Router){

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
    this.router.navigate(['/add-livro', id]);    
  }

}