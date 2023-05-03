import { Component } from '@angular/core';
import { Router } from 'express';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Venda } from '../model/venda';
import { VendaService } from '../services/venda-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public listaVenda: Venda[] = [];
  public display: boolean = false;
  public dto!: Venda;
  public exibir: boolean = false;
  displayModal!: boolean;
  public celular: boolean = false;


  constructor(
    private service: VendaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,

  ) { }

  ngOnInit() {
    this.listarVendas();
    this.teste();
    this.iniciarBack();
  }

  listarVendas() {
    this.service.visualizarListaCompleta().subscribe(retorno => {
      retorno.forEach(element => {
        console.log(element);

        if (element.vendido == 0) {
          element.vendido = 0;
        }
        if (element.naoVendido === 0 || element.naoVendido === null) {
          element.vendido = 0;
        }
      })
      this.listaVenda = retorno;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
    });
  }
  iniciarBack() {
    this.service.iniciarBack().subscribe(retorno => {
    }, () => {
    });
  }
  teste() {
    var largura = screen.width;

    if (largura <= 767 ) {
      this.celular === true
    }
  }


}
