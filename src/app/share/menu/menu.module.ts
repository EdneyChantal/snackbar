import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule }  from '../../menu-routing.module';
import {TopNavComponent} from './topnav/topnav';
import {SidebarComponent} from './sidebar/sidebar'
import {HomeComponent} from './home.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoadingModule} from '../loading/loading.module'

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    NgbModule,
    LoadingModule
  ],
  declarations: [MenuComponent,TopNavComponent,SidebarComponent,HomeComponent]
})
export class MenuModule { }
