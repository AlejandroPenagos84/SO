import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicsComponent } from './graphics/graphics.component';
import { ProgramsComponent } from './programs/programs.component';
import { TableComponent } from './table/table.component';
import { NumberOnlyPipe } from '../pipes/number-only.pipe';
import { EmptyProcessComponent } from './graphics/empty-process/empty-process.component';
import { CleanAndCapitalizePipe } from '../pipes/clean-and-capitalize.pipe';
import { TableEmptyProcessComponent } from './table/table-empty-process/table-empty-process.component';
import { TableNoEmptyProcessComponent } from './table/table-no-empty-process/table-no-empty-process.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [GraphicsComponent, ProgramsComponent,TableComponent, NumberOnlyPipe, EmptyProcessComponent,CleanAndCapitalizePipe, TableEmptyProcessComponent, TableNoEmptyProcessComponent],
  imports: [
    CommonModule,
    MatTooltipModule 
],
  exports: [GraphicsComponent, ProgramsComponent,TableComponent]
})
export class MemoryModule { }
