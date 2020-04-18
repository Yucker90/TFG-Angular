import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

import { Required } from './required';

@Directive({
    selector: '[required]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RequiredDirective, multi: true }]
})
export class RequiredDirective implements Validator {
    @Input('required') required: string[] = [];

    res: boolean = true;

    validate(formGroup: FormGroup): ValidationErrors {
        return Required(this.required[0])(formGroup);
    }
}