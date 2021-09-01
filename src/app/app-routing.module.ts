import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { AvisoComponent } from './components/aviso/aviso.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';
import { CircularComponent } from './components/circular/circular.component';
import { EntrevistaComponent } from './components/entrevista/entrevista.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { NotaComponent } from './components/nota/nota.component';
import { HorarioComponent } from './components/horario/horario.component';
import { GrupoComponent } from './components/grupo/grupo.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { SalonComponent } from './components/salon/salon.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { AreaComponent } from './components/area/area.component';
import { AsignaturaComponent } from './components/asignatura/asignatura.component';
import { CalificarComponent } from './components/calificar/calificar.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'aviso', component: AvisoComponent},
  {path: 'tarea', component: TareaComponent},
  {path: 'nota', component: NotaComponent},
  {path: 'autorizacion', component: AutorizacionComponent},
  {path: 'circular', component: CircularComponent},
  {path: 'entrevista', component: EntrevistaComponent},
  {path: 'incidencia', component: IncidenciaComponent},
  {path: 'horario', component: HorarioComponent},
  {path: 'grupos', component: GrupoComponent},
  {path: 'asignacion', component: AsignacionComponent},
  {path: 'salones', component: SalonComponent},
  {path: 'horarios', component: HorariosComponent},
  {path: 'areas', component: AreaComponent},
  {path: 'asignatura', component: AsignaturaComponent},
  {path: 'calificar', component: CalificarComponent},
  
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
