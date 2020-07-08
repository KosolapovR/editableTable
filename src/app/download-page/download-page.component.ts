import {Component, OnInit} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as entities from '../state/entities/actions';
import {select, Store} from '@ngrx/store';
import {getEntities, getJsonEntities, getUploadToTextArea} from '../state/entities/selectors';
import {Observable} from 'rxjs';
import {Entity} from '../state/entities/actions';
declare var $: any;

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {
  isUploadToTextArea$: Observable<boolean>;
  textAreaValue;
  entities$: Observable<Entity>;
  jsonEntities$: Observable<string>;

  constructor(private store: Store) {
    this.isUploadToTextArea$ = this.store.pipe(select(getUploadToTextArea));
    this.jsonEntities$ = this.store.pipe(select(getJsonEntities));
    this.entities$ = this.store.pipe(select(getEntities));
  }

  ngOnInit(): void {
  }

  openTableBlock(): void {
    const json = `{entities: ${$('textarea').val()}}`;
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
