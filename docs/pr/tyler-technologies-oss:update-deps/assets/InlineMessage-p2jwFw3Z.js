import{j as e,M as r,T as a,C as s}from"./blocks-C3gDyZIu.js";import{useMDXComponents as o}from"./index-CqaAC5S2.js";import{C as l}from"./CustomArgTypes-CNLaeSI0.js";import{C as h}from"./CssOnlyInformation-CCg5j7el.js";import{I as c,D as d,W as m,T as p,C as u}from"./InlineMessage.stories-BawfsqT5.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BciiVb0K.js";import"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./icon-FzRol6Tl.js";import"./constants-y3-o2nLB.js";import"./base-adapter-BB1UtCX3.js";import"./index-5CPwzmQS.js";import"./style-map-Djxu7jNR.js";import"./directive-CJw_OlP2.js";import"./inline-message-Bbte0O1S.js";function n(t){const i={code:"code",em:"em",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Inline messages are used to provide feedback to users about their actions or to display important information related to the page content."}),`
`,e.jsx(s,{of:d}),`
`,e.jsx(i.h2,{id:"with-title",children:"With Title"}),`
`,e.jsxs(i.p,{children:["You can use the ",e.jsx(i.code,{children:"title"})," slot to provide a title for the inline message."]}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(i.h2,{id:"themed",children:"Themed"}),`
`,e.jsxs(i.p,{children:["There are several built-in themes that can be used to style the inline message via the ",e.jsx(i.code,{children:"theme"})," property/attribute. Themes should not be the ",e.jsx(i.em,{children:"only"}),`
indicator of the message's importance, it is recommended to also use an icon or other visual indicator to assist with users who may have difficulty
distinguishing between colors.`]}),`
`,e.jsx(s,{of:p}),`
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
`,e.jsx(s,{of:u}),`
`,e.jsx(h,{})]})}function X(t={}){const{wrapper:i}={...o(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(n,{...t})}):n(t)}export{X as default};
