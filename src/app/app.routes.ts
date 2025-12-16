import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AddLivroComponent } from './pages/add-livro/add-livro.component';
import { LivroComponent } from './pages/livro/livro.component';
import { LoginComponent } from './pages/login/login.component';
import { EmprestimoComponent } from './pages/emprestimo/emprestimo.component';
import { AddEmprestimoComponent } from './pages/add-emprestimo/add-emprestimo.component';
import { EstudanteComponent } from './pages/estudante/estudante.component';
import { AddEstudanteComponent } from './pages/add-estudante/add-estudante.component';
import { PetianoComponent } from './pages/petiano/petiano.component';
import { AddPetianoComponent } from './pages/add-petiano/add-petiano.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'livros', component: LivroComponent},
    { path: 'add-livro', component: AddLivroComponent},
    { path: 'add-livro/:id', component: AddLivroComponent},
    { path: '', component: LoginComponent},
    { path: 'emprestimos', component: EmprestimoComponent},
    { path: 'add-emprestimo', component: AddEmprestimoComponent},
    { path: 'add-emprestimo/:id', component: AddEmprestimoComponent},
    { path: 'estudantes', component: EstudanteComponent},
    { path: 'add-estudante', component: AddEstudanteComponent},
    { path: 'add-estudante/:id', component: AddEstudanteComponent},
    { path: 'petianos', component: PetianoComponent},
    { path: 'add-petiano', component: AddPetianoComponent},
    { path: 'add-petiano/:id', component: AddEstudanteComponent}
];
