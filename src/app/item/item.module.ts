import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TableModule } from 'primeng/table';
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ConfirmPopupModule } from 'primeng/confirmpopup';



@NgModule({
    declarations: [
      
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      FormsModule,
      ButtonModule,
      TableModule,
      ConfirmPopupModule,
    ],
  })
  export class ItemModule { }