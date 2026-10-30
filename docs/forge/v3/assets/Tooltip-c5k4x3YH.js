import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{n as c,t as l}from"./CustomArgTypes-Cnceb5ig.js";import{n as u,r as d,t as f}from"./Tooltip.stories-DDUWd9uz.js";function p(e){let n={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:u}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`Tooltips display informative text when users hover over an element.`}),`
`,(0,h.jsx)(a,{of:f}),`
`,(0,h.jsx)(n.h2,{id:`type`,children:`Type`}),`
`,(0,h.jsxs)(n.p,{children:[`You can set the `,(0,h.jsx)(n.code,{children:`type`}),` property/attribute to one of the following values to control its association to the anchor element.`]}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`presentation`}),` `,(0,h.jsx)(n.em,{children:`(default)`}),`: A tooltip that is purely presentational and has no accessible meaning to its anchor.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`label`}),`: The tooltip will be interpreted as the accessible label for the anchor element via `,(0,h.jsx)(n.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`description`}),`: The tooltip will be interpreted as the accessible description for the anchor element via `,(0,h.jsx)(n.code,{children:`aria-describedby`}),`.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`usage-within-slots`,children:`Usage within slots`}),`
`,(0,h.jsxs)(n.p,{children:[`When the `,(0,h.jsx)(n.code,{children:`<forge-tooltip>`}),` element is placed in the DOM as a sibling of its anchor element, if the anchor element is using a `,(0,h.jsx)(n.code,{children:`slot`}),` attribute
(or is within a slotted DOM tree not containing the tooltip) the tooltip should also use the same `,(0,h.jsx)(n.code,{children:`slot`}),` attribute.`]}),`
`,(0,h.jsx)(n.p,{children:`If not, the tooltip may not render properly (or at all). A common example of this is when using a tooltip with icon buttons in the app bar:`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-app-bar>
  <!-- Icon button placed within the end slot -->
  <forge-icon-button slot="end" id="my-button">
    <forge-icon name="forge_logo"></forge-icon>
  </forge-icon-button>

  <!-- The tooltip needs the same \`slot\` attribute as the icon button or it won't render -->
  <forge-tooltip slot="end" type="label" anchor="my-button">This is a tooltip</forge-tooltip>
</forge-app-bar>
`})}),`
`,(0,h.jsx)(n.h2,{id:`style-inheritance`,children:`Style inheritance`}),`
`,(0,h.jsxs)(n.p,{children:[`It's important to understand that even though the tooltip you see on screen is rendered above all content within the
`,(0,h.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Glossary/Top_layer`,rel:`nofollow`,children:`top layer`}),` of the DOM, the tooltip element itself is still an inline element in the DOM.
This means that the tooltip can inherit styles from its ancestor elements. Most of the time this is fine, because the tooltip handles setting its own
styles, but in some cases you may find that CSS variables can cascade down to the tooltip and affect its appearance inadvertently.`]}),`
`,(0,h.jsxs)(n.p,{children:[`If you run into this scenario, move the tooltip outside of the parent element that is setting the CSS variable. The `,(0,h.jsx)(n.code,{children:`anchor`}),` attribute or `,(0,h.jsx)(n.code,{children:`anchorElement`}),` property
can be used to attach the tooltip to the desired element in the DOM.`]}),`
`,(0,h.jsx)(n.h2,{id:`anchor-heuristic`,children:`Anchor Heuristic`}),`
`,(0,h.jsx)(n.p,{children:`The tooltip uses the following heuristic to locate the anchor element that it should attach to when added to the DOM.`}),`
`,(0,h.jsxs)(n.ol,{children:[`
`,(0,h.jsxs)(n.li,{children:[`If the `,(0,h.jsx)(n.code,{children:`anchor`}),` property is set, it will find and attach to the element with the corresponding `,(0,h.jsx)(n.code,{children:`id`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[`If the `,(0,h.jsx)(n.code,{children:`anchorElement`}),` property is set, it will take precedence and use that element instance directly.`]}),`
`,(0,h.jsxs)(n.li,{children:[`If neither `,(0,h.jsx)(n.code,{children:`anchor`}),` nor `,(0,h.jsx)(n.code,{children:`anchorElement`}),` are set, it will attempt to locate a previous element sibling in the DOM.`]}),`
`,(0,h.jsx)(n.li,{children:`If no previous sibling element is found, it will fall back to its parent element.`}),`
`]}),`
`,(0,h.jsxs)(n.p,{children:[`This is important to understand when using the tooltip in a dynamic context, such as a list of items, where tooltips may be rendered multiple times or when a tooltip is
rendered asynchronously. This can lead to unexpected results. `,(0,h.jsxs)(n.strong,{children:[`In these cases, it's recommended to use the `,(0,h.jsx)(n.code,{children:`anchor`}),` or `,(0,h.jsx)(n.code,{children:`anchorElement`}),` properties to explicitly set the
element that the tooltip should be anchored to for more predictable behavior.`]})]}),`
`,(0,h.jsx)(n.h2,{id:`anchor`,children:`Anchor`}),`
`,(0,h.jsxs)(n.p,{children:[`Tooltips are intended to be "anchored" to another element. This is typically done by setting the `,(0,h.jsx)(n.code,{children:`anchor`}),` property/attribute to the `,(0,h.jsx)(n.code,{children:`id`}),` of the element that the
tooltip should be anchored to.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-button id="my-button">Hover over me</forge-button> <forge-tooltip anchor="my-button">This is a tooltip</forge-tooltip>
`})}),`
`,(0,h.jsx)(n.h2,{id:`anchor-element`,children:`Anchor Element`}),`
`,(0,h.jsxs)(n.p,{children:[`You can also explicitly set the `,(0,h.jsx)(n.code,{children:`anchorElement`}),` property to an element instance directly. This is useful when you need more control over the timing of when the tooltip
and its anchor element are rendered in the DOM.`]}),`
`,(0,h.jsx)(n.p,{children:`This is very common in frameworks like Angular, where the tooltip and its anchor element may be rendered asynchronously via incremental rendering, or if you have a conditional
expression on your anchor element and you want to ensure that the tooltip is rendered and attached at the same time.`}),`
`,(0,h.jsx)(n.h3,{id:`angular-example`,children:`Angular Example`}),`
`,(0,h.jsxs)(n.p,{children:[`In Angular, it's common to use `,(0,h.jsx)(n.code,{children:`<ng-container>`}),` to conditionally render a "group" of elements. In this case, you can use the `,(0,h.jsx)(n.code,{children:`anchorElement`}),` property to ensure that the
tooltip is rendered at the same time as the anchor element, and attached via a template reference variable.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<ng-container *ngIf="showTooltip">
  <!-- Set a template reference variable on the button element -->
  <forge-icon-button #myButton>
    <forge-icon name="forge_logo"></forge-icon>
  </forge-icon-button>

  <!-- Make sure to use the \`nativeElement\` property to pass the actual DOM element -->
  <forge-tooltip type="label" [anchorElement]="myButton.nativeElement">This is a tooltip</forge-tooltip>
</ng-container>
`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements.`}),`
`,(0,h.jsxs)(n.li,{children:[`The target element receives the proper ARIA attributes such as `,(0,h.jsx)(n.code,{children:`aria-labelledby`}),` or `,(0,h.jsx)(n.code,{children:`aria-describedby`}),` where necessary.`]}),`
`,(0,h.jsx)(n.li,{children:`Should not contain interactive content.`}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};