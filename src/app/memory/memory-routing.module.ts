import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedPageComponent } from './pages/fixed-page/fixed-page.component';
import { AppMemoryComponent } from './app-memory/app-memory.component';
import { SegmentationPageComponent } from './pages/segmentation-page/segmentation-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { PagingPageComponent } from './pages/paging-page/paging-page.component';
import { FormProgramComponent } from '@app/shared/form/form-program/form-program.component';


const routes: Routes = 
[
  {
  path: '',
  component:AppMemoryComponent,
  children:
  [
    {
      path:'static',
      component:FixedPageComponent,
      data: {inputRequired: true}
    },
    {
      path:'variable_first-fit',
      component:FixedPageComponent,
      data: {inputRequired: false}
    },
    {
      path:'variable_best-fit',
      component:FixedPageComponent,
      data: {inputRequired: false}
    },
    {
      path:'variable_worst-fit',
      component:FixedPageComponent,
      data: {inputRequired: false}
    },
    {
      path:'no-compaction_first-fit',
      component:DynamicPageComponent
    },
    {
      path:'no-compaction_worst-fit',
      component:DynamicPageComponent
    },
    {
      path:'no-compaction_best-fit',
      component:DynamicPageComponent
    },
    {
      path:'compaction',
      component:DynamicPageComponent
    },
    {
      path:'segmentation_first-fit',
      component:SegmentationPageComponent
    },
    {
      path:'segmentation_worst-fit',
      component:SegmentationPageComponent
    },
    {
      path:'segmentation_best-fit',
      component:SegmentationPageComponent
    },
    {
      path:'paging',
      component:PagingPageComponent
    },
    {
      path:'form-program',
      component:FormProgramComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoryRoutingModule { }
