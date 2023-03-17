import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  items!: MegaMenuItem[];

  constructor( ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home', icon: 'pi pi-fw pi-home',
        items: [
          [
            {
              items: [{ label: 'Home', url: '/#/' }]
            },
          ]
        ]
      },
      {
        label: 'Itens', icon: 'pi pi-fw pi-plus',
        items: [
          [
            {
              items: [ { label: 'Pesquisar', url: '/#/itens/listagem' },{ label: 'Cadastrar', url: '/#/itens/cadastro' }]
            },
          ],
        ]
      }
    ]
  }
}
