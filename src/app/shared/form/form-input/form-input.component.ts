import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarService } from '@app/shared/navbar/navbar.service';
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrl: '../form.component.css',
})
export class FormInputComponent {
  inputInfo: string = 'Tamaño partición';
  constructor(private navbarService: NavbarService) {}

  @Output() partitionSizeChange = new EventEmitter<number>();
  partitionSize: number = 0;

  get sideBar_state() {
    return this.navbarService.state;
  }

  emitPartitionSize() {
    if (this.partitionSize > 0) {
      this.partitionSizeChange.emit(this.partitionSize); // Emitir el valor al componente padre
    }
  }
}
