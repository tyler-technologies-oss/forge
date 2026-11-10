import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{i,t as a}from"./ref-CKV-hb40.js";import{t as o}from"./button-6zjUplxX.js";import{t as s}from"./core-C6kDWXri.js";var c=t({Demo:()=>d,__namedExportsOrder:()=>f,default:()=>u}),l,u,d,f;function p(){return(p=e((()=>{r(),a(),o(),s(),{action:l}=__STORYBOOK_MODULE_ACTIONS__,u={title:`AI/Components/Primitives/Overlay`,component:`forge-ai-overlay`,argTypes:{placement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`left-start`,`left-end`,`right`,`right-start`,`right-end`],description:`The placement of the overlay relative to the anchor`},flip:{control:`boolean`,description:`Whether the overlay flips to the opposite side when there is not enough space`},shift:{control:`boolean`,description:`Whether the overlay shifts to stay within the viewport`},dismissMode:{control:`select`,options:[`auto`,`manual`],description:'How the overlay closes. "auto" closes on an outside click or Escape, "manual" only when `open` is set to false'}},args:{placement:`bottom-start`,flip:!0,shift:!1,dismissMode:`auto`},render:e=>{let t,r;return n`
      <style>
        .overlay-story__content {
          padding: 16px;
          background: var(--forge-theme-surface-bright);
          border: 1px solid var(--forge-theme-outline);
        }
      </style>
      <forge-button variant="outlined" ${i(e=>t=e)} @click=${()=>r&&(r.open=!0)}>
        Open overlay
      </forge-button>
      <forge-ai-overlay
        ${i(e=>{r=e,r&&t&&(r.anchor=t)})}
        placement=${e.placement}
        dismiss-mode=${e.dismissMode}
        ?flip=${e.flip}
        ?shift=${e.shift}
        @forge-ai-overlay-toggle=${e=>l(`forge-ai-overlay-toggle`)(e.detail)}>
        <div class="overlay-story__content">Overlay content</div>
      </forge-ai-overlay>
    `}},d={},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f=[`Demo`]})))()}export{d as n,p as r,c as t};