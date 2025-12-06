import { Injectable } from '@angular/core';
import { Movimentacao } from './cadastro-movimentacoes-servico';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListaMovimentacoesServico {

  private http = inject(HttpClient);
  private base = `http://localhost:3000/movimentacoes`;

  listar(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(this.base);
  }

  buscarPorId(id: string): Observable<Movimentacao> {
    return this.http.get<Movimentacao>(`${this.base}/${id}`);
  }

  atualizar(id: string, movimentacao: Partial<Movimentacao>): Observable<Movimentacao> {
    return this.http.patch<Movimentacao>(`${this.base}/${id}`, movimentacao);
  }
  excluir(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }

}
