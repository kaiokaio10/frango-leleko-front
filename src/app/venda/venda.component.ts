import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Venda } from '../model/venda';
import { VendaService } from '../services/venda-service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent {

  public dto: Venda = new Venda();
  public edicao: boolean = false;
  public medidas: any ;
  public medida: any ;


  constructor(
    private messageService: MessageService,
    private router: Router,
    private service: VendaService,

  ) {
    
}


  ngOnInit(): void {
  }

  validarForm() {
    if (!this.dto.quantidade) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Quantidade não preenchido.' });
      return false;
    }
    if (!this.dto.valor) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Valor não preenchido.' });
      return false;
    }
    if (!this.dto.vendido) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Quantidade de Frangos vendidos não preenchido.' });
      return false;
    }
    if (!this.dto.naoVendido) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Quantidade de Frangos não vendidos não preenchido.' });
      return false;
    }

    return true;
  }

  salvar() {
    if (!this.validarForm()) {
      return;
    }
    
    this.service.salvar(this.dto).subscribe(retorno => {
      this.dto = retorno;
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: ' Relatório de vendas salvo com sucesso' });
      this.limpar();
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });
  }

  limpar() {
    if (this.edicao) {
    } else {
      this.dto = new Venda();
    }

  }


  save() {
    return this.salvar();
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  iniciarBack() {
    this.service.iniciarBack().subscribe(retorno => {
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao iniciar o BackEnd' });
    });
  }

}
