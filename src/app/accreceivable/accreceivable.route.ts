import { Route } from '@angular/router';
import {AccreceivableComponent } from './accreceivable.component';
import {AuthGuard} from '../share/auth-guard.service'

export const AccReceivableRoute : Route[] = [
  	{
    	path: 'accreceivable',
    	component: AccreceivableComponent,
        canActivateChild:[AuthGuard]
  	}
];