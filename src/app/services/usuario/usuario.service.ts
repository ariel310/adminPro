import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';

import swal from 'sweetalert';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { this.cargarStorage(); }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( resp: any ) {

    localStorage.setItem('id', resp.id);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', JSON.stringify(resp.usuario) );

    this.usuario = resp.usuario;
    this.token = resp.token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token: token } )
    .pipe(map( (resp: any) => {
      this.guardarStorage( resp );
      return true;
      console.log('Service OK!');
  }));
}

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
        localStorage.setItem( 'email', usuario.email );
    } else {
       localStorage.removeItem( 'email' );
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .pipe(map( (resp: any) => {
        this.guardarStorage( resp );
        console.log('Service OK!');
        return true;

    }));
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
        .pipe(map( (resp: any) => {
          swal('Usuario Creado', usuario.email, 'success');
          return resp.usuario;
        }));
  }
}


