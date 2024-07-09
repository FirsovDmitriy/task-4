import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { TuiInputModule } from "@taiga-ui/kit";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MultipleTextFieldComponent } from "./multiple-text-field/multiple-text-field.component";
import { JsonPipe } from "@angular/common";
import { TextFieldState } from "./multiple-text-field/multiple-text-field.type";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TuiRootModule, TuiInputModule, ReactiveFormsModule, MultipleTextFieldComponent, JsonPipe   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'Task 4';

  formState = new FormGroup({
    value: new FormControl<TextFieldState>({['']:''}),
  })

}
