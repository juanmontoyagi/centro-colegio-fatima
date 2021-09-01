import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { AreaModel } from '../models/area.model';
import { AsignaturaModel } from '../models/asignatura.model';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';

  constructor(private http: HttpClient) { }

  crearGrupo(asignatura: AsignaturaModel){
    return this.http.post(`${this.url}/asignatura.json`, asignatura)
    .pipe(
      map((resp:any)=>{
        asignatura.idAsignatura = resp.name;
        return asignatura;
      })
    )
  }

  getAsignaturas(){
    return this.http.get(`${this.url}/asignatura.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }

  private crearArreglo(asignaturaObj: Object){
    const asignaturas: AsignaturaModel[]= [];
    console.log(asignaturaObj);
    if(asignaturaObj == null){ return [];}
    Object.keys(asignaturaObj).forEach(key =>{
      const asignatura: AsignaturaModel = asignaturaObj[key];
      asignatura.idAsignatura = key;
      asignaturas.push(asignatura);
    });
    return asignaturas;
  }

  getAreas(){
    return this.http.get(`${this.url}/area.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }

  private crearArregloArea(areaObj: Object){
    const areas: AreaModel[]= [];
    console.log(areaObj);
    if(areaObj == null){ return [];}
    Object.keys(areaObj).forEach(key =>{
      const area: AreaModel = areaObj[key];
      area.idArea = key;
      areas.push(area);
    });
    return areas;
  }

}
