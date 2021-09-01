import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TareaModel } from '../models/tarea.model';
import { map, delay } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

   //El url es el endpoint donde hago el posteo de los datos
   private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';
  
   loggedIn:boolean= false;
   tipoUsuario: string ="";
   
   constructor(private http: HttpClient) { }
 
   crearTarea(tarea: TareaModel){
     return this.http.post(`${this.url}/tarea.json`, tarea)
     .pipe(
       map((resp:any)=>{
         tarea.idTarea = resp.name;
         return tarea;
       })
     )
   }
 
   getTareas(){
     return this.http.get(`${this.url}/tarea.json`)
     .pipe(
       map(this.crearArreglo),
       delay(1500)
     );
   }
 
   private crearArreglo(tareasObj: Object){
     const tareas: TareaModel[]= [];
     console.log(tareasObj);
     if(tareasObj == null){ return [];}
     Object.keys(tareasObj).forEach(key =>{
       const tarea: TareaModel = tareasObj[key];
       tarea.idTarea = key;
       tareas.push(tarea);
     });
     return tareas;
   }

   getEstudiantes(){
    return this.http.get(`${this.url}/usuario.json`)
    .pipe(
      map(this.crearArregloEstudiante)
    );
  }

  private crearArregloEstudiante(estudiantesObj: Object){
    const usuarios: UsuarioModel[]= [];
    console.log(estudiantesObj);

    if(estudiantesObj == null){ return [];}
    Object.keys(estudiantesObj).forEach(key =>{
      const usuario: UsuarioModel = estudiantesObj[key];
      usuario.idUsuario = key;
      if (usuario.tipoUsuario == 'ESTUDIANTE') {
       usuarios.push(usuario);
      }
    });
    return usuarios;
  }

}
