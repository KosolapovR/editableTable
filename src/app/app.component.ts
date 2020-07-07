import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {isTableShown} from './state/layout/selectors';
import {getEntities} from './state/entities/selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataLoaded$;
  title = 'editableTable';
  private entities$: Observable<Array<any>>;

  constructor(private store: Store) {
    this.dataLoaded$ = this.store.pipe(select(isTableShown));
    this.entities$ = store.pipe(select(getEntities));
  }
}
