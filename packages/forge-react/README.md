# Tyler Forge™ React Adapter

This package contains the `@tylertech/forge-react` adapter library for working with
Tyler Forge™ components within a React application. This library contains React wrapper components,
hooks, and other utilities to improve the developer experience when building applications with Forge.

> Note: The `@tylertech/forge-react` package is not required when using Forge with React
> projects, but it will make the consumption of Forge seamless and feel more native to React developers.

## The problem

React doesn't pass data through the JavaScript API (properties) on HTML elements. This means that any Web
Components created with the Custom Elements API in the browser will suffer from the same issue when trying
to pass complex data types such as array, objects, and functions through to the underlying HTML element.

Another issue is how event bubbling works in React. Since React uses its own synthetic events system,
standard HTML event bubbling from custom elements doesn't work, nor does attaching event listeners to
these custom elements for any `CustomEvent` types.

This library provides proxy React component wrappers for all Forge components to ensure that the APIs
are properly consumed via the JavaScript API (HTML attributes are still usable as well), along with
providing the ability to listen to custom events on the elements.

> **Note:** React now natively supports communication with custom elements as of React 19. You will now be able
> to use the standard Forge elements directly (without the React wrappers) in React 19+ going forward!

## Data binding

React by default will set values on custom elements through HTML attributes, so code like this will not
work as expected because `data` will get stringified:

```html
<forge-table data="{data}"></forge-table>
```

By using this library, you will use the React wrapper components instead to ensure this works as expected:

```html
<ForgeTable data="{data}" />
```

## Event binding

When working with events, you will use a specific convention to attach callbacks:

```html
<ForgeTable on-forge-table-sort="{onSort}" />
```

> Prefix the standard Forge event names with `on-*` syntax to add event listener callbacks just
> as you normally would in React.

## Hooks

The library provides React hooks for working with dynamic elements such as dialog, toast, bottom sheet... etc.

> If you are using class components instead, there are also wrapper components for each that consume the hooks to expose
> them with a declarative API to use as a component.

For example you can show a dialog using a hook like this:

```ts
import { useForgeDialog } from '@tylertech/forge-react';

const DialogComponent = () => <div>Dialog component</div>;

const SomeComponent = () => {
  // You provide a component to display in a `<forge-dialog>` as the first parameter, and
  // any (optional) configuration as the second parameter
  const [showDialog, hideDialog] = useForgeDialog(DialogComponent, { persistent: true });

  function handleClick(): void {
    showDialog();
  }

  return (
    <ForgeButton>
      <button type="button" onClick={handleClick}>Show dialog</button>
    </ForgeButton>
  );
};
```

Alternatively, if you're using components, you can show a dialog like this:

```ts
import { ForgeDialog } from '@tylertech/forge';

const SomeComponent = () => {
  const [isOpen, setOpen] = useState(false);

  function handleClick(): void {
    setOpen(true);
  }

  return (
    <ForgeDialog open={isOpen} persistent on-forge-dialog-close={() => setOpen(false)}>
      <DialogComponent />
    </ForgeDialog>
  );
};
```

## Using Forge

This library provides React wrapper components for Forge, but it does **not** automatically register the corresponding Forge components with the browser. To do so, you will need to import the Forge component definition function(s) in your React app separately.

You typically want to define the components as early as possible in the bootstrapping process of your application. The `index.tsx` is a great place to do so:

```ts
import { defineComponents } from '@tylertech/forge';

defineComponents();
```

> Important: this will define **all** components in Forge, causing all of the code to be loaded into your app, even if you aren't using certain components.

To only load specific components, you can import the individual definition functions as needed:

```ts
import { defineAppBarComponent, defineButtonComponent } from '@tylertech/forge';

defineAppBarComponent();
defineButtonComponent();
```

> Note: depending on the structure of your application, it can be beneficial to register certain Forge components that are only used in a specific part of your
> app so that it is bundled only with the code that is using it. This is referred to as code splitting and can improve the performance of your app, especially
> when using lazy loading.

## Development

From the repository root:

```bash
pnpm dev:forge-react
```

To build the library, run the following from the repository root:

```bash
pnpm run --filter @tylertech/forge-react build
```

## TypeScript

This library provides typings for all React wrappers and hooks for compatibility with TypeScript.
