import { Imagem } from "./imagem";
import { Estudante } from "./estudante";

export class Petiano {
    id!: number;
    "dataEntrada"?: string;
    "estudante"?: Estudante;
    "tipo"?: string;
    "login"?: string;
    "senha"?: string;
    "nivelAcesso"?: string;
    "urlImagem"?: string;
}