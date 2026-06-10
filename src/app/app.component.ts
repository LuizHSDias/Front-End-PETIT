import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'petit-app';

  constructor(private router: Router) {}

  mostrarMenu(): boolean {

    const paginasSemMenu = [
      '/login',
      '/home'
    ];

    return !paginasSemMenu.includes(this.router.url);
  }

}