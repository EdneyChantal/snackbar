import { Route } from '@angular/router';
import { EstablishmentComponent } from './establishment.component';
import {AuthGuard} from '../auth-guard.service'

export const EstablishmentRoutes: Route[] = [
  	{
    	path: 'establishment',
    	component: EstablishmentComponent,
        canActivateChild:[AuthGuard]
  	}
];