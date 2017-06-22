import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
	user: firebase.User;
	isLoggedIn = false;

	// store the URL so we can redirect after logging in
	redirectUrl: string = "";

	constructor(private afAuth: AngularFireAuth, private _router: Router){
	}

	login(): boolean{
		this.user = this.afAuth.auth.currentUser;
		
		if(this.user != null) {
			this.isLoggedIn = true;
		}

		return this.isLoggedIn;
	}

	logout(){
		this.afAuth.auth.signOut().then(() => {
			this.isLoggedIn = false;
			this._router.navigate(['login']);
		});
	}
}