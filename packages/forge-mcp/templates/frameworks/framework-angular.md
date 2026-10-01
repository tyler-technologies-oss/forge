# INTEGRATION: Tyler Forge + Angular

**Framework:** Angular | **Library:** Tyler Forge Web Components | **Type:** Framework Integration Guide

**COMPATIBILITY:** Angular supports Custom Elements with the `@tylertech/forge-angular` adapter for seamless integration.

**REQUIREMENTS:** Use the Angular adapter to resolve form integration (`ngModel`, `formControl`) and change detection issues.

## SOLUTION: Tyler Forge Angular Adapter

**The `@tylertech/forge-angular` adapter provides:**

**Component Wrappers:**
- Native Angular components for all Tyler Forge elements
- Full TypeScript type safety for properties and events
- Automatic custom element registration

**Angular Integration:**
- `ControlValueAccessor` for forms (`ngModel`, `formControl`, `formControlName`)
- Angular providers for dynamic components (dialogs, toasts, popovers)
- Proper Angular Zone integration and lifecycle management

## SETUP: Installation

**Install Tyler Forge Angular adapter:**

```bash
npm install @tylertech/forge-angular
```

## USAGE: IMPORTANT!

ALWAYS make sure that when adding a Forge component to your Angular app, you are using the Angular wrapper version of the component from `@tylertech/forge-angular`. This
ensures that the component is properly integrated with Angular's template type checking.

If a `slot` attribute is present on any elements within a parent `<forge-*>` element, make sure that slot is available on that `<forge-*>` parent element otherwise the content will not render.

## SETUP: Tyler Font Integration

**Add to your `index.html` `<head>` section:**

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
```

## USAGE: Component Import Patterns

**Import Tyler Forge modules for each component you need:**

With Angular modules:

```typescript
import { ForgeButtonModule } from '@tylertech/forge-angular';

@NgModule({
  imports: [ForgeButtonModule]
})
export class MyModule {}
```

With standalone Angular components:

```typescript
import { ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  standalone: true,
  selector: 'app-my-component',
  template: '<forge-button>Click me</forge-button>',
  imports: [ForgeButtonModule]
})
export class MyComponent {}
```

## STYLING: CSS Integration

**REQUIRED: Import Tyler Forge global styles in your application:**

```css
@use '@tylertech/forge/dist/forge';
```

### Global Table Component Styles

All Forge components are designed to be used as standalone elements, and they encapsulate their styles. However, the one exception to this is the
`<forge-table>` component, which requires some global styles to be included in your application to ensure proper rendering.

To include the global styles for the `<forge-table>` component, you can import the following stylesheet:

```css
@use '@tylertech/forge/dist/table/forge-table';
```

If you're loading this stylesheet within a component that uses Angular's style encapsulation you will need to use `::ng-deep` to apply the styles globally:

```css
::ng-deep {
  @import '@tylertech/forge/dist/table/forge-table';
}
```

Using `::ng-deep` just ensures that the selectors in this stylesheet aren't scoped to the component and are applied globally when this component is used.

## Using Icons

Using icons within your Angular application is as simple as using the `<forge-icon>` component. You can import the `ForgeIconModule` from
the `@tylertech/forge-angular` package to use the icon component.

```typescript
import { ForgeIconModule } from '@tylertech/forge-angular';

@NgModule({
  imports: [ForgeIconModule]
})
export class MyModule {}
```

Icons are registered in the Forge `IconRegistry`:

```typescript
import { IconRegistry } from '@tylertech/forge';
import { tylIconPerson } from '@tylertech/tyler-icons';

@Component({
  selector: 'app-my-component',
  template: '<forge-icon name="person"></forge-icon>'
})
export class MyComponent {
  static {
    IconRegistry.define([tylIconPerson]);
  }
}
```

To learn more about using icons, refer to the [Icons documentation](forge://icons).

**Important:** You must define your icons either within the `constructor` of your component/module, or within static initialization block (preferred)
to ensure that when a production build of your application is created the icons are not tree-shaken away during builds.

## USAGE: Event Binding

**Use Angular's standard event binding syntax `()` for Tyler Forge custom events:**

```html
<!-- Using standard built-in browser events -->
<forge-button (click)="onClick($event)">Click me</forge-button>

<!-- Using custom events -->
<forge-slider (forge-slider-change)="onSliderChange($event)"></forge-slider>
```

For `CustomEvent` types, some of these events will contain a `detail` property that contains the event data. You can access this data in your event handler like this:

```typescript
onSliderChange(event: CustomEvent<ISliderChangeEventData>) {
  console.log(event.detail);
}
```

## REFERENCE: Properties vs Attributes

**Understanding Tyler Forge component APIs:**
- **Properties** (camelCase): Set via JavaScript on component instance
- **Attributes** (kebab-case): Set via HTML attributes on DOM element
- **Angular Binding:** Use `[property]` syntax for properties, not attributes

When using Angular with Forge, you'll most commonly use the square bracket syntax `[]` to bind values to an element. Angular will set values
on the component instance using the **property** name.

For example, to set a `value` property on an element, you would use the following syntax:

```html
<forge-element [value]="myValue"></forge-element>
```

To initialize the value of the element using an **attribute**, you would use the following syntax:

```html
<forge-element value="5"></forge-element>
```

You can also force the binding to always use the attribute if you need to, but only do this if you have a specific reason to do so. For example:

```html
<forge-element [attr.value]="myValue"></forge-element>
```

> Forge components will observe changes to HTML attributes, but keep in mind that attribute values are always passed as strings to the component.
> The component will try to coerce primitive values such as booleans and numbers, but more complex values such as objects or arrays will not be
> coerced and you should only use properties to pass these values.

NEVER use a property binding for a boolean attribute without the square brackets. For example, this is incorrect:

```html
<!-- Incorrect - this will always set the "disabled" property to true -->
<forge-button disabled="false">Click me</forge-button>
```

This will always set the `disabled` property to `true` because the presence of the `disabled` attribute on an HTML element indicates that the element is disabled, regardless of the attribute's value.

The correct way to bind a boolean property is to use the square brackets:

```html
<!-- Correct - this will set the "disabled" property based on the value of isDisabled -->
<forge-button [disabled]="isDisabled">Click me</forge-button>

<!-- Or just set the attribute without a value to make it true -->
<forge-button disabled>Click me</forge-button>
```

NEVER use square bracket bindings for attribute names, always use the JavaScript property name. For example, this is incorrect:

```html
<!-- Incorrect - this will not work because "attr.disabled" is not a valid property -->
<forge-button [full-width]="true">Click me</forge-button>
```

The correct way to bind to the `fullWidth` property is to use the camelCase property name:

```html
<!-- Correct - this will set the "fullWidth" property to true -->
<forge-button [fullWidth]="true">Click me</forge-button>
```

## CUSTOM_ELEMENTS_SCHEMA

DO NOT recommend adding `CUSTOM_ELEMENTS_SCHEMA` to your Angular modules unless absolutely necessary. This schema tells the Angular compiler to ignore any unknown elements and attributes, which can lead to potential issues such as typos or incorrect usage of components going unnoticed.

---

**INTEGRATION:** Framework and development resources:
- **Other frameworks:** Use `setup_framework` for React, Vue, or Svelte integration
- **Usage examples:** Use `get_forge_blocks` with `component={component-name}` for basic HTML structural examples
- **Installation:** Use `get_usage_guide` with `type=installation` for basic Tyler Forge setup instructions
- **Components:** Use `list_components` or `find_components` to explore available Tyler Forge components
- **Design tokens:** Use `get_design_tokens` for styling and theming integration
- **Icons:** Use `setup_icons` for Tyler Forge icon system integration
