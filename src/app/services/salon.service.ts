import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { SalonModel } from '../models/salon.models';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private url = 'https://parcialelectiva-8f3e3.firebaseio.com/';

  constructor(private http: HttpClient) { }

  crearSalon(salon: SalonModel){
    return this.http.post(`${this.url}/salon.json`, salon)
    .pipe(
      map((resp:any)=>{
        salon.idSalon = resp.name;
        return salon;
      })
    )
  }

  getSalones(){
    return this.http.get(`${this.url}/salon.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }

  private crearArreglo(salonObj: Object){
    const salones: SalonModel[]= [];
    console.log(salonObj);
    if(salonObj == null){ return [];}
    Object.keys(salonObj).forEach(key =>{
      const salon: SalonModel = salonObj[key];
      salon.idSalon = key;
      salones.push(salon);
    });
    return salones;
  }
}
