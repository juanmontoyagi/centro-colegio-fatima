import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { AreaModel } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';

  constructor(private http: HttpClient) { }

  crearGrupo(area: AreaModel){
    return this.http.post(`${this.url}/area.json`, area)
    .pipe(
      map((resp:any)=>{
        area.idArea = resp.name;
        return area;
      })
    )
  }

  getAreas(){
    return this.http.get(`${this.url}/area.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }

  private crearArreglo(areaObj: Object){
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
