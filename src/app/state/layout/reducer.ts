import * as layout from './actions';

export interface IStateLayout {
  showTable: boolean;
}

const initialState: IStateLayout = {
  showTable: false
};

export function reducer(state = initialState, action: layout.Actions): IStateLayout {
  switch (action.type) {
    case layout.OPEN_TABLE_BLOCK: {
      return {showTable: true};
    }
    case layout.CLOSE_TABLE_BLOCK: {
      return {showTable: false};
    }
    default:
      return state;
  }
}
