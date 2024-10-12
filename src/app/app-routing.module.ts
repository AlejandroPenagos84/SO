import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMemoryComponent } from './memory/app-memory/app-memory.component';
import { AppProcessesComponent } from './processes/app-processes/app-processes.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

const routes: Routes = 
[
  {
    path: '',
    component:HomePageComponent
  },
  {
    path: 'memory-management',
    loadChildren: () => import('./memory/memory-routing.module').then(m=>m.MemoryRoutingModule)
  },
  {
    path: 'processes-management',
    component: AppProcessesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
