import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {getSelectedEntity} from '../../state/entities/selectors';
import {Observable} from 'rxjs';
import * as entities from '../../state/entities/actions';
import {Entity} from '../../state/entities/actions';
import {KeyValue} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() id;

  private modalRef;
  selectedEntity$: Observable<Entity>;
  constructor(private modalService: NgbModal,  private store: Store) {
    this.selectedEntity$ = store.pipe(select(getSelectedEntity));
  }

  ngOnInit(): void {
  }


  openEditModal(content) {
    this.store.dispatch(new entities.SelectEntityAction(this.id))
    this.modalRef = this.modalService.open(content);
  }

  closeModal(): void {
    const inputs = $('#edit-form input');
    let str = '{"entity": {"id": "' + this.id + '"';
    inputs.each((i, input) => {
        str += `,"${input.id}":"${input.value}"`;
    });
    str += '}}';
    const entity: Entity = JSON.parse(str).entity;
    entity.id = parseInt(entity.id);
    this.store.dispatch(new entities.UpdateEntityAction(entity));
    this.modalService.dismissAll();
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
}
