import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Bcs6hT4V.js";import{n as c,t as l}from"./CustomArgTypes-3XqZyV8V.js";import{n as u,t as d}from"./CssOnlyInformation-Cprf9fuU.js";import{a as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./Secret.stories-DBJ3KiP0.js";function y(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:h}),`
`,(0,x.jsx)(o,{}),`
`,(0,x.jsx)(n.p,{children:`The secret component conceals sensitive content with a blur or dot mask, revealing it on user interaction.`}),`
`,(0,x.jsx)(a,{of:p}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` Concealed content is still present in the DOM and can be accessed in the page source. The secret component
is useful for preventing shoulder surfing and accidental exposure, but it does not provide security against
determined users. `,(0,x.jsx)(n.strong,{children:`The only way to truly secure sensitive information is to not send it to the client at all.`})]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`named-groups`,children:`Named Groups`}),`
`,(0,x.jsxs)(n.p,{children:[`When multiple secrets share the same `,(0,x.jsx)(n.code,{children:`name`}),` attribute, they act as a radio group where only one can be revealed at a time.`]}),`
`,(0,x.jsx)(a,{of:f}),`
`,(0,x.jsx)(n.h2,{id:`block-layout`,children:`Block Layout`}),`
`,(0,x.jsxs)(n.p,{children:[`By default, the secret component displays inline with surrounding text. Setting it to `,(0,x.jsx)(n.code,{children:`block`}),` allows it to wrap larger pieces of content like paragraphs or images.`]}),`
`,(0,x.jsx)(a,{of:v}),`
`,(0,x.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,x.jsx)(l,{}),`
`,(0,x.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`The component uses `,(0,x.jsx)(n.code,{children:`role="group"`}),` to semantically group the content and toggle button.`]}),`
`,(0,x.jsxs)(n.li,{children:[`The button uses `,(0,x.jsx)(n.code,{children:`aria-expanded`}),` to convey whether the secret content is visible.`]}),`
`,(0,x.jsxs)(n.li,{children:[`The button is associated with the group via `,(0,x.jsx)(n.code,{children:`aria-controls`}),`.`]}),`
`,(0,x.jsx)(n.li,{children:`When content is revealed, it's announced to screen readers using a live region.`}),`
`,(0,x.jsxs)(n.li,{children:[`Hidden content is marked with the `,(0,x.jsx)(n.code,{children:`inert`}),` attribute to prevent keyboard navigation and screen reader access.`]}),`
`,(0,x.jsx)(n.li,{children:`The button is focusable and can be toggled with the keyboard (Enter or Space). When the secret is open pressing Escape closes it.`}),`
`,(0,x.jsx)(n.li,{children:`The secret's content can be clicked to reveal it and focus the button.`}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,x.jsx)(n.p,{children:`The secret component is also available as a CSS-only component. When using the CSS-only version, some scripting is still required to toggle the content's visibility.`}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsxs)(n.p,{children:[`The CSS-only version can also be used in a block layout by applying the `,(0,x.jsx)(n.code,{children:`forge-secret--block`}),` class and using a text button.`]}),`
`,(0,x.jsx)(a,{of:g}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` For proper accessibility set the following attributes to the CSS-only version:`]}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`role="group"`}),` on the `,(0,x.jsx)(n.code,{children:`forge-secret`}),` element`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`aria-label`}),` or `,(0,x.jsx)(n.code,{children:`aria-labelledby`}),` on the `,(0,x.jsx)(n.code,{children:`forge-secret`}),` element`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`inert`}),` on the `,(0,x.jsx)(n.code,{children:`forge-secret__content`}),` element when it's concealed`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`aria-expanded="true"`}),` on the button when the content is revealed and `,(0,x.jsx)(n.code,{children:`aria-expanded="false"`}),` when it's concealed`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.code,{children:`aria-controls`}),` on the button referencing the ID of the `,(0,x.jsx)(n.code,{children:`forge-secret`}),` element`]}),`
`]}),`
`,(0,x.jsx)(n.p,{children:`Additionally, consider using a live announcer to have assistive technologies announce when the content is revealed.`}),`
`]}),`
`,(0,x.jsx)(d,{})]})}function b(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,x.jsx)(n,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=r(),n(),i(),c(),u(),_()})))()}S();export{b as default};