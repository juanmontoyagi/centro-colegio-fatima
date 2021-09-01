import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotaModel } from 'src/app/models/nota.model';
import { TareaModel } from 'src/app/models/tarea.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NotaService } from 'src/app/services/nota.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})
export class CalificarComponent implements OnInit {

  nota = new NotaModel();
  tareas: TareaModel[] = [];
  estudiantes: TareaModel[] = [];
  mensaje;
  banderazo = false;


  constructor(private notasServices: NotaService) { }

  ngOnInit(): void {
    this.notasServices.getTareas().subscribe(resp=>{
      resp.forEach(tarea => {
        if (this.tareas.length > 0) {
          this.banderazo = false;
          this.tareas.forEach(t => {
            if (tarea.descripcionTarea == t.descripcionTarea) {
              this.banderazo = true;
            }
          });
          if (!this.banderazo) {
            this.tareas.push(tarea);
          }
        } else {
          this.tareas.push(tarea);
        }
      });
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

    if(this.nota.idNota){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.notasServices.crearNota(this.nota);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.nota.notaDescripcion,
        text: this.mensaje
      })
    })
  }

  capturarTarea(){
    this.estudiantes = [];
    this.notasServices.getTareas().subscribe(resp=>{
      resp.forEach(estudiante => {
        if(estudiante.descripcionTarea == this.nota.tarea){
          this.estudiantes.push(estudiante);
        }
      });
    });   
  }

}
