import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  forwardRef,
} from '@angular/core';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { TextFieldState } from './multiple-text-field.type';

@Component({
  selector: 'app-multiple-text-field',
  standalone: true,
  imports: [TuiInputModule, TuiTextfieldControllerModule, ReactiveFormsModule],
  templateUrl: './multiple-text-field.component.html',
  styleUrl: './multiple-text-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultipleTextFieldComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleTextFieldComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  key = new FormControl('');
  value = new FormControl('');

  subscripton: Subscription = new Subscription()

  private onChange: (val: TextFieldState) => void = () => {};
  private onTouched: () => void = () => {}

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    const keySubscription = this.key.valueChanges.subscribe((value) => {
      this.emitChanges();
    });

    const valueSubscription = this.value.valueChanges.subscribe((value) => {
      this.emitChanges();
    });

    this.subscripton.add(keySubscription)
    this.subscripton.add(valueSubscription)
  }


  ngOnDestroy(): void {
    this.subscripton.unsubscribe()
  }

  emitChanges() {
    const value = {
      key: this.key.value as string,
      value: this.value.value as string,
    };
    this.onChange(value);
  }

  writeValue(obj: TextFieldState): void {
    this.key.setValue(obj.key);
    this.value.setValue(obj.value);

    this.changeDetector.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
