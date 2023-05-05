import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item-service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {

  public listaItem: Item[] = [];
    public display: boolean = false;
    public dto!: Item;
    public exibir: boolean = false;
    displayModal!: boolean;
    public celular: boolean = false;
  public pc: boolean = true;

    constructor(
        private router: Router,
        private service: ItemService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
    ) { }

    ngOnInit() {
        this.dto = new Item();
        this.listarItemCafeManha();
        this.iniciarBack();
        this.teste();
    }

    voltar() {
        this.router.navigate(['/cadastro']);
    }

    pesquisar() {
        this.service.pesquisar(this.dto.nome).subscribe(retorno => {
            this.listaItem = retorno;
            this.exibir = true;
        }, (erro: HttpErrorResponse) => {
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
        });

    }

    excluir(id: number) {
        this.service.excluir(id).subscribe(retorno => {
            this.messageService.add({ severity: 'info', summary: 'Excluído', detail: 'com sucesso' });
            this.listarItemCafeManha();
        }, (erro: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir item' });
        });
    }

    confirmar(id: number, event: MouseEvent) {
      const target = event.target as unknown;
      console.log("foi");
      if (target instanceof EventTarget) {
          this.confirmationService.confirm({
              target: target,
              acceptLabel: 'Sim',
              rejectLabel: 'Não',
              message: 'Confirma a exclusão do item?',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.excluir(id);
              },
              reject: () => {
              }
          });
      }
  }
  
  

    limpar() {
        this.listaItem = [];
        this.dto = new Item();
        this.exibir = false;
    }

    listarItemCafeManha() {
        this.service.visualizarListaCompleta().subscribe(retorno => {
          this.listaItem = retorno;
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
        });
      }

    openNovo() {
        this.router.navigate(['/itens/cadastro']);
    }

    openEditar(id: number) {
        this.router.navigate(['/itens/cadastro', { id: id }]);
    }

    iniciarBack() {
        this.service.iniciarBack().subscribe(retorno => {
        }, () => {
        });
      }
   
      teste() {
        var largura = screen.width;
    
        if (largura <= 767 ) {
          this.celular = true
          this.pc = false
          console.log('celular');
          
        } else { 
          this.celular = false
          this.pc = true
          console.log('pc');}
        
      }
}


