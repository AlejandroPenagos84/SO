import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  showSidebar: boolean = false;
  constructor() { }

  get state(): boolean{return this.showSidebar;}
  set_showSideBar(newState: boolean): void {this.showSidebar = newState}
}
