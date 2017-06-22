import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../login/auth.service';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { randomStr } from '../scripts/random-str';

import { Usuario } from './usuario';

@Component({
	selector: 'nuevo-usuario',
	templateUrl: './nuevo-usuario.component.html',
	styleUrls: ['./nuevo-usuario.component.css']
})

export class NuevoUsuarioComponent {
	user: Usuario = new Usuario;
	generos = [ {value: 'M', viewValue: 'Hombre'}, {value: 'F', viewValue: 'Mujer'} ];
	password: Object = {
		password: "",
		confirmation: ""
	}
	foto: File;
	uploading: boolean = false;
	storageRef: any;
	porcentaje: number = 0;
	nombreOrg: string;

	constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private _location: Location, public snackBar: MdSnackBar, public authService: AuthService){
		let storage = firebase.storage();
		this.storageRef = storage.ref();
	}

	crear(): void {
		let that = this;
		if(!this.checkInputs()) {
			this.afAuth.auth.createUserWithEmailAndPassword(this.user.correo, this.password["password"])
			.then(()=> that.checkForFile())
			.catch((error)=>{
				that.snackBar.open('Hubo un error creando el usuario, inténtelo de nuevo.', '', {
					duration: 1500
				});
			});
		} else {
			that.snackBar.open('Debe llenar los campos obligatorios (*).', '', {
				duration: 1500
			});
		}
	}

	checkForFile(){
		if(this.foto != null) {
			this.subirArchivo();
		} else {
			this.user.foto = '';
			this.nombreOrg = '';
			this.añadirUsuario();
		}
	}

	añadirUsuario(): void {
		let that = this;
		this.db.list('usuarios').push({
			nombre: this.user.nombre,
			apellido: this.user.apellido,
			genero: this.user.genero,
			edad: this.user.edad,
			correo: this.user.correo,
			foto: this.user.foto,
			nombreOrg: this.nombreOrg
		})
		.then(() => that.volverListado());
	}

	obtenerFile(evt: any){
		this.foto = evt.target.files[0];
	}

	subirArchivo(){
		let that = this;
		this.uploading = true;
		this.nombreOrg = randomStr(3)+this.foto.name;
		let uploadTask = this.storageRef.child('profile-pics/'+this.nombreOrg).put(this.foto);
		uploadTask.on('state_changed', function(snapshot){
			// Observe state change events such as progress, pause, and resume
			// See below for more detail
		}, function(error) {
			// Handle unsuccessful uploads
			this.snackBar.open('Hubo un error subiendo el archivo, inténtelo de nuevo.', '', {
				duration: 1500
			});
		}, function() {
			that.user.foto =  uploadTask.snapshot.downloadURL;
			that.añadirUsuario();
		});
	}

	confirmarPwd(): boolean{
		return this.password["password"] == this.password["confirmation"];
	}

	volverListado (): void {
		this._location.back();
	}

	checkInputs(){
		return (this.user.nombre == '' || this.user.apellido == '' || this.user.correo == '' || this.user.genero == '' || this.user.edad == null || this.password["password"] == '' || this.password["confirmation"] == '');
	}
}