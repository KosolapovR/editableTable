import {Component, OnInit} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as entities from '../state/entities/actions';
import {select, Store} from '@ngrx/store';
import {getEntities, getJsonEntities, getUploadToTextArea} from '../state/entities/selectors';
import {Observable} from 'rxjs';
import {Entity} from '../state/entities/actions';

declare let $: any;

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {
  isUploadToTextArea$: Observable<boolean>;
  entities$: Observable<Entity>;
  jsonEntities$: Observable<string>;
  textFile: File = null;
  csvFile: File = null;

  constructor(private store: Store) {
    this.isUploadToTextArea$ = this.store.pipe(select(getUploadToTextArea));
    this.jsonEntities$ = this.store.pipe(select(getJsonEntities));
    this.entities$ = this.store.pipe(select(getEntities));
  }

  openTableBlock(): void {
    let json = $('textarea').val().replace(/(['"])?([a-z0-9A-Z_а-яА-ЯёЁ \-]+)(['"])?:/g, '"$2": ');
    debugger;
    json = `{entities: ${json}}`;

    this.downloadJson(json);
  }

  isValid(items: Array<object>): boolean {
    const keysLength = Object.keys(items[0]).length;
    return items.every(obj => Object.keys(obj).length === keysLength);
  }


  readCSVFile($event: any) {
    this.csvFile = $event.target.files[0];

    const self = this;

    let reader = new FileReader();
    reader.readAsText(this.csvFile);

    reader.onload = function() {
      const json = `{entities: ${self.csvToJSON(reader.result)}}`;
      self.downloadJson(json);
    };

    reader.onerror = function(e) {
      console.log(reader.error);
    };
  }

  readTextFile($event: any) {
    this.textFile = $event.target.files[0];

    const self = this;

    let reader = new FileReader();

    reader.readAsText(this.textFile);

    reader.onload = function() {
      const json = `{entities: ${reader.result}}`;
      self.downloadJson(json);
    };

    reader.onerror = function() {
      console.log(reader.error);
    };
  }

  private csvToJSON(csv) {

    let lines = csv.split('\r\n');
    let result = [];

    let headers = lines[0].split(',');

    for (let i = 1; i < lines.length - 1; i++) {

      let obj = {};
      let currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  private downloadJson(json: string) {
    let payload;
    try {
      payload = JSON.parse(json.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
    } catch (e) {
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

  ngOnInit(): void {
  }
}
