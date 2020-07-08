import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as _ from 'lodash';
import * as entities from '../state/entities/actions';
import {select, Store} from '@ngrx/store';
import {getEntities} from '../state/entities/selectors';
import {Observable} from 'rxjs';
import {AddModalComponent} from '../components/add-modal/add-modal.component';
import {Entity} from '../state/entities/actions';

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

  ngOnInit(): void {
  }

  closeTableBlock(): void {
    }

  deleteEntity(id: any) {
    this.store.dispatch(new entities.DeleteEntityAction(id));
  }

  logData(entities){

    debugger;
  }

  uploadToTextArea() {
    const entitiesForUpload: Array<Entity> = [];
    this.entities$.subscribe(entities => {
      for(let i = 0; i < entities.length; i++){
        entitiesForUpload.push(_.omit(entities[i], ['id']))
      }

    });
    const json = JSON.stringify(entitiesForUpload).replace(/"([^"]+)":/g, '$1:')
    this.store.dispatch(new entities.UploadJsonAction(json));
    this.store.dispatch(new layout.CloseTableAction());
  }
}
