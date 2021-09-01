import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { LoginComponent } from './components/login/login.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';
import { AvisoComponent } from './components/aviso/aviso.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { CircularComponent } from './components/circular/circular.component';
import { NotaComponent } from './components/nota/nota.component';
import { EntrevistaComponent } from './components/entrevista/entrevista.component';
import { HorarioComponent } from './components/horario/horario.component';
import { GrupoComponent } from './components/grupo/grupo.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { SalonComponent } from './components/salon/salon.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { AsignaturaComponent } from './components/asignatura/asignatura.component';
import { AreaComponent } from './components/area/area.component';
import { CalificarComponent } from './components/calificar/calificar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrarComponent,
    LoginComponent,
    AutorizacionComponent,
    AvisoComponent,
    NavbarComponent,
    FooterComponent,
    TareaComponent,
    IncidenciaComponent,
    CircularComponent,
    NotaComponent,
    EntrevistaComponent,
    HorarioComponent,
    GrupoComponent,
    AsignacionComponent,
    SalonComponent,
    HorariosComponent,
    AsignaturaComponent,
    AreaComponent,
    CalificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
