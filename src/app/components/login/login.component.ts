import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { FirebaseService } from '../../services/firebase.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  usuarios: UsuarioModel []=[];
  mensaje;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  iniciar(form: NgForm){
    if(form.invalid){
      console.log('Formulario no valido');
      return;
    }

    // Crear una variable para centralizar la petición si es guardar o actualizar
    let peticion:Observable<any>;

    peticion = this.usuarioService.getUsuarioLogin();

    peticion.subscribe(resp=>{
      this.usuarios = resp
      this.usuarios.forEach(p => {
        if(p.email == this.usuario.email && p.contrasena == this.usuario.contrasena){
          this.usuarioService.loggedIn  = true;
          this.usuarioService.tipoUsuario = p.tipoUsuario;
          p.estado = true;
          
          
          if(p.tipoUsuario=='2'){ 
            this.router.navigate(['/registrar']);
          }else{
            this.router.navigate(['/home']);
          }
        }
      });
      if(!this.usuarioService.loggedIn){
          Swal.fire({
            title: 'Usuario y/o contraseñas son incorrectas',
            icon: 'warning'
          })
      }
    })
  }
/*
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: FirebaseService, private router: Router){}

  login(form: NgForm) {
    console.log('Imprimir el formulario si es valido');
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.auth.login(this.usuario)
      .subscribe(resp => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al auntenticar',
          text: err.error.error.message
        });
      });
  } */
}
