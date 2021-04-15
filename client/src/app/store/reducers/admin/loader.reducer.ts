import { Action, createReducer, on } from '@ngrx/store';
import { hideLoader, showLoader } from '../../actions/admin/loader.action';

export interface ILoader {
    isShow: boolean;
}

const initialState: ILoader = {
  isShow: false
};

const loaderReducer = createReducer(
  initialState,
  on(showLoader, () => {
    return {
        isShow: true
    };
  }),
  on(hideLoader, () => {
    return {
        isShow: false
    };
  })
);

export default function reducer(state: any, action: Action): any {
  return loaderReducer(state, action);
}
