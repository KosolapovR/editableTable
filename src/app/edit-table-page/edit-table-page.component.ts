import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as layout from '../state/layout/actions';
import * as entities from '../state/entities/actions';
import {select, Store} from '@ngrx/store';
import {getEntities} from '../state/entities/selectors';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AddModalComponent} from '../components/add-modal/add-modal.component';

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

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
    this.store.dispatch(new layout.CloseTableAction());
  }

  deleteEntity(id: any) {
    this.store.dispatch(new entities.DeleteEntity(id));
  }
}
