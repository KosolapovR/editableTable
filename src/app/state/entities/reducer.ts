import * as entities from './actions';
import {Entity} from './actions';

export interface IStateEntities {
  lastEntityId: number;
  selectedEntity: Entity
  entities: Array<Entity>;
  uploadToTextArea: boolean;
  jsonEntities: string;
  errorMsg: string;
}

const initialState = {
  lastEntityId: 0,
  selectedEntity: null,
  entities: [],
  uploadToTextArea: false,
  jsonEntities: '',
  errorMsg: ''
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
    case entities.UPDATE_SINGLE_ENTITY_FIELD: {
      const newEntities = [...state.entities];
      newEntities[action.payload.id] = {...newEntities[action.payload.id], [action.payload.key]: action.payload.value};
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
    case entities.INVALID_JSON: {
      return {
        ...state,
        errorMsg: action.errorMsg,
      };
    }
    default:
      return state;
  }
}
