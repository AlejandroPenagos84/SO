import { Component, Input } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';

@Component({
  selector: 'fixed-table',
  templateUrl: './fixed-table.component.html',
  styleUrl: '../table.component.css'
})
export class FixedTableComponent {
  constructor(private memoryService: MemoryService){}

  @Input()
  currentName: string = '';
  
  get Processes(): Process[]{
    return this.memoryService.memoryContigous();
  }

  get Partitions(): number[]{
    return [...this.memoryService.fixedPartititions()];
  }

  getSinglePartition(process: Process, index: number): number{
    if(process.id !== '0'){
      return this.Partitions.length > 0 ? this.Partitions[index]*1048576 - process.memory : 0;
    }else{
      return 0;
    }
  }
}
