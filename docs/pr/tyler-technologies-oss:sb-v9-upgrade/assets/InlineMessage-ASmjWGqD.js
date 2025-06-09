import{j as e,M as r,T as a,C as t}from"./blocks-BiOEtk1e.js";import{useMDXComponents as o}from"./index-B_QGz6G5.js";import{C as l}from"./CustomArgTypes-CdGL2gxd.js";import{C as h}from"./CssOnlyInformation-D6gDprDA.js";import{I as c,D as d,W as m,T as p,C as u}from"./InlineMessage.stories-Dc31221l.js";import"./iframe-CE3HZkEz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CEkw6ujh.js";import"./feature-detection-CY6TVbRZ.js";import"./icon-Bh1zyXYd.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./index-CiLSBptl.js";import"./style-map-Det8BwjZ.js";import"./directive-CJw_OlP2.js";import"./inline-message-CTo_BAYA.js";function n(s){const i={code:"code",em:"em",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Inline messages are used to provide feedback to users about their actions or to display important information related to the page content."}),`
`,e.jsx(t,{of:d}),`
`,e.jsx(i.h2,{id:"with-title",children:"With Title"}),`
`,e.jsxs(i.p,{children:["You can use the ",e.jsx(i.code,{children:"title"})," slot to provide a title for the inline message."]}),`
`,e.jsx(t,{of:m}),`
`,e.jsx(i.h2,{id:"themed",children:"Themed"}),`
`,e.jsxs(i.p,{children:["There are several built-in themes that can be used to style the inline message via the ",e.jsx(i.code,{children:"theme"})," property/attribute. Themes should not be the ",e.jsx(i.em,{children:"only"}),`
indicator of the message's importance, it is recommended to also use an icon or other visual indicator to assist with users who may have difficulty
distinguishing between colors.`]}),`
`,e.jsx(t,{of:p}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If the inline-message is used to display an important notification to a user, use the ",e.jsx(i.code,{children:'role="alert"'})," attribute on the ",e.jsx(i.code,{children:"<forge-inline-message>"}),"element.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["This is equivalent to using ",e.jsx(i.code,{children:'aria-live="assertive"'}),"."]}),`
`,e.jsxs(i.li,{children:["If the message is less urgent, you can use ",e.jsx(i.code,{children:'aria-live="polite"'})," to wait until the user is finished with their current task."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(i.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(i.p,{children:"The inline-message component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(t,{of:u}),`
`,e.jsx(h,{})]})}function W(s={}){const{wrapper:i}={...o(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(n,{...s})}):n(s)}export{W as default};
