import * as entities from './actions';
import {Entity} from './actions';

export interface IStateEntities {
  lastEntityId: number;
  selectedEntity: Entity
  entities: Array<Entity>;
  uploadToTextArea: boolean;
  jsonEntities: string
}

const initialState = {
  lastEntityId: 0,
  selectedEntity: null,
  entities: [],
  uploadToTextArea: false,
  jsonEntities: '',
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
    case entities.UPLOAD_JSON: {
      return {
        ...state,
        uploadToTextArea: true,
        jsonEntities: action.payload
      };
    }
    case entities.ADD_ENTITY: {
      return {
        ...state,
        entities: [...state.entities, {id: state.lastEntityId, ...action.payload}],
        lastEntityId: state.lastEntityId + 1
      };
    }
    case entities.DELETE_ENTITY: {
      const newEntities = state.entities.filter(e => e.id !== action.id);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case entities.UPDATE_ENTITY: {
      const id = state.entities.findIndex(e => e.id === action.payload.id);
      const newEntities = [...state.entities];
      newEntities[id] = action.payload;
      return {
        ...state, entities: newEntities
      };
    }
    case entities.SELECT_ENTITY: {
      const selectedEntity = state.entities.find(e => parseInt(e.id) === parseInt(action.id));
      return {
        ...state,
        selectedEntity: selectedEntity,
      };
    }
    default:
      return state;
  }
}
