import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

import { Usuario } from './usuario';

@Component({
	selector: 'usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
	usuarios: FirebaseListObservable<any>;

	constructor (db: AngularFireDatabase, private _router: Router, public authService: AuthService){
		this.usuarios = db.list('usuarios');
	}

	detalleUsuario(key: string): void {
		this._router.navigate(['/detalle-usuario', key]);
	}
}