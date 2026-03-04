# Form Association Patterns

This document covers patterns for migrating form-associated components to Lit with ElementInternals.

## Form Association Basics

Form-associated custom elements can:
- Participate in form submission
- Be validated with constraint validation API
- Integrate with form reset/restore
- Be associated with labels
- Set ARIA properties via ElementInternals

## Declaring Form Association

```typescript
export class InputComponent extends BaseLitElement {
  // Declare the component is form-associated
  public static readonly formAssociated = true;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }
}
```

## ElementInternals API

### Setting Form Value

```typescript
#internals: ElementInternals;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('value')) {
    // Set the form value
    this.#internals.setFormValue(this.value);
  }
}
```

### With Entry Name (for submit)

```typescript
public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('value') || changedProperties.has('name')) {
    if (this.name) {
      this.#internals.setFormValue(this.value, this.name);
    } else {
      this.#internals.setFormValue(this.value);
    }
  }
}
```

### Complex Form Data

For components that submit multiple values:

```typescript
public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('files')) {
    const formData = new FormData();
    this.files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });
    this.#internals.setFormValue(formData);
  }
}
```

## Validation

### Setting Validity

```typescript
#internals: ElementInternals;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('value') || changedProperties.has('required')) {
    this.#validate();
  }
}

#validate(): void {
  if (this.required && !this.value) {
    this.#internals.setValidity(
      { valueMissing: true },
      'This field is required',
      this._inputElement // Optional anchor for validation UI
    );
  } else if (this.pattern && !new RegExp(this.pattern).test(this.value)) {
    this.#internals.setValidity(
      { patternMismatch: true },
      'Value does not match the required pattern',
      this._inputElement
    );
  } else {
    this.#internals.setValidity({}); // Clear validity
  }
}
```

### Validation States

Available ValidityState flags:
- `valueMissing` - Required field is empty
- `typeMismatch` - Value doesn't match expected type
- `patternMismatch` - Value doesn't match pattern
- `tooLong` - Value exceeds maxLength
- `tooShort` - Value is shorter than minLength
- `rangeUnderflow` - Value is less than min
- `rangeOverflow` - Value is greater than max
- `stepMismatch` - Value doesn't match step
- `badInput` - Browser can't convert input
- `customError` - Custom validation failed

### Custom Validation

```typescript
@property({ attribute: false })
public customValidator?: (value: string) => string | null;

#validate(): void {
  // Built-in validation first
  if (this.required && !this.value) {
    this.#internals.setValidity(
      { valueMissing: true },
      'This field is required'
    );
    return;
  }

  // Custom validation
  if (this.customValidator) {
    const errorMessage = this.customValidator(this.value);
    if (errorMessage) {
      this.#internals.setValidity(
        { customError: true },
        errorMessage
      );
      return;
    }
  }

  // Valid
  this.#internals.setValidity({});
}
```

### Accessing Validity

```typescript
// Check if component is valid
if (this.#internals.validity.valid) {
  // Is valid
}

// Get validation message
const message = this.#internals.validationMessage;

// Check specific validation state
if (this.#internals.validity.valueMissing) {
  // Required field is empty
}

// Report validity (shows browser UI)
this.#internals.reportValidity();

// Check validity without showing UI
const isValid = this.#internals.checkValidity();
```

## ARIA Integration

### Setting ARIA via ElementInternals

```typescript
import { setDefaultAria } from '../core/utils/a11y-utils.js';

#internals: ElementInternals;

public connectedCallback(): void {
  super.connectedCallback();

  // Set default ARIA properties
  setDefaultAria(this, this.#internals, {
    role: 'textbox',
    ariaRequired: this.required ? 'true' : 'false',
    ariaInvalid: this.#internals.validity.valid ? 'false' : 'true'
  });
}

public willUpdate(changedProperties: PropertyValues<this>): void {
  // Update ARIA on property changes
  if (changedProperties.has('required')) {
    this.#internals.ariaRequired = this.required ? 'true' : 'false';
  }

  if (changedProperties.has('value')) {
    this.#validate();
    this.#internals.ariaInvalid = this.#internals.validity.valid ? 'false' : 'true';
  }
}
```

### ARIA Properties Available

ElementInternals supports all ARIA properties:
- `ariaLabel`, `ariaLabelledBy`
- `ariaDescribedBy`
- `ariaRequired`, `ariaInvalid`
- `ariaDisabled`, `ariaReadOnly`
- `ariaValueMin`, `ariaValueMax`, `ariaValueNow`, `ariaValueText`
- And more...

## Custom States

### Setting Custom States

```typescript
import { toggleState } from '../core/utils/utils.js';

#internals: ElementInternals;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('open')) {
    toggleState(this.#internals, 'open', this.open);
  }

  if (changedProperties.has('disabled')) {
    toggleState(this.#internals, 'disabled', this.disabled);
  }

  if (changedProperties.has('value')) {
    const hasValue = !!this.value;
    toggleState(this.#internals, 'empty', !hasValue);
    toggleState(this.#internals, 'filled', hasValue);
  }
}
```

### Styling with Custom States

```scss
// In component.scss
:host(:state(open)) {
  // Styles when open
}

:host(:state(disabled)) {
  opacity: 0.5;
  pointer-events: none;
}

:host(:state(filled)) {
  .placeholder {
    display: none;
  }
}

// Fallback for browsers without :state() support
:host(:--open) {
  // Same styles
}
```

## Form Lifecycle

### Form Reset

```typescript
public formResetCallback(): void {
  // Called when form is reset
  this.value = this.defaultValue || '';
  this.#internals.setFormValue(this.value);
  this.#validate();
}
```

### Form State Restore

```typescript
public formStateRestoreCallback(state: string | FormData, mode: 'restore' | 'autocomplete'): void {
  // Called when browser restores form state
  if (typeof state === 'string') {
    this.value = state;
  } else {
    // Handle FormData if needed
    const value = state.get('value');
    if (typeof value === 'string') {
      this.value = value;
    }
  }
}
```

### Form Associated Callback

```typescript
public formAssociatedCallback(form: HTMLFormElement | null): void {
  // Called when associated with form or disassociated
  if (form) {
    // Associated with form
  } else {
    // Disassociated from form
  }
}
```

### Form Disabled Callback

```typescript
public formDisabledCallback(disabled: boolean): void {
  // Called when form's disabled state changes
  this.disabled = disabled;
}
```

## Accessing Form

```typescript
#internals: ElementInternals;

public get form(): HTMLFormElement | null {
  return this.#internals.form;
}

public someMethod(): void {
  if (this.form) {
    // Access parent form
    const formData = new FormData(this.form);
    const allValid = this.form.checkValidity();
  }
}
```

## Complete Example: Text Input

```typescript
@customElement('my-input')
export class InputComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);
  public static readonly formAssociated = true;

  #internals: ElementInternals;

  /**
   * The input value.
   * @attribute
   */
  @property({ reflect: true })
  public value = '';

  /**
   * The input name for form submission.
   * @attribute
   */
  @property({ reflect: true })
  public name = '';

  /**
   * Whether the input is required.
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Pattern for validation.
   * @attribute
   */
  @property({ reflect: true })
  public pattern?: string;

  /**
   * Minimum length.
   * @attribute
   */
  @property({ type: Number, reflect: true })
  public minLength?: number;

  /**
   * Maximum length.
   * @attribute
   */
  @property({ type: Number, reflect: true })
  public maxLength?: number;

  /**
   * Placeholder text.
   * @attribute
   */
  @property({ reflect: true })
  public placeholder = '';

  /**
   * Whether the input is disabled.
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @query('input') private _inputElement!: HTMLInputElement;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'textbox'
    });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value') ||
        changedProperties.has('required') ||
        changedProperties.has('pattern') ||
        changedProperties.has('minLength') ||
        changedProperties.has('maxLength')) {
      this.#validate();
      this.#internals.setFormValue(this.value);
    }

    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
      this.#internals.ariaDisabled = this.disabled ? 'true' : 'false';
    }

    if (changedProperties.has('required')) {
      this.#internals.ariaRequired = this.required ? 'true' : 'false';
    }

    if (changedProperties.has('value')) {
      const hasValue = !!this.value;
      toggleState(this.#internals, 'empty', !hasValue);
    }
  }

  public render(): TemplateResult {
    return html`
      <input
        .value="${live(this.value)}"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        ?disabled="${this.disabled}"
        pattern="${ifDefined(this.pattern)}"
        minlength="${ifDefined(this.minLength)}"
        maxlength="${ifDefined(this.maxLength)}"
        @input="${this.#handleInput}"
        @change="${this.#handleChange}"
      >
      ${!this.#internals.validity.valid ? html`
        <span class="error">${this.#internals.validationMessage}</span>
      ` : nothing}
    `;
  }

  #handleInput(evt: InputEvent): void {
    const target = evt.target as HTMLInputElement;
    this.value = target.value;
  }

  #handleChange(evt: Event): void {
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.value,
      bubbles: true,
      composed: true
    }));
  }

  #validate(): void {
    // Required validation
    if (this.required && !this.value) {
      this.#internals.setValidity(
        { valueMissing: true },
        'This field is required',
        this._inputElement
      );
      this.#internals.ariaInvalid = 'true';
      return;
    }

    // Pattern validation
    if (this.pattern && this.value && !new RegExp(this.pattern).test(this.value)) {
      this.#internals.setValidity(
        { patternMismatch: true },
        'Value does not match required pattern',
        this._inputElement
      );
      this.#internals.ariaInvalid = 'true';
      return;
    }

    // Length validation
    if (this.minLength && this.value.length < this.minLength) {
      this.#internals.setValidity(
        { tooShort: true },
        `Value must be at least ${this.minLength} characters`,
        this._inputElement
      );
      this.#internals.ariaInvalid = 'true';
      return;
    }

    if (this.maxLength && this.value.length > this.maxLength) {
      this.#internals.setValidity(
        { tooLong: true },
        `Value must be at most ${this.maxLength} characters`,
        this._inputElement
      );
      this.#internals.ariaInvalid = 'true';
      return;
    }

    // Valid
    this.#internals.setValidity({});
    this.#internals.ariaInvalid = 'false';
  }

  public formResetCallback(): void {
    this.value = '';
  }

  public formStateRestoreCallback(state: string | FormData): void {
    if (typeof state === 'string') {
      this.value = state;
    }
  }

  public get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  public checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#internals.reportValidity();
  }
}
```

## Best Practices

1. **Always initialize ElementInternals in constructor**
2. **Set form value in willUpdate() when value changes**
3. **Validate on value change and required/constraint changes**
4. **Use setDefaultAria() utility for ARIA properties**
5. **Implement form lifecycle callbacks** (reset, restore)
6. **Expose validity methods** (checkValidity, reportValidity)
7. **Use custom states for component-specific states**
8. **Provide validation anchor element** for better UX
9. **Clear validity when valid** with `setValidity({})`
10. **Update ARIA invalid state** based on validity
