import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { LoginModalService } from '../components/login-modal/login-modal.service';
import { RegisterModalService } from '../components/register-modal/register-modal.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./app.component.scss', './login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor( public router: Router,
        public _usuarioService: UsuarioService,
        public _modalLogin: LoginModalService,
        public _modalRegister: RegisterModalService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    console.log('email: ', this.email );
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '93014610171-s72b3pov91jft4ov8tk0ttcklm005aa1.apps.googleusercontent.com',
        cookienpolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin( document.getElementById('btnGoogle'));
    });
  }

  attachSingin( element ) {

    this.auth2.attachClickHandler( element, {}, googleUser => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
          .subscribe( correcto => window.location.href = '#/dashboard');

      console.log( token );
    });
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    console.log( usuario );

    this._usuarioService.login( usuario, forma.value.recuerdame )
          .subscribe( correcto => this.router.navigate(['/dashboard']) );
    console.log( forma.valid );
    console.log( forma.value );
  }

  abrirModalLogin( ) {
    console.log('Abrir login');
    this._modalLogin.mostrarModal();
  }

  abrirModalRegister( ) {
    console.log('Abrir register');
    this._modalRegister.mostrarModal();
  }
}
