import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudanteService } from '../../services/estudante.service';
import { Estudante } from '../../models/estudante';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './estudante.component.html',
  styleUrl: './estudante.component.css'
})
export class EstudanteComponent {
  lista: Estudante[] = [];
  mensagemDados = false;
  filtroNome: string = '';
  totalAtivos: number = 0;

  // Paginação
  paginaAtual = 0;
  tamanhoPagina = 5;
  totalPaginas = 0;

  constructor(private service: EstudanteService, private router: Router) {}

  ngOnInit(): void {
    this.carregarLista();
    this.contarAtivos();
  }

  // 🔹 Listar estudantes (paginado)
  carregarLista(): void {
    this.mensagemDados = true;
    this.service.listarPaginado(this.paginaAtual, this.tamanhoPagina).subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson.content;
        this.totalPaginas = retornoJson.totalPages;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      },
      complete: () => {
        this.mensagemDados = false;
      }
    });
  }

  // 🔹 Buscar por nome
  buscarPorNome(): void {
    if (this.filtroNome.trim() === '') {
      this.carregarLista();
      return;
    }

    this.service.buscarPorNome(this.filtroNome, 0, this.tamanhoPagina).subscribe({
      next: (resultado) => {
        this.lista = resultado.content;
        this.totalPaginas = resultado.totalPages;
        this.paginaAtual = 0;
      },
      error: () => {
        alert('Erro ao buscar estudante.');
      }
    });
  }

  // 🔹 Contar estudantes ativos
  contarAtivos(): void {
    this.service.contarAtivos().subscribe({
      next: (qtd) => (this.totalAtivos = qtd),
      error: () => (this.totalAtivos = 0)
    });
  }

  // 🔹 Excluir (soft delete)
  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir o registro?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          alert('Estudante excluído com sucesso!');
          this.carregarLista();
          this.contarAtivos();
        },
        error: () => {
          alert('Erro ao excluir o registro. Tente novamente.');
        }
      });
    }
  }

  // 🔹 Navegar para o formulário de edição
  editar(id: number): void {
    this.router.navigate(['/add-estudante', id]);
  }

  // 🔹 Paginação: próxima e anterior
  proximaPagina(): void {
    if (this.paginaAtual + 1 < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarLista();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarLista();
    }
  }
}
