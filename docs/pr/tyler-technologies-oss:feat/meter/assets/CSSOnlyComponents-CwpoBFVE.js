import{j as e,M as a}from"./index-tH8aGOCb.js";import{useMDXComponents as s}from"./index-D9QMF7JH.js";import"./iframe-DKanGIIW.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";function t(o){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Getting Started/CSS-Only Components",tags:["experimental"]}),`
`,e.jsx(n.h1,{id:"introduction",children:"Introduction"}),`
`,e.jsxs("div",{class:"banner banner--warn",children:[e.jsxs(n.p,{children:["🚧 ",e.jsx(n.strong,{children:"Experimental"})," 🚧"]}),e.jsx(n.p,{children:`CSS-only components are an experimental feature that is in developer preview. This means that the API and implementation may change in future versions,
and there may be bugs or issues that need to be resolved. Use at your own risk and be prepared to update your code as needed.`}),e.jsxs(n.p,{children:["Please provide feedback and ",e.jsx(n.a,{href:"https://github.com/tyler-technologies-oss/forge/issues",rel:"nofollow",children:"report"}),` any issues you encounter, and suggest any features you would like
to see in a future update!`]})]}),`
`,e.jsx(n.p,{children:`The official implementation of the Tyler Forge™ design system has always been a library of high quality and framework-agnostic Web Components. This will continue to be
the direction, especially for those who want to utilize the full power of the design system. However, we understand that not everyone can or wants to use Web Components
for various reasons. For those who prefer a simpler implementation, Forge also provides CSS-only components.`}),`
`,e.jsx(n.p,{children:`CSS-only components are essentially a collection of stylesheets and CSS classes that are based on the same design system as the Web Components, and these components are
built using the same underlying design tokens and are intended to be used in any project, regardless of the technology stack as long as you can include CSS stylesheets
in your project.`}),`
`,e.jsx(n.h2,{id:"driving-factors",children:"Driving Factors"}),`
`,e.jsxs(n.p,{children:["You may be wondering ",e.jsx(n.em,{children:"why"})," we would provide CSS-only components when we already have a full set of Web Components. There are a few reasons:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Server-side rendering (SSR)"}),": CSS-only components can be rendered on the server and sent to the client as static HTML, which can be beneficial for SEO and performance."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),`: A note about server-side rendering is that Web Component standards are constantly evolving, and while there are currently some challenges with server-side
rendering Web Components, it is possible to render Web Components on the server and send them to the client as static HTML using declarative shadow DOM (DSD). However,
this is still being actively developed at the time of writing, and may not be a suitable solution for all projects. CSS-only components are a simpler and more reliable
solution for server-side rendering at this time.`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Performance"}),": CSS-only components are generally faster to load and render than JavaScript-based components because they don't rely on overhead of loading and parsing JavaScript. This makes CSS-only a good choice for projects that require fast load times and performance."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Familiarity"}),": Web developers are already familiar with HTML and CSS, so using CSS-only components may be more intuitive and desirable for some developers with a lower learning curve."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Flexibility"}),": Not unlike Web Components, CSS-only components can also be used in any project or framework, regardless of the technology stack as it just using native HTML and CSS only. This gives you the ability to customize the components to fit your project's needs."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Accessibility"}),": By utilizing native HTML elements and CSS, CSS-only components are deeply integrated with the browser's accessibility features and other assistive technologies."]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"limitations",children:"Limitations"}),`
`,e.jsx(n.p,{children:"While CSS-only components have many benefits, they also have some limitations compared to Web Components:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactivity"}),": CSS-only components are limited to the capabilities of CSS and HTML, so they cannot have complex interactivity or dynamic behavior like Web Components can out of the box without some additional JavaScript."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Style encapsulation"}),": CSS-only components do not have built-in style encapsulation like Web Components do, so you may need to be more careful about CSS specificity and conflicts with other styles and libraries in your project."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"State management"}),": CSS-only components do not have built-in state management like Web Components do, so you will need to manage state manually if you need to update the component based on user interactions."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Complexity"}),": CSS-only components are generally simpler and less flexible than Web Components, so they may not be suitable for all use cases. There may be more HTML markup required to achieve the same functionality as a Web Component."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),`: CSS-only components are not a replacement for Web Components. They are an alternative for those who cannot or do not want to use Web Components. They are
generally less powerful and flexible than Web Components, but they are also simpler and more familiar to use. They may be lower fidelity or have fewer features than
their Web Component counterparts.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"expectations",children:"Expectations"}),`
`,e.jsx(n.p,{children:`Before choosing to use CSS-only components, it's important to understand the trade-offs and limitations compared to Web Components. If you need more interactivity, state management,
or encapsulation, you may want to consider using Web Components instead. However, if you need a simple and performant solution that is easy to use and customize, CSS-only components
may be a good fit for your project. Weigh the pros and cons of each approach based on your project's requirements and constraints, and choose the solution that best fits your needs.`}),`
`,e.jsx(n.p,{children:`Combining CSS-only components with Web Components may also be a good option, as you can use CSS-only components for static content and Web Components for more dynamic or interactive
content. This can give you the best of both worlds by leveraging the strengths of each where they are most appropriate.`}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.p,{children:"To get started with CSS-only components, you can include the Forge CSS stylesheets in your project. You can include individual CSS files for each component that you need."}),`
`,e.jsx(n.p,{children:"For example, to use the Forge Button component, you can include the following CSS file in your project:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-scss",children:`@use '@tylertech/forge/dist/button/forge-button.css';
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Each component will have its own CSS file that you can include in your project. You can find the CSS files for each component in the Forge ",e.jsx(n.code,{children:"dist"}),` directory under the component's
name in the package.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["This will include the necessary styles for a Forge button in your project. You can then style a ",e.jsx(n.code,{children:"<button>"})," element in your HTML like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<button class="forge-button">Click me</button>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`You can customize the appearance of the button by adding additional classes to the button element. See the documentation for each component for more information
on how to customize the appearance and behavior of the component with additional CSS classes and HTML markup.`}),`
`]}),`
`,e.jsx(n.h2,{id:"framework-usage",children:"Framework Usage"}),`
`,e.jsx(n.p,{children:`While CSS-only components are easy to used in any project, stamping out the same HTML markup for each instance can be tedious and error-prone. If you are
using a component-based JavaScript framework like React, Vue, Svelte or Angular... etc., you may want to create wrapper components that encapsulate the
implementation and provides a more convenient API for using the component which has the added benefit of also managing the component's state and behavior.`})]})}function p(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{p as default};
