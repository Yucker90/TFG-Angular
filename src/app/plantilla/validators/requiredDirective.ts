import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

import { Required } from './required';
import { isNull } from 'util';

@Directive({
    selector: '[required]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RequiredDirective, multi: true }]
})
export class RequiredDirective implements Validator {
    @Input('required') required: string[] = [];

    res: boolean = true;

    validate(control: FormControl) {
        if(
            (control.value !== "" || isNull(control)) && (control.dirty || control.touched)
        )
        return {'errors': true}
    }
}