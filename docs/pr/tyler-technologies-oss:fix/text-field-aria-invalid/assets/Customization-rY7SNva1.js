import{j as e,M as a}from"./blocks-B2mrUp7O.js";import{useMDXComponents as i}from"./index-BAFzhEJw.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DI7yp4Es.js";function n(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Getting Started/Customization"}),`
`,e.jsx(t.h1,{id:"customization",children:"Customization"}),`
`,e.jsx(t.p,{children:`There are many ways that Forge components can be customized. Whether you are looking for theming, overriding internal styles
within the Shadow DOM, or looking to extend a component with new functionality you will find information about how to go
about that within this guide.`}),`
`,e.jsx(t.h2,{id:"theming",children:"Theming"}),`
`,e.jsxs(t.p,{children:["All components within Forge support theming at the core. To view detailed information about theming, please view the ",e.jsx(t.a,{href:"?path=/docs/getting-started-theming--docs",children:"theming guide"}),"."]}),`
`,e.jsx(t.h2,{id:"css",children:"CSS"}),`
`,e.jsxs(t.p,{children:["When attempting to customize a component via CSS, you will be using either ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/--*",rel:"nofollow",children:"CSS Custom Properties"})," or ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/--*",rel:"nofollow",children:"CSS Shadow Parts"}),`.
Both of these CSS-based solutions will give you access to changing how the internals of a component are rendered without adjusting any functionality.`]}),`
`,e.jsx(t.p,{children:"For example, Forge provides many CSS custom properties from within specific components to help adjust specific internal styles:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`forge-button {
  --forge-button-background: red;
}
`})}),`
`,e.jsxs(t.p,{children:[`If you want to have complete control over any of the internal styles within a component, that's where CSS Shadow Parts come in. This feature allows you to target
any named "part" of a component (any element within the components' Shadow DOM that has a `,e.jsx(t.code,{children:"part"})," attribute applied) and set any CSS styles on it that you wish:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`forge-button::part(root) {
  height: 100px;
  background-color: red;
  display: grid;
}
`})}),`
`,e.jsx(t.h2,{id:"html",children:"HTML"}),`
`,e.jsxs(t.p,{children:["You can also customize components via HTML using the provided HTML ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot",rel:"nofollow",children:"slot"}),` elements within the Shadow DOM of a component. This allows for you to project
your own content into specifically named locations within the internal template of a component. Typically a component will expect certain elements to be applied
within these slots, but this also allows for you to potentially customize the usage to your needs if you see fit.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-text-field>
  <label for="input">Label</label>
  <input type="text" id="input" />

  <!-- Render a custom element into a slot if desired -->
  <forge-badge slot="helper-text">Custom helper text</forge-badge>
</forge-text-field>
`})}),`
`,e.jsx(t.p,{children:`So as you can see, you can customize anything you want. Now, would you typically want to do that? Probably not since it doesn't follow proper design guidance, but
these examples show you how you might be able to customize things and how easy that can be achieved.`})]})}function d(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{d as default};
