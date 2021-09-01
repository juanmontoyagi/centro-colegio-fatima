import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  padres: UsuarioModel[] = [];

  usuario = new UsuarioModel();
  mensaje;

  constructor( private usuarioServices: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuarioServices.getPadres().subscribe(resp=>{
      this.padres = resp;
    });
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false
    });

    Swal.showLoading();
    // Crear una variable para centralizar la petición si es guardar o actualizar
    let peticion:Observable<any>;

    if(this.usuario.idUsuario){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.usuarioServices.crearPersona(this.usuario);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.usuario.nombreUsuario,
        text: this.mensaje
      })
    })
  }

}
