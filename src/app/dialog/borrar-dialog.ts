import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../login/auth.service';

@Component({
	selector: 'borrar-dialog',
	templateUrl: '../dialog/borrar-dialog.html',
})
export class BorrarDialog {
	auth: firebase.User;
	constructor(@Inject(MD_DIALOG_DATA) public data: any, private _router: Router, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private authService: AuthService) {
		this.auth = afAuth.auth.currentUser;
	}

	borrarUsuario(key: string): void {
		this.db.list('usuarios').remove(key);
		this.auth.delete().then(()=>{
			this.authService.logout();
			this._router.navigate(['login']);
		});
	}
}