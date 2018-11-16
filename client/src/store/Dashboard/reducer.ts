import { ActionTypes, IAction, IState } from './types';

const defaultState: IState = {};

export function reducer(state: IState = defaultState, action: IAction): IState {
  switch (action.type) {
    default:
      return state;
  }
}
