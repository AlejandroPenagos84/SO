import { Component } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';

@Component({
  selector: 'dynamic-graphics',
  templateUrl: './dynamic-graphics.component.html',
  styleUrl: '../graphics.component.css'
})
export class DynamicGraphicsComponent {
  sizePartition:number = 48
  highlightedId: string | null = null; // Variable para almacenar el id resaltado

  constructor(private memoryService: MemoryService){}

  get Processes():Process[]{
    return [...this.memoryService.memoryContigous()].reverse();
  }

  onHover(segmentId: string) {
    this.highlightedId = segmentId;
  }

  onLeave() {
    this.highlightedId = null;
  }

  onClick(idProcess: string){
    this.memoryService.removeProcessContiguous(idProcess);
  }
}
