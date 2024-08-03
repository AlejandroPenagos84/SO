import { Component, Input } from '@angular/core';
import info from "./items.json"
import { Item } from '@item-interface/Item.interface';
import { NavbarService } from '@app/shared/navbar/navbar.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items: Item[] = info;

  @Input()
  showInput: boolean = false;

  constructor(private navbarService: NavbarService){}

  get sideBar_state(){return this.navbarService.state;}
}
