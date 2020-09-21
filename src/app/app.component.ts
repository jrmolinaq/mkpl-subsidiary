import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ROLES } from './constants/auth';
import { SubsidiaryListResponse } from './interfaces/subsidiaries.interface';
import { SubsidiaryService } from './services/subsidiary.service';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-subsidiary/app/app.component.html'
})
export class AppComponent implements OnInit {
	form: FormGroup;
	dataToSubsidiaries: SubsidiaryListResponse;
	canDisableSubsidiary: boolean;
  
	constructor(private subsidiaryService: SubsidiaryService) { }
  
	ngOnInit() {
		// TODO traer el rol desde liferay
		let role = ROLES.provider;

		// TOODO traer permisos desde liferay 
		this.canDisableSubsidiary = true; // si tiene permiso de updateSubsidiaryStatus

		// TODO traer permisos desde liferay 
		if (true) { // TODO cambiar: si tiene permiso de readSubsidiaries
			if (role === ROLES.backoffice) {
				// TODO revisar si es posible para el backoffice ver esta pantalla
				// TODO aquí se intentaba coger el id de proveedor desde la ruta y no viene
				this.subsidiaryService.getSubsidiaries( 1 ).subscribe( response => {
					this.dataToSubsidiaries = response;
				});
			} else if (role === ROLES.provider) {
				// TODO traer desde liferay el id de proveedor del proveedor logueado
				this.subsidiaryService.getSubsidiaries( 1 ).subscribe( response => {
					this.dataToSubsidiaries = response;
				});
			}
		}
	}
}