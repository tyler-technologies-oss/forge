import{j as e,M as r,T as s,C as l}from"./blocks-C1GwI1dq.js";import{useMDXComponents as i}from"./index-irVE_5wU.js";import{C as a}from"./CustomArgTypes-DqTgFpJz.js";import{T as h,D as c}from"./Tooltip.stories-5g4Imc5V.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DhhXTQKZ.js";import"./utils-C83vs9tY.js";import"./style-map-bg7VR1JS.js";import"./directive-CJw_OlP2.js";import"./service-adapter-CffG5Lhq.js";import"./tooltip-B59ljHGY.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./utils-Bd6MGx91.js";import"./overlay-B5pGv-rV.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./button-BFRc56Z0.js";import"./icon-kuXwuZAY.js";import"./focus-indicator-qzjj8NA2.js";import"./base-lit-element-D3eIz1Ps.js";import"./state-layer-gAgMwMHF.js";import"./base-button-adapter-BCMPWpDP.js";import"./with-label-aware-C7up74QW.js";function o(n){const t={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:h}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Tooltips display informative text when users hover over an element."}),`
`,e.jsx(l,{of:c}),`
`,e.jsx(t.h2,{id:"type",children:"Type"}),`
`,e.jsxs(t.p,{children:["You can set the ",e.jsx(t.code,{children:"type"})," property/attribute to one of the following values to control its association to the anchor element."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"presentation"})," ",e.jsx(t.em,{children:"(default)"}),": A tooltip that is purely presentational and has no accessible meaning to its anchor."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"label"}),": The tooltip will be interpreted as the accessible label for the anchor element via ",e.jsx(t.code,{children:"aria-labelledby"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"description"}),": The tooltip will be interpreted as the accessible description for the anchor element via ",e.jsx(t.code,{children:"aria-describedby"}),"."]}),`
`]}),`
`,e.jsx(t.h2,{id:"usage-within-slots",children:"Usage within slots"}),`
`,e.jsxs(t.p,{children:["When the ",e.jsx(t.code,{children:"<forge-tooltip>"})," element is placed in the DOM as a sibling of its anchor element, if the anchor element is using a ",e.jsx(t.code,{children:"slot"}),` attribute
(or is within a slotted DOM tree not containing the tooltip) the tooltip should also use the same `,e.jsx(t.code,{children:"slot"})," attribute."]}),`
`,e.jsx(t.p,{children:"If not, the tooltip may not render properly (or at all). A common example of this is when using a tooltip with icon buttons in the app bar:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-app-bar>
  <!-- Icon button placed within the end slot -->
  <forge-icon-button slot="end" id="my-button">
    <forge-icon name="forge_logo"></forge-icon>
  </forge-icon-button>

  <!-- The tooltip needs the same \`slot\` attribute as the icon button or it won't render -->
  <forge-tooltip slot="end" type="label" anchor="my-button">This is a tooltip</forge-tooltip>
</forge-app-bar>
`})}),`
`,e.jsx(t.h2,{id:"style-inheritance",children:"Style inheritance"}),`
`,e.jsxs(t.p,{children:[`It's important to understand that even though the tooltip you see on screen is rendered above all content within the
`,e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Glossary/Top_layer",rel:"nofollow",children:"top layer"}),` of the DOM, the tooltip element itself is still an inline element in the DOM.
This means that the tooltip can inherit styles from its ancestor elements. Most of the time this is fine, because the tooltip handles setting its own
styles, but in some cases you may find that CSS variables can cascade down to the tooltip and affect its appearance inadvertently.`]}),`
`,e.jsxs(t.p,{children:["If you run into this scenario, move the tooltip outside of the parent element that is setting the CSS variable. The ",e.jsx(t.code,{children:"anchor"})," attribute or ",e.jsx(t.code,{children:"anchorElement"}),` property
can be used to attach the tooltip to the desired element in the DOM.`]}),`
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
`]})]})}function U(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{U as default};
