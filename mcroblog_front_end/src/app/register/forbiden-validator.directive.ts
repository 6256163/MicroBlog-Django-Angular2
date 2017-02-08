/**
 * Created by tianzhang on 2017/1/22.
 */
import {Directive, Input, OnChanges, SimpleChanges, forwardRef,} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators,} from '@angular/forms';


export function equalValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let val = control.value;

    let euqalTo = control.root.get(controlName);

    // value equal and reverse
    if (euqalTo && val === euqalTo.value ) {
      delete euqalTo.errors['validateEqual'];
      if (!Object.keys(euqalTo.errors).length) euqalTo.setErrors(null);
    }

    // value not equal and reverse
    if (euqalTo && val !== euqalTo.value ) {
      euqalTo.setErrors({ validateEqual: false });
    }
    return null;
  }
}

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true}
  ]
})
export class EqualValidator implements Validator {
  @Input() validateEqual: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['validateEqual'];
    if (change) {
      this.valFn = equalValidator(change.currentValue);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control)
  }
}

/*
export function forbiddenValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? {'forbiddenName': {name}} : null;
  };
}
@Directive({
  selector: '[forbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: FieldValidatorDirective, multi: true}]
})
export class FieldValidatorDirective implements Validator, OnChanges {
  @Input() forbiddenName: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['forbiddenName'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = forbiddenValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
*/
