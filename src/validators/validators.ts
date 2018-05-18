import {Injectable} from "@angular/core";
import {Validators as angularValidators, AbstractControl} from '@angular/forms';

@Injectable()
export class Validators extends angularValidators {

  //验证电话号码
  static phone (control: AbstractControl) {
    return Validators.validatorsByPattern('phone', control, '1[0-9]{10,10}');
  };

  private static validatorsByPattern  (name: string, control: AbstractControl, pattern: string) {
    let validatorFn = Validators.pattern(pattern)(control);
    if (validatorFn != null) {
      validatorFn[name] = validatorFn['pattern'];
    }
    return validatorFn;
  };
}
