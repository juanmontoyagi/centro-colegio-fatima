import { Component, OnInit } from '@angular/core';
import { GrupoModel } from 'src/app/models/grupo.model';
import { HorarioModel } from 'src/app/models/horario.model';
import { SalonModel } from 'src/app/models/salon.models';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horarioObjeto = new HorarioModel();
  grupos: GrupoModel[] = [];
  docentes: UsuarioModel[] = [];
  salones: SalonModel[]=[];
  horarios: HorarioModel[]=[];
  mensaje;
  isValida;
  constructor(private usuarioServices: UsuarioService, private horarioServices: HorarioService) { }

  ngOnInit(): void {
    this.usuarioServices.getDocentes().subscribe(resp=>{
      this.docentes = resp;
    });  

    this.usuarioServices.getGrupos().subscribe(resp=>{
      this.grupos = resp;
    });

    this.horarioServices.getSalones().subscribe(resp=>{
      this.salones = resp;
    })

    this.horarioServices.getHorarios().subscribe(resp=>{
      this.horarios = resp;
    })
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

    // Crear una variable para centralizar la petición si es guardar o actualizar
    let peticion:Observable<any>;

    Swal.showLoading();

    this.isValida = false;
    if(this.validarHorario(this.horarioObjeto))
    {
      Swal.fire({
        title: 'Registro no éxitoso',
        text: this.mensaje
      })
    }else{
      peticion = this.horarioServices.crearHorario(this.horarioObjeto);
      this.mensaje = 'Se guardó exitosamente'
  
      peticion.subscribe(resp=>{
        Swal.fire({
          title: 'Se registró el horario para él docente '+this.horarioObjeto.docente,
          text: this.mensaje
        })
      });
    }
  }

  validarHorario(horarioObj: HorarioModel):boolean{
    console.log(this.horarios)
    this.horarios.forEach(h => {
      if(this.validarDocente(horarioObj.docente, h.docente) && this.validarSalon(horarioObj.salon, h.salon) && this.validarDia(horarioObj.dia, h.dia) && this.validarHora(horarioObj.hora, h.hora))
      {
        this.mensaje = 'Ya tienes un horario para el día '+h.dia+' de '+h.hora+' en el salón '+h.salon
        this.isValida = true;
      }
      else if(!this.validarDocente(horarioObj.docente, h.docente) && this.validarGrupo(horarioObj.grupo, h.grupo) &&  this.validarDia(horarioObj.dia, h.dia) && this.validarHora(horarioObj.hora, h.hora))
      {
        this.mensaje = 'Él grupo tiene una clase asignada el día '+h.dia+' de '+h.hora
        this.isValida = true;
      }
      else if(this.validarDocente(horarioObj.docente, h.docente) && this.validarDia(horarioObj.dia, h.dia) && this.validarHora(horarioObj.hora, h.hora))
      {
        this.mensaje = 'Ya tienes un horario para el día '+h.dia+' de '+h.hora
        this.isValida = true;
      }
      else if(this.validarSalon(horarioObj.salon, h.salon) && this.validarDia(horarioObj.dia, h.dia) && this.validarHora(horarioObj.hora, h.hora))
      {
        this.mensaje = 'El salón '+h.salon+' se encuentra ocupado por el docente '+h.docente+' el día '+h.dia+' de '+h.hora
        this.isValida = true;
      }
    });
    return this.isValida
  }

  validarDocente(docenteSolicitado:String, docente:String):boolean{
    if(docenteSolicitado==docente)
    {  
      return true;
    }
    else
    {
      return false;
    }
  }

  validarDia(diaSolicitado:String, dia:String):boolean{
    if(diaSolicitado==dia)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  validarSalon(salonSolicitado:String, salon:String):boolean{
    if(salonSolicitado==salon)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  validarHora(horaSolicitada:String, hora:String):boolean{
      if (horaSolicitada==hora)
      {
        return true;
      }
      else
      {
        return false;
      }    
  }

  validarGrupo(grupoSolicitado:String, grupo:String):boolean{
    if(grupoSolicitado==grupo)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
