import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CadastroMovimentacoesServico, Movimentacao } from '../../..//Servico/Movimentacoes/cadastro-movimentacoes-servico';

import { Categoria, CategoriaServico } from '../../..//Servico/Categorias/categoria-servico';

import { Tipo } from '../../..//Tipo/tipo_temp';

@Component({
  selector: 'app-cadastro-movimentacoes',
  imports: [FormsModule, CommonModule,],
  templateUrl: './cadastro-movimentacoes.html',
  styleUrl: './cadastro-movimentacoes.css',
})
export class CadastroMovimentacoes {

  private apiMov = inject(CadastroMovimentacoesServico);
  private apiCat = inject(CategoriaServico);

  categorias: Categoria[] = [];

  carregando = false;
  salvando = false;
  erro = '';

  categoriaId: string | null = null;
  valor: number | null = null;
  descricao = '';
  Tipo: Tipo | null = null;


  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.carregando = true;

    this.apiCat.listarCat().subscribe({
      next: lista => {
        this.categorias = lista;
        this.carregando = false;
      },
      error: err => {

        this.erro = err.message ?? 'Erro ao carregar categorias.';
        this.carregando = false;
      }
    });
  }

  salvarMovimentacao() {

    if (!this.categoriaId || !this.Tipo || this.valor == null) return;

    const mov: Movimentacao = {
      categoriaId: this.categoriaId,
      valor: this.valor,
      descricao: this.descricao,
      Tipo: this.Tipo
    };

    this.salvando = true;

    this.apiMov.criar(mov).subscribe({
      next: () => {

        this.limparFormulario();
        this.salvando = false;
      },
      error: err => {
        this.erro = err.message ?? 'Erro ao salvar movimentação.';
        this.salvando = false;
      }
    });
  }

  limparFormulario() {
    this.categoriaId = null;
    this.valor = null;
    this.descricao = '';
    this.Tipo = null;
  }

}
