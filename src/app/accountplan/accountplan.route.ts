import { Route } from '@angular/router';
import { AccountPlanComponent } from './accountplan.component';
import {AuthGuard} from '../share/auth-guard.service'

export const AccountPlanRoutes: Route[] = [
  	{
    	path: 'accountplan',
    	component: AccountPlanComponent,
        canActivateChild:[AuthGuard]
  	}
];