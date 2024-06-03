import{j as e}from"./jsx-runtime-CeaLn2HN.js";import{u as s}from"./index-Dm3rrdsT.js";import{M as a}from"./index-CuL1eTYB.js";import"./iframe-C5qSX56P.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";function o(t){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Getting Started/Usage"}),`
`,e.jsx(n.h1,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["Tyler Forge components are custom HTML elements built as ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_components",rel:"nofollow",children:"Web Components"}),`.
This means that you can use them in any front-end framework or library, such as React, Angular, Vue, or vanilla JavaScript and can be used
just like any other built-in HTML element. Each component has API documentation that describes the properties, events, and methods that
it supports, as well as examples of how to use the component in your application.`]}),`
`,e.jsx(n.h2,{id:"vs-code-integration",children:"VS Code Integration"}),`
`,e.jsx(n.p,{children:"This is optional, but Forge provides custom data files for VS Code that you can use to get autocompletion and documentation for Forge components in your HTML and CSS files."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["If not done already, install the ",e.jsx(n.code,{children:"@tylertech/forge"})," package"]}),`
`,e.jsxs(n.li,{children:["If it doesn't already exist, create a ",e.jsx(n.code,{children:".vscode"})," directory at the root of your project"]}),`
`,e.jsxs(n.li,{children:["If it doesn't already exist, create ",e.jsx(n.code,{children:"settings.json"})," file inside the ",e.jsx(n.code,{children:".vscode"})," directory"]}),`
`,e.jsxs(n.li,{children:["Add the following to the ",e.jsx(n.code,{children:"settings.json"})," file:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "html.customData": ["./node_modules/@tylertech/forge/dist/vscode.html-custom-data.json"],
  "css.customData": ["./node_modules/@tylertech/forge/dist/vscode.css-custom-data.json"]
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"})," you will need to restart VS Code for the changes to take effect."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["You may need to adjust the path to your ",e.jsx(n.code,{children:"node_modules"})," directory if it's not at the root of your project."]}),`
`]}),`
`,e.jsx(n.h2,{id:"properties--attributes",children:"Properties & Attributes"}),`
`,e.jsx(n.p,{children:"Tyler Forge components have a set of properties and attributes that you can use to customize the appearance and behavior of the component."}),`
`,e.jsx(n.p,{children:`HTML attributes use kebab-case (dash-separated) names, while JavaScript properties use camelCase (camelCased) names. Almost all attributes
have a corresponding JavaScript property, and setting the property will update the attribute, and vice versa. The only exception to this
is when complex data types such as objects or arrays are used, in which case you should use the property to set the value.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`All HTML attributes are passed as strings to the element. For primitive data types, such as numbers and booleans, the element will
automatically coerce the attribute value to the correct type before setting the internal property in most cases.`}),`
`]}),`
`,e.jsx(n.p,{children:`Properties are used to set values programmatically, while attributes are used to set values declaratively in the HTML (typically for default
values on the element):`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-button variant="raised">Click Me</forge-button>
`})}),`
`,e.jsxs(n.p,{children:["In the example above, the ",e.jsx(n.code,{children:"variant"})," property is set to ",e.jsx(n.code,{children:'"raised"'})," to create a raised button. You can also set the ",e.jsx(n.code,{children:"variant"})," attribute in the JavaScript like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const button = document.querySelector('forge-button');
button.variant = 'raised';
`})}),`
`,e.jsx(n.h3,{id:"boolean-attributes",children:"Boolean attributes"}),`
`,e.jsxs(n.p,{children:["Some properties are boolean attributes, which means that they can be set to ",e.jsx(n.code,{children:"true"})," or ",e.jsx(n.code,{children:"false"})," by the ",e.jsx(n.strong,{children:"existence"})," of the attribute on the element:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-button disabled>Button</forge-button>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["It's important to note that boolean attributes are set to ",e.jsx(n.code,{children:"true"})," when the attribute is present, regardless of the value."]}),`
`,e.jsxs(n.p,{children:["In the following example, the ",e.jsx(n.code,{children:"disabled"})," attribute is set to ",e.jsx(n.code,{children:"false"})," but the button will still be disabled:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-button disabled="false">Button</forge-button>
`})}),`
`,e.jsxs(n.p,{children:["You would to remove the attribute from the element to set the underlying ",e.jsx(n.code,{children:"disabled"})," property to ",e.jsx(n.code,{children:"false"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"events",children:"Events"}),`
`,e.jsx(n.p,{children:`Tyler Forge components emit events that you can listen for in your application. Events are used to notify you when something happens, such as a button being
clicked or a dialog being closed.`}),`
`,e.jsx(n.h3,{id:"custom-events",children:"Custom Events"}),`
`,e.jsxs(n.p,{children:["You can listen for native events like ",e.jsx(n.code,{children:"click"})," on any Tyler Forge component, but some components also emit custom events that you can listen for."]}),`
`,e.jsxs(n.p,{children:["Custom events are prefixed with the component name, followed by a hyphen, and then the event name. For example, the ",e.jsx(n.code,{children:"forge-dialog"}),` component emits
a `,e.jsx(n.code,{children:"forge-dialog-close"})," event when the dialog is closed. See the API docs page for each component to see which events it supports."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const dialog = document.querySelector('forge-dialog');
dialog.addEventListener('forge-dialog-close', () => {
  console.log('Dialog closed');
});
`})}),`
`,e.jsx(n.h2,{id:"methods",children:"Methods"}),`
`,e.jsx(n.p,{children:`Many Tyler Forge components have JavaScript methods that you can use to interact with the component programmatically. Methods are used to
perform actions on the component, such as opening a dialog or showing a snackbar.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-dialog>Content</forge-dialog>

<script>
  const button = document.querySelector('forge-dialog');
  button.show();
<\/script>
`})}),`
`,e.jsx(n.h2,{id:"slots",children:"Slots"}),`
`,e.jsxs(n.p,{children:["Tyler Forge components use ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot",rel:"nofollow",children:"slots"}),` to allow you to place content inside the
component. Slots are used to define where the content should be placed, and can be named or unnamed.`]}),`
`,e.jsx(n.p,{children:`Named slots are used to place content in a specific location within the component, while unnamed slots are used to place content in the
default location. Some components have multiple named slots that you can use to place content in different locations.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-scaffold>
  <forge-app-bar slot="header" title-text="My Application"></forge-app-bar>
  <main slot="body">
    <forge-card>
      <p>My Content</p>
    </forge-card>
  </main>
  <forge-footer slot="footer">
    <p>My Footer</p>
  </forge-footer>
</forge-scaffold>
`})}),`
`,e.jsxs(n.p,{children:["In the example above, the ",e.jsx(n.code,{children:"forge-app-bar"})," component is placed in the ",e.jsx(n.code,{children:"header"})," slot, the ",e.jsx(n.code,{children:"forge-card"})," component is placed in the ",e.jsx(n.code,{children:"body"}),` slot,
and the `,e.jsx(n.code,{children:"forge-footer"})," component is placed in the ",e.jsx(n.code,{children:"footer"})," slot. Note that the content placed within the ",e.jsx(n.code,{children:"<forge-card>"}),` component is placed
in the default (unnamed) slot.`]}),`
`,e.jsx(n.h2,{id:"css-custom-properties",children:"CSS Custom Properties"}),`
`,e.jsxs(n.p,{children:["Many Tyler Forge components support design tokens, which are implemented as ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",rel:"nofollow",children:"CSS custom properties"}),`
(also referred to as CSS variables) to allow you to customize the appearance of an element using CSS.`]}),`
`,e.jsxs(n.p,{children:["CSS custom properties are defined using the ",e.jsx(n.code,{children:"--"})," prefix, followed by the property name, and are set using the ",e.jsx(n.code,{children:"var()"}),` function in CSS. See the
API docs page for each component to see which custom properties it supports.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<style>
  .my-custom-button {
    --forge-button-background: red;
    --forge-button-color: white;
  }
</style>

<forge-button class="my-custom-button">Button</forge-button>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`Custom properties are a powerful feature that allows you to customize the appearance of an element using CSS, but they should be used sparingly
to maintain design consistency across applications.`}),`
`]}),`
`,e.jsx(n.h2,{id:"css-shadow-parts",children:"CSS Shadow Parts"}),`
`,e.jsxs(n.p,{children:["Tyler Forge components use ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts",rel:"nofollow",children:"CSS shadow parts"}),` to allow you to style the internal
"parts" of an element using CSS. Shadow parts are defined using the `,e.jsx(n.code,{children:"::part()"}),` pseudo-element, and can be used to fully customize the appearance
of an element.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`forge-button::part(root) {
  padding: 24px;
  background-color: red;
  color: white;
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`While shadow parts are a powerful feature, they should be used sparingly, as they can make it difficult to maintain and update the component in the future
if the internals of the component change, and they can also make it difficult to maintain design consistency across applications.`}),`
`]}),`
`,e.jsx(n.h2,{id:"flash-of-unstyled-content-fouc",children:"Flash of Unstyled Content (FOUC)"}),`
`,e.jsx(n.p,{children:`When using Tyler Forge components, you may experience  what is referred to as "flash of unstyled content: or FOUC when the page loads. This is
caused by the browser rendering the page before the Forge elements have been what is referred to use "upgraded" by the browser. Upgrading a
custom element is the process of defining the element with the browser's custom element registry, which allows the browser to instantiate the
element and apply the custom element's styles, template, and behavior.`}),`
`,e.jsx(n.p,{children:"There are a few ways to prevent FOUC when using Tyler Forge, or more specifically custom elements in general:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.code,{children:":defined"})," pseudo-class to hide the content until the custom elements have been upgraded:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Hide the content until the custom elements have been upgraded */
:not(:defined) {
  visibility: hidden;
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Note: Use ",e.jsx(n.code,{children:"visibility: hidden"})," instead of ",e.jsx(n.code,{children:"display: none"})," to prevent layout shifts when the elements are upgraded."]}),`
`]}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Using the ",e.jsx(n.code,{children:"customElements.whenDefined()"})," method to wait for the custom elements to be defined before rendering the content:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// Wait for a specific custom element to be defined
customElements.whenDefined('forge-button').then(() => {
  // Do something after the custom element has been defined
});

// Wait for all custom elements to be defined with \`Promise.allSettled()\`
Promise.allSettled([
  customElements.whenDefined('forge-scaffold'),
  customElements.whenDefined('forge-card'),
]).then(() => {
  // Do something after all custom elements have been defined
});
`})}),`
`,e.jsxs(n.p,{children:[`One way to handle this situation more gracefully is to fade in the content once the custom elements have been defined. You can do this by
adding a CSS transition to the `,e.jsx(n.code,{children:"body"})," element that fades in the content once a CSS class has been added:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<style>
  body {
    opacity: 0;
  }

  body.ready {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
</style>

<script>
  await Promise.allSettled([
    customElements.whenDefined('forge-app-bar'),
    customElements.whenDefined('forge-scaffold'),
    customElements.whenDefined('forge-card')
  ]);

  document.body.classList.add('ready');
<\/script>
`})}),`
`,e.jsx(n.h2,{id:"key-components",children:"Key Components"}),`
`,e.jsx(n.p,{children:"Now that you understand how to install and use Forge, let's take a look at some of the key components that Forge provides."}),`
`,e.jsx(n.h3,{id:"scaffold",children:"Scaffold"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-scaffold>"}),` component is a layout component that you can use for the base layout of your application. It provides a
set of named slots that you can use to place your content, and handles the scrolling and overflow of the content for you.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-scaffold>
  <forge-app-bar slot="header" title-text="My Application"></forge-app-bar>
  <forge-toolbar slot="body-header">
    <h2 class="forge-typography--heading4">My Page</h2>
  </forge-toolbar>
  <main slot="body">
    <forge-card>
      <p>My Content</p>
    </forge-card>
  </main>
  <forge-footer slot="footer">
    <p>My Footer</p>
  </forge-footer>
</forge-scaffold>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"The scaffold component is great for a top-level layout, but you can also use it within other components, such as dialogs and cards, to utilize the same layout structure."}),`
`]}),`
`,e.jsx(n.h3,{id:"app-bar",children:"App Bar"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-app-bar>"})," component is a header component that you can use to display the logo and title of your application, as well as any actions and/or navigation items."]}),`
`,e.jsx(n.p,{children:"An app bar gives your application an identity, consistent look and feel, and provides a consistent location for users to quickly access common actions."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-bar title-text="My Application">
  <forge-icon-button slot="end" aria-label="View my favorites">
    <forge-icon icon="favorites"></forge-icon>
  </forge-icon-button>

  <forge-app-bar-profile-button slot="end"></forge-app-bar-profile-button>
</forge-app-bar>
`})}),`
`,e.jsx(n.h3,{id:"card",children:"Card"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-card>"}),` component is a container component that you can use to group related content together. It provides a consistent
surface for your content, and can be used to display information, actions, and other components.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-card>
  <h3 class="forge-typography--heading5">My Card</h3>
  <p>My Content</p>
</forge-card>
`})}),`
`,e.jsx(n.h3,{id:"toolbar",children:"Toolbar"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-toolbar>"})," component is a layout component that you can use to display a title or other content at the top of a page or section."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-toolbar>
  <h2 slot="start" class="forge-typography--heading4">My Page</h2>
  <forge-icon-button slot="end" aria-label="See more">
    <forge-icon icon="more_vert"></forge-icon>
  </forge-icon-button>
</forge-toolbar>
`})}),`
`,e.jsx(n.p,{children:'These are just a few of the components that Forge provides. See the "Components" section in the sidebar for more information on the components available in Forge.'})]})}function g(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{g as default};
