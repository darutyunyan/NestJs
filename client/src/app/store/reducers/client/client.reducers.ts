import { Action, createReducer, on } from '@ngrx/store';
import {
    clearProductError, getProductByIdError, getProductByIdPending,
    getProductByIdSuccess, getProductsError, getProductsPending,
    getProductsSuccess, getRandomProductIdError, getRandomProductIdSuccess, sendFeedbackError, sendFeedbackPending, sendFeedbackSuccess,
    sendShortFeedbackError, sendShortFeedbackPending, sendShortFeedbackSuccess
} from '../../actions/client/client.actions';
import { IClientInitialState } from '../../models/client.model';

const initialState: IClientInitialState = {
    products: [],
    productsLoading: false,
    product: null,
    productLoading: false,
    randonProductId: null,
    feedback: {
        feedbackSending: false,
        feedbackError: false,
    },
    shortFeedback: {
        shortFeedbackSending: false,
        shortFeedbackError: false,
    },
    error: null
};

const clientReducer = createReducer(
    initialState,
    on(getProductsPending, (state) => {
        return {
            ...state,
            productsLoading: true
        };
    }),
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            products: action.items,
            productsLoading: false,
        };
    }),
    on(getProductsError, (state, action) => {
        return {
            ...state,
            error: action.error,
            productsLoading: false
        };
    }),
    on(getProductByIdPending, (state) => {
        return {
            ...state,
            productLoading: true
        };
    }),
    on(getProductByIdSuccess, (state, action) => {
        return {
            ...state,
            product: action.item,
            productLoading: false
        };
    }),
    on(getProductByIdError, (state, action) => {
        return {
            ...state,
            error: action.error,
            productLoading: false
        };
    }),
    on(getRandomProductIdSuccess, (state, action) => {
        return {
            ...state,
            randonProductId: action.id
        };
    }),
    on(getRandomProductIdError, (state, action) => {
        return {
            ...state,
            randonProductId: null
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
