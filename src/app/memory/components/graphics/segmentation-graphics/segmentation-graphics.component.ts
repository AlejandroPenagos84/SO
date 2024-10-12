import { Component } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';

@Component({
  selector: 'segmentation-graphics',
  templateUrl: './segmentation-graphics.component.html',
  styleUrl: '../graphics.component.css'
})
export class SegmentationGraphicsComponent {
  sizePartition:number = 1000
  highlightedId: string | null = null; // Variable para almacenar el id resaltado

  constructor(private memoryService: MemoryService){}

  get Segments():UnitMemory[]{
    return [...this.memoryService.memoryDiscontigous()].reverse();
  }

  onHover(segmentId: string) {
    this.highlightedId = segmentId;
  }

  onLeave() {
    this.highlightedId = null;
  }

  onClick(idProcess: string){
    this.memoryService.removeProcessDiscontiguous(idProcess);
  }
}
