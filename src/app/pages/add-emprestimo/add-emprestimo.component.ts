import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';
import { PetianoService } from '../../services/petiano.service';
import { Petiano } from '../../models/petiano';
import { EstudanteService } from '../../services/estudante.service';
import { Estudante } from '../../models/estudante';
import { NgxMaskDirective } from 'ngx-mask';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-emprestimo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './add-emprestimo.component.html',
  styleUrl: './add-emprestimo.component.css'
})

export class AddEmprestimoComponent {

  formGroup: FormGroup;
  listaLivros: Livro[] = [];
  listaPetianos: Petiano[] = [];
  listaEstudantes: Estudante[] = [];
  emprestimo!: Emprestimo; 

  constructor(private formBuilder: FormBuilder, private emprestimoService: EmprestimoService, private route: ActivatedRoute, private router: Router, private livroService: LivroService, private petianoService: PetianoService, private estudanteService: EstudanteService) {
    this.formGroup = this.formBuilder.group({
      id: [null], 
      livro: [null, Validators.required],
      petiano: [null, Validators.required],
      estudante: [null, Validators.required],
      dataEmprestimo: [null, Validators.required],
      prazoMaximo: [null, Validators.required],
      dataDevolucao: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    this.carregarListaLivro();
    this.carregarListaPetiano();
    this.carregarListaEstudante();

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.emprestimo = new Emprestimo();

    if(id){
      this.emprestimoService.buscarPorId(id).subscribe(retorno => {
        this.emprestimo = retorno; 
        let livroSelecionado = this.listaLivros.find(temp => temp.id === retorno.livro!.id);
        let petianoSelecionado = this.listaPetianos.find(temp => temp.id === retorno.petiano!.id);
        let estudanteSelecionado = this.listaEstudantes.find(temp => temp.id === retorno.estudante!.id);

        this.formGroup.patchValue({
          livro: livroSelecionado,
          petiano: petianoSelecionado,
          estudante: estudanteSelecionado,
          dataEmprestimo: this.emprestimo.dataEmprestimo,
          prazoMaximo: this.emprestimo.prazoMaximo,
          dataDevolucao: this.emprestimo.dataDevolucao
        });
      });
    }
  }

  onSubmit(): void {
    if(this.formGroup.valid){
      this.emprestimo.livro = this.formGroup.value.livro;
      this.emprestimo.petiano = this.formGroup.value.petiano;
      this.emprestimo.estudante = this.formGroup.value.estudante;
      this.emprestimo.dataEmprestimo = this.formGroup.value.dataEmprestimo;
      this.emprestimo.prazoMaximo = this.formGroup.value.prazoMaximo;
      this.emprestimo.dataDevolucao = this.formGroup.value.dataDevolucao;
      this.emprestimoService.salvar(this.emprestimo).subscribe({
        next: () => {
          alert('Emprestimo salvo com sucesso!!');
          this.formGroup.reset();
          this.router.navigate(['/emprestimos']);
        },
        error: () => {
          alert('Erro ao salvar o emprestimo. Tente novamente. ')
        }
      });
    }
  }

  carregarListaLivro(): void {
    this.livroService.listar().subscribe({
      next: (retorno) => {
        this.listaLivros = retorno;
      },
      error: () => {
        alert('Erro ao carregar a lista de Livros.');
      }
    });
  }

  carregarListaPetiano(): void {
    this.petianoService.listar().subscribe({
      next: (retorno) => {
        this.listaPetianos = retorno;
      },
      error: () => {
        alert('Erro ao carregar a lista de Petianos.');
      }
    });
  }

  carregarListaEstudante(): void {
    this.estudanteService.listar().subscribe({
      next: (retorno) => {
        this.listaEstudantes = retorno;
      },
      error: () => {
        alert('Erro ao carregar a lista de Estudantes.');
      }
    });
  }
}