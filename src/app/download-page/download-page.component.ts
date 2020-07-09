import {Component, OnInit} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as entities from '../state/entities/actions';
import {select, Store} from '@ngrx/store';
import {getEntities, getErrorMessage, getJsonEntities, getUploadToTextArea} from '../state/entities/selectors';
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
  errorMsg$: Observable<string>;

  constructor(private store: Store) {
    this.isUploadToTextArea$ = this.store.pipe(select(getUploadToTextArea));
    this.jsonEntities$ = this.store.pipe(select(getJsonEntities));
    this.entities$ = this.store.pipe(select(getEntities));
    this.errorMsg$ = this.store.pipe(select(getErrorMessage));
  }

  openTableBlock(): void {
    let json = $('textarea').val().replace(/(['"])?([a-z0-9A-Z_а-яА-ЯёЁ \-]+)(['"])?([ ]*)?:/g, '"$2": ');
    json = `{"entities": ${json}}`;

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
      let arr = self.CSVtoArray(reader.result);
      let json = self.arrayToJson(arr);
      debugger;
      self.downloadJson(json, true);
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

  private downloadJson(json: string, csv: boolean = false) {
    let payload;
    debugger;
    try {
      if(!csv){
        payload = JSON.parse(json.replace(/(['"])?([ a-z0-9A-Z_а-яА-Я]+)(['"])?:/g, '"$2": '));
      }else{
        payload = JSON.parse(json);
      }
    } catch (e) {
      this.store.dispatch(new entities.InvalidJsonAction('Неверный формат json'));
    }

    payload.entities = payload.entities.map((item, i) => ({id: i + 1, ...item}));

    if (this.isValid(payload.entities)) {
      this.store.dispatch(new entities.InvalidJsonAction(''));
      this.store.dispatch(new entities.DownloadJsonAction(payload));
      this.store.dispatch(new layout.OpenTableAction());
    } else {
      this.store.dispatch(new entities.InvalidJsonAction(
        'Все объекты должны иметь одинаковое количество пар ключ-значение'
      ));
    }
  }

  arrayToJson(arr: Array<Array<any>>): string{
    let json = '';
    const entitiesArray = [];
    for(let row = 1; row < arr.length; row++){
      let entity = {};
      for(let col = 0; col < arr[0].length; col++){
        entity[arr[0][col]] = arr[row][col];
      }
      entitiesArray.push(entity);
    }
    json = `{"entities": ${JSON.stringify(entitiesArray)}}`;
    return json
  }

  CSVtoArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
      if ('"' === l) {
        if (s && l === p) row[i] += l;
        s = !s;
      } else if (',' === l && s) l = row[++i] = '';
      else if ('\n' === l && s) {
        if ('\r' === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [l = '']; i = 0;
      } else row[i] += l;
      p = l;
    }
    ret.pop();
    return ret;
  };

  ngOnInit(): void {
  }
}
