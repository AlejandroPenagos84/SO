import { Component, Input } from '@angular/core';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';
import { UnitMemory } from '@app/MemoryManagmentLogic/interfaces/UnitMemory.interface';

@Component({
  selector: 'free-fragments-table',
  templateUrl: './free-fragments-discontigous.component.html',
  styleUrl: '../table.component.css'
})
export class FreeFragmentsDiscontigousComponent {
@Input()
elements: UnitMemory[] = []
}
