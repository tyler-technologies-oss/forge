import{j as e,M as r}from"./index-OukP47iL.js";import{useMDXComponents as s}from"./index-Ck7gG3J8.js";import"./iframe-BPbU5xgl.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";function o(t){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Frameworks/Angular"}),`
`,e.jsx(n.h1,{id:"angular",children:"Angular"}),`
`,e.jsxs(n.p,{children:["Angular has ",e.jsx(n.a,{href:"https://custom-elements-everywhere.com/#angular",rel:"nofollow",children:"great support"})," for custom elements and can be used directly."]}),`
`,e.jsxs(n.p,{children:["With that being said, while Angular ",e.jsx(n.em,{children:"can"})," be used with Forge, there are some caveats to be aware of:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The Angular compiler is not designed to work with custom elements, so you will need to use the ",e.jsx(n.code,{children:"CUSTOM_ELEMENTS_SCHEMA"})," to disable the compiler from throwing errors when it comes across any elements it does not recognize."]}),`
`,e.jsxs(n.li,{children:["Using ",e.jsx(n.code,{children:"ngModel"}),", ",e.jsx(n.code,{children:"formControl"})," or ",e.jsx(n.code,{children:"formControlName"})," does not work out of the box. You would need to implement ",e.jsx(n.code,{children:"ControlValueAccessor"})," directives for custom elements to integrate with Angular forms."]}),`
`,e.jsxs(n.li,{children:["Angular's change detection does not run in response to changes outside of the Angular context, so you might need to use ",e.jsx(n.code,{children:"NgZone"})," to manually trigger change detection where necessary."]}),`
`]}),`
`,e.jsx(n.h2,{id:"forge--angular-adapter",children:"Forge + Angular Adapter"}),`
`,e.jsx(n.p,{children:"To make using Forge with Angular more seamless, we have created an adapter library that helps with the issues mentioned above."}),`
`,e.jsx(n.p,{children:"This adapter provides the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Wrapper Angular components for all Forge components.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This allows you to use Forge components as if they were native Angular components."}),`
`,e.jsx(n.li,{children:"Provides type safety for all custom element properties and events."}),`
`,e.jsx(n.li,{children:"Auto-defines the custom element with the browser's custom elements registry."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Automatically provides ",e.jsx(n.code,{children:"ControlValueAccessor"})," directives for native Angular integration with Forge's form-associated elements."]}),`
`,e.jsxs(n.li,{children:["Exposes Angular providers for creating dynamic components such as dialogs, toasts, and popovers.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensures that the dynamic components are created within the Angular context (zone), and are properly destroyed when no longer needed."}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["While the adapter is not ",e.jsx(n.em,{children:"required"})," to use Forge with Angular, it is ",e.jsx(n.strong,{children:"highly"})," recommended to make the integration easier."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["You can view source code for the Angular adapter on ",e.jsx(n.a,{href:"https://github.com/tyler-technologies-oss/forge-angular",rel:"nofollow",children:"GitHub"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"To use Forge in your Angular application, install the following packages from npm:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/forge @tylertech/forge-angular
`})}),`
`,e.jsx(n.p,{children:"Now that you have Forge and the Angular adapter installed, let's add the rest of the setup to your Angular application."}),`
`,e.jsx(n.h2,{id:"loading-the-tyler-font",children:"Loading the Tyler font"}),`
`,e.jsxs(n.p,{children:["Edit your ",e.jsx(n.code,{children:"index.html"})," file and add the following ",e.jsx(n.code,{children:"<link>"})," tag to the ",e.jsx(n.code,{children:"<head>"})," section load the Tyler font:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,e.jsx(n.p,{children:"This will configure the default font family for your application, and load the required font weights and styles."}),`
`,e.jsx(n.h2,{id:"importing-components",children:"Importing Components"}),`
`,e.jsxs(n.p,{children:["To use Forge components in your Angular application, you will need to import component modules from the ",e.jsx(n.code,{children:"@tylertech/forge-angular"})," package for each component you want to use."]}),`
`,e.jsx(n.p,{children:"With Angular modules:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { ForgeButtonModule } from '@tylertech/forge-angular';

@NgModule({
  imports: [ForgeButtonModule]
})
export class MyModule {}
`})}),`
`,e.jsx(n.p,{children:"With standalone Angular components:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { ForgeButtonModule } from '@tylertech/forge-angular';

@Component({
  standalone: true,
  selector: 'app-my-component',
  template: '<forge-button>Click me</forge-button>',
  imports: [ForgeButtonModule]
})
export class MyComponent {}
`})}),`
`,e.jsx(n.h2,{id:"importing-styles",children:"Importing Styles"}),`
`,e.jsx(n.p,{children:`Forge does not require any global styles (with one exception noted below) because the custom elements encapsulate their styles.
However, there are some global styles that you may want to include in your application for your own use and tight integration with the
Forge theming, typography, and token system.`}),`
`,e.jsxs(n.p,{children:["To include any of these styles, you can import them from the ",e.jsx(n.code,{children:"@tylertech/forge"})," package:"]}),`
`,e.jsx(n.h3,{id:"typography",children:"Typography"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"forge-typography.css"})," stylesheet provides a set of CSS classes that can be used to apply font styles to text content within your app."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@use '@tylertech/forge/dist/typography/forge-typography';
`})}),`
`,e.jsx(n.h3,{id:"theme",children:"Theme"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"forge-theme.css"})," stylesheet provides a set of CSS variables that define the colors used throughout the design system."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@use '@tylertech/forge/dist/theme/forge-theme';
`})}),`
`,e.jsxs(n.p,{children:["The tokens are all defined at the ",e.jsx(n.code,{children:":root"})," selector on your ",e.jsx(n.code,{children:"<html>"})," element, so you can use them in your stylesheets like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-custom-class {
  background-color: var(--forge-theme-primary);
  color: var(--forge-theme-on-primary);
}
`})}),`
`,e.jsx(n.p,{children:`If you plan on allow for theme switching in your application, such as loading the Forge dark theme, it's important that you do not
use any hard-coded colors in your stylesheets. Instead, use the Forge theme tokens to ensure that your application's colors are consistent
and are automatically themed properly when the theme changes.`}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.a,{href:"?path=/docs/getting-started-theming--docs",children:"Theming"})," guide for more information on theming with Forge and loading the built-in dark theme."]}),`
`,e.jsx(n.h3,{id:"tokens",children:"Tokens"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"forge-tokens.css"}),` stylesheet provides a set of CSS variables that define various utility tokens used throughout the design system such
as spacing, border, animation, elevation... etc.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@use '@tylertech/forge/dist/forge-tokens';
`})}),`
`,e.jsx(n.p,{children:"This will allow you to use the tokens in your stylesheets like this:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-custom-class {
  padding: var(--forge-spacing-medium);
  border-radius: var(--forge-shape-medium);
  box-shadow: var(--forge-elevation-4);
  border: var(--forge-border-thin) solid var(--forge-theme-outline);
  transition: background-color var(--forge-animation-duration-short4) var(--forge-animation-easing-standard);
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["You can see all tokens available on the page under the ",e.jsx(n.code,{children:":root"})," selector on your ",e.jsx(n.code,{children:"<html>"})," element."]}),`
`]}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.a,{href:"?path=/docs/design-tokens-introduction--docs",children:"Design Tokens"})," documentation for more information on the available tokens."]}),`
`,e.jsx(n.h3,{id:"global-component-styles",children:"Global Component Styles"}),`
`,e.jsxs(n.p,{children:[`All Forge components are designed to be used as standalone elements, and they encapsulate their styles. However, the one exception to this is the
`,e.jsx(n.code,{children:"<forge-table>"})," component, which requires some global styles to be included in your application to ensure proper rendering."]}),`
`,e.jsxs(n.p,{children:["To include the global styles for the ",e.jsx(n.code,{children:"<forge-table>"})," component, you can import the following stylesheet:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@use '@tylertech/forge/dist/table/forge-table';
`})}),`
`,e.jsxs(n.p,{children:["If you're loading this stylesheet within a component that uses Angular's style encapsulation you will need to use ",e.jsx(n.code,{children:"::ng-deep"})," to apply the styles globally:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`::ng-deep {
  @import '@tylertech/forge/dist/table/forge-table';
}
`})}),`
`,e.jsxs(n.p,{children:["Using ",e.jsx(n.code,{children:"::ng-deep"})," just ensures that the selectors in this stylesheet aren't scoped to the component and are applied globally when this component is used."]}),`
`,e.jsx(n.h3,{id:"all",children:"All"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"forge.css"})," stylesheet includes everything listed below for convenience."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@use '@tylertech/forge/dist/forge';
`})}),`
`,e.jsx(n.h2,{id:"using-icons",children:"Using Icons"}),`
`,e.jsxs(n.p,{children:["Using icons within your Angular application is as simple as using the ",e.jsx(n.code,{children:"<forge-icon>"})," component. You can import the ",e.jsx(n.code,{children:"ForgeIconModule"}),` from
the `,e.jsx(n.code,{children:"@tylertech/forge-angular"})," package to use the icon component."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { ForgeIconModule } from '@tylertech/forge-angular';

@NgModule({
  imports: [ForgeIconModule]
})
export class MyModule {}
`})}),`
`,e.jsxs(n.p,{children:["Icons are defined within the Forge ",e.jsx(n.code,{children:"IconRegistry"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { IconRegistry } from '@tylertech/forge';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';

@Component({
  selector: 'app-my-component',
  template: '<forge-icon name="person"></forge-icon>'
})
export class MyComponent {
  constructor() {
    IconRegistry.define([tylIconPerson]);
  }
}
`})}),`
`,e.jsxs(n.p,{children:["To learn more about icons see the ",e.jsx(n.a,{href:"?path=/docs/getting-started-icons--docs",children:"Icons"})," documentation."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"})," You must define your icons either within the ",e.jsx(n.code,{children:"constructor"}),` of your component/module, or within
a `,e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks",rel:"nofollow",children:"static initialization block"}),`
to ensure that when a production build of your application is created the icons are not tree-shaken away.`]}),`
`,e.jsx(n.h2,{id:"events",children:"Events"}),`
`,e.jsxs(n.p,{children:["Angular uses parentheses ",e.jsx(n.code,{children:"()"})," to bind to events. When using Forge components, you will use the same syntax for its custom events."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Using standard built-in browser events -->
<forge-button (click)="onClick($event)">Click me</forge-button>

<!-- Using custom events -->
<forge-slider (forge-slider-change)="onSliderChange($event)"></forge-slider>
`})}),`
`,e.jsxs(n.p,{children:["For ",e.jsx(n.code,{children:"CustomEvent"})," types, some of these events will contain a ",e.jsx(n.code,{children:"detail"})," property that contains the event data. You can access this data in your event handler like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`onSliderChange(event: CustomEvent<ISliderChangeEventData>) {
  console.log(event.detail);
}
`})}),`
`,e.jsx(n.h2,{id:"properties-vs-attributes",children:"Properties vs Attributes"}),`
`,e.jsx(n.p,{children:`When viewing the API details for Forge components, you'll notice that there are both "properties" (camelCase) and "attributes" (snake-case)
listed. This is because HTML elements can have both properties and attributes, and they are not the same thing. Properties are used to
set values on the component instance, while attributes are typically used to initialize values on the DOM element.`}),`
`,e.jsxs(n.p,{children:["When using Angular with Forge, you'll most commonly use the square bracket syntax ",e.jsx(n.code,{children:"[]"}),` to bind values to an element. Angular will set values
on the component instance using the `,e.jsx(n.strong,{children:"property"})," name."]}),`
`,e.jsxs(n.p,{children:["For example, to set a ",e.jsx(n.code,{children:"value"})," property on an element, you would use the following syntax:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-element [value]="myValue"></forge-element>
`})}),`
`,e.jsxs(n.p,{children:["To initialize the value of the element using an ",e.jsx(n.strong,{children:"attribute"}),", you would use the following syntax:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-element value="5"></forge-element>
`})}),`
`,e.jsx(n.p,{children:"You can also force the binding to always use the attribute if you need to:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-element [attr.value]="myValue"></forge-element>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`Forge components will observe changes to HTML attributes, but keep in mind that attribute values are always passed as strings to the component.
The component will try to coerce primitive values such as booleans and numbers, but more complex values such as objects or arrays will not be
coerced and you should only use properties to pass these values.`}),`
`]}),`
`,e.jsx(n.h2,{id:"custom_elements_schema",children:"CUSTOM_ELEMENTS_SCHEMA"}),`
`,e.jsxs(n.p,{children:[`While not recommended, if you prefer not to use the adapter, you can easily disable the Angular compiler from throwing errors by adding the
`,e.jsx(n.code,{children:"CUSTOM_ELEMENTS_SCHEMA"})," to your component or module's ",e.jsx(n.code,{children:"schemas"})," array:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
`})}),`
`,e.jsx(n.p,{children:`This is a quicker and easier way to get started with Forge components in your Angular application, but keep in mind that you will lose some of the
type safety and integration benefits that the adapter provides.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[`If you're interested in pushing the Angular team along to help improve the support for custom elements, please consider up voting or chiming in on
the `,e.jsx(n.a,{href:"https://github.com/angular/angular/issues/12045",rel:"nofollow",children:"Angular issue"})," that is tracking this feature request."]}),`
`]})]})}function u(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{u as default};
