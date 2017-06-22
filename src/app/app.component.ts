import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './login/auth.service';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})

export class AppComponent {

	constructor(private afAuth: AngularFireAuth, private authService: AuthService, private _router: Router){
	}
}