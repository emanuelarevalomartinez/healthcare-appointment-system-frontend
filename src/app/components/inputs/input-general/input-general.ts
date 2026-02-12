import { Component, forwardRef, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HTMLInputType } from '../../../shared/types/types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'component-input-general',
  imports: [FaIconComponent],
  templateUrl: './input-general.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputGeneral),
      multi: true,
    },
  ],
})
export class InputGeneral implements ControlValueAccessor {

  faUser = faUser;

  value: string = '';
  isDisabled = false;

  @Input()
  inputType: HTMLInputType = "text";

  @Input()
  placeHolderText: string = "";

  @Input()
  icon!: IconDefinition;

  @Input()
  isRequired: boolean = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

}
