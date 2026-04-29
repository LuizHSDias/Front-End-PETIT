import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstudanteService } from '../../services/estudante.service';
import { Estudante } from '../../models/estudante';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-estudante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-estudante.component.html',
  styleUrl: './add-estudante.component.css'
})
export class AddEstudanteComponent {

  formGroup: FormGroup;
  estudante!: Estudante;

  constructor(
    private formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      curso: ['', Validators.required],
      matricula: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.estudanteService.buscarPorId(id).subscribe({
        next: (estudante) => this.formGroup.patchValue(estudante),
        error: () => alert('Erro ao carregar estudante.')
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const estudante = this.formGroup.value;
      const mensagem = estudante.id ? 'Estudante atualizado com sucesso!' : 'Estudante cadastrado com sucesso!';

      this.estudanteService.salvar(estudante).subscribe({
        next: () => {
          alert(mensagem);
          this.router.navigate(['/estudantes']);
        },
        error: (erro) => {
          console.error(erro);

          if(erro.status === 400){
            alert('Erro de validação: verifique os campos obrigatórios.');
          } else {
            alert('Erro ao salvar estudante');
          }
        }
      });
    }
  }
}
