import { Action, createReducer, on } from '@ngrx/store';
import { hideMessage, showMessage } from '../actions/message.action';
import { IMessageData } from '../models/message.model';

const initialState: IMessageData = {
  statusCode: null,
  message: null,
};

const messageReducer = createReducer(
  initialState,
  on(showMessage, (state, action) => {
    return {
      ...state,
      statusCode: action.messageData.statusCode,
      message: action.messageData.message
    };
  }),
  on(hideMessage, () => {
    return {
      statusCode: null,
      message: null
    };
  })
);

export default function reducer(state: any, action: Action): any {
  return messageReducer(state, action);
}
