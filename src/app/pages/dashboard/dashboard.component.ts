import { Component, OnInit } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  CurrencyPipe
} from '@angular/common';

import { RouterModule } from '@angular/router';

import { forkJoin } from 'rxjs';

import { NgChartsModule } from 'ng2-charts';

import {
  ChartData,
  ChartType
} from 'chart.js';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Estudante } from '../../models/estudante';
import { Emprestimo } from '../../models/emprestimo';
import { StatusEmprestimo } from '../../models/status-emprestimo';
import { Livro } from '../../models/livro';

import { EstudanteService } from '../../services/estudante.service';
import { EmprestimoService } from '../../services/emprestimo.service';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    CurrencyPipe,
    NgChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  estudantes: Estudante[] = [];

  emprestimos: Emprestimo[] = [];

  emprestimosOriginais: Emprestimo[] = [];

  livros: Livro[] = [];

  totalEstudantes = 0;
  totalLivros = 0;
  totalEmprestimos = 0;
  totalAtivos = 0;
  totalDevolvidos = 0;
  totalAtrasados = 0;
  totalMultas = 0;

  // 📊 Pizza
  pieChartType: ChartType = 'pie';

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Ativos', 'Devolvidos', 'Atrasados'],
    datasets: [
      {
        label: 'Status dos Empréstimos',
        data: [0, 0, 0],
        backgroundColor: [
          '#22c55e',
          '#3b82f6',
          '#ef4444'
        ]
      }
    ]
  };

  // 📈 Barra
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        label: 'Empréstimos por mês',
        data: [],
        backgroundColor: '#60a5fa'
      }
    ]
  };

  constructor(
    private estudanteService: EstudanteService,
    private emprestimoService: EmprestimoService,
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {

    forkJoin({

      estudantes:
        this.estudanteService.contarAtivos(),

      livros:
        this.livroService.listar(),

      emprestimos:
        this.emprestimoService.listar()

    }).subscribe({

      next: ({
        estudantes,
        livros,
        emprestimos
      }) => {

        this.totalEstudantes = estudantes;

        this.livros = livros;

        this.totalLivros = livros.length;

        this.emprestimosOriginais =
          emprestimos;

        this.emprestimos =
          emprestimos;

        this.calcularMetricas();

      },

      error: (err) => {

        console.error(
          'Erro ao carregar dashboard:',
          err
        );

      }

    });

  }

  calcularMetricas() {

    this.totalEmprestimos =
      this.emprestimos.length;

    this.totalAtivos =
      this.emprestimos.filter(
        e => e.status === StatusEmprestimo.ATIVO
      ).length;

    this.totalDevolvidos =
      this.emprestimos.filter(
        e => e.status === StatusEmprestimo.DEVOLVIDO
      ).length;

    this.totalAtrasados =
      this.emprestimos.filter(
        e => e.status === StatusEmprestimo.ATRASADO
      ).length;

    this.totalMultas =
      this.emprestimos
        .map(e => e.multa ?? 0)
        .reduce((t, v) => t + v, 0);

    // 📊 Atualiza gráfico pizza
    this.pieChartData = {

      labels: [
        'Ativos',
        'Devolvidos',
        'Atrasados'
      ],

      datasets: [
        {
          label: 'Status dos Empréstimos',

          data: [
            this.totalAtivos,
            this.totalDevolvidos,
            this.totalAtrasados
          ],

          backgroundColor: [
            '#22c55e',
            '#3b82f6',
            '#ef4444'
          ]
        }
      ]
    };

    this.gerarGraficoPorMes();

  }

  gerarGraficoPorMes() {

    const mapa: {
      [mes: string]: number
    } = {};

    const ordemMeses = [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez'
    ];

    this.emprestimos.forEach(e => {

      if (e.dataEmprestimo) {

        const data =
          new Date(e.dataEmprestimo);

        const mes =
          data
            .toLocaleString(
              'pt-BR',
              { month: 'short' }
            )
            .replace('.', '');

        mapa[mes] =
          (mapa[mes] || 0) + 1;

      }

    });

    const labelsOrdenados =
      ordemMeses.filter(m => mapa[m]);

    this.barChartData = {

      labels: labelsOrdenados,

      datasets: [
        {
          label: 'Empréstimos por mês',

          data:
            labelsOrdenados.map(
              m => mapa[m]
            ),

          backgroundColor: '#60a5fa'
        }
      ]

    };

  }

  // 📅 FILTRO
  onPeriodoChange(event: Event) {

    const valor =
      (event.target as HTMLSelectElement).value;

    if (valor === 'todos') {

      this.emprestimos =
        this.emprestimosOriginais;

      this.calcularMetricas();

      return;
    }

    const dias = Number(valor);

    const hoje = new Date();

    const dataLimite = new Date();

    dataLimite.setDate(
      hoje.getDate() - dias
    );

    this.emprestimos =
      this.emprestimosOriginais.filter(e => {

        if (!e.dataEmprestimo) {
          return false;
        }

        const dataEmprestimo =
          new Date(e.dataEmprestimo);

        return dataEmprestimo >= dataLimite;

      });

    this.calcularMetricas();

  }

  // 📄 EXPORTAR PDF
  exportarPDF() {

    const DATA =
      document.getElementById(
        'dashboardPDF'
      );

    if (!DATA) return;

    html2canvas(DATA, {

      backgroundColor: '#0f172a',

      scale: 2

    }).then(canvas => {

      const imgWidth = 210;

      const pageHeight = 295;

      const imgHeight =
        canvas.height * imgWidth /
        canvas.width;

      let heightLeft =
        imgHeight;

      const contentDataURL =
        canvas.toDataURL('image/png');

      const pdf = new jsPDF(
        'p',
        'mm',
        'a4'
      );

      let position = 0;

      pdf.addImage(
        contentDataURL,
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;

      while (heightLeft >= 0) {

        position =
          heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          contentDataURL,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;

      }

      pdf.save(
        'dashboard-petit.pdf'
      );

    });

  }

}