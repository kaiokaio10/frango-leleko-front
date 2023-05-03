import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Venda } from "../model/venda";

@Injectable({ providedIn: 'root' })

export class VendaService {

    apiURL: string = 'https://frango-leleko-backend10.herokuapp.com'
    path: string ='/api/venda'
    constructor(
        private http: HttpClient
    ) { }

    enviar(dto: Venda): Promise<any> {
        return this.http.post(this.apiURL, dto)
            .toPromise()
            .then(Response => console.log(Response));

    }

    alterar(dto: Venda): Observable<Venda> {
        return this.http.put<Venda>(`${this.apiURL+ this.path}`, dto);
    }

    salvar(dto: Venda): Observable<Venda> {
        return this.http.post<Venda>(this.apiURL + this.path, dto);
    }


    excluir(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL + this.path}/${id}`);
    }

    visualizarListaCompleta(): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiURL + this.path}`);
    }
    iniciarBack(): Observable<any> {
        return this.http.get<any>(`${this.apiURL}`);
    }
}