import { Component } from '@angular/core';
import { NavbarService } from '@app/shared/navbar/navbar.service';
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private navbarService: NavbarService){}

  get state(): boolean{
    return this.navbarService.state;
  }

  set_newState(): void {
    this.navbarService.set_showSideBar(!this.navbarService.state);
  };

}
