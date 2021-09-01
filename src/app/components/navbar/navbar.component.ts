import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public usuarios: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  salir(){
    this.usuarios.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
