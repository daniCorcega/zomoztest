import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../login/auth.service';
import { BorrarDialog } from '../dialog/borrar-dialog';
import { randomStr } from '../scripts/random-str';
import * as firebase from 'firebase';

import { Usuario } from './usuario';


@Component({
	selector: 'detalle-usuario',
	templateUrl: './detalle-usuario.component.html',
	styleUrls: ['./detalle-usuario.component.css']
})

export class DetalleUsuarioComponent implements OnInit{
	user: Usuario;
	_aux: Usuario;
	auth: firebase.User;
	editando: boolean = false;
	_key: string;
	generos = [ {value: 'M', viewValue: 'Hombre'}, {value: 'F', viewValue: 'Mujer'} ];
	foto: File;
	uploading: boolean = false;
	storageRef: any;
	nombreOrg: string;

	constructor(private _dialog: MdDialog, private _route: ActivatedRoute, private _location: Location, private db: AngularFireDatabase, private afAuth: AngularFireAuth, public snackBar: MdSnackBar, public authService: AuthService){
		this.auth = this.afAuth.auth.currentUser;
		let storage = firebase.storage();
		this.storageRef = storage.ref();
	}

	editar (): void {
		this.editando = !this.editando;

		this._aux = new Usuario;
		this._aux.nombre = this.user.nombre,
		this._aux.apellido = this.user.apellido,
		this._aux.genero = this.user.genero,
		this._aux.edad = this.user.edad,
		this._aux.correo = this.user.correo,
		this._aux.foto = this.user.foto,
		this._aux.nombreOrg = this.user.nombreOrg
	}

	actualizar(): void {
		let that = this;
		this.db.object('usuarios/'+this._key).update({
			nombre: this.user.nombre,
			apellido: this.user.apellido,
			genero: this.user.genero,
			edad: this.user.edad,
			correo: this.user.correo,
			nombreOrg: this.user.nombreOrg
		})
		.then(() => {
			this.editando = !this.editando;
		})
		.catch((err)=>{
			that.snackBar.open('Hubo un error subiendo el archivo, inténtelo de nuevo.', '', {
				duration: 1500
			});
		});
	}

	cancelar ():void {
		this.user = this._aux;
		this.editando = !this.editando;
	}

	ngOnInit(): void {
		this._route.params
		.switchMap((params: Params) => this.db.object('usuarios/'+params['id']))
		.subscribe((user) => this.user = user);

		this._route.paramMap.subscribe((params: Params) => this._key = params['params'].id);
	}

	mismoUsuario(): boolean {
		return this.user.correo == this.auth.email && !this.editando;
	}

	borrarDialog(): void {
		this._dialog.open(BorrarDialog,
		{
			data: {
				user:this.user.nombre+" "+this.user.apellido,
				key: this._key
			}
		});
	}

	volverListado(): void {
		this._location.back();
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
			that.snackBar.open('Hubo un error subiendo el archivo, inténtelo de nuevo.', '', {
				duration: 1500
			});
		}, function() {
			that.user.foto =  uploadTask.snapshot.downloadURL;
			that.user.nombreOrg = that.nombreOrg;
			that.actualizar();
		});
	}

	borrarArchivo(){
		if(this.foto != null) {
			if(this.user.foto != '') {
				let that = this;
				let archivo = this.storageRef.child('profile-pics/'+this.user.nombreOrg);
				archivo.delete().then(()=>{
					that.subirArchivo();
				})
				.catch((err)=>{
					that.snackBar.open('Hubo un error borrando el archivo existente, inténtelo de nuevo.', '', {
						duration: 1500
					});
				});
			} else {
				this.subirArchivo();
			}
		} else {
			this.actualizar();
		}
	}
}


