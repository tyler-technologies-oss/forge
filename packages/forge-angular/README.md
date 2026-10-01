# Forge Angular

[![npm version](https://img.shields.io/npm/v/@tylertech/forge-angular.svg)](https://www.npmjs.com/package/@tylertech/forge-angular)
[![npm downloads](https://img.shields.io/npm/dm/@tylertech/forge-angular.svg)](https://www.npmjs.com/package/@tylertech/forge-angular)
[![License](https://img.shields.io/npm/l/@tylertech/forge-angular.svg)](https://github.com/tyler-technologies-oss/forge-angular/blob/main/LICENSE)

An Angular adapter library for the Tyler Forge™ Web Components library.

## Overview

This library provides seamless integration between Angular and [Tyler Forge Web Components](https://www.npmjs.com/package/@tylertech/forge), enabling type-safe usage of Forge components in Angular applications.

### The Problem

Web Components (custom elements) are not fully compatible with Angular by default. Without proper integration, you must use `CUSTOM_ELEMENTS_SCHEMA` in your Angular modules, which causes:

- Loss of type safety for component properties and events
- No IntelliSense or code completion
- Missing compile-time error checking
- Poor developer experience

### The Solution

`@tylertech/forge-angular` provides:

1. **Auto-generated Proxy Components** - Strongly-typed Angular components wrapping each `<forge-*>` element with:
   - Full TypeScript type safety
   - IntelliSense and autocomplete support
   - Compile-time error checking
   - Proper Angular change detection integration

2. **ControlValueAccessor Directives** - Seamless integration with Angular Forms:
   - `formControlName` support
   - `formControl` binding
   - `ngModel` two-way binding
   - Reactive and template-driven form compatibility

3. **Tree-shakable Modules** - Each component is exported from its own module, allowing you to include only what you use.

> **Result**: Remove `CUSTOM_ELEMENTS_SCHEMA` and enjoy a fully type-safe Angular development experience with Forge components.

## Version Compatibility

> **Support Policy**: This library always supports the **current and previous (current-1) major versions of Angular**. For example, when Angular 21 is current, we support Angular 20 and 21. When Angular 22 releases, support moves to Angular 21 and 22.

| `@tylertech/forge-angular` | Angular             | Forge     |
| -------------------------- | ------------------- | --------- |
| `^8.0.0`                   | `>=20.0.0 < 23.0.0` | `^3.14.0` |
| `^7.0.0`                   | `>=20.0.0 < 22.0.0` | `^3.12.1` |
| `^6.0.0`                   | `>=19.0.0 < 21.0.0` | `^3.8.0`  |
| `^5.0.0`                   | `>=18.0.0 < 20.0.0` | `^3.0.0`  |
| `^4.0.0`                   | `>=17.0.0 < 19.0.0` | `^3.0.0`  |
| `^3.0.0`                   | `>=16.0.0 < 18.0.0` | `^2.0.0`  |
| `^2.0.0`                   | `>=13.3.0 < 16.0.0` | `^2.0.0`  |

## Installation

### 1. Install Dependencies

```bash
npm install @tylertech/forge @tylertech/forge-angular
```

- `@tylertech/forge` - The core Web Components library (framework-agnostic)
- `@tylertech/forge-angular` - The Angular adapter library (this package)

### 2. Import Global Styles

Add the Forge stylesheet to your `styles.scss`:

```scss
@use '@tylertech/forge/dist/forge.css';
```

Alternatively, add it to your `angular.json`:

```json
"styles": [
  "node_modules/@tylertech/forge/dist/forge.css",
  "src/styles.scss"
]
```

### 3. Add Typography Class

Add the `forge-typography` class to your `<body>` element in `index.html`:

```html
<body class="forge-typography">
  <app-root></app-root>
</body>
```

This applies Forge typography styles across your application.

### 4. Import Component Modules

Import the Angular modules for each Forge component you use:

```typescript
import { ForgeButtonModule } from '@tylertech/forge-angular/button';
import { ForgeTextFieldModule } from '@tylertech/forge-angular/text-field';

@NgModule({
  imports: [
    ForgeButtonModule,
    ForgeTextFieldModule
    // ... other modules
  ]
})
export class AppModule {}
```

## Usage

### Basic Component Usage

```typescript
import { Component } from '@angular/core';
import { ForgeButtonModule } from '@tylertech/forge-angular/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ForgeButtonModule],
  template: ` <forge-button type="raised" (click)="handleClick()"> Click Me </forge-button> `
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

### Form Integration

The library provides seamless integration with Angular Forms:

#### Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ForgeTextFieldModule } from '@tylertech/forge-angular/text-field';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, ForgeTextFieldModule],
  template: `
    <form [formGroup]="form">
      <forge-text-field>
        <input type="text" formControlName="username" />
        <label>Username</label>
      </forge-text-field>
    </form>
  `
})
export class FormComponent {
  form = this.fb.group({
    username: ['']
  });

  constructor(private fb: FormBuilder) {}
}
```

#### Template-Driven Forms

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgeTextFieldModule } from '@tylertech/forge-angular/text-field';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, ForgeTextFieldModule],
  template: `
    <forge-text-field>
      <input type="text" [(ngModel)]="username" name="username" />
      <label>Username</label>
    </forge-text-field>
  `
})
export class TemplateFormComponent {
  username = '';
}
```

## Documentation

For complete documentation on Forge components, visit the [Forge Design System](https://forge.tylertech.com/).

## Contributing

Contributions are welcome! Please see the [Contributing Guide](../../CONTRIBUTING.md) for details on development setup, testing, and the release process.

## License

This project is licensed under the Apache License 2.0.
