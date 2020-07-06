import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {isTableShown} from './state/layout/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataLoaded$;
  title = 'editableTable';

  constructor(private store: Store) {
    this.dataLoaded$ = this.store.pipe(select(isTableShown));
  }
}
