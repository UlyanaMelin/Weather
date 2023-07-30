import { TypeAutoCompl, IAutoCompl } from '../types/types';
import { EActionsTypes } from '../actions';

const initialAutoCompl : IAutoCompl = {
  list: [{
    name: '',
    key: '',
  }],
};

const reducerAutoCompl = (state = initialAutoCompl, action:TypeAutoCompl = { type: EActionsTypes.REQUESTED_AUTO_COMPLITTE, data: null }) => {
  switch (action.type) {
    case EActionsTypes.REQUESTED_AUTO_COMPLITTE:
      return {
        list: action.data,
      };
    default:
      return state;
  }
}

export { reducerAutoCompl }
