import {Action} from '@ngrx/store';

export const DOWNLOAD_JSON = '[Entities] download json';
export const UPLOAD_JSON = '[Entities] upload json';
export const ADD_ENTITY = '[Entities] add entity';
export const DELETE_ENTITY = '[Entities] delete entity';
export const SELECT_ENTITY = '[Entities] select entity';
export const UPDATE_ENTITY = '[Entities] update entity';
export const UPDATE_SINGLE_ENTITY_FIELD = '[Entities] update single field';

export interface Entity {
  [key: string]: any;
}


export class DownloadJsonAction implements Action {
  readonly type = DOWNLOAD_JSON;

  constructor(public  payload: { entities: Entity[] }) {
  }
}

export class UploadJsonAction implements Action {
  readonly type = UPLOAD_JSON;

  constructor(public  payload: string) {
  }
}

export class AddEntityAction implements Action {
  readonly type = ADD_ENTITY;

  constructor(public payload: Entity) {
  }
}

export class UpdateEntityAction implements Action {
  readonly type = UPDATE_ENTITY;

  constructor(public payload: Entity) {
  }
}

export class UpdateSingleEntityFieldAction implements Action {
  readonly type = UPDATE_SINGLE_ENTITY_FIELD;

  constructor(public payload: {id, key, value}) {
  }
}

export class SelectEntityAction implements Action {
  readonly type = SELECT_ENTITY;

  constructor(public id) {
  }
}

export class DeleteEntityAction implements Action {
  readonly type = DELETE_ENTITY;

  constructor(public id) {
  }
}

export type Actions =
  DownloadJsonAction
  | UploadJsonAction
  | AddEntityAction
  | SelectEntityAction
  | DeleteEntityAction
  | UpdateEntityAction
  | UpdateSingleEntityFieldAction;
