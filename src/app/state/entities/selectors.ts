import {IStateEntities} from './reducer';
import {createSelector} from '@ngrx/store';
import {State} from '../index';

export const entities = (state: State) => state.entities;


export const getEntities = createSelector(
  entities,
  (state: IStateEntities) => state.entities
);

export const getSelectedEntity = createSelector(
  entities,
  (state: IStateEntities) => state.selectedEntity
);

export const getUploadToTextArea = createSelector(
  entities,
  (state: IStateEntities) => state.uploadToTextArea
);

export const getJsonEntities = createSelector(
  entities,
  (state: IStateEntities) => state.jsonEntities
);

export const getfirstEntity = createSelector(
  entities,
  (state: IStateEntities) => state.entities[0]
);
