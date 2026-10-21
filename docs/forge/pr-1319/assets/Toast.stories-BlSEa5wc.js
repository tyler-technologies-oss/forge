import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{i as a,l as o,m as s,n as c,s as l}from"./utils-Cppiha4b.js";import{t as u}from"./button-oXbpcqR0.js";import{r as d,t as f}from"./style-map-C_WKUe4Y.js";import{i as p,n as m,t as h}from"./ref-UkViCfGj.js";import{t as g}from"./toast-7LyDXtLr.js";var _=t({Demo:()=>C,Dismissible:()=>w,__namedExportsOrder:()=>T,default:()=>S}),v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),h(),f(),s(),u(),g(),{action:v}=__STORYBOOK_MODULE_ACTIONS__,y=`forge-toast`,b=v(`forge-toast-action`),x=v(`forge-toast-close`),S={title:`Components/Toast`,render:e=>{let t=o(e),i=t?d(t):r,a=m();return n`
      <forge-button variant="raised" @click=${()=>a.value.open=!a.value.open}>Show Toast</forge-button>
      <forge-toast
        ${p(a)}
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