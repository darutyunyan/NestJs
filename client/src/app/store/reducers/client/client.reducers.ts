import { Action, createReducer, on } from '@ngrx/store';
import {
    clearProductError, getProductByIdError, getProductByIdPending,
    getProductByIdSuccess, getProductsError, getProductsPending,
    getProductsSuccess, sendFeedbackError, sendFeedbackPending, sendFeedbackSuccess,
    sendShortFeedbackError, sendShortFeedbackPending, sendShortFeedbackSuccess
} from '../../actions/client/client.actions';
import { IClientInitialState } from '../../models/client.model';

const initialState: IClientInitialState = {
    products: null,
    productById: {
        loading: false,
        productName: null,
        columnNames: [],
        info: null,
        error: null,
    },
    feedback: {
        feedbackSending: false,
        feedbackError: false,
    },
    shortFeedback: {
        shortFeedbackSending: false,
        shortFeedbackError: false,
    },
    error: null,
    loading: false,
};

const clientReducer = createReducer(
    initialState,
    on(getProductsPending, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            products: {
                items: action.response.items
            },
            loading: false,
        };
    }),
    on(getProductsError, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }),
    on(getProductByIdPending, (state) => {
        return {
            ...state,
            productById: {
                loading: true
            }
        };
    }),
    on(getProductByIdSuccess, (state, action) => {
        return {
            ...state,
            productById: {
                loading: false,
                productName: action.response.productName,
                columnNames: action.response.columnNames,
                info: action.response.info,
            },
        };
    }),
    on(getProductByIdError, (state, action) => {
        return {
            ...state,
            error: action.error,
            productById: {
                loading: false
            }
        };
    }),
    on(sendFeedbackPending, (state) => {
        return {
            ...state,
            feedback: {
                feedbackSending: true,
                feedbackError: false
            }
        };
    }),
    on(sendFeedbackSuccess, (state) => {
        return {
            ...state,
            feedback: {
                feedbackSending: false,
                feedbackError: false,
            }
        };
    }),
    on(sendFeedbackError, (state, action) => {
        return {
            ...state,
            feedback: {
                feedbackSending: false,
                feedbackError: true,
            },
            error: action.error
        };
    }),
    on(sendShortFeedbackPending, (state) => {
        return {
            ...state,
            shortFeedback: {
                shortFeedbackSending: true,
                shortFeedbackError: false,
            }
        };
    }),
    on(sendShortFeedbackSuccess, (state) => {
        return {
            ...state,
            shortFeedback: {
                shortFeedbackSending: false,
                shortFeedbackError: false,
            }
        };
    }),
    on(sendShortFeedbackError, (state, action) => {
        return {
            ...state,
            shortFeedback: {
                shortFeedbackSending: false,
                shortFeedbackError: true,
            },
            error: action.error
        };
    }),
    on(clearProductError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);

export default function reducer(state: IClientInitialState, action: Action): any {
    return clientReducer(state, action);
}
