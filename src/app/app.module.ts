import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { MatIconModule } from '@angular/material/icon';

import { AdminComponent } from './pages/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DialogoComponent } from './components/dialogo-filtro/dialogo-filtro.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';

import { NgxFileDropModule } from 'ngx-file-drop';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { AdminSubirLibroComponent } from './pages/admin/admin-subir-libro/admin-subir-libro.component';
import { AdminBorrarLibroComponent } from './pages/admin/admin-borrar-libro/admin-borrar-libro.component';
import { AdminSubirEventoComponent } from './pages/admin/admin-subir-evento/admin-subir-evento.component';
import { AdminBorrarEventoComponent } from './pages/admin/admin-borrar-evento/admin-borrar-evento.component';
import { AdminGestionReservasComponent } from './pages/admin/admin-gestion-reservas/admin-gestion-reservas.component';
import { AdminGestionErroresComponent } from './pages/admin/admin-gestion-errores/admin-gestion-errores.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InfoLibroComponent } from './pages/info-libro/info-libro.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { NoRegistradoComponent } from './components/no-registrado/no-registrado.component';
import { InicialComponent } from './pages/inicial/inicial.component';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ErrorEnLibroComponent } from './components/error-en-libro/error-en-libro.component';
import { DialogoConfirmarReservaComponent } from './components/dialogo-confirmar-reserva/dialogo-confirmar-reserva.component';
import { DialogoConfirmarPedirComponent } from './components/dialogo-confirmar-pedir/dialogo-confirmar-pedir.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    PerfilComponent,
    DialogoComponent,
    DialogoConfirmarReservaComponent,
    DialogoConfirmarPedirComponent,
    EventosComponent,
    ConocenosComponent,
    InfoLibroComponent,
    ReportesComponent,
    AdminSubirLibroComponent,
    AdminBorrarLibroComponent,
    AdminSubirEventoComponent,
    AdminBorrarEventoComponent,
    AdminGestionReservasComponent,
    AdminGestionErroresComponent,
    EditarPerfilComponent,
    HeaderComponent,
    NotFoundComponent,
    MisReservasComponent,
    NoRegistradoComponent, 
    InicialComponent,
    ErrorEnLibroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    IonicModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
