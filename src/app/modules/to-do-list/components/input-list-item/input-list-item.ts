import { Component, EventEmitter, Input, Output, output } from '@angular/core';

//interface
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  imports: [],
  templateUrl: './input-list-item.html',
  styleUrl: './input-list-item.scss',
})
export class InputListItem {
    @Input({ required: true }) public inputListItems: IListItems[] = []; 

    @Output() public outputUpdateItemCheckbox = new EventEmitter<{
      id: string; 
      checked: boolean;
    }>();

    public updateItemCheckbox(checked: boolean, id: string) {
     this.outputUpdateItemCheckbox.emit({ id, checked });
    }

    @Output() public outputUpdateItemText = new EventEmitter<{
      id: string; 
      value: string;
    }>();

    public updateItemText(value: string, id: string) {
     this.outputUpdateItemText.emit({ id, value });
    }
    
    @Output() public outputDeleteItem = new EventEmitter<string>();

    public deleteItemText( id: string) {
     this.outputDeleteItem.emit(id);
    }
}
