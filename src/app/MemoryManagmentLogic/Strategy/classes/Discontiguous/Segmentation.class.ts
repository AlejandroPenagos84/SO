import { Process } from "@interfaces/Process.interface";
import { Program } from "@interfaces/Program.interface";
import { UnitMemory } from "@app/MemoryManagmentLogic/interfaces/UnitMemory.interface";

import {create_empty_unit_memory, create_process} from "@memory-logic/Strategy/common/common_variables";
import { HEAP, STACK } from "@memory-logic/Strategy/common/common_variables";

import { linkMemory, splitProcess } from "@memory-logic/Strategy/common/common_functions";
import { ProcessDiscontiguousStrategy } from "@memory-logic/Strategy/interfaces/ProcessStrategy.interface";

export class Segmentation implements ProcessDiscontiguousStrategy {
  private fit: (memory: UnitMemory[], memory_process: number) => number;
  constructor(fit: (memory: UnitMemory[], memory_process: number) => number) {
    this.fit = fit;
  }

  addProcess(newProgram: Program, memory: UnitMemory[], totalMemory: number, offset: number): 
  { memory: UnitMemory[], added: boolean, newTotalMemory: number } {

    const { name, bss, data, txt } = newProgram;
    const memory_process: number = bss + data + txt + HEAP + STACK;
    let added: boolean = false;
    let newTotalMemory: number = totalMemory;
    let new_process: Process = create_process(newProgram, memory_process, 0, name);

    if (newTotalMemory >= memory_process) {
      const segments: UnitMemory[][] = splitProcess(new_process, offset);
      
      for (let i: number = 0; i < segments.length; i++) {
        for (let j: number = 0; j < segments[i].length; j++) {
          const index: number = this.fit(memory, segments[i][j].memory);
          segments[i][j].base = memory[index].base;
          memory[index].base += segments[i][j].memory;
          memory[index].memory -= segments[i][j].memory;
          memory = [...memory.slice(0, index), segments[i][j], ...memory.slice(index)];
          newTotalMemory -= segments[i][j].memory;
        }
      }
      added = true;
    }
    return { memory, added, newTotalMemory};
  }


  removeProcess(idUnitMemory: string, memory: UnitMemory[], totalMemory: number): 
  { memory: UnitMemory[]; removed: boolean, newTotalMemory: number} {

    let segment_index: number = memory.findIndex(segment => segment.id === idUnitMemory);
    let removed: boolean = false;
    let newTotalMemory: number = totalMemory;

    while (segment_index !== -1) {
      const segment_deleted = memory[segment_index];
      memory[segment_index] = create_empty_unit_memory(segment_deleted.base, segment_deleted.memory, segment_deleted.key);
      removed = true;
      newTotalMemory += segment_deleted.memory;
      segment_index = memory.findIndex(segment => segment.id === idUnitMemory);
    }
    linkMemory(0, memory);
    return { memory, removed, newTotalMemory };
  }
}