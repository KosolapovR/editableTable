import * as fromLayout from './layout/reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface State{
  layout: fromLayout.IStateLayout;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
};
