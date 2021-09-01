import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map, delay } from 'rxjs/operators';
import { GrupoModel } from '../models/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   //El url es el endpoint donde hago el posteo de los datos
   private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';
  
   loggedIn:boolean= false;
   tipoUsuario: string ="";
   
   constructor(private http: HttpClient) { }
 
   crearPersona(usuario: UsuarioModel){
     return this.http.post(`${this.url}/usuario.json`, usuario)
     .pipe(
       map((resp:any)=>{
         usuario.idUsuario = resp.name;
         return usuario;
       })
     )
   }
 
   getPersona( id:string ){
     return this.http.get(`${this.url}/usuario/${ id }.json`);
   }

 
   borrarPersona( id:string ){
     return this.http.delete(`${this.url}/usuario/${ id }.json`);
   }
 
   getPersonas(){
     return this.http.get(`${this.url}/usuario.json`)
     .pipe(
       map(this.crearArreglo),
       delay(1500)
     );
   }
 
   private crearArreglo(usuariosObj: Object){
     const usuarios: UsuarioModel[]= [];
     console.log(usuariosObj);
 
     if(usuariosObj == null){ return [];}
     Object.keys(usuariosObj).forEach(key =>{
       const usuario: UsuarioModel = usuariosObj[key];
       usuario.idUsuario = key;
       if(usuario.tipoUsuario=='2'){
       usuarios.push(usuario);
       }
     });
     return usuarios;
   }
 
   getPadres(){
     return this.http.get(`${this.url}/usuario.json`)
     .pipe(
       map(this.crearArregloPadres)
     );
   }
 
   private crearArregloPadres(usuariosObj: Object){
     const usuarios: UsuarioModel[]= [];
     console.log(usuariosObj);
 
     if(usuariosObj == null){ return [];}
     Object.keys(usuariosObj).forEach(key =>{
       const usuario: UsuarioModel = usuariosObj[key];
       usuario.idUsuario = key;
       if (usuario.tipoUsuario == 'PADRE') {
        usuarios.push(usuario);
       }
     });
     return usuarios;
   }

   getUsuarioLogin(){
    return this.http.get(`${this.url}/usuario.json`)
    .pipe(
      map(this.crearArregloLogin)
    );
  }

  private crearArregloLogin(personasObj: Object){
    const usuarios: UsuarioModel[]= [];
    console.log(personasObj);

    if(personasObj == null){ return [];}
    Object.keys(personasObj).forEach(key =>{
      const usuario: UsuarioModel = personasObj[key];
      usuario.idUsuario = key;
      usuarios.push(usuario);
    });
    return usuarios;
  }

  getGrupos(){
    return this.http.get(`${this.url}/grupo.json`)
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
    return this.http.get(`${this.url}/usuario.json`)
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
