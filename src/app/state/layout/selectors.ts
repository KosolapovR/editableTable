import {IStateLayout} from './reducer';
import {createSelector} from '@ngrx/store';
import {State} from '../index';

export const layout = (state: State) => state.layout;


export const isTableShown = createSelector(
  layout,
  (state: IStateLayout) => state.showTable
);
