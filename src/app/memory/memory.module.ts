import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsComponent } from '@app/memory/components/programs/programs.component';
import { NumberOnlyPipe } from '@app/pipes/number-only.pipe';
import { CleanAndCapitalizePipe } from '@app/pipes/clean-and-capitalize.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SegmentationTableComponent } from './components/table/segmentation-table/segmentation-table.component';
import { FixedPageComponent } from './pages/fixed-page/fixed-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SegmentationPageComponent } from './pages/segmentation-page/segmentation-page.component';
import { PagingPageComponent } from './pages/paging-page/paging-page.component';
import { PagingTableComponent } from './components/table/paging-table/paging-table.component';
import { FixedTableComponent } from './components/table/fixed-table/fixed-table.component';
import { DynamicTableComponent  } from './components/table/dynamic-table/dynamic-table.component';
import { CompactionTableComponent } from './components/table/compaction-table/compaction-table.component';
import { FreeFragmentsDiscontigousComponent } from './components/table/free-fragments-discontigous/free-fragments-discontigous.component';
import { FixedGraphicsComponent } from './components/graphics/fixed-graphics/fixed-graphics.component';
import { DynamicGraphicsComponent } from './components/graphics/dynamic-graphics/dynamic-graphics.component';
import { AppMemoryComponent } from './app-memory/app-memory.component';
import { MemoryRoutingModule } from './memory-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { SegmentationGraphicsComponent } from './components/graphics/segmentation-graphics/segmentation-graphics.component';
import { FreeFragmentsContigousComponent } from './components/table/free-fragments-contigous/free-fragments-contigous.component';
import { PagingGraphicsComponent } from './components/graphics/paging-graphics/paging-graphics.component';
@NgModule({
  declarations: [ProgramsComponent, NumberOnlyPipe, CleanAndCapitalizePipe, SegmentationTableComponent, FixedPageComponent, DynamicPageComponent , SegmentationPageComponent, PagingPageComponent, FixedTableComponent, DynamicTableComponent , CompactionTableComponent, FreeFragmentsDiscontigousComponent, FixedGraphicsComponent, DynamicGraphicsComponent, AppMemoryComponent,SegmentationGraphicsComponent, FreeFragmentsContigousComponent,PagingTableComponent, PagingGraphicsComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MemoryRoutingModule,
    SharedModule
],
  exports: [ProgramsComponent]
})
export class MemoryModule { }
