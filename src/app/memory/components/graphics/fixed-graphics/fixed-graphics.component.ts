import { Component } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';

@Component({
  selector: 'fixed-graphics',
  templateUrl: './fixed-graphics.component.html',
  styleUrl: '../graphics.component.css'
})
export class FixedGraphicsComponent {
  sizePartition:number = 48
  highlightedId: string | null = null; // Variable para almacenar el id resaltado

  constructor(private memoryService: MemoryService){}
  
  get Processes():Process[]{
    return [...this.memoryService.memoryContigous()].reverse();
  }
  
  get Partitions(): number[]{
    return [...this.memoryService.fixedPartititions()].reverse();
  }


  getSinglePartition(process: Process, index: number): number{
    if(process.id !== '0'){
      console.log(this.Partitions)
      return this.Partitions.length > 0 ? this.Partitions[index]*1048576 - process.memory : 0;
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

  onClick(idProcess: string){
    this.memoryService.removeProcessContiguous(idProcess);
  }
}
