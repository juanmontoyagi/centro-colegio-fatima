import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { TareaModel } from 'src/app/models/tarea.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { TareaService } from 'src/app/services/tarea.service';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  estudiantes: UsuarioModel[] = [];

  tarea = new TareaModel();
  mensaje;

  constructor(private tareaServices: TareaService, 
    private usuarioServices: UsuarioService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tareaServices.getEstudiantes().subscribe(resp=>{
      this.estudiantes = resp;
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

    if(this.tarea.idTarea){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.tareaServices.crearTarea(this.tarea);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.tarea.nombreTarea,
        text: this.mensaje
      })
    })
  }

}
