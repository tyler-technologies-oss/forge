import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-CbV23-8Y.js";import{i as a,l as o,m as s,n as c,s as l}from"./utils-CaRNnNM5.js";import{r as u,t as d}from"./style-map-C_WKUe4Y.js";import{i as f,n as p,t as m}from"./ref-DZ35M6As.js";import{t as h}from"./button-5s54CFRd.js";import{t as g}from"./toast-eo2NjJNT.js";var _=t({Demo:()=>C,Dismissible:()=>w,__namedExportsOrder:()=>T,default:()=>S}),v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),m(),d(),s(),h(),g(),{action:v}=__STORYBOOK_MODULE_ACTIONS__,y=`forge-toast`,b=v(`forge-toast-action`),x=v(`forge-toast-close`),S={title:`Components/Toast`,render:e=>{let t=o(e),i=t?u(t):r,a=p();return n`
      <forge-button variant="raised" @click=${()=>a.value.open=!a.value.open}>Show Toast</forge-button>
      <forge-toast
        ${f(a)}
        .open=${e.open}
        .duration=${e.duration}
        .placement=${e.placement}
        .actionText=${e.actionText}
        .dismissible=${e.dismissible}
        .dismissLabel=${e.dismissLabel}
        .theme=${e.theme}
        style=${i}
        @forge-toast-action=${b}
        @forge-toast-close=${x}>
        ${e.text}
      </forge-toast>
    `},component:y,argTypes:{...l({tagName:y,controls:{placement:{control:`select`,options:a},theme:{control:`select`,options:[`default`,...c]}}}),text:{control:`text`}},args:{text:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,open:!1,duration:2750,placement:`bottom`,actionText:``,dismissible:!1,dismissLabel:`Dismiss toast`,theme:`default`}},C={},w={args:{dismissible:!0,text:`This toast is dismissible!`}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...w.parameters?.docs?.source}}},T=[`Demo`,`Dismissible`]})))()}export{E as i,w as n,_ as r,C as t};