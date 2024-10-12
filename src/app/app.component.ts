import { Component } from '@angular/core';
import { NavbarService } from '@app/shared/navbar/navbar.service';
import { MemoryService } from '@app/memory/memory.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showMenu: boolean = true;

  constructor(private router: Router) {
    // Escuchar los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Si estamos en las rutas que no quieres mostrar el menú
        this.showMenu = !(event.url.includes('/memory-management') || event.url.includes('/processes-management'));
      }
    });
  }

  /*
  constructor(private navbarService: NavbarService, private memoryService: MemoryService){}

  get sideBar_state(){return this.navbarService.state;}

  get inputRequired():boolean{
    return this.memoryService.inputRequired;
  }
  
  get isAddingAProgram():boolean{
    return this.memoryService.addNewProgram;
  }
  */
}
