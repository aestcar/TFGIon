import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoLibroComponent } from './pages/info-libro/info-libro.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { GuardAuthGuard } from './guards/guard-auth.guard';
import { GuardAdminGuard } from './guards/guard-admin.guard';
import { NoRegistradoComponent } from './components/no-registrado/no-registrado.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [GuardAuthGuard] },
  { path: 'registrarse', component: NoRegistradoComponent },
  { path: 'detalles-libro', component: InfoLibroComponent },
  { path: 'admin', component: AdminComponent, canActivate: [GuardAdminGuard] },
  { path: 'mis-reservas', component:MisReservasComponent ,canActivate: [GuardAuthGuard]},
  { path: 'reportes', component: ReportesComponent, canActivate: [GuardAuthGuard] },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: '', component: InicialComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
