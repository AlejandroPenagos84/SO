import { Component } from '@angular/core';
import { NavbarService } from '@app/shared/navbar/navbar.service';
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrl: '../form.component.css'
})
export class FormInputComponent {
  inputInfo: string = 'Tamaño partición';
  partitionSize: number = 0;

  constructor(private navbarService: NavbarService, private memoryService: MemoryService){}
  get sideBar_state(){return this.navbarService.state;}

  emitParition():void{
    console.log(this.partitionSize);
    this.memoryService.setInputRequired(!this.memoryService.inputRequired);
    this.memoryService.setCurrentSizePartition(this.partitionSize);
    this.memoryService.chooseStrategy();
  }
}
