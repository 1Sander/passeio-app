import { Component } from '@angular/core';
import { LugarClass } from '../../lugares/lugar.class';
import { CategoriaClass } from '../../categorias/categoria.class';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class Galeria {

    lugares: LugarClass[] = [];
    categoriasFiltro: CategoriaClass[] = [];
    nomeFiltro: string = '';
    categoriaFiltro: string = '';

    constructor(
      private lugarService: LugarService,
      private categoriaService: CategoriaService
    ){}

    ngOnInit(): void {
      this.categoriaService.obterTodas()
      .subscribe(categorias => this.categoriasFiltro = categorias);

      this.lugarService.obterTodos()
      .subscribe(lugaresResposta => this.lugares = lugaresResposta);
    }

    getTotalEstrelas(lugar: LugarClass) : string {
      return '&#9733;'.repeat(lugar.avaliacao || 0) + '&#9734'.repeat(5 - (lugar.avaliacao || 0) );
    }

    filtrar(){
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe(resultado => this.lugares = resultado);
    }

}
