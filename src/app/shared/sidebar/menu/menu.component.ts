import { Component, Input } from '@angular/core';
import { Item } from '@item-interface/Item.interface';
import { NavbarService } from '@app/shared/navbar/navbar.service';


@Component({
  selector: 'sidebar-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input()
  items: Item[] = [];
  currentName: string | null = null;
  subItems: Item[] | undefined = [];

  constructor(private navbarService: NavbarService){}

  // Si tiene subItems, los muestra, si no, guarda el nombre para saber 
  setAction(item: Item){
    this.set_subItems(item.name);
    if(item.option) {
      this.navbarService.set_showSideBar(!this.navbarService.state);
    }; 
  }

  private set_subItems(nameItem: string): void {
    if (this.currentName === nameItem) {
      this.subItems = this.subItems ? [] : this.items.find(item => item.name === nameItem)?.subOptions;
      this.currentName = null;
    } else {
      this.currentName = nameItem;
      this.subItems = this.items.find(item => item.name === nameItem)?.subOptions;
    }
  }
}
