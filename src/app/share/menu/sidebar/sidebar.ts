import { Component } from '@angular/core';
import {Inject } from '@angular/core';
import {AppConfig} from '../../app-config' ;

@Component({
	selector: 'sidebar-cmp',
	templateUrl: './sidebar.html'
})

export class SidebarComponent {
	isActive = false;
	showMenu: string = '';
	xitensMenu;
    constructor(@Inject('APP_CONFIG') private config: AppConfig){
         this.xitensMenu = config.itensMenu;

	}

	eventCalled() {
		this.isActive = !this.isActive;
	}
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
