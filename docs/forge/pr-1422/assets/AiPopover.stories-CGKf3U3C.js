import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{i,t as a}from"./ref-DZ35M6As.js";import{t as o}from"./button-5s54CFRd.js";import{t as s}from"./core-E3ikhDCv.js";var c=t({Demo:()=>d,WithArrow:()=>f,__namedExportsOrder:()=>p,default:()=>u}),l,u,d,f,p;function m(){return(m=e((()=>{r(),a(),s(),o(),{action:l}=__STORYBOOK_MODULE_ACTIONS__,u={title:`AI/Components/Primitives/Popover`,component:`forge-ai-popover`,argTypes:{placement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`left-start`,`left-end`,`right`,`right-start`,`right-end`],description:`The placement of the popover relative to the anchor`},arrow:{control:`boolean`,description:`Whether to show an arrow pointing to the anchor`},flip:{control:`boolean`,description:`Whether the popover flips to the opposite side when there is not enough space`},shift:{control:`boolean`,description:`Whether the popover shifts to stay within the viewport`},dismissMode:{control:`select`,options:[`auto`,`manual`],description:'How the popover closes. "auto" closes on an outside click or Escape, "manual" only when `open` is set to false'}},args:{placement:`bottom-start`,arrow:!1,flip:!1,shift:!1,dismissMode:`auto`},render:e=>{let t,r;return n`
      <style>
        .popover-story__content {
          padding: 16px;
        }
      </style>
      <forge-button variant="outlined" ${i(e=>t=e)} @click=${()=>r&&(r.open=!0)}>
        Open popover
      </forge-button>
      <forge-ai-popover
        ${i(e=>{r=e,r&&t&&(r.anchor=t)})}
        placement=${e.placement}
        dismiss-mode=${e.dismissMode}
        ?arrow=${e.arrow}
        ?flip=${e.flip}
        ?shift=${e.shift}
        @forge-ai-popover-toggle=${e=>l(`forge-ai-popover-toggle`)(e.detail)}>
        <div class="popover-story__content">Popover content</div>
      </forge-ai-popover>
    `}},d={},f={args:{arrow:!0,placement:`bottom`}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    arrow: true,
    placement: 'bottom'
  }
}`,...f.parameters?.docs?.source},description:{story:`An arrow points from the popover to its anchor.`,...f.parameters?.docs?.description}}},p=[`Demo`,`WithArrow`]})))()}export{m as i,d as n,f as r,c as t};