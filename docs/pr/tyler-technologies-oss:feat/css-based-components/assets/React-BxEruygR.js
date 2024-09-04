import{j as e}from"./jsx-runtime-CFMSJ0Oo.js";import{u as r}from"./index-eZawsjBl.js";import{ae as s}from"./index-CsV2yrIV.js";import"./iframe-Da-5sk24.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";function o(n){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Frameworks/React"}),`
`,e.jsx(t.h1,{id:"react",children:"React"}),`
`,e.jsxs(t.p,{children:[`Direct support for custom elements in React has been a requested feature for long time. As you can see on
`,e.jsx(t.a,{href:"https://custom-elements-everywhere.com/#react",rel:"nofollow",children:"Custom Elements Everywhere"})," React scores quite low."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["As of May 2024, React 19 is in beta and now ",e.jsx(t.a,{href:"https://custom-elements-everywhere.com/#react-beta",rel:"nofollow",children:"better supports custom elements"})," natively."]}),`
`,e.jsx(t.p,{children:"This means that you can use Forge components directly in React more seamlessly without any additional libraries! 🎉"}),`
`]}),`
`,e.jsx(t.h2,{id:"the-problem",children:"The Problem"}),`
`,e.jsx(t.p,{children:`React doesn't pass data through the JavaScript API on HTML elements. This means that any Web Components created
with the Custom Elements API in the browser will suffer from the same issue when trying to pass complex data types
such as array, objects, and functions through to the underlying HTML element.`}),`
`,e.jsx(t.p,{children:`Another issue is how event bubbling works in React. Since React uses its own synthetic events system, standard HTML
event bubbling from custom elements doesn't work, nor does attaching event listeners to these custom elements.`}),`
`,e.jsx(t.h2,{id:"forge--react-adapter",children:"Forge + React Adapter"}),`
`,e.jsx(t.p,{children:"To make using Forge with React more seamless, we have created an adapter library that helps with the issues mentioned above."}),`
`,e.jsx(t.p,{children:`This adapter library provides a thin wrapper component around all Forge components that allows you to pass data and listen
to events in a more React-friendly way.`}),`
`,e.jsxs(t.p,{children:["While the adapter is not ",e.jsx(t.em,{children:"required"})," to use Forge with React, it is ",e.jsx(t.strong,{children:"highly"})," recommended to make the integration easier."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["You can view source code for the React adapter on ",e.jsx(t.a,{href:"https://github.com/tyler-technologies-oss/forge-react",rel:"nofollow",children:"GitHub"})]}),`
`]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.p,{children:"To use Forge in your React application, install the following packages from npm:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @tylertech/forge @tylertech/forge-react
`})}),`
`,e.jsx(t.p,{children:"Now that you have Forge and the React adapter installed, let's add the rest of the setup to your React application."}),`
`,e.jsx(t.h2,{id:"loading-the-tyler-font",children:"Loading the Tyler Font"}),`
`,e.jsxs(t.p,{children:["Edit your ",e.jsx(t.code,{children:"index.html"})," file and add the following ",e.jsx(t.code,{children:"<link>"})," tag to the ",e.jsx(t.code,{children:"<head>"})," section load the Tyler font:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,e.jsx(t.p,{children:"This will configure the default font family for your application, and load the required font weights and styles."}),`
`,e.jsx(t.h2,{id:"importing-components",children:"Importing Components"}),`
`,e.jsxs(t.p,{children:["To use Forge components in your React application, import the components you need from the ",e.jsx(t.code,{children:"@tylertech/forge-react"}),` package,
as well as the definition functions from `,e.jsx(t.code,{children:"@tylertech/forge"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import { ForgeButton, ForgeCard } from '@tylertech/forge-react';
import { defineButtonComponent, defineCardComponent } from '@tylertech/forge';

defineButtonComponent();
defineCardComponent();

function App() {
  return (
    <div>
      <ForgeCard>
        <ForgeButton>Click me</ForgeButton>
      </ForgeCard>
    </div>
  );
}
`})}),`
`,e.jsx(t.h2,{id:"importing-styles",children:"Importing Styles"}),`
`,e.jsxs(t.p,{children:["To use the default Forge styles in your React application, import the ",e.jsx(t.code,{children:"forge.css"})," file from the ",e.jsx(t.code,{children:"@tylertech/forge"})," package."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import '@tylertech/forge/dist/forge.css';
`})})]})}function g(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{g as default};
