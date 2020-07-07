import {Component, OnInit} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as entities from '../state/entities/actions';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {
  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  openTableBlock(val): void {
    const json = `{entities: ${val}}`;
    let payload;
    try {
      payload = JSON.parse(json.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
    }catch (e) {
      console.log('Не верный формат json');
    }
    payload.entities = payload.entities.map((item, i) => ({id: i + 1, ...item}));

    if (this.isValid(payload.entities)) {
      this.store.dispatch(new entities.DownloadJsonAction(payload));
      this.store.dispatch(new layout.OpenTableAction());
    } else {
      console.log('Все объекты должны иметь одинаковое количество пар ключ-значение');
    }

  }

  isValid(items: Array<object>): boolean {
    const keysLength = Object.keys(items[0]).length;
    return items.every(obj => Object.keys(obj).length === keysLength);
  }
}
