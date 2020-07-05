import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTablePageComponent } from './edit-table-page.component';

describe('EditTablePageComponent', () => {
  let component: EditTablePageComponent;
  let fixture: ComponentFixture<EditTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
