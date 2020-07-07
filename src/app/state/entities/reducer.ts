import * as entities from './actions';
import {Entity} from './actions';

export interface IStateEntities {
  lastEntityId: number;
  entities: Array<Entity>;
}

const initialState = {
  lastEntityId: 0,
  entities: []
};

export function reducer(state: IStateEntities = initialState, action: entities.Actions): IStateEntities {
  switch (action.type) {
    case entities.DOWNLOAD_JSON: {
      return {
        ...state,
        entities: action.payload.entities,
        lastEntityId: action.payload.entities.length + 1
      };
    }
    case entities.ADD_ENTITY: {
      return {
        ...state,
        entities: [...state.entities, {id: state.lastEntityId, ...action.payload}],
        lastEntityId: state.lastEntityId + 1
      };
    }
    default:
      return state;
  }
}
