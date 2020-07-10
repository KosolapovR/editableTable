import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import * as entities from '../../../state/entities/actions';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {getSelectedEntity} from '../../../state/entities/selectors';
import {KeyValue} from '@angular/common';
import {Entity} from '../../../state/entities/actions';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent{
  @Input() entityId;
  @ViewChildren('input') inputs: QueryList<any>;
  @ViewChild('idInput') idInput: ElementRef;

  selectedEntity$: Observable<Entity>;

  constructor(private modalService: NgbModal,  private store: Store) {
    this.selectedEntity$ = this.store.pipe(select(getSelectedEntity));
  }

  closeModal(): void {
    let str = '{"entity": {"id": "' + this.idInput.nativeElement.value + '"';
    this.inputs.toArray().forEach((input, i) => {
        str += `,"${input.nativeElement.id}":"${input.nativeElement.value.replace(/"/g, '\\"')}"`;
    });
    str += '}}';
    debugger;
    const entity: Entity = JSON.parse(str).entity;
    entity.id = parseInt(entity.id);

    this.store.dispatch(new entities.UpdateEntityAction(entity));
    this.modalService.dismissAll();
  }

  dismiss(){
    this.modalService.dismissAll();
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
}
