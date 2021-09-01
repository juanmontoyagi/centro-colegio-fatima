import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { GrupoModel } from '../models/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';

  constructor(private http: HttpClient) { }

  crearGrupo(grupo: GrupoModel){
    return this.http.post(`${this.url}/grupo.json`, grupo)
    .pipe(
      map((resp:any)=>{
        grupo.idGrupo = resp.name;
        return grupo;
      })
    )
  }

  getGrupos(){
    return this.http.get(`${this.url}/grupo.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }

  private crearArreglo(grupoObj: Object){
    const grupos: GrupoModel[]= [];
    console.log(grupoObj);
    if(grupoObj == null){ return [];}
    Object.keys(grupoObj).forEach(key =>{
      const grupo: GrupoModel = grupoObj[key];
      grupo.idGrupo = key;
      grupos.push(grupo);
    });
    return grupos;
  }

}
