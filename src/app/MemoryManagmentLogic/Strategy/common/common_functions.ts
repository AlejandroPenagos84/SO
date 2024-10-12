import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';
import { Process } from '@interfaces/Process.interface';
import {create_unit_memory } from "@memory-logic/Strategy/common/common_variables"

// Primer ajuste
export const first_fit = (memory: Process[] | UnitMemory[], memory_process: number): number => 
{
    let index: number = -1;
    for (let i: number = 0; i < memory.length; i++) {
      if (memory[i].memory >= memory_process && memory[i].id === '0') {
        index = i;
        break;
      }
    }
    return index;
}

// Mejor ajuste
export const best_fit = (memory: Process[]| UnitMemory[], memory_process: number) : number => 
{
    let index:number = -1;
    let diference:number = 0;
    let minDiference:number = -1;
    for (let i: number = 0; i < memory.length; i++) {
      if (memory[i].memory >= memory_process && memory[i].id === '0') {
        diference = memory[i].memory - memory_process;
        if(diference >= 0){
          if(minDiference === -1 || minDiference>diference) 
          {
            minDiference = diference;
            index = i;
          }
        }
      }
    }
    return index;
}

// Peor ajuste
export const worst_fit = (memory: Process[]| UnitMemory[], memory_process: number) : number =>
{
    let index:number = -1;
    let max:number = 0;
    for (let i:number = 0; i < memory.length; i++) {
      if (memory[i].memory > memory_process && memory[i].id === '0') {
        if (max <= memory[i].memory) {
          index = i;
          max = memory[i].memory;
        }
      }
    }
    return index;
}

// Esta funcion permite unir las memoria en blanco para las particiones dinamicas sin compactacion
export const linkMemory = (index: number, memory: Process[] | UnitMemory[]): void =>
{
  if(memory.length != 0 && index !== memory.length -1)
  {
    if(memory[index].id === '0'&& memory[index+1].id === '0')
    {
      memory[index].memory += memory[index + 1].memory;
      memory.splice(index + 1, 1); // Elimina el proceso siguiente
      linkMemory(index, memory); // Llama recursivamente a la función con el mismo índice
    }else{
      linkMemory(index+1,memory);
    }
  }
}


export const splitProcess = (process: Process, offset: number): UnitMemory[][] => {

  const { id, name, heap, stack, bss, data, txt } = process;

  const heap_unit_memory: UnitMemory[] = create_unit_memory_array (id, name + '-heap', 'RW', heap, offset);
  const stack_unit_memory: UnitMemory[] = create_unit_memory_array (id, name + '-stack', 'RW', stack, offset);
  const bss_unit_memory: UnitMemory[] = create_unit_memory_array (id, name + '-bss', 'RW', bss, offset);
  const data_unit_memory: UnitMemory[] = create_unit_memory_array (id, name + '-data', 'RW', data, offset);
  const txt_unit_memory: UnitMemory[] = create_unit_memory_array (id, name + '-txt', 'RX', txt, offset);

  let unit_memory_matrix: UnitMemory[][] = 
  [heap_unit_memory, stack_unit_memory, bss_unit_memory, data_unit_memory, txt_unit_memory];

  return unit_memory_matrix;
}

// Crea los unit_block de una parte del proceso
const create_unit_memory_array = (id: string, name: string, permits: string, memory_unit_memory: number, offset: number)
: UnitMemory[] => {
  const limit: number = Math.pow(2, offset);
  let unitMemoryArray: UnitMemory[] = [];
  let currentMemory: number = memory_unit_memory;

  while (currentMemory > 0) {
    let aux_unit_memory: UnitMemory = create_unit_memory(id, 0, 0, name, permits);

    if (currentMemory > limit) aux_unit_memory.memory = limit;
    else aux_unit_memory.memory = currentMemory;

    unitMemoryArray.push(aux_unit_memory);
    currentMemory -= limit;
  }
  return unitMemoryArray;
}
