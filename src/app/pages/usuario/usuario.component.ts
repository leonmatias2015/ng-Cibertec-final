import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario = new UsuarioModel();


  constructor(private usuarioServicio: UsuarioService,
              private route:ActivatedRoute) { }

  ngOnInit() {

    const id=this.route.snapshot.paramMap.get('id')
    if(id !== 'nuevo'){
      this.usuarioServicio.getUsuario(id)
        .subscribe((resp:UsuarioModel)=>{
          this.usuario =  resp;
          this.usuario.id = id;

        })

    }


  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log("Formulario no Valido");
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.usuario.id) {
      peticion = this.usuarioServicio.actualizarUsuario(this.usuario);
    } else {
      peticion = this.usuarioServicio.crearUsuario(this.usuario);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.usuario.name + ' ' + this.usuario.lastname,
        text: 'Se Actualizo Correctamente',
        type: 'success'
      });

    });

  }


}
