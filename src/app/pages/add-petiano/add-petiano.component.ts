import { Component } from '@angular/core';
import { FormBuilder , FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetianoService } from '../../services/petiano.service';
import { Petiano } from '../../models/petiano';
import { Imagem } from '../../models/imagem';
import { ImagemService } from '../../services/imagem.service';
import { Estudante } from '../../models/estudante';
import { EstudanteService } from '../../services/estudante.service';

// import { NgxMaskDirective } from 'ngx-mask';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-petiano',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-petiano.component.html',
  styleUrl: './add-petiano.component.css'
})
export class AddPetianoComponent {

     formGroup: FormGroup;
     mensagemErroLogin: string;
     petiano!: Petiano;

     listaEstudantes: Estudante[] = [];

     imagemSelecionada: File | null = null;
     imagemPetiano: string | ArrayBuffer | null = null;
    
      constructor(private formBuilder: FormBuilder, private petianoService: PetianoService, private estudanteService: EstudanteService,  private route: ActivatedRoute, private router: Router, private imagemService: ImagemService){
        
        this.formGroup = this.formBuilder.group({
    
          id: [null], // Campo Opcional
          dataEntrada: ['', Validators.required],
          estudante: ['', Validators.required],
          curso: ['', Validators.required],
          tipo: ['', Validators.required],
          login: ['', Validators.required],
          senha: ['', Validators.required],
          nivelAcesso: ['', Validators.required]
          
        });

          this.mensagemErroLogin = "";
      }
    
      ngOnInit():void {
       this.carregarListaEstudante();
      }
    
      onSubmit():void {
       if (this.formGroup.valid) {
      if (this.imagemSelecionada) {
        this.imagemService.upload(this.imagemSelecionada).subscribe({
          next: (imagem) => {
             // salva os dados do usuário com a imagem incluída
            this.salvarPetiano(imagem);
          },
          error: () => {
            alert('Erro ao enviar a imagem.');
          }
        });
      } else {
        this.salvarPetiano(); // salva sem imagem
      }
    }
  }

salvarPetiano(imagem?: Imagem): void {
  let petiano = new Petiano();

  petiano.dataEntrada = this.formGroup.get('dataEntrada')?.value;
  petiano.estudante = this.formGroup.get('estudante')?.value;
  petiano.tipo = this.formGroup.get('tipo')?.value;
  petiano.login = this.formGroup.get('login')?.value;
  petiano.senha = this.formGroup.get('senha')?.value;
  petiano.nivelAcesso = this.formGroup.get('nivelAcesso')?.value;
  petiano.urlImagem = imagem?.urlImagem;

  this.petianoService.salvar(petiano).subscribe({
    next: () => {
      alert('Registro salvo com sucesso!');
      this.formGroup.reset();
      this.imagemPetiano = null;
      this.imagemSelecionada = null;
      this.router.navigate(['/petianos']);
    },
    error: () => {
      alert('Erro ao salvar o registro. Tente novamente.');
    }
  });
}



   verificarLogin() {
    const login = this.formGroup.get('login')?.value;
    this.mensagemErroLogin = "";

    this.petianoService.verificarLogin(login).subscribe({
      next: (existe: boolean) => {
        if (existe) {
          this.mensagemErroLogin = "Login já cadastrado.";
          this.formGroup.get('login')?.setErrors({ loginDuplicado: true });
        } else {
          this.mensagemErroLogin = "";
          // Limpa o erro de loginDuplicado, se existir
          this.formGroup.get('login')?.setErrors(null);
        }
      },
      error: err => {
        this.mensagemErroLogin = "Erro ao validar o login";
      }
    });
  }

  abrirInputImagem(): void {
    const inputImagem = document.getElementById('inputImagem') as HTMLInputElement;
    inputImagem.click();
  }

  carregarImagem(event: any): void {
    const arquivoSelecionado = event.target.files[0];

    if (arquivoSelecionado) {
      
      this.imagemSelecionada = arquivoSelecionado;

      const leitor = new FileReader();

      leitor.onload = () => {
        this.imagemPetiano = leitor.result;
      };

      leitor.readAsDataURL(arquivoSelecionado);
    }
  }

   carregarListaEstudante(): void {
    this.estudanteService.listar().subscribe({
      next: (retorno) => {
        this.listaEstudantes = retorno;
      },
      error: () => {
        alert('Erro ao carregar a lista de estudantes.');
      }
    });
  }


}
