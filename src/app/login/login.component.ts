import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MdSnackBar } from '@angular/material';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	user: Object = {
		email: "",
		password: "",
		error: ""
	};

	constructor (private _router: Router, private afAuth: AngularFireAuth, private authService: AuthService, public snackBar: MdSnackBar){
	}

	loginWithEmailPassword(){
		let that = this;
		this.afAuth.auth.signInWithEmailAndPassword(this.user["email"], this.user["password"])
		.then(() => {
			this.authService.login();

			this._router.navigate([this.authService.redirectUrl]);
		})
		.catch(function(error) {
			var errorCode = error["code"];
			if (errorCode === 'auth/wrong-password') {
				that.user["error"] = 'Contraseña incorrecta.';
			} else if (errorCode === 'auth/invalid-email') {
				that.user["error"] = 'El correo que ingresó es inválido.';
			} else if (errorCode === 'auth/user-not-found'){
				that.user["error"] = 'El usuario no existe.';
			}

			that.snackBar.open(that.user["error"],'',{duration: 1500});
		});	
	}
}