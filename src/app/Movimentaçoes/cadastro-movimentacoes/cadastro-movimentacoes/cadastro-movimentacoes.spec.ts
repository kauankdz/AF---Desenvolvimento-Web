import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMovimentacoes } from './cadastro-movimentacoes';

describe('CadastroMovimentacoes', () => {
  let component: CadastroMovimentacoes;
  let fixture: ComponentFixture<CadastroMovimentacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroMovimentacoes]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastroMovimentacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
