import { Component } from '@angular/core';
import { Program } from '@interfaces/Program.interface';
import { getRandomInt } from "@memory-logic/Strategy/util/util_functions";
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'form-program',
  templateUrl: './form-program.component.html',
  styleUrl: '../form.component.css'
})
export class FormProgramComponent {
  constructor(private memoryService:MemoryService){}

  program: Program ={
    id: getRandomInt(10000).toString(),
    key: getRandomInt(10000),
    name: '',
    bss: 0,
    data: 0,
    txt: 0,
  }

  emitProgram():void{
    this.memoryService.addProgramToChoose(this.program);
  }
}
