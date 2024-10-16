import { Component } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';

@Component({
  selector: 'paging-graphics',
  templateUrl: './paging-graphics.component.html',
  styleUrl: '../graphics.component.css'
})
export class PagingGraphicsComponent {
  sizePartition:number = 500
  highlightedId: string | null = null; // Variable para almacenar el id resaltado

  constructor(private memoryService: MemoryService){}

  get Pages():UnitMemory[]{
    return [...this.memoryService.memoryDiscontigous()].reverse();
  }

  get Partitions(): number[]{
    return [...this.memoryService.getNumberPagingArray()].reverse();
  }


  getSinglePartition(process: UnitMemory, index: number): number{
    if(process.id !== '0'){
      return this.Partitions.length > 0 ? this.Partitions[index] - process.memory : 0;
    }else{
      return 0;
    }
  }
  

  onHover(segmentId: string) {
    this.highlightedId = segmentId;
  }

  onLeave() {
    this.highlightedId = null;
  }

  onClick(idProcess: string, unitMemory: UnitMemory){
    console.log(idProcess)
    if(unitMemory.name !== 'SO')
      this.memoryService.removeProcessDiscontiguous(idProcess);
  }
}
