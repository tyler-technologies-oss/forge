import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-Bcs6hT4V.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Frameworks/React`}),`
`,(0,c.jsx)(n.h1,{id:`react`,children:`React`}),`
`,(0,c.jsxs)(n.p,{children:[`Direct support for custom elements in React has been a requested feature for long time. As you can see on
`,(0,c.jsx)(n.a,{href:`https://custom-elements-everywhere.com/#react`,rel:`nofollow`,children:`Custom Elements Everywhere`}),` React scores quite low.`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`As of May 2024, React 19 is in beta and now `,(0,c.jsx)(n.a,{href:`https://custom-elements-everywhere.com/#react-beta`,rel:`nofollow`,children:`better supports custom elements`}),` natively.`]}),`
`,(0,c.jsx)(n.p,{children:`This means that you can use Forge components directly in React more seamlessly without any additional libraries! 🎉`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`the-problem`,children:`The Problem`}),`
`,(0,c.jsx)(n.p,{children:`React doesn't pass data through the JavaScript API on HTML elements. This means that any Web Components created
with the Custom Elements API in the browser will suffer from the same issue when trying to pass complex data types
such as array, objects, and functions through to the underlying HTML element.`}),`
`,(0,c.jsx)(n.p,{children:`Another issue is how event bubbling works in React. Since React uses its own synthetic events system, standard HTML
event bubbling from custom elements doesn't work, nor does attaching event listeners to these custom elements.`}),`
`,(0,c.jsx)(n.h2,{id:`forge--react-adapter`,children:`Forge + React Adapter`}),`
`,(0,c.jsx)(n.p,{children:`To make using Forge with React more seamless, we have created an adapter library that helps with the issues mentioned above.`}),`
`,(0,c.jsx)(n.p,{children:`This adapter library provides a thin wrapper component around all Forge components that allows you to pass data and listen
to events in a more React-friendly way.`}),`
`,(0,c.jsxs)(n.p,{children:[`While the adapter is not `,(0,c.jsx)(n.em,{children:`required`}),` to use Forge with React, it is `,(0,c.jsx)(n.strong,{children:`highly`}),` recommended to make the integration easier.`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`You can view source code for the React adapter on `,(0,c.jsx)(n.a,{href:`https://github.com/tyler-technologies-oss/forge-react`,rel:`nofollow`,children:`GitHub`})]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(n.p,{children:`To use Forge in your React application, install the following packages from npm:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/forge @tylertech/forge-react
`})}),`
`,(0,c.jsx)(n.p,{children:`Now that you have Forge and the React adapter installed, let's add the rest of the setup to your React application.`}),`
`,(0,c.jsx)(n.h2,{id:`loading-the-tyler-font`,children:`Loading the Tyler Font`}),`
`,(0,c.jsxs)(n.p,{children:[`Edit your `,(0,c.jsx)(n.code,{children:`index.html`}),` file and add the following `,(0,c.jsx)(n.code,{children:`<link>`}),` tag to the `,(0,c.jsx)(n.code,{children:`<head>`}),` section load the Tyler font:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,(0,c.jsx)(n.p,{children:`This will configure the default font family for your application, and load the required font weights and styles.`}),`
`,(0,c.jsx)(n.h2,{id:`importing-components`,children:`Importing Components`}),`
`,(0,c.jsxs)(n.p,{children:[`To use Forge components in your React application, import the components you need from the `,(0,c.jsx)(n.code,{children:`@tylertech/forge-react`}),` package,
as well as the definition functions from `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),`.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-jsx`,children:`import { ForgeButton, ForgeCard } from '@tylertech/forge-react';

import '@tylertech/forge/button';
import '@tylertech/forge/card';

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
`,(0,c.jsx)(n.h2,{id:`importing-styles`,children:`Importing Styles`}),`
`,(0,c.jsxs)(n.p,{children:[`To use the default Forge styles in your React application, import the `,(0,c.jsx)(n.code,{children:`forge.css`}),` file from the `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-jsx`,children:`import '@tylertech/forge/dist/forge.css';
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};