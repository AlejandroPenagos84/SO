import { Component, Input } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrl: '../table.component.css'
})
export class DynamicTableComponent {
  constructor(private memoryService: MemoryService){}

  @Input()
  currentName: string = '';
  get Processes(): Process[]{
    return this.memoryService.memoryContigous();
  }

  get freeFragmentTable(): Process[] {
    return this.memoryService
      .memoryContigous()
      .filter((process) => process.id === '0')
      .map((process) => ({ ...process}));
  }
}
