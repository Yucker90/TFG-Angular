import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // Devuelve null si los controles aún no se han inicializado
        if (!control || !matchingControl) {
          return null;
        }

        // Devuelve null si algún otro validador ha encontrado un error
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        // Controla el error
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}