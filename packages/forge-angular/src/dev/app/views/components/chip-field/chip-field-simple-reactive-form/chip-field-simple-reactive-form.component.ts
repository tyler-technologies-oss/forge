import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IChipComponent, IChipDeleteEventData } from '@tylertech/forge';
import { ForgeChipFieldModule, ForgeChipProxyModule, ForgeButtonModule, ForgeCheckboxProxyModule } from '@tylertech/forge-angular';
import { JsonPipe } from '@angular/common';

type TokenForm = FormControl<string>;

interface DemoForm {
  tokens: FormArray<TokenForm>;
}

@Component({
  selector: 'app-chip-field-simple-reactive-form',
  templateUrl: './chip-field-simple-reactive-form.component.html',
  styleUrls: ['./chip-field-simple-reactive-form.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, ForgeChipFieldModule, ForgeChipProxyModule, ForgeButtonModule, ForgeCheckboxProxyModule, JsonPipe]
})
export class ChipFieldSimpleReactiveFormComponent implements OnInit {
  public chipFieldForm: FormGroup<DemoForm>;
  public tokensFormArray: FormArray<TokenForm>;

  public ngOnInit(): void {
    this.chipFieldForm = new FormGroup<DemoForm>({
      tokens: new FormArray<TokenForm>([], [Validators.minLength(2), Validators.required])
    });

    this.tokensFormArray = this.chipFieldForm.controls.tokens;

    this._addMember('Token A');
    this._addMember('Token B');
  }

  public addMember(event$: CustomEvent): void {
    this._addMember(event$.detail);
  }

  private _addMember(value: string): void {
    this.tokensFormArray.push(new FormControl(value, { nonNullable: true }));
  }

  public deleteMember(event$: CustomEvent<HTMLElement | IChipDeleteEventData>): void {
    const chipVal = (event$.detail as IChipComponent | IChipDeleteEventData).value;
    const index = this.tokensFormArray.controls.findIndex(c => c.value === chipVal);
    if (index === -1) {
      return;
    }

    this.tokensFormArray.removeAt(index);
  }

  public onSubmit(): void {
    const formJson = JSON.stringify(this.chipFieldForm.value);
    alert(`Form submitted: ${formJson}`);
  }

  public disableForm($event: Event): void {
    const isDisabled = ($event.target as HTMLInputElement).checked;
    if (isDisabled) {
      this.chipFieldForm.disable();
    } else {
      this.chipFieldForm.enable();
    }
  }
}
