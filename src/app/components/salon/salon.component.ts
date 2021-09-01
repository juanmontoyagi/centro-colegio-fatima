import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SalonModel } from 'src/app/models/salon.models';
import { SalonService } from 'src/app/services/salon.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  salon = new SalonModel();
  mensaje;

  constructor( private salonServices: SalonService, private route: ActivatedRoute) { }

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

    if(this.salon.idSalon){
     // peticion = this.usuarioServices.actualizarpersona(this.usuario);
      //this.mensaje = 'Se actualizó exitosamente'
    }else{
      peticion = this.salonServices.crearSalon(this.salon);
      this.mensaje = 'Se guardó exitosamente'
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: this.salon.descripcionSalon,
        text: this.mensaje
      })
    })
  }

}
