import { Component } from '@angular/core';
import { FormBuilder , FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';

// import { NgxMaskDirective } from 'ngx-mask';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-livro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-livro.component.html',
  styleUrl: './add-livro.component.css'
})
export class AddLivroComponent {
  
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private livroService: LivroService, private route: ActivatedRoute, private router: Router){
    
    this.formGroup = this.formBuilder.group({

      id: [null], // Campo Opcional
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editora: ['', Validators.required],
      ano: ['', Validators.required],
      isbn: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.livroService.buscarPorId(id).subscribe(livro => {
        this.formGroup.patchValue(livro);
      });
    }
  }

  onSubmit():void {

    const livro = this.formGroup.value;
console.log('Livro enviado:', livro);
console.log('Genero:', `"${livro.genero}"`);

    if(this.formGroup.valid){
      this.livroService.salvar(this.formGroup.value).subscribe(() => {
        alert('Livro cadastrado com sucesso!');
        this.formGroup.reset();
        this.router.navigate(['/livros']);
      });
    }
  }
}