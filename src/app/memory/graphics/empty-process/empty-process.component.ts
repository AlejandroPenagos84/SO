import { Component, Input } from '@angular/core';

@Component({
  selector: 'graphics-empty-process',
  templateUrl: './empty-process.component.html',
  styleUrl: './empty-process.component.css'
})
export class EmptyProcessComponent {

  @Input()
  tamDiv!: number;
}
