import{j as e,M as r}from"./blocks-BYWo8ADC.js";import{useMDXComponents as n}from"./index-D-Zqv4b9.js";import"./iframe-BicIBdj6.js";import"./_commonjsHelpers-CqkleIqs.js";function s(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Design Tokens/Typography"}),`
`,e.jsx(t.h1,{id:"typography-tokens",children:"Typography Tokens"}),`
`,e.jsx(t.p,{children:`Typography tokens are used to define a common set of type styles that can be used throughout the design system, component library, and your
own libraries and applications.`}),`
`,e.jsx(t.h2,{id:"css",children:"CSS"}),`
`,e.jsx(t.p,{children:"Forge provides a CSS stylesheet that includes a set of classes that can be used to apply the Forge typography styles to your content."}),`
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/getting-started-typography--docs",children:"typography"}),` page for more information on how to include and use the Forge typography
styles in your application.`]}),`
`,e.jsx(t.h2,{id:"font",children:"Font"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Token"}),e.jsx(t.th,{children:"Value"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-font-family"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:'"Roboto", sans-serif'})}),e.jsx(t.td,{children:"The default font family used in Forge components and styles."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-font-size"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"1rem"})}),e.jsx(t.td,{children:"The base font size used in Forge components and styles."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body-font-size-scale"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"1"})}),e.jsx(t.td,{children:"The font size scale used for body text."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body-line-height-scale"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"1.375"})}),e.jsx(t.td,{children:"The line height scale used for body text."})]})]})]}),`
`,e.jsx(t.p,{children:"Each typography style also has its own set of tokens that define the font size, line height, and other properties for that style."}),`
`,e.jsxs(t.p,{children:["For example, Forge will set the ",e.jsx(t.code,{children:"<body>"})," element on your page to use the ",e.jsx(t.code,{children:"body2"})," style by default. This style is defined by the following tokens:"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsx(t.tr,{children:e.jsx(t.th,{children:"Token"})})}),e.jsxs(t.tbody,{children:[e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-font-family"})})}),e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-font-size"})})}),e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-font-weight"})})}),e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-line-height"})})}),e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-letter-spacing"})})}),e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-text-transform"})})}),e.jsx(t.tr,{children:e.jsx(t.td,{children:e.jsx(t.code,{children:"--forge-typography-body2-text-decoration"})})})]})]}),`
`,e.jsx(t.p,{children:"Each style has a similar set of tokens that allow for you to granularly customize the font styles used in your application."}),`
`,e.jsx(t.h2,{id:"root-font-size",children:"Root Font Size"}),`
`,e.jsxs(t.p,{children:["Forge typography font sizes are all based on the browser default root font size via ",e.jsx(t.code,{children:"rem"}),` units. This allows for the font sizes to scale
appropriately based on the user's browser settings. Browser's are typically set to `,e.jsx(t.code,{children:"16px"})," by default for the root font size."]}),`
`,e.jsxs(t.p,{children:["Some developers choose to adjust the root font size of their page, typically to ",e.jsx(t.code,{children:"62.5%"})," or ",e.jsx(t.code,{children:"10px"}),` to help make the math easier when working with
`,e.jsx(t.code,{children:"em"})," and ",e.jsx(t.code,{children:"rem"})," units in their CSS. This can be done by setting the ",e.jsx(t.code,{children:"font-size"})," property on the ",e.jsx(t.code,{children:"<html>"}),` element. However, this can cause issues
with Forge components, as the font sizes are all based on the browser default root font size and will not scale correctly if the root font size
is adjusted.`]}),`
`,e.jsxs(t.p,{children:[`To help with this, Forge provides a mechanism to allow for you to adjust the root font size for Forge components only. This is done by setting
the `,e.jsx(t.code,{children:"--forge-typography-font-size"})," token on the ",e.jsx(t.code,{children:":root"})," selector back to ",e.jsx(t.code,{children:"16px"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`html {
  font-size: 62.5%; /* 10px */
}

:root {
  --forge-typography-font-size: 16px;
}
`})}),`
`,e.jsx(t.h3,{id:"caution",children:"Caution"}),`
`,e.jsx(t.p,{children:`Being able to control the root font size for Forge components independently of the rest of your page should only be used as a last resort. It is
recommended to use the browser default root font size for your page because it allows for the best accessibility and usability for your users.`})]})}function c(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(s,{...o})}):s(o)}export{c as default};
