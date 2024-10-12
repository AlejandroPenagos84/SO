import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemoryService } from '@app/memory/memory.service';

@Component({
  selector: 'dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {
  constructor(private memoryService: MemoryService,private route: ActivatedRoute){}

  inputRequired: boolean = true;
  partitionSize:number = 0;
  currentName: string = '';

  ngOnInit() {
      this.memoryService.isContigous = true;
      this.route.url.subscribe((event) => {
        this.currentName = event[0].path;
        this.memoryService.chooseStrategy(event[0].path,this.partitionSize);
        this.memoryService.setInitialContigousMemory();
      });
  }
}
