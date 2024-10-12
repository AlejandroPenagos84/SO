import { Component } from '@angular/core';
import { Program } from '@interfaces/Program.interface';
import { MemoryService } from '../../memory.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'memory-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {

  constructor(private memoryService: MemoryService, private route: ActivatedRoute){}

  get Programs(): Program[]{
    return this.memoryService.programs();
  }

  addProgram(newProgram: Program):void{
    if (!this.memoryService.allowSelect) return;
    
    let valor: boolean = true;
    if(this.memoryService.isContigous)
      valor = this.memoryService.addProcessContiguous(newProgram);
    else
      valor =this.memoryService.addProcessDiscontiguous(newProgram);
    

    if(!valor)
      alert("No hay suficiente memoria")
  }
}
