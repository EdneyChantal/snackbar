import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MenuComponent }    from './share/menu/menu.component';
import {HomeComponent}      from './share/menu/home.component';
import {AuthGuard}       from './share/auth-guard.service';
import {PeopleRoutes} from './people/people.route';

const menuRoutes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '',
        component:HomeComponent,
  canActivateChild:[AuthGuard] },
        ...PeopleRoutes,/*
        ...ParameterRoutes,
        ...PortariaRoutes*/
       ],
    
    
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class MenuRoutingModule {}
