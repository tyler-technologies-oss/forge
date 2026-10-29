import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-DnLnh7by.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Design Tokens/Typography`}),`
`,(0,c.jsx)(n.h1,{id:`typography-tokens`,children:`Typography Tokens`}),`
`,(0,c.jsx)(n.p,{children:`Typography tokens are used to define a common set of type styles that can be used throughout the design system, component library, and your
own libraries and applications.`}),`
`,(0,c.jsx)(n.h2,{id:`css`,children:`CSS`}),`
`,(0,c.jsx)(n.p,{children:`Forge provides a CSS stylesheet that includes a set of classes that can be used to apply the Forge typography styles to your content.`}),`
`,(0,c.jsxs)(n.p,{children:[`See the `,(0,c.jsx)(n.a,{href:`?path=/docs/getting-started-typography--docs`,children:`typography`}),` page for more information on how to include and use the Forge typography
styles in your application.`]}),`
`,(0,c.jsx)(n.h2,{id:`font`,children:`Font`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`Token`}),(0,c.jsx)(n.th,{children:`Value`}),(0,c.jsx)(n.th,{children:`Description`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-font-family`})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`"Roboto", sans-serif`})}),(0,c.jsx)(n.td,{children:`The default font family used in Forge components and styles.`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-font-size`})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`1rem`})}),(0,c.jsx)(n.td,{children:`The base font size used in Forge components and styles.`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body-font-size-scale`})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`1`})}),(0,c.jsx)(n.td,{children:`The font size scale used for body text.`})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body-line-height-scale`})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`1.375`})}),(0,c.jsx)(n.td,{children:`The line height scale used for body text.`})]})]})]}),`
`,(0,c.jsx)(n.p,{children:`Each typography style also has its own set of tokens that define the font size, line height, and other properties for that style.`}),`
`,(0,c.jsxs)(n.p,{children:[`For example, Forge will set the `,(0,c.jsx)(n.code,{children:`<body>`}),` element on your page to use the `,(0,c.jsx)(n.code,{children:`body2`}),` style by default. This style is defined by the following tokens:`]}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.th,{children:`Token`})})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-font-family`})})}),(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-font-size`})})}),(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-font-weight`})})}),(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-line-height`})})}),(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-letter-spacing`})})}),(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-text-transform`})})}),(0,c.jsx)(n.tr,{children:(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`--forge-typography-body2-text-decoration`})})})]})]}),`
`,(0,c.jsx)(n.p,{children:`Each style has a similar set of tokens that allow for you to granularly customize the font styles used in your application.`}),`
`,(0,c.jsx)(n.h2,{id:`root-font-size`,children:`Root Font Size`}),`
`,(0,c.jsxs)(n.p,{children:[`Forge typography font sizes are all based on the browser default root font size via `,(0,c.jsx)(n.code,{children:`rem`}),` units. This allows for the font sizes to scale
appropriately based on the user's browser settings. Browser's are typically set to `,(0,c.jsx)(n.code,{children:`16px`}),` by default for the root font size.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Some developers choose to adjust the root font size of their page, typically to `,(0,c.jsx)(n.code,{children:`62.5%`}),` or `,(0,c.jsx)(n.code,{children:`10px`}),` to help make the math easier when working with
`,(0,c.jsx)(n.code,{children:`em`}),` and `,(0,c.jsx)(n.code,{children:`rem`}),` units in their CSS. This can be done by setting the `,(0,c.jsx)(n.code,{children:`font-size`}),` property on the `,(0,c.jsx)(n.code,{children:`<html>`}),` element. However, this can cause issues
with Forge components, as the font sizes are all based on the browser default root font size and will not scale correctly if the root font size
is adjusted.`]}),`
`,(0,c.jsxs)(n.p,{children:[`To help with this, Forge provides a mechanism to allow for you to adjust the root font size for Forge components only. This is done by setting
the `,(0,c.jsx)(n.code,{children:`--forge-typography-font-size`}),` token on the `,(0,c.jsx)(n.code,{children:`:root`}),` selector back to `,(0,c.jsx)(n.code,{children:`16px`}),`.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`html {
  font-size: 62.5%; /* 10px */
}

:root {
  --forge-typography-font-size: 16px;
}
`})}),`
`,(0,c.jsx)(n.h3,{id:`caution`,children:`Caution`}),`
`,(0,c.jsx)(n.p,{children:`Being able to control the root font size for Forge components independently of the rest of your page should only be used as a last resort. It is
recommended to use the browser default root font size for your page because it allows for the best accessibility and usability for your users.`})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};