import { AbstractControl, ValidationErrors } from "@angular/forms";

export function banWords(control: AbstractControl<string>): ValidationErrors | null {
    return control.value.toLocaleLowerCase() !== 'shit' ? null : {
        banWords: { bannedWord: 'shit' }
    }
}