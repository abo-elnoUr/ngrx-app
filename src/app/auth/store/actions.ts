import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { CurrentUserInterface } from "../../shared/types/current-user.interface";
import { BackendErrorInterface } from "../../shared/types/backend-error.interface";

// export const register = createAction('[Auth] Register', props<{request: RegisterRequestInterface}>())

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        Register: props<{ request: RegisterRequestInterface }>(),
        'Register success': props<{ currentUser: CurrentUserInterface }>(),
        'Register failure': props<{ errors: BackendErrorInterface }>()
    }
})