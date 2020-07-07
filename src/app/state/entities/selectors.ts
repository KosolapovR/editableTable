import {IStateEntities} from './reducer';
import {createSelector} from '@ngrx/store';
import {State} from '../index';

export const entities = (state: State) => state.entities;


export const getEntities = createSelector(
  entities,
  (state: IStateEntities) => state.entities
);

export const getfirstEntity = createSelector(
  entities,
  (state: IStateEntities) => state.entities[0]
);

export const getSelectedEntity = createSelector(
  entities,
  (state: IStateEntities) => state.selectedEntity
);
