export class Estudante {
    id!: number;
    nome?: string;
    email?: string;
    curso?: string;
    matricula?: string;

    ativo?: boolean; // 🔹 indica se o estudante está ativo (soft delete)
    quantidadeEmprestimosAtivos?: number; // 🔹 evita exclusão se tiver empréstimos pendentes
}