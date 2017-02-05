import { Component } from '@angular/core';
import { AuthService} from '../../auth.service';
import {Router}   from '@angular/router';
import {Inject } from '@angular/core';
import {AppConfig} from '../../app-config' ;

@Component({
	
    selector: 'top-nav',
    templateUrl: './topnav.html',
})

export class TopNavComponent {
	constructor(private authservice:AuthService,private router:Router,@Inject('APP_CONFIG') private config: AppConfig) {

	}

    logOut() {
      this.authservice.isLoggedIn = false;
      this.router.navigate(['/login']);
	}

	changeTheme(color: string): void {
	/*	var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');*/
	}

	rtl(): void {
	  	/*var body: any = $('body');
		body.toggleClass('rtl');*/
	}

	sidebarToggler(): void  {
		/*var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');*/
	}
}
