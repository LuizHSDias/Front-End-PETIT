import { Livro } from "./livro";
import { Petiano } from "./petiano";
import { Estudante } from "./estudante";

export class Emprestimo {
    id!: number;
    livro?: Livro;
    petiano?: Petiano;
    estudante?: Estudante;
    dataEmprestimo?: Date;
    prazoMaximo?: Date;
    dataDevolucao?: Date;
}