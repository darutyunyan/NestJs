import { createAction, props } from '@ngrx/store';
import { IMessageData } from '../models/message.model';


export enum MessageActions {
  ShowMessage = '[Message Type] Show message',
  HideMessage = '[Message Type] Hide message',
}

export const showMessage = createAction(
  MessageActions.ShowMessage,
  props<{ messageData: IMessageData }>()
);

export const hideMessage = createAction(
  MessageActions.HideMessage
);
