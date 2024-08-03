import { Component } from '@angular/core';
import { Program } from '@interfaces/Program.interface';
import { MemoryService } from '../memory.service';
@Component({
  selector: 'memory-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {

  constructor(private memoryService: MemoryService){}

  get Programs(): Program[]{
    return this.memoryService.Programs;
  }

  addProgram(newProgram: Program):void{
    this.memoryService.addProgram(newProgram);
  }
}
