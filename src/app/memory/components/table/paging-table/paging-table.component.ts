import { Component, Input } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';

@Component({
  selector: 'paging-table',
  templateUrl: './paging-table.component.html',
  styleUrl: '../table.component.css'
})
export class PagingTableComponent {
  constructor(private memoryService: MemoryService) {}

  inputRequired: boolean = true;
  partitionSize: number = 0;

  @Input()
  currentName: string = '';

  get Memory(): UnitMemory[]{
    return this.memoryService.memoryDiscontigous();
  }

  get Processes(): UnitMemory[][] {
    const currentPages: UnitMemory[] =
      this.memoryService.memoryDiscontigous();
    let mapProcesses = new Map<string, UnitMemory[]>();
    let matrixProcesses: UnitMemory[][] = [];

    for (let i: number = 0; i < currentPages.length; i++) {
      if (mapProcesses.get(currentPages[i].id) === undefined) {
        mapProcesses.set(currentPages[i].id, [currentPages[i]]);
      } else {
        mapProcesses.get(currentPages[i].id)?.push(currentPages[i]);
      }
    }

    for (let [id, pages] of mapProcesses) {
      if (id !== '0') matrixProcesses.push(pages);
    }
    return matrixProcesses;
  }

  get getNumberPagingArray(): number[] {
    return this.memoryService.getNumberPagingArray();
  }
}
