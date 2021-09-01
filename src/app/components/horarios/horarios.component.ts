import { Component, OnInit } from '@angular/core';
import { HorarioModel } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  horarios: HorarioModel[] = [];

  cargando = false;

  constructor(  private horariosService: HorarioService) { }

  ngOnInit(): void {
  
  this.cargando = true;
  this.horariosService.getHorarios().subscribe(resp=>{
    this.horarios = resp
    this.cargando = false;
  });

  }

}
