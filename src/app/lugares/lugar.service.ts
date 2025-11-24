import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LugarClass } from './lugar.class';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  
  constructor(private http: HttpClient){}

  salvar(lugar: LugarClass) : Observable<LugarClass> {
    return this.http.post<LugarClass>('http://localhost:3000/lugares', lugar)
  }

  obterTodos() : Observable<LugarClass[]> {
    return this.http.get<LugarClass[]>('http://localhost:3000/lugares');
  }

  filtrar(nome: string, categoria: string) : Observable<LugarClass[]>{

    let parametros = new HttpParams();

    if(nome){
      parametros = parametros.set('nome_like', nome);
    }

    if(categoria && categoria !== '-1'){
      parametros = parametros.set('categoria', categoria)
    }

    console.log("parametros", parametros);

    return this.http.get<LugarClass[]>('http://localhost:3000/lugares', {
      params: parametros
    });
  }
}
