import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'fixed-page',
  templateUrl: './fixed-page.component.html',
  styleUrl: './fixed-page.component.css'
})
export class FixedPageComponent {
  constructor(private memoryService: MemoryService,private route: ActivatedRoute){}

  inputRequired: boolean = true;
  partitionSize:number = 0;
  currentName: string = '';


  ngOnInit() {
    this.memoryService.isContigous = true;
    this.route.data.subscribe(data => {
      this.inputRequired = data['inputRequired']; // Acceder al parámetro de 'fitType'
    });

    if(!this.inputRequired){
      this.route.url.subscribe((event) => {
        this.currentName = event[0].path;
        this.memoryService.chooseStrategy(event[0].path,this.partitionSize);
        this.memoryService.setInitialContigousMemory();
      });
    }
  }

  // Método para capturar el valor emitido
  handlePartitionSizeChange(partitionSize: number): void {
      this.partitionSize = partitionSize;
      this.inputRequired = false;  // Oculta el form-input cuando recibes el tamaño
      this.memoryService.isContigous = true;

      this.route.url.subscribe((event) => {
        this.currentName = event[0].path;
        this.memoryService.chooseStrategy(event[0].path,partitionSize);
        this.memoryService.setInitialContigousMemory();
      });
  }
}
