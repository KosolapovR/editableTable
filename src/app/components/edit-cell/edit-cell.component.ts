import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as entities from '../../state/entities/actions';
import {KeyValue} from '@angular/common';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditCellComponent),
  multi: true
};

@Component({
  selector: 'app-edit-cell',
  templateUrl: './edit-cell.component.html',
  providers: [VALUE_ACCESSOR],
  styleUrls: ['./edit-cell.component.css']
})
export class EditCellComponent implements ControlValueAccessor {
  @ Input() _value;
  @ Input() entityId;
  @ Input() col;
  editing: boolean = false;
  private preValue: string = '';
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor(private store: Store) {
  }

  get value() {
    return this._value;
  }
  set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
    }
  }

  OnBlur() {
    debugger;
    this.store.dispatch(new entities.UpdateSingleEntityFieldAction(
      {id: (this.entityId - 1), key: this.col, value: this.value}
    ));
    this.editing = false;
  }

  startEdit(val: any) {
    this.preValue = val;
    this.editing = true;
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(val: any): void {
    this._value = val;
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
}
