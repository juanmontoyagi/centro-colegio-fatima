import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/models/area.model';
import { AsignaturaModel } from 'src/app/models/asignatura.model';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {

  asignatura = new AsignaturaModel();
  areas: AreaModel[] = [];
  mensaje;

  constructor(private asignaturaServices: AsignaturaService) { }

  ngOnInit(): void {
    this.asignaturaServices.getAreas().subscribe(resp=>{
      this.areas = resp;
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

    if(this.asignatura.idAsignatura){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.asignaturaServices.crearGrupo(this.asignatura);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.asignatura.descripcion,
        text: this.mensaje
      })
    })
  }

}
