import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../model/item";

@Injectable({ providedIn: 'root' })

export class ItemService {

    apiURL: string = 'localhost:8080/'
    constructor(
        private http: HttpClient
    ) { }

    enviar(dto: Item): Promise<any> {
        return this.http.post(this.apiURL, dto)
            .toPromise()
            .then(Response => console.log(Response));

    }

    alterar(dto: Item): Observable<Item> {
        return this.http.put<Item>(`${this.apiURL}`, dto);
    }

    consultarPorId(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiURL}/${id}`);
    }
    consultarItemPorId(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiURL}/item/${id}`);
    }

    salvar(dto: Item): Observable<Item> {
        return this.http.post<Item>(this.apiURL, dto);
    }


    excluir(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL}/${id}`);
    }

    pesquisar(dto: Item): Observable<Item[]> {
        return this.http.post<Item[]>(`${this.apiURL}/pesquisar`, dto);
    }

    visualizarListaCompleta(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiURL}/listartodos`);
    }

}