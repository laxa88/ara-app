import { ActionTypes, IAction, IState } from './types';

const defaultState: IState = {
  errorMessageAdd: '',
  errorMessageApprove: '',
  errorMessageGet: '',
  errorMessageUpdate: '',

  isLoadingAdd: false,
  isLoadingApprove: false,
  isLoadingGet: false,
  isLoadingUpdate: false,

  payments: [],
};

export function reducer(state: IState = defaultState, action: IAction): IState {
  switch (action.type) {
    case ActionTypes.GET:
      return {
        ...state,
        errorMessageGet: '',
        isLoadingGet: true,
      };

    case ActionTypes.ADD:
      return {
        ...state,
        errorMessageAdd: '',
        isLoadingAdd: true,
      };

    case ActionTypes.UPDATE:
      return {
        ...state,
        errorMessageUpdate: '',
        isLoadingUpdate: true,
      };

    case ActionTypes.APPROVE:
      return {
        ...state,
        errorMessageApprove: '',
        isLoadingApprove: true,
      };

    case ActionTypes.GET_SUCCESS:
      return {
        ...state,
        isLoadingGet: false,
        payments: action.payload.payments,
      };

    case ActionTypes.ADD_SUCCESS:
      return {
        ...state,
        isLoadingAdd: false,
      };

    case ActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isLoadingUpdate: false,
      };

    case ActionTypes.APPROVE_SUCCESS:
      return {
        ...state,
        isLoadingApprove: false,
      };

    case ActionTypes.GET_FAIL:
      return {
        ...state,
        errorMessageGet: action.payload.errorMessage,
        isLoadingGet: false,
        payments: [],
      };

    case ActionTypes.ADD_FAIL:
      return {
        ...state,
        errorMessageAdd: action.payload.errorMessage,
        isLoadingAdd: false,
      };

    case ActionTypes.UPDATE_FAIL:
      return {
        ...state,
        errorMessageUpdate: action.payload.errorMessage,
        isLoadingUpdate: false,
      };

    case ActionTypes.APPROVE_FAIL:
      return {
        ...state,
        errorMessageApprove: action.payload.errorMessage,
        isLoadingApprove: false,
      };

    default:
      return state;
  }
}
