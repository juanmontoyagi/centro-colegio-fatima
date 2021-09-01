import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { NotaModel } from '../models/nota.model';
import { TareaModel } from '../models/tarea.model';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  //El url es el endpoint donde hago el posteo de los datos
  private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';
  
  loggedIn:boolean= false;
  tipoUsuario: string ="";
  
  constructor(private http: HttpClient) { }

  crearNota(nota: NotaModel){
    return this.http.post(`${this.url}/nota.json`, nota)
    .pipe(
      map((resp:any)=>{
        nota.idNota = resp.name;
        return nota;
      })
    )
  }

  getNotas(){
    return this.http.get(`${this.url}/nota.json`)
    .pipe(
      map(this.crearArregloNotas),
      delay(1500)
    );
  }

  private crearArregloNotas(notasObj: Object){
    const notas: NotaModel[]= [];
    console.log(notasObj);
    if(notasObj == null){ return [];}
    Object.keys(notasObj).forEach(key =>{
      const nota: NotaModel = notasObj[key];
      nota.idNota = key;
      notas.push(nota);
    });
    return notas;
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
