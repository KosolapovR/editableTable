import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as entities from '../../state/entities/actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent{
  @Input() id;

  private modalRef;
  private ID: any;

  constructor(private modalService: NgbModal,  private store: Store) {
  }

  open(content): void {
    this.store.dispatch(new entities.SelectEntityAction(this.id))
    this.modalRef = this.modalService.open(content);
  }
}
