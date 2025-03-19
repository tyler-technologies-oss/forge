import{j as e,M as r,T as s,C as l}from"./index-BZ40bavk.js";import{useMDXComponents as i}from"./index-BmeNTqwy.js";import{C as a}from"./CustomArgTypes-B_-eex6k.js";import{T as c,D as h}from"./Tooltip.stories-Bkv4hhxP.js";import"./iframe-InQ9V913.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DlykE8tv.js";import"./lit-html-paDGiEfB.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./feature-detection-DRCh51Sa.js";import"./tooltip-BhK_7K0r.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./utils-CYJ0zQHl.js";import"./overlay-DyVP2d0e.js";import"./index-BgGCUUFB.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-kdhTFvbL.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./button-BRfTMEeh.js";import"./icon-B5R9pr_c.js";import"./focus-indicator-CFAnWQXZ.js";import"./state-layer-DCupnvce.js";import"./base-button-adapter-BFQz2IKA.js";import"./index-CbZAylpk.js";import"./with-label-aware-OEbK3wHg.js";function o(n){const t={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Tooltips display informative text when users hover over an element."}),`
`,e.jsx(l,{of:h}),`
`,e.jsx(t.h2,{id:"type",children:"Type"}),`
`,e.jsxs(t.p,{children:["You can set the ",e.jsx(t.code,{children:"type"})," property/attribute to one of the following values to control its association to the anchor element."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"presentation"})," ",e.jsx(t.em,{children:"(default)"}),": A tooltip that is purely presentational and has no accessible meaning to its anchor."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"label"}),": The tooltip will be interpreted as the accessible label for the anchor element via ",e.jsx(t.code,{children:"aria-labelledby"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"description"}),": The tooltip will be interpreted as the accessible description for the anchor element via ",e.jsx(t.code,{children:"aria-describedby"}),"."]}),`
`]}),`
`,e.jsx(t.h2,{id:"anchor-heuristic",children:"Anchor Heuristic"}),`
`,e.jsx(t.p,{children:"The tooltip uses the following heuristic to locate the anchor element that it should attach to when added to the DOM."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["If the ",e.jsx(t.code,{children:"anchor"})," property is set, it will find and attach to the element with the corresponding ",e.jsx(t.code,{children:"id"}),"."]}),`
`,e.jsxs(t.li,{children:["If the ",e.jsx(t.code,{children:"anchorElement"})," property is set, it will take precedence and use that element instance directly."]}),`
`,e.jsxs(t.li,{children:["If neither ",e.jsx(t.code,{children:"anchor"})," nor ",e.jsx(t.code,{children:"anchorElement"})," are set, it will attempt to locate a previous element sibling in the DOM."]}),`
`,e.jsx(t.li,{children:"If no previous sibling element is found, it will fall back to its parent element."}),`
`]}),`
`,e.jsxs(t.p,{children:[`This is important to understand when using the tooltip in a dynamic context, such as a list of items, where tooltips may be rendered multiple times or when a tooltip is
rendered asynchronously. This can lead to unexpected results. `,e.jsxs(t.strong,{children:["In these cases, it's recommended to use the ",e.jsx(t.code,{children:"anchor"})," or ",e.jsx(t.code,{children:"anchorElement"}),` properties to explicitly set the
element that the tooltip should be anchored to for more predictable behavior.`]})]}),`
`,e.jsx(t.h2,{id:"anchor",children:"Anchor"}),`
`,e.jsxs(t.p,{children:['Tooltips are intended to be "anchored" to another element. This is typically done by setting the ',e.jsx(t.code,{children:"anchor"})," property/attribute to the ",e.jsx(t.code,{children:"id"}),` of the element that the
tooltip should be anchored to.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button id="my-button">Hover over me</forge-button>
<forge-tooltip anchor="my-button">This is a tooltip</forge-tooltip>
`})}),`
`,e.jsx(t.h2,{id:"anchor-element",children:"Anchor Element"}),`
`,e.jsxs(t.p,{children:["You can also explicitly set the ",e.jsx(t.code,{children:"anchorElement"}),` property to an element instance directly. This is useful when you need more control over the timing of when the tooltip
and its anchor element are rendered in the DOM.`]}),`
`,e.jsx(t.p,{children:`This is very common in frameworks like Angular, where the tooltip and its anchor element may be rendered asynchronously via incremental rendering, or if you have a conditional
expression on your anchor element and you want to ensure that the tooltip is rendered and attached at the same time.`}),`
`,e.jsx(t.h3,{id:"angular-example",children:"Angular Example"}),`
`,e.jsxs(t.p,{children:["In Angular, it's common to use ",e.jsx(t.code,{children:"<ng-container>"}),' to conditionally render a "group" of elements. In this case, you can use the ',e.jsx(t.code,{children:"anchorElement"}),` property to ensure that the
tooltip is rendered at the same time as the anchor element, and attached via a template reference variable.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<ng-container *ngIf="showTooltip">
  <!-- Set a template reference variable on the button element -->
  <forge-icon-button #myButton>
    <forge-icon name="forge_logo"></forge-icon>
  </forge-icon-button>

  <!-- Make sure to use the \`nativeElement\` property to pass the actual DOM element -->
  <forge-tooltip type="label" [anchorElement]="myButton.nativeElement">This is a tooltip</forge-tooltip>
</ng-container>
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`,e.jsxs(t.li,{children:["The target element receives the proper ARIA attributes such as ",e.jsx(t.code,{children:"aria-labelledby"})," or ",e.jsx(t.code,{children:"aria-describedby"})," where necessary."]}),`
`,e.jsx(t.li,{children:"Should not contain interactive content."}),`
`]})]})}function F(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{F as default};
