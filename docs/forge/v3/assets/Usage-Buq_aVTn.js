import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-DnLnh7by.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Usage`}),`
`,(0,c.jsx)(n.h1,{id:`usage`,children:`Usage`}),`
`,(0,c.jsxs)(n.p,{children:[`Tyler Forge components are custom HTML elements built as `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/API/Web_components`,rel:`nofollow`,children:`Web Components`}),`.
This means that you can use them in any front-end framework or library, such as React, Angular, Vue, or vanilla JavaScript and can be used
just like any other built-in HTML element. Each component has API documentation that describes the properties, events, and methods that
it supports, as well as examples of how to use the component in your application.`]}),`
`,(0,c.jsx)(n.h2,{id:`vs-code-integration`,children:`VS Code Integration`}),`
`,(0,c.jsx)(n.p,{children:`This is optional, but Forge provides custom data files for VS Code that you can use to get autocompletion and documentation for Forge components in your HTML and CSS files.`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsxs)(n.li,{children:[`If not done already, install the `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package`]}),`
`,(0,c.jsxs)(n.li,{children:[`If it doesn't already exist, create a `,(0,c.jsx)(n.code,{children:`.vscode`}),` directory at the root of your project`]}),`
`,(0,c.jsxs)(n.li,{children:[`If it doesn't already exist, create `,(0,c.jsx)(n.code,{children:`settings.json`}),` file inside the `,(0,c.jsx)(n.code,{children:`.vscode`}),` directory`]}),`
`,(0,c.jsxs)(n.li,{children:[`Add the following to the `,(0,c.jsx)(n.code,{children:`settings.json`}),` file:`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-json`,children:`{
  "html.customData": ["./node_modules/@tylertech/forge/dist/vscode.html-custom-data.json"],
  "css.customData": ["./node_modules/@tylertech/forge/dist/vscode.css-custom-data.json"]
}
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Important:`}),` you will need to restart VS Code for the changes to take effect.`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`You may need to adjust the path to your `,(0,c.jsx)(n.code,{children:`node_modules`}),` directory if it's not at the root of your project.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`properties--attributes`,children:`Properties & Attributes`}),`
`,(0,c.jsx)(n.p,{children:`Tyler Forge components have a set of properties and attributes that you can use to customize the appearance and behavior of the component.`}),`
`,(0,c.jsx)(n.p,{children:`HTML attributes use kebab-case (dash-separated) names, while JavaScript properties use camelCase (camelCased) names. Almost all attributes
have a corresponding JavaScript property, and setting the property will update the attribute, and vice versa. The only exception to this
is when complex data types such as objects or arrays are used, in which case you should use the property to set the value.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`All HTML attributes are passed as strings to the element. For primitive data types, such as numbers and booleans, the element will
automatically coerce the attribute value to the correct type before setting the internal property in most cases.`}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Properties are used to set values programmatically, while attributes are used to set values declaratively in the HTML (typically for default
values on the element):`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-button variant="raised">Click Me</forge-button>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`In the example above, the `,(0,c.jsx)(n.code,{children:`variant`}),` property is set to `,(0,c.jsx)(n.code,{children:`"raised"`}),` to create a raised button. You can also set the `,(0,c.jsx)(n.code,{children:`variant`}),` attribute in the JavaScript like this:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`const button = document.querySelector('forge-button');
button.variant = 'raised';
`})}),`
`,(0,c.jsx)(n.h3,{id:`boolean-attributes`,children:`Boolean attributes`}),`
`,(0,c.jsxs)(n.p,{children:[`Some properties are boolean attributes, which means that they can be set to `,(0,c.jsx)(n.code,{children:`true`}),` or `,(0,c.jsx)(n.code,{children:`false`}),` by the `,(0,c.jsx)(n.strong,{children:`existence`}),` of the attribute on the element:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-button disabled>Button</forge-button>
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`It's important to note that boolean attributes are set to `,(0,c.jsx)(n.code,{children:`true`}),` when the attribute is present, regardless of the value.`]}),`
`,(0,c.jsxs)(n.p,{children:[`In the following example, the `,(0,c.jsx)(n.code,{children:`disabled`}),` attribute is set to `,(0,c.jsx)(n.code,{children:`false`}),` but the button will still be disabled:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-button disabled="false">Button</forge-button>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`You would to remove the attribute from the element to set the underlying `,(0,c.jsx)(n.code,{children:`disabled`}),` property to `,(0,c.jsx)(n.code,{children:`false`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`events`,children:`Events`}),`
`,(0,c.jsx)(n.p,{children:`Tyler Forge components emit events that you can listen for in your application. Events are used to notify you when something happens, such as a button being
clicked or a dialog being closed.`}),`
`,(0,c.jsx)(n.h3,{id:`custom-events`,children:`Custom Events`}),`
`,(0,c.jsxs)(n.p,{children:[`You can listen for native events like `,(0,c.jsx)(n.code,{children:`click`}),` on any Tyler Forge component, but some components also emit custom events that you can listen for.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Custom events are prefixed with the component name, followed by a hyphen, and then the event name. For example, the `,(0,c.jsx)(n.code,{children:`forge-dialog`}),` component emits
a `,(0,c.jsx)(n.code,{children:`forge-dialog-close`}),` event when the dialog is closed. See the API docs page for each component to see which events it supports.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`const dialog = document.querySelector('forge-dialog');
dialog.addEventListener('forge-dialog-close', () => {
  console.log('Dialog closed');
});
`})}),`
`,(0,c.jsx)(n.h2,{id:`methods`,children:`Methods`}),`
`,(0,c.jsx)(n.p,{children:`Many Tyler Forge components have JavaScript methods that you can use to interact with the component programmatically. Methods are used to
perform actions on the component, such as opening a dialog or showing a snackbar.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-dialog>Content</forge-dialog>

<script>
  const button = document.querySelector('forge-dialog');
  button.show();
<\/script>
`})}),`
`,(0,c.jsx)(n.h2,{id:`slots`,children:`Slots`}),`
`,(0,c.jsxs)(n.p,{children:[`Tyler Forge components use `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot`,rel:`nofollow`,children:`slots`}),` to allow you to place content inside the
component. Slots are used to define where the content should be placed, and can be named or unnamed.`]}),`
`,(0,c.jsx)(n.p,{children:`Named slots are used to place content in a specific location within the component, while unnamed slots are used to place content in the
default location. Some components have multiple named slots that you can use to place content in different locations.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-scaffold>
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
`,(0,c.jsxs)(n.p,{children:[`In the example above, the `,(0,c.jsx)(n.code,{children:`forge-app-bar`}),` component is placed in the `,(0,c.jsx)(n.code,{children:`header`}),` slot, the `,(0,c.jsx)(n.code,{children:`forge-card`}),` component is placed in the `,(0,c.jsx)(n.code,{children:`body`}),` slot,
and the `,(0,c.jsx)(n.code,{children:`forge-footer`}),` component is placed in the `,(0,c.jsx)(n.code,{children:`footer`}),` slot. Note that the content placed within the `,(0,c.jsx)(n.code,{children:`<forge-card>`}),` component is placed
in the default (unnamed) slot.`]}),`
`,(0,c.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,c.jsxs)(n.p,{children:[`Some Tyler Forge components provide `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/:state`,rel:`nofollow`,children:`custom states`}),` that enable targeting the component
in CSS under certain conditions using the `,(0,c.jsx)(n.code,{children:`:state()`}),` pseudo-class.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`forge-meter:state(optimum-value) {
  outline: 1px solid green;
}
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`States provide a more reliable way to find and style components based on their current state than similar features such as attributes, which are
not guaranteed to always represent the current state of a component.`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`css-custom-properties`,children:`CSS Custom Properties`}),`
`,(0,c.jsxs)(n.p,{children:[`Many Tyler Forge components support design tokens, which are implemented as `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties`,rel:`nofollow`,children:`CSS custom properties`}),`
(also referred to as CSS variables) to allow you to customize the appearance of an element using CSS.`]}),`
`,(0,c.jsxs)(n.p,{children:[`CSS custom properties are defined using the `,(0,c.jsx)(n.code,{children:`--`}),` prefix, followed by the property name, and are set using the `,(0,c.jsx)(n.code,{children:`var()`}),` function in CSS. See the
API docs page for each component to see which custom properties it supports.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<style>
  .my-custom-button {
    --forge-button-background: red;
    --forge-button-color: white;
  }
</style>

<forge-button class="my-custom-button">Button</forge-button>
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`Custom properties are a powerful feature that allows you to customize the appearance of an element using CSS, but they should be used sparingly
to maintain design consistency across applications.`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`css-shadow-parts`,children:`CSS Shadow Parts`}),`
`,(0,c.jsxs)(n.p,{children:[`Tyler Forge components use `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts`,rel:`nofollow`,children:`CSS shadow parts`}),` to allow you to style the internal
"parts" of an element using CSS. Shadow parts are defined using the `,(0,c.jsx)(n.code,{children:`::part()`}),` pseudo-element, and can be used to fully customize the appearance
of an element.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`forge-button::part(root) {
  padding: 24px;
  background-color: red;
  color: white;
}
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`While shadow parts are a powerful feature, they should be used sparingly, as they can make it difficult to maintain and update the component in the future
if the internals of the component change, and they can also make it difficult to maintain design consistency across applications.`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`flash-of-unstyled-content-fouc`,children:`Flash of Unstyled Content (FOUC)`}),`
`,(0,c.jsx)(n.p,{children:`When using Tyler Forge components, you may experience what is referred to as "flash of unstyled content: or FOUC when the page loads. This is
caused by the browser rendering the page before the Forge elements have been what is referred to use "upgraded" by the browser. Upgrading a
custom element is the process of defining the element with the browser's custom element registry, which allows the browser to instantiate the
element and apply the custom element's styles, template, and behavior.`}),`
`,(0,c.jsx)(n.p,{children:`There are a few ways to prevent FOUC when using Tyler Forge, or more specifically custom elements in general:`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Use the `,(0,c.jsx)(n.code,{children:`:defined`}),` pseudo-class to hide the content until the custom elements have been upgraded:`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`/* Hide the content until the custom elements have been upgraded */
:not(:defined) {
  visibility: hidden;
}
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Note: Use `,(0,c.jsx)(n.code,{children:`visibility: hidden`}),` instead of `,(0,c.jsx)(n.code,{children:`display: none`}),` to prevent layout shifts when the elements are upgraded.`]}),`
`]}),`
`,(0,c.jsxs)(n.ol,{start:`2`,children:[`
`,(0,c.jsxs)(n.li,{children:[`Using the `,(0,c.jsx)(n.code,{children:`customElements.whenDefined()`}),` method to wait for the custom elements to be defined before rendering the content:`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`// Wait for a specific custom element to be defined
customElements.whenDefined('forge-button').then(() => {
  // Do something after the custom element has been defined
});

// Wait for all custom elements to be defined with \`Promise.allSettled()\`
Promise.allSettled([customElements.whenDefined('forge-scaffold'), customElements.whenDefined('forge-card')]).then(() => {
  // Do something after all custom elements have been defined
});
`})}),`
`,(0,c.jsxs)(n.p,{children:[`One way to handle this situation more gracefully is to fade in the content once the custom elements have been defined. You can do this by
adding a CSS transition to the `,(0,c.jsx)(n.code,{children:`body`}),` element that fades in the content once a CSS class has been added:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<style>
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
`,(0,c.jsx)(n.h2,{id:`key-components`,children:`Key Components`}),`
`,(0,c.jsx)(n.p,{children:`Now that you understand how to install and use Forge, let's take a look at some of the key components that Forge provides.`}),`
`,(0,c.jsx)(n.h3,{id:`scaffold`,children:`Scaffold`}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`<forge-scaffold>`}),` component is a layout component that you can use for the base layout of your application. It provides a
set of named slots that you can use to place your content, and handles the scrolling and overflow of the content for you.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-scaffold>
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
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`The scaffold component is great for a top-level layout, but you can also use it within other components, such as dialogs and cards, to utilize the same layout structure.`}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`app-bar`,children:`App Bar`}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`<forge-app-bar>`}),` component is a header component that you can use to display the logo and title of your application, as well as any actions and/or navigation items.`]}),`
`,(0,c.jsx)(n.p,{children:`An app bar gives your application an identity, consistent look and feel, and provides a consistent location for users to quickly access common actions.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-app-bar title-text="My Application">
  <forge-icon-button slot="end" aria-label="View my favorites">
    <forge-icon icon="favorites"></forge-icon>
  </forge-icon-button>

  <forge-app-bar-profile-button slot="end"></forge-app-bar-profile-button>
</forge-app-bar>
`})}),`
`,(0,c.jsx)(n.h3,{id:`card`,children:`Card`}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`<forge-card>`}),` component is a container component that you can use to group related content together. It provides a consistent
surface for your content, and can be used to display information, actions, and other components.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-card>
  <h3 class="forge-typography--heading5">My Card</h3>
  <p>My Content</p>
</forge-card>
`})}),`
`,(0,c.jsx)(n.h3,{id:`toolbar`,children:`Toolbar`}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`<forge-toolbar>`}),` component is a layout component that you can use to display a title or other content at the top of a page or section.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-toolbar>
  <h2 slot="start" class="forge-typography--heading4">My Page</h2>
  <forge-icon-button slot="end" aria-label="See more">
    <forge-icon icon="more_vert"></forge-icon>
  </forge-icon-button>
</forge-toolbar>
`})}),`
`,(0,c.jsx)(n.p,{children:`These are just a few of the components that Forge provides. See the "Components" section in the sidebar for more information on the components available in Forge.`})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};