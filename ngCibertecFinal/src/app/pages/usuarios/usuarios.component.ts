import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  cargando = false;

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit() {
    this.cargando = true;
    this.usuariosService.getUsuarios()
      .subscribe(resp => {
        this.usuarios = resp;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: UsuarioModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${usuario.name} `,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.usuarios.splice(i, 1);
        this.usuariosService.borrarUsuario(usuario.id).subscribe();
      }

    });
  }
}