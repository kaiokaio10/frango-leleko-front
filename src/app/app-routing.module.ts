import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
      path: 'itens',
      loadChildren: () => import('./item/item-routing.module').then(m => m.ItemRoutingModule),
    }
  
  
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }