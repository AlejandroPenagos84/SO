import { Component, Input } from '@angular/core';
import { Process } from '@interfaces/Process.interface';

@Component({
  selector: 'table-empty-process',
  templateUrl: './table-empty-process.component.html',
  styleUrl: '../table.component.css'
})
export class TableEmptyProcessComponent {

  @Input()
  Processes: Process[] = [];

}
