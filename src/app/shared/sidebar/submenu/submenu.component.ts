import { Component, Input } from '@angular/core';
import { Item } from '@item-interface/Item.interface';
import { NavbarService } from '@app/shared/navbar/navbar.service';

@Component({
  selector: 'sidebar-submenu',
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css',
})
export class SubmenuComponent {
  @Input()
  subItems: Item[] | undefined = [];

  constructor(private navbarService: NavbarService) {}

  // Si tiene subItems, los muestra, si no, guarda el nombre para saber
  setAction(subItem: Item) {
    if (subItem.option) {
      this.navbarService.set_showSideBar(!this.navbarService.state);
    }
  }
}
