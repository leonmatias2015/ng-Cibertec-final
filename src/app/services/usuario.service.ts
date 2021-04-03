import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://crud-app-ee1de.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: UsuarioModel) {

    return this.http.post(`${this.url}/usuarios.json`, usuario)
      .pipe(
        map((resp: any) => {
          usuario.id = resp.name;
          return usuario;
        })
      )
  }

  actualizarUsuario(usuario: UsuarioModel) {

    const usuarioTemp = {
      ...usuario
    };
    delete usuarioTemp.id;
    return this.http.put(`${this.url}/usuarios/${usuario.id}.json`, usuarioTemp);
  }

  borrarUsuario( id: string ) {
    return this.http.delete(`${ this.url }/usuarios/${ id }.json`);
  }


  getUsuario(id:String){
    return this.http.get(`${this.url}/usuarios/${id}.json`);
  }

  getUsuarios() {
    return this.http.get(`${this.url}/usuarios.json`)
      .pipe(
        map(this.crearArreglo)
      );
  }

  private crearArreglo(usuariosObj: object) {

    const usuarios: UsuarioModel[] = [];

    if (usuariosObj === null) {
      return [];
    }
    Object.keys(usuariosObj).forEach(key => {
      const usuario: UsuarioModel = usuariosObj[key];
      usuario.id = key;
      usuarios.push(usuario);
    });
    return usuarios;
  }




}
