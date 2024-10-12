import { Component, Input } from '@angular/core';
import { Process } from '@app/MemoryManagmentLogic/interfaces/Process.interface';

@Component({
  selector: 'free-fragments-contigous',
  templateUrl: './free-fragments-contigous.component.html',
  styleUrl: '../table.component.css'
})
export class FreeFragmentsContigousComponent {
  @Input()
  elements: Process[] = []
}
