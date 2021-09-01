import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoService } from 'src/app/services/grupo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupo = new GrupoModel();
  mensaje;

  constructor( private grupoServices: GrupoService, private route: ActivatedRoute) { }

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

    if(this.grupo.idGrupo){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.grupoServices.crearGrupo(this.grupo);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.grupo.descripcion,
        text: this.mensaje
      })
    })
  }

}
