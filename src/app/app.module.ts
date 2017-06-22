import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth-guard.service';
import { LoggedInGuard } from './login/loggedin-guard.service';
import { AuthService } from './login/auth.service';
import { BorrarDialog } from './dialog/borrar-dialog';



@NgModule({
  declarations: [
    AppComponent,
    DetalleUsuarioComponent,
    UsuariosComponent,
    BorrarDialog,
    NuevoUsuarioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {
        path: "",
        redirectTo: 'usuarios',
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'detalle-usuario/:id',
        component: DetalleUsuarioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'nuevo-usuario',
        component: NuevoUsuarioComponent,
        canActivate: [AuthGuard]
      }
    ]),
  ],
  exports: [AppComponent],
  entryComponents: [BorrarDialog],
  providers: [AuthGuard, AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}