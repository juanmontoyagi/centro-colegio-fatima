import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HorarioModel } from '../models/horario.model';
import { map } from 'rxjs/operators';
import { SalonModel } from '../models/salon.models';
import { GrupoModel } from '../models/grupo.model';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

   //El url es el endpoint donde hago el posteo de los datos
   private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';
  
   constructor(private http: HttpClient) { }
 
   crearHorario(horario: HorarioModel){
     return this.http.post(`${this.url}/horario.json`, horario)
     .pipe(
       map((resp:any)=>{
         horario.idHorario = resp.name;
         return horario;
       })
     )
   }
 
   getSalones(){
     return this.http.get(`${this.url}/salon.json`)
     .pipe(
       map(this.crearArregloSalones)
     );
   }
 
   private crearArregloSalones(salonesObj: Object){
     const salones: SalonModel[]= [];
     console.log(salonesObj);
 
     if(salonesObj == null){ return [];}
     Object.keys(salonesObj).forEach(key =>{
       const salon: SalonModel = salonesObj[key];
       salon.idSalon = key;
       salones.push(salon);
     });
     return salones;
   }

   getHorarios(){
    return this.http.get(`${this.url}/horario.json`)
    .pipe(
      map(this.crearArregloHorarios)
    );
  }

  private crearArregloHorarios(horarioObj: Object){
    const horarios: HorarioModel[]= [];
    console.log(horarioObj);

    if(horarioObj == null){ return [];}
    Object.keys(horarioObj).forEach(key =>{
      const h: HorarioModel = horarioObj[key];
      h.idHorario = key;
      horarios.push(h);
    });
    return horarios;
  }

  getGrupos(){
    return this.http.get(`${this.url}/grupos.json`)
    .pipe(
      map(this.crearArregloGrupo)
    );
  }

  private crearArregloGrupo(grupoObj: Object){
    const grupos: GrupoModel[]= [];
    console.log(grupoObj);

    if(grupoObj == null){ return [];}
    Object.keys(grupoObj).forEach(key =>{
      const grupo: GrupoModel = grupoObj[key];
      grupo.idGrupo = key;
      console.log(grupo.idGrupo);
      grupos.push(grupo);
    });
    return grupos;
  }

  getDocentes(){
    return this.http.get(`${this.url}/usuarios.json`)
    .pipe(
      map(this.crearArregloDocentes)
    );
  }

  private crearArregloDocentes(usuarioObj: Object){
    const personas: UsuarioModel[]= [];
    console.log(usuarioObj);

    if(usuarioObj == null){ return [];}
    Object.keys(usuarioObj).forEach(key =>{
      const persona: UsuarioModel = usuarioObj[key];
      persona.idUsuario = key;
      if(persona.tipoUsuario=='DOCENTE'){
        personas.push(persona);
      }
    });
    return personas;
  }
}