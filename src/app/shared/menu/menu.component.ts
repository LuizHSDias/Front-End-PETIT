import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menu = [
    { descricao: 'Dashboards', rota: '/dashboards', niveis: ['ADMIN, PETIT']},
    { descricao: 'Emprestimos', rota: '/emprestimos', niveis:['ADMIN, PETIT'] },
    { descricao: 'Livros', rota: '/livros', niveis:['ADMIN, PETIT'] },
    { descricao: 'Estudantes', rota: '/estudantes', niveis:['ADMIN, PETIT'] },
    { descricao: 'Petianos', rota: '/petianos', niveis:['ADMIN, PETIT'] },
  ];

  private subscription!: Subscription;
  menuPetiano: {descricao: string, rota: string, niveis: string[] }[] = [];
  nivelPetiano!: string;
  nomePetiano!: string;

  constructor(private loginService: LoginService, private router: Router){
    this.nivelPetiano = '';
    this.nomePetiano = '';
    this.menuPetiano = [];
  }

  ngOnInit(): void{
    // Faz a inscrição para observar os eventos do objeto router e atualiza o menu somente após a conclusão da navegação (NavigationEnd)
    this.subscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.atualizarMenu();
      }
    });
    this.atualizarMenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private atualizarMenu(): void {
    const dadosToken = this.loginService.extrairDadosToken();

    if (dadosToken && dadosToken.roles) {
      // Remove "ROLE_" do início do papel do usuário
      this.nivelPetiano = dadosToken.roles.replace(/^ROLE_/, '');
      this.nomePetiano = dadosToken.sub;
      // Filtra o menu para montar menuUsuario com os itens permitidos
      this.menuPetiano = this.menu.filter(item => item.niveis.includes(this.nivelPetiano));
    } else {
      this.nivelPetiano = '';
      this.nomePetiano = '';
      this.menuPetiano = [];
    }
  }

  sair(): void {
    this.loginService.limparToken();
    this.atualizarMenu();
  }
}