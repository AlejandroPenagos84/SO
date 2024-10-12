import { Component } from '@angular/core';
import { NavbarService } from '@app/shared/navbar/navbar.service';

@Component({
  selector: 'app-app-memory',
  templateUrl: './app-memory.component.html',
  styleUrl: './app-memory.component.css'
})
export class AppMemoryComponent {
  
  constructor(private navbarService: NavbarService){}

  get sideBar_state(){return this.navbarService.state;}
}
