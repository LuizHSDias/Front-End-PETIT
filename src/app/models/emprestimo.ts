import { Livro } from "./livro";
import { Petiano } from "./petiano";
import { Estudante } from "./estudante";
import { StatusEmprestimo } from "./status-emprestimo";

export class Emprestimo {
    id!: number;
    livro?: Livro;
    petiano?: Petiano;
    estudante?: Estudante;
    dataEmprestimo?: Date;
    prazoMaximo?: Date;
    dataDevolucao?: Date;
    status?: StatusEmprestimo;
    observacoes?: string; 
    multa?: number;
}