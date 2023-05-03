import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item-service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  
  public dto: Item = new Item();
  public edicao: boolean = false;
  public medidas: any ;
  public medida: any ;


  constructor(
    private messageService: MessageService,
    private router: Router,
    private service: ItemService,
    private activatedRoute: ActivatedRoute,

  ) {
    
}


  ngOnInit(): void {
    this.recuperarInfRota();
    this.medidas = [
      {name: 'Kg', code: 'Kg'},
      {name: 'Gramas', code: 'G'},
  ];
  }

  validarForm() {
    if (!this.dto.nome) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Nome não preenchido.' });
      return false;
    }
    if (!this.dto.quantidade) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Quantidade não preenchido.' });
      return false;
    }
    if (!this.dto.valor) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Valor não preenchido.' });
      return false;
    }

    return true;
  }

  salvar() {
    if (!this.validarForm()) {
      return;
    }
    console.log(this.dto);
    console.log(this.medidas);
    this.dto.medida = this.medida.code;
    
    this.service.salvar(this.dto).subscribe(retorno => {
      this.dto = retorno;
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: ' Item salvo com sucesso' });
      this.limpar();
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });
  }

  limpar() {
    if (this.edicao) {
      this.consultarPorId(this.dto.id);
    } else {
      this.dto = new Item();
    }

  }

  consultarPorId(id: number) {
    this.service.consultarPorId(id).subscribe(retorno => {
      this.dto = retorno;
      console.log(this.dto)
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
    });
  }


  alterar() {
    if (!this.validarForm()) {
      return;
    }
    this.service.alterar(this.dto).subscribe(retorno => {
      this.consultarPorId(retorno.id)
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'Participante alterado com sucesso' })
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });


  }

  save() {
    return this.edicao ? this.alterar() : this.salvar();
  }

  voltar() {
    this.router.navigate(['/itens/listagem']);
  }

  recuperarInfRota() {
    this.edicao = false;

    this.activatedRoute.params.subscribe(params => {
      if (!!params['id']) {
        this.consultarPorId(params['id']);
        this.edicao = true;
      }
    });
  }

  iniciarBack() {
    this.service.iniciarBack().subscribe(retorno => {
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao iniciar o BackEnd' });
    });
  }


}
  


