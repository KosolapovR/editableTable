import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import * as entities from '../../../state/entities/actions';
import {Entity} from '../../../state/entities/actions';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {getfirstEntity} from '../../../state/entities/selectors';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent{
  @ViewChildren('input') inputs: QueryList<any>;

  firstEntity$: Observable<Entity>;

  constructor(private elementRef: ElementRef, private modalService: NgbModal, private store: Store) {
    this.firstEntity$ = store.pipe(select(getfirstEntity));
  }

  closeModal() {
    let str = '{"entity": {';

    this.inputs.toArray().forEach((input, i) => {
      if (i === 0) {
        str += `"${input.nativeElement.id}":"${input.nativeElement.value.replace(/"/g, '\\"')}"`;
      } else {
        str += `,"${input.nativeElement.id}":"${input.nativeElement.value.replace(/"/g, '\\"')}"`;
      }
    });
    str += '}}';

    const entity: Entity = JSON.parse(str).entity;
    this.store.dispatch(new entities.AddEntityAction(entity));
    this.modalService.dismissAll();
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };

  dismiss() {
    this.modalService.dismissAll();
  }
}

