import { TestBed } from '@angular/core/testing';

import { ListaMovimentacoesServico } from './lista-movimentacoes-servico';

describe('ListaMovimentacoesServico', () => {
  let service: ListaMovimentacoesServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaMovimentacoesServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
