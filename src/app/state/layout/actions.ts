import {Action} from '@ngrx/store';

export const OPEN_TABLE_BLOCK = '[Layout] Open TableBlock';
export const CLOSE_TABLE_BLOCK = '[Layout] Close TableBlock';

export class OpenTableAction implements Action{
  readonly type = OPEN_TABLE_BLOCK;
}

export class CloseTableAction implements Action{
  readonly type = CLOSE_TABLE_BLOCK;
}

export type Actions = OpenTableAction | CloseTableAction;
