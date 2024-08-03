import { Component } from '@angular/core';
import { NavbarService } from '@app/shared/navbar/navbar.service';
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private navbarService: NavbarService, private memoryService: MemoryService){}

  get sideBar_state(){return this.navbarService.state;}

  get inputRequired():boolean{
    return this.memoryService.inputRequired;
  }
  
  get isAddingAProgram():boolean{
    return this.memoryService.addNewProgram;
  }

}
