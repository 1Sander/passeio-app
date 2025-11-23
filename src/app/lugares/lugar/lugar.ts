import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaClass } from '../../categorias/categoria.class';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrls: ['./lugar.scss'],
})
export class Lugar implements OnInit {

  camposForm: FormGroup;
  categorias: CategoriaClass[] = [];

  constructor( private categoriaService: CategoriaService,
               private service: LugarService

  ) {
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
      next: (listaCategorias) => 
        this.categorias = listaCategorias
    });
  }


  salvar() {
    this.camposForm.markAllAsTouched();

        if(this.camposForm.valid){
        this.service.salvar(this.camposForm.value)
            .subscribe({
              next: (lugar) => {
                console.log("cadastrado com sucesso: ", lugar);
                this.camposForm.reset();
              },
              error: erro => console.error('Ocorreu um erro', erro)
            });
  }

  }

  isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched &&campo?.errors?.['required']
  }

}
