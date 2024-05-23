import{j as o}from"./jsx-runtime-JVS8tgJX.js";import{u as a}from"./index-Td0tMaUn.js";import{M as r}from"./index-7_lP9Yc2.js";import"./iframe-I1AcJgv1.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";function t(n){const e={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...a(),...n.components};return o.jsxs(o.Fragment,{children:[o.jsx(r,{title:"Getting Started/Usage"}),`
`,o.jsx(e.h1,{id:"usage",children:"Usage"}),`
`,o.jsx(e.p,{children:`Once you've installed Forge, configured your application to use the proper font, typography, theme, and icons, you can start using
the components to create your application. Forge components are designed to be flexible and easy to use, and can be composed together
to create complex interfaces more quickly. Let's look at some of the key components and how you can use them in your application.`}),`
`,o.jsx(e.h2,{id:"scaffold",children:"Scaffold"}),`
`,o.jsxs(e.p,{children:["The ",o.jsx(e.code,{children:"<forge-scaffold>"}),` component is a layout component that you can use for the base layout of your application. It provides a
set of named slots that you can use to place your content, and handles the scrolling and overflow of the content for you.`]}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-html",children:`<forge-scaffold>
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
`,o.jsxs(e.blockquote,{children:[`
`,o.jsx(e.p,{children:"The scaffold component is great for a top-level layout, but you can also use it within other components, such as dialogs and cards, to utilize the same layout structure."}),`
`]}),`
`,o.jsx(e.h2,{id:"app-bar",children:"App Bar"}),`
`,o.jsxs(e.p,{children:["The ",o.jsx(e.code,{children:"<forge-app-bar>"})," component is a header component that you can use to display the logo and title of your application, as well as any actions and/or navigation items."]}),`
`,o.jsx(e.p,{children:"An app bar gives your application an identity, consistent look and feel, and provides a consistent location for users to quickly access common actions."}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-html",children:`<forge-app-bar title-text="My Application">
  <forge-icon-button slot="end" aria-label="View my favorites">
    <forge-icon icon="favorites"></forge-icon>
  </forge-icon-button>

  <forge-app-bar-profile-button slot="end"></forge-app-bar-profile-button>
</forge-app-bar>
`})}),`
`,o.jsx(e.h2,{id:"card",children:"Card"}),`
`,o.jsxs(e.p,{children:["The ",o.jsx(e.code,{children:"<forge-card>"}),` component is a container component that you can use to group related content together. It provides a consistent
surface for your content, and can be used to display information, actions, and other components.`]}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-html",children:`<forge-card>
  <h3 class="forge-typography--heading5">My Card</h3>
  <p>My Content</p>
</forge-card>
`})}),`
`,o.jsx(e.h2,{id:"toolbar",children:"Toolbar"}),`
`,o.jsxs(e.p,{children:["The ",o.jsx(e.code,{children:"<forge-toolbar>"})," component is a layout component that you can use to display a title or other content at the top of a page or section."]}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-html",children:`<forge-toolbar>
  <h2 slot="start" class="forge-typography--heading4">My Page</h2>
  <forge-icon-button slot="end" aria-label="See more">
    <forge-icon icon="more_vert"></forge-icon>
  </forge-icon-button>
</forge-toolbar>
`})}),`
`,o.jsx(e.p,{children:'These are just a few of the components that Forge provides. See the "Components" section in the sidebar for more information on the components available in Forge.'})]})}function m(n={}){const{wrapper:e}={...a(),...n.components};return e?o.jsx(e,{...n,children:o.jsx(t,{...n})}):t(n)}export{m as default};
