import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaClass } from './categoria.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  
  constructor(private http: HttpClient){}

  salvar(categoria: CategoriaClass) : Observable<CategoriaClass> {

    return this.http.post<CategoriaClass>('http://localhost:3000/categorias', categoria)

  }

  obterTodas() : Observable<CategoriaClass[]> {
    return this.http.get<CategoriaClass[]>('http://localhost:3000/categorias');
  }

}
