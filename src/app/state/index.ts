import * as fromLayout from './layout/reducer';
import * as fromEntities from './entities/reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface State{
  layout: fromLayout.IStateLayout;
  entities: fromEntities.IStateEntities;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  entities: fromEntities.reducer
};
