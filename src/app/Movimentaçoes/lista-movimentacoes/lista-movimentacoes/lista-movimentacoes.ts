import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Categoria, CategoriaServico } from '../../..//Servico/Categorias/categoria-servico';
import { ListaMovimentacoesServico } from '../../..//Servico/Movimentacoes/lista-movimentacoes-servico';
import { Movimentacao } from '../../..//Servico/Movimentacoes/cadastro-movimentacoes-servico';

@Component({
  selector: 'app-lista-movimentacoes',
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-movimentacoes.html',
  styleUrl: './lista-movimentacoes.css',
})
export class ListaMovimentacoes {
  excluir(arg0: string | undefined) {
    throw new Error('Method not implemented.');
  }
  getCor(arg0: string) {
    throw new Error('Method not implemented.');
  }
  saldoTotal() {
    throw new Error('Method not implemented.');
  }

  private movimentacaoApi = inject(ListaMovimentacoesServico);
  private categoriaApi = inject(CategoriaServico);

  categorias: Categoria[] = [];
  movimentacoes: Movimentacao[] = [];

  carregando = false;
  erro = '';
  filtroCategoria: string = '';


  ngOnInit() {
    this.buscarMovimentacoes();
    this.buscarCategorias();
  }

  buscarMovimentacoes() {
    this.carregando = true;

    this.movimentacaoApi.listar().subscribe({
      next: lista => {
        this.movimentacoes = lista;
        this.carregando = false;
      },
      error: erro => {
        this.erro = erro.message ?? 'Falha ao carregar movimentações';
        this.carregando = false;
      }
    });
  }

  buscarCategorias() {
    this.categoriaApi.listarCat().subscribe({
      next: lista => this.categorias = lista,
      error: erro => console.error('Erro ao carregar categorias:', erro)
    });
  }

  removerMovimentacao(id?: string) {
    if (!id) return;

    this.movimentacaoApi.excluir(id).subscribe({
      next: () => {
        this.movimentacoes = this.movimentacoes.filter(m => m._id !== id);
      },
      error: erro => this.erro = erro.message ?? 'Falha ao recmover movimentação'
    });
  }

  get movimentacoesFiltradas() {
    if (!this.filtroCategoria) {
      return this.movimentacoes;
    }
    return this.movimentacoes.filter(m => m.categoriaId === this.filtroCategoria);
  }

  getCorCategoria(categoriaId: string): string {
    const categoria = this.categorias.find(c => c._id === categoriaId);
    return categoria ? categoria.cor : 'transparent';
  }

  getNomeCategoria(categoriaId: string): string {
    const categoria = this.categorias.find(c => c._id === categoriaId);
    return categoria ? categoria.nome : '';
  }

  calcularSaldoTotal(): number {
    let total = 0;

    for (const mov of this.movimentacoesFiltradas) {
      if (mov.Tipo === 'ENTRADA') {
        total += mov.valor;
      } else if (mov.Tipo === 'SAIDA') {
        total -= mov.valor;
      }
    }

    return total;
  }
}

