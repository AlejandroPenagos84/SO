import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MemoryModule } from './memory/memory.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppProcessesComponent } from './processes/app-processes/app-processes.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppProcessesComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
