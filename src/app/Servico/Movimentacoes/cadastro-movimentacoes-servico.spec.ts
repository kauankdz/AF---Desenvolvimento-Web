import { TestBed } from '@angular/core/testing';

import { CadastroMovimentacoesServico } from './cadastro-movimentacoes-servico';

describe('CadastroMovimentacoesServico', () => {
  let service: CadastroMovimentacoesServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroMovimentacoesServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
