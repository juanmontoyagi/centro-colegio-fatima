import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HorarioService } from 'src/app/services/horario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent /*implements OnInit*/ {
/*
 // horario = new HorarioModel();
  mensaje;

  constructor( private horarioServices: HorarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
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

    if(this.horario.idHorario){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.horarioServices.crearHorario(this.horario);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.horario.estado,
        text: this.mensaje
      })
    })
  }
*/
}
