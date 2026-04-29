import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {
  lista: Livro[] = [];
  mensagemDados = false;
  filtroTitulo: string = '';

   // Paginação
  paginaAtual = 0;
  tamanhoPagina = 5;
  totalPaginas = 0;

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

    buscarPorTitulo(): void {
    if (this.filtroTitulo.trim() === '') {
      this.carregarLista();
      return;
    }

        this.service.buscarPorTitulo(this.filtroTitulo, this.paginaAtual, this.tamanhoPagina).subscribe({
      next: (resultado) => {
        this.lista = resultado.content;
        this.totalPaginas = resultado.totalPages;
        this.paginaAtual = 0;
      },
      error: () => {
        alert('Erro ao Buscar Livro.');
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