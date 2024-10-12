import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';
import { Process } from '@interfaces/Process.interface';
import { Program } from '@interfaces/Program.interface';

import {
  create_empty_unit_memory,
  create_process,
  MEGABYTE,
} from '@memory-logic/Strategy/common/common_variables';
import { HEAP, STACK } from '@memory-logic/Strategy/common/common_variables';
import { ProcessDiscontiguousStrategy } from '@memory-logic/Strategy/interfaces/ProcessStrategy.interface';
import {
  first_fit,
  splitProcess,
} from '@memory-logic/Strategy/common/common_functions';

export class Paging implements ProcessDiscontiguousStrategy {
  private partitions: number[];

  constructor(partitions: number[]) {
    this.partitions = partitions;
  }

  addProcess(
    newProgram: Program,
    memory: UnitMemory[],
    totalMemory: number,
    offset: number
  ): { memory: UnitMemory[]; added: boolean; newTotalMemory: number } {
    const { name, bss, data, txt } = newProgram;
    const memory_process: number =
      newProgram.name === 'SO'
        ? bss + data + txt
        : bss + data + txt + HEAP + STACK;
    let added: boolean = false;

    let newTotalMemory: number = totalMemory;

    const new_process: Process = create_process(
      newProgram,
      memory_process,
      0,
      name
    );

    // Verificar si hay suficiente memoria antes de buscar un índice
    let pages: UnitMemory[][] = splitProcess(new_process, offset);

    if (newProgram.id === 'SO')
      pages = pages
        .filter(
          (subArray) =>
            !subArray.some(
              (page) => page.name === 'SO-heap' || page.name === 'SO-stack'
            ) // Filtra las sub-matrices
        )
        .map((subArray) =>
          subArray.map((page) => {
            // Reemplaza 'SO-txt' por 'SO'
            if (page.name === 'SO-txt') {
              return { ...page, name: 'SO' }; // Crea un nuevo objeto con el nombre cambiado
            }
            return page; // Retorna el objeto sin cambios
          })
        );
    const totalElements = pages.reduce(
      (total, subArray) => total + subArray.length,
      0
    );
    const freePartitions = memory.filter(
      (element) => element.id === '0'
    ).length;
    if (totalElements <= freePartitions) {
      for (let i: number = 0; i < pages.length; i++) {
        for (let j: number = 0; j < pages[i].length; j++) {
          const index: number = first_fit(memory, pages[i][j].memory);
          pages[i][j].frame = index;
          pages[i][j].base = memory[index].base; // Ajusta la base del segmento
          memory[index] = pages[i][j]; // Asigna el segmento a la memoria
          newTotalMemory -=
            pages[i][j].memory + (this.partitions[index] - pages[i][j].memory); // Decrementa la memoria total disponible
        }
      }
      added = true;
    }
    return { memory, added, newTotalMemory };
  }

  removeProcess(
    idUnitMemory: string,
    memory: UnitMemory[],
    totalMemory: number
  ): { memory: UnitMemory[]; removed: boolean; newTotalMemory: number } {
    let page_index: number = memory.findIndex(
      (page) => page.id === idUnitMemory
    );
    let removed: boolean = false;
    let newTotalMemory: number = totalMemory;

    while (page_index !== -1) {
      const page_deleted = memory[page_index];
      memory[page_index] = create_empty_unit_memory(
        page_deleted.base,
        this.partitions[page_index],
        page_deleted.key
      );
      removed = true;
      newTotalMemory +=
        page_deleted.memory +
        (this.partitions[page_index] - page_deleted.memory);
      page_index = memory.findIndex((segment) => segment.id === idUnitMemory);
    }
    return { memory, removed, newTotalMemory };
  }
}
