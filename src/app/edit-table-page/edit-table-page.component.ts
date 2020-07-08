import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as _ from 'lodash';
import * as entities from '../state/entities/actions';
import {Entity} from '../state/entities/actions';
import {select, Store} from '@ngrx/store';
import {getEntities} from '../state/entities/selectors';
import {Observable} from 'rxjs';
import {AddModalComponent} from '../components/add-modal/add-modal.component';
import {KeyValue} from '@angular/common';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-edit-table-page',
  templateUrl: './edit-table-page.component.html',
  styleUrls: ['./edit-table-page.component.css']
})
export class EditTablePageComponent implements OnInit {
  @ViewChild(AddModalComponent) modal: AddModalComponent;
  page = 1;
  pageSize = 6;
  entities$: Observable<any>;

  constructor(private store: Store) {
    this.entities$ = store.pipe(select(getEntities));
  }

  @Input() data: Array<object>;
  deleteEntity(id: any) {
    this.store.dispatch(new entities.DeleteEntityAction(id));
  }

  uploadToTextArea() {
    const json = this.getJsonForUpload();
    this.store.dispatch(new entities.UploadJsonAction(json));
    this.store.dispatch(new layout.CloseTableAction());
  }

  uploadToTextFile() {
    let json ='\ufeff' +  this.getJsonForUpload();
    let blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "data.doc");
  }

  private getJsonForUpload(): string
  {
    const entitiesForUpload: Array<Entity> = [];
    this.entities$.subscribe(entities => {
      for (let i = 0; i < entities.length; i++) {
        entitiesForUpload.push(_.omit(entities[i], ['id']));
      }

    });

    return JSON.stringify(entitiesForUpload).replace(/"([^"]+)":/g, '$1:');

  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };

  ngOnInit(): void {
  }
}
