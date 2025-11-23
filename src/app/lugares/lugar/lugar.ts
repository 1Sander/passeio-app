import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaClass } from '../../categorias/categoria.class';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrls: ['./lugar.scss'],
})
export class Lugar implements OnInit {

  camposForm: FormGroup;
  categorias: CategoriaClass[] = [];

  constructor( private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => this.categorias = listaCategorias
    });
  }


  salvar() {
    console.log('valores: ', this.camposForm.value);
  }
}
