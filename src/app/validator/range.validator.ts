import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RangeValidator {
  public minLessThanMax(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const minControl = formGroup.get('min');
      const maxControl = formGroup.get('max');

      if (!minControl || !maxControl) {
        return null;
      }

      const minValue = minControl.value;

      if (!minValue) {
        return null;
      }

      const maxValue = maxControl.value;

      if (!maxValue) {
        return null;
      }

      if (minValue > maxValue) {
        return { invertedRange: true };
      }

      return null;

    };
  }
}
