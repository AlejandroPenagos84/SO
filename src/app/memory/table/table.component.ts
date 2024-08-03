import { Component } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { Process } from '@interfaces/Process.interface';

@Component({
  selector: 'memory-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  constructor(private memoryService: MemoryService){}

  get Processes():Process[]{
    return this.memoryService.Processes;
  }

  get Partitions(): number[]{
    return this.memoryService.Partitions;
  }

  get noEmptyProcesses(): Process[]{
    const noEmptyProcesses: Process[] = this.Processes.filter(process => process.id !== '0');
    return [...noEmptyProcesses];
  }

  get emptyProcesses(): Process[]{
    const emptyProcesses: Process[] = this.Processes.filter(process => process.id === '0');
    return [...emptyProcesses];
  }

  get currentName():string{
    return this.memoryService.currentPartition;
  }
}
