import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmenuComponent } from './sidebar/submenu/submenu.component';
import { MenuComponent } from './sidebar/menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { FormsModule } from '@angular/forms';
import { FormProgramComponent } from './form/form-program/form-program.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidebarComponent, SubmenuComponent, MenuComponent, NavbarComponent, FormInputComponent, FormProgramComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[SidebarComponent, NavbarComponent, FormInputComponent, FormProgramComponent]

})
export class SharedModule { }
