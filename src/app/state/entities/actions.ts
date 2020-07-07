import {Action} from '@ngrx/store';

export const DOWNLOAD_JSON = '[Entities] Save download json';
export const ADD_ENTITY = '[Entities] add entity';

export interface Entity{
  id: string;
  [key: string]: string;
}

export class DownloadJsonAction implements Action{
  readonly type = DOWNLOAD_JSON;
  constructor(public  payload: {entities: Entity[]}) {}
}

export class AddEntity implements Action{
  readonly type = ADD_ENTITY;
  constructor(public payload: Entity) {
  }
}

export type Actions = DownloadJsonAction | AddEntity;
