import { Route } from '@angular/router';
import { PeopleComponent } from './people.component';
import {AuthGuard} from '../share/auth-guard.service'

export const PeopleRoutes: Route[] = [
  	{
    	path: 'people',
    	component: PeopleComponent,
        canActivateChild:[AuthGuard]
  	}
];