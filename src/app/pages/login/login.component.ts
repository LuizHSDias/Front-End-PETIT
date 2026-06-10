import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Token } from '../../models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formGroup: FormGroup;
  token: Token;
  mensagemDados = false;

  // 👁️ Mostrar/Ocultar senha
  mostrarSenha = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {

    this.formGroup = this.formBuilder.group({
      login: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        ]
      ],
      senha: ['', Validators.required]
    });

    this.token = new Token();
  }

  ngOnInit(): void {
    this.loginService.limparToken();
  }

  formatarCpf(event: Event): void {

    const input = event.target as HTMLInputElement;

    let valor = input.value.replace(/\D/g, '');

    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    valor = valor.replace(
      /^(\d{3})(\d)/,
      '$1.$2'
    );

    valor = valor.replace(
      /^(\d{3})\.(\d{3})(\d)/,
      '$1.$2.$3'
    );

    valor = valor.replace(
      /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
      '$1.$2.$3-$4'
    );

    input.value = valor;

    this.formGroup.patchValue(
      {
        login: valor
      },
      {
        emitEvent: false
      }
    );
  }

  onSubmit(): void {

    if (this.formGroup.valid) {

      this.mensagemDados = true;

      const formValue = this.formGroup.value;

      this.loginService
        .autenticar(
          formValue.login,
          formValue.senha
        )
        .subscribe({

          next: (resposta) => {

            this.token = resposta;

            this.loginService.salvarToken(
              this.token.accessToken
            );

            this.router.navigate(['/home']);
          },

          error: () => {

            this.mensagemDados = false;

            alert('Login ou senha inválidos.');
          },

          complete: () => {

            this.mensagemDados = false;
          }
        });
    }
  }
}