import { Component, Input } from '@angular/core';
import { Process } from '@interfaces/Process.interface';

@Component({
  selector: 'table-no-empty-process',
  templateUrl: './table-no-empty-process.component.html',
  styleUrl: '../table.component.css'
})
export class TableNoEmptyProcessComponent {

  @Input()
  Processes: Process[] = [];

  @Input()
  partitions: number[] = [];

  getSinglePartition(process: Process, index: number): number{
    if(process.id !== '0'){
      return this.partitions.length > 0 ? this.partitions[index]*1048576 - process.memory : 0;
    }else{
      return 0;
    }
  }
}
