import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    private apikey = 'AIzaSyAd0gYlHSN5LcYED9cmWiBlCMsD7g9yxok';
  
    userToken: string;
    loggedIn: boolean;
    user: string;
  
    constructor(private http: HttpClient) {
      this.leerToken();
      this.loggedIn = false;
    }
  
    //Crear servicios de logout, login, registrar un usuario nuevo
    logout() {
      localStorage.removeItem('token');
      this.loggedIn = false;
    }
  
    login(usuario: UsuarioModel) {
      const authData = {
        ...usuario,
        returnSecureToken: true
      };  
      return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`,
      authData)
      .pipe(map(
        resp => {
          console.log('Entro en el mapa login')
          this.guardarToken(resp['idToken']);
          this.loggedIn = true;
          this.user = usuario.email;
          return resp;
  
        }));
    }
  singUp(usuario: UsuarioModel) {
      const authData = {
        ...usuario,
        returnSecureToken: true
      };
      return this.http.post(
        `${this.url}signUp?key=${this.apikey}`,
        authData
      ).pipe(map(
        resp => {
          console.log('Entro en el mapa singup')
          this.guardarToken(resp['idToken']);
          return resp;
        }));
    }
  
    private guardarToken(idToken: string) {
      this.userToken = idToken;
      localStorage.setItem('token', idToken);
      let hoy = new Date();
      hoy.setSeconds(3600);
      localStorage.setItem('expira', hoy.getTime().toString());
    }
  leerToken() {
      if (localStorage.getItem('token')) {
        this.userToken = localStorage.getItem('token');
      } else {
        this.userToken = '';
      }
      return this.userToken;
    }
  
    estaAutenticado(): boolean {
      return this.userToken.length > 2;
    }
  }
