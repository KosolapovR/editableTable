import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent {

  private modalRef;

  constructor(private modalService: NgbModal) {
  }

  open(content): void {
    this.modalRef = this.modalService.open(content);
  }
}
