import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../model/item";

@Injectable({ providedIn: 'root' })

export class ItemService {

    apiURL: string = 'http://localhost:8080'
    path: string ='/api/item'
    constructor(
        private http: HttpClient
    ) { }

    enviar(dto: Item): Promise<any> {
        return this.http.post(this.apiURL, dto)
            .toPromise()
            .then(Response => console.log(Response));

    }

    alterar(dto: Item): Observable<Item> {
        return this.http.put<Item>(`${this.apiURL+ this.path}`, dto);
    }

    consultarPorId(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiURL + this.path}/${id}`);
    }
    consultarItemPorId(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiURL + this.path}/item/${id}`);
    }

    salvar(dto: Item): Observable<Item> {
        return this.http.post<Item>(this.apiURL + this.path, dto);
    }


    excluir(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL + this.path}/${id}`);
    }

    pesquisar(nome: string): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiURL + this.path}/pesquisar/${nome}`);
    }

    visualizarListaCompleta(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiURL + this.path}`);
    }

}