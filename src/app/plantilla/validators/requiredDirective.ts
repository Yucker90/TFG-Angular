import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

import { Required } from './required';
import { isNull, isUndefined } from 'util';

@Directive({
    selector: '[required]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RequiredDirective, multi: true }]
})
export class RequiredDirective implements Validator {


    //@Input('required') required: string[] = [];
    @Input('required') required: string = "";

    //validate(formGroup: FormGroup): ValidationErrors {
        //return Required(this.required)(formGroup);


        validate(control: FormControl): ValidationErrors {
            if((control.dirty || control.touched) && ( isNull(control.value) || isUndefined(control.value))){
                return {'Error' : true};
            }
        }
    }