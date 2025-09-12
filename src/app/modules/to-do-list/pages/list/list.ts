import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';

//Components
import { InputAddItem } from '../../components/input-add-item/input-add-item';
import { InputListItem } from '../../components/input-list-item/input-list-item';

//Interface
import { IListItems } from '../../interface/IListItems.interface';

//Enum
import { ELocalStorage } from '../../../enum/ELocalStorage.enum';

@Component({
  selector: 'app-list',
  imports: [InputAddItem, InputListItem],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parceItems());
  public getListItems = this.#setListItems.asReadonly();

  #parceItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
  }

  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify([...this.#setListItems(), value]));

    return this.#setListItems.set(this.#parceItems());
  }
  public listItemStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) => {
      if (value === 'pending') {
        return !res.checked;
      }
      if (value === 'completed') {
        return res.checked;
      }
      return res;
    });
  }
  public updateItemCheckbox(newItem: { id: string; checked: boolean }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }
        return res;
      });
      return oldValue;
    });

    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItems()));
  }

  public updateItemText(newItem: { id: string; value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
          return res;
        }
        return res;
      });
      return oldValue;
    });

    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItems()));
  }

  public deleteItemText(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não podera reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete o item',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
      return oldValue.filter((res) => res.id !== id);
    });

    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItems()));
      } 
  });
   
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não podera reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete tudo',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parceItems());
      }
    });
  }
}
