import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemoryService } from '@app/memory/memory.service';


@Component({
  selector: 'segmentation-page',
  templateUrl: './segmentation-page.component.html',
  styleUrl: './segmentation-page.component.css'
})
export class SegmentationPageComponent{
  constructor(private memoryService: MemoryService,private route: ActivatedRoute){}

  inputRequired: boolean = true;
  partitionSize:number = 0;
  currentName: string = '';

  // Método para capturar el valor emitido
  handlePartitionSizeChange(partitionSize: number): void {
      this.partitionSize = partitionSize;
      this.inputRequired = false;  // Oculta el form-input cuando recibes el tamaño
      this.memoryService.isContigous = false;

      this.route.url.subscribe((event) => {
        this.currentName = event[0].path;
        this.memoryService.chooseStrategy(event[0].path,partitionSize);
        this.memoryService.setInitialDiscontigousMemory();
      });
  }
}
