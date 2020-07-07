import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {getfirstEntity} from '../../state/entities/selectors';
import {Observable} from 'rxjs';
import {Entity} from '../../state/entities/actions';
import * as entities from  '../../state/entities/actions';
declare var $: any;

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  firstEntity$: Observable<Entity>;
  private modalRef;
  constructor(private modalService: NgbModal, private store: Store) {
    this.firstEntity$ = store.pipe(select(getfirstEntity));
  }

  ngOnInit(): void {
  }

  open(content): void {
    this.modalRef = this.modalService.open(content);
  }

  closeModal(): void {
    const inputs = $('#add-form input');
    let str = '{"entity": {';

    inputs.each((i, input) => {
      if (i === 0){
        str += `"${input.id}":"${input.value}"`;
      }else{
        str += `,"${input.id}":"${input.value}"`;
      }
    });
    str += '}}';

    const entity: Entity = JSON.parse(str).entity;
    this.store.dispatch(new entities.AddEntity(entity));
    this.modalService.dismissAll();
  }
}
