import { FormGroup } from '@angular/forms';
import { isNull } from 'util';

export function Required(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
console.log("Control: " + controlName);
        // return null if controls haven't initialised yet
        if (!control) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        /*if (control.errors) {
            return null;
        }*/

        // set error on matchingControl if validation fails
        if ((control.value === "" ||  isNull(control.value)) && ( control.dirty || control.touched)) {
            control.setErrors({ required: true });
        } else {
            control.setErrors(null);
        }
    }
}