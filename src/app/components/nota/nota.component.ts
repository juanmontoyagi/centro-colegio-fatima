import { Component, OnInit } from '@angular/core';
import { NotaModel } from 'src/app/models/nota.model';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  notas: NotaModel[] = [];
  cargando = false;
  constructor(private notasServices: NotaService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.notasServices.getNotas().subscribe(resp=>{
      this.notas = resp
      this.cargando = false;
    });
  }

}
