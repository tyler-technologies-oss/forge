import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./button-5s54CFRd.js";import{t as a}from"./core-E3ikhDCv.js";var o=t({ClickTrigger:()=>u,Demo:()=>l,__namedExportsOrder:()=>d,default:()=>c}),s,c,l,u,d;function f(){return(f=e((()=>{r(),a(),i(),{action:s}=__STORYBOOK_MODULE_ACTIONS__,c={title:`AI/Components/Primitives/Tooltip`,component:`forge-ai-tooltip`,argTypes:{text:{control:`text`,description:`The tooltip text. When empty, the default slot is used instead`},placement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`left-start`,`left-end`,`right`,`right-start`,`right-end`],description:`The placement of the tooltip relative to its anchor`},trigger:{control:`select`,options:[`hover`,`focus`,`click`,`manual`],description:'What shows the tooltip. "manual" adds no listeners, so control it with `open`, `show()`, `hide()` or `toggle()`'},delay:{control:`number`,description:`Milliseconds to wait before showing the tooltip`},hideDelay:{control:`number`,description:`Milliseconds to wait before hiding the tooltip`}},args:{text:`Save your changes`,placement:`top`,trigger:`hover`,delay:500,hideDelay:0},render:e=>n`
    <forge-button id="tooltip-anchor-${e.trigger}" variant="outlined">Save</forge-button>
    <forge-ai-tooltip
      for="tooltip-anchor-${e.trigger}"
      text=${e.text}
      placement=${e.placement}
      trigger=${e.trigger}
      delay=${e.delay}
      hide-delay=${e.hideDelay}
      @forge-ai-tooltip-toggle=${e=>s(`forge-ai-tooltip-toggle`)(e.detail)}></forge-ai-tooltip>
  `},l={},u={args:{trigger:`click`,delay:0}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'click',
    delay: 0
  }
}`,...u.parameters?.docs?.source},description:{story:"With `click`, the anchor toggles the tooltip instead of hover and focus.",...u.parameters?.docs?.description}}},d=[`Demo`,`ClickTrigger`]})))()}export{f as i,u as n,l as r,o as t};