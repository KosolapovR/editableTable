import {Action} from '@ngrx/store';

export const DOWNLOAD_JSON = '[Entities] Save download json';
export const ADD_ENTITY = '[Entities] add entity';
export const DELETE_ENTITY = '[Entities] delete entity';
export const SELECT_ENTITY = '[Entities] select entity';
export const UPDATE_ENTITY = '[Entities] update entity';

export interface Entity {
  [key: string ]: any;
}

export class DownloadJsonAction implements Action {
  readonly type = DOWNLOAD_JSON;

  constructor(public  payload: { entities: Entity[] }) {
  }
}

export class AddEntity implements Action {
  readonly type = ADD_ENTITY;

  constructor(public payload: Entity) {
  }
}

export class UpdateEntity implements Action {
  readonly type = UPDATE_ENTITY;

  constructor(public payload: Entity) {
  }
}

export class SelectEntity implements Action {
  readonly type = SELECT_ENTITY;

  constructor(public id) {
  }
}

export class DeleteEntity implements Action {
  readonly type = DELETE_ENTITY;

  constructor(public id) {
  }
}

export type Actions = DownloadJsonAction | AddEntity | SelectEntity | DeleteEntity | UpdateEntity;
