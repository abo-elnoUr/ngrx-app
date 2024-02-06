import { BackendErrorInterface } from "../../shared/types/backend-error.interface"
import { CurrentUserInterface } from "../../shared/types/current-user.interface"

export interface AuthStateInterface {
    isSubmitting: boolean
    currentUser: CurrentUserInterface | null | undefined
    isLoading: boolean
    validatorError: BackendErrorInterface | null
}