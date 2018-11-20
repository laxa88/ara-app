import { ActionTypes, IAction, IState } from './types';

const defaultState: IState = {
  errorMessage: '',
  isLoading: false,
  payments: [],
};

export function reducer(state: IState = defaultState, action: IAction): IState {
  switch (action.type) {
    case ActionTypes.GET:
    case ActionTypes.ADD:
    case ActionTypes.UPDATE:
    case ActionTypes.APPROVE:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payments: action.payload.payments,
      };

    case ActionTypes.ADD_SUCCESS:
    case ActionTypes.UPDATE_SUCCESS:
    case ActionTypes.APPROVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.GET_FAIL:
    case ActionTypes.ADD_FAIL:
    case ActionTypes.UPDATE_FAIL:
    case ActionTypes.APPROVE_FAIL:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: false,
      };

    default:
      return state;
  }
}
