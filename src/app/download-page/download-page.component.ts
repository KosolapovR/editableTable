import { Component, OnInit } from '@angular/core';
import * as layout from '../state/layout/actions';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  openTableBlock(): void {
    this.store.dispatch(new layout.OpenTableAction());
  }
}
