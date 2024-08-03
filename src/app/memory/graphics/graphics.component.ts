import { Component } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { Process } from '@interfaces/Process.interface';

@Component({
  selector: 'memory-graphics',
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css'
})
export class GraphicsComponent {
  constructor(private memoryService: MemoryService){}

  get Processes(): Process[]{
    return this.memoryService.Processes.reverse();
  }

  getSinglePartition(index: number): number{
    return this.memoryService.Partitions.length > 0 ? this.memoryService.Partitions.reverse()[index]*1048576 : 0;
  }

  removeProcess(idProcess: string):void{
    this.memoryService.removeProcess(idProcess);
  }
}
