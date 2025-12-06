import { Routes } from '@angular/router';
import { ListaMovimentacoes } from './Movimentaçoes/lista-movimentacoes/lista-movimentacoes/lista-movimentacoes';
import { CadastroMovimentacoes } from './Movimentaçoes/cadastro-movimentacoes/cadastro-movimentacoes/cadastro-movimentacoes';

export const routes: Routes = [

    { path: 'cadastro-movimentacoes', component: CadastroMovimentacoes },
    { path: 'lista-movimentacoes', component: ListaMovimentacoes },

];
