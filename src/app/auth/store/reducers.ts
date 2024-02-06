import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/auth-state.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validatorError: null
}

const authFeature = createFeature({
    name: 'Auth',
    reducer: createReducer(
        initialState,
        on(authActions.register, state => ({ ...state, isSubmitting: true, validatorError: null })),
        on(authActions.registerSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.currentUser })),
        on(authActions.registerFailure, (state, action) => ({ ...state, isSubmitting: false, validatorError: action.errors })),
    ),
})

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectCurrentUser,
    selectValidatorError
} = authFeature