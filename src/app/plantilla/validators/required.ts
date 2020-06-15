import { FormGroup } from '@angular/forms';
import { isNull } from 'util';

export function Required(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        if (!control) {
          return null;
        }

// Si el valor es vacío, nulo o no se ha tocado, devuelve true
        if (control.value === "" ||  isNull(control.value) && ( control.dirty || control.touched) ){
            control.setErrors({ required: true });
        } else {
            control.setErrors(null);
        }
    }
}