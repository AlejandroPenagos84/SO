import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MemoryService } from '@app/memory/memory.service';
import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';

@Component({
  selector: 'segmentation-table',
  templateUrl: './segmentation-table.component.html',
  styleUrl: '../table.component.css',
})
export class SegmentationTableComponent {
  constructor(private memoryService: MemoryService) {}

  inputRequired: boolean = true;
  partitionSize: number = 0;

  @Input()
  currentName: string = '';

  get Memory(): UnitMemory[][] {
    const currentSegments: UnitMemory[] =
      this.memoryService.memoryDiscontigous();
    let mapProcesses = new Map<string, UnitMemory[]>();
    let matrixProcesses: UnitMemory[][] = [];

    for (let i: number = 0; i < currentSegments.length; i++) {
      if (mapProcesses.get(currentSegments[i].id) === undefined) {
        mapProcesses.set(currentSegments[i].id, [currentSegments[i]]);
      } else {
        mapProcesses.get(currentSegments[i].id)?.push(currentSegments[i]);
      }
    }

    for (let [id, segments] of mapProcesses) {
      if (id !== '0') matrixProcesses.push(segments);
    }
    return matrixProcesses;
  }

  get freeFragmentTable(): UnitMemory[] {
    return this.memoryService
      .memoryDiscontigous()
      .filter((segment) => segment.id === '0')
      .map((segment) => ({ ...segment }));
  }

}
