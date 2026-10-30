import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-B8S20_VI.js";import{m as i,s as a}from"./utils-BifgMLEM.js";import{n as o,t as s}from"./decorators-CjEroPVL.js";import{n as c,t as l}from"./split-view-DgYvM6Ol.js";var u;function d(){return(d=e((()=>{u=`forge-split-view{height:300px}forge-split-view forge-split-view-panel div{justify-content:center;align-items:center;height:100%;display:flex}forge-split-view forge-split-view-panel:first-child{background-color:#e6e6fa}forge-split-view forge-split-view-panel:last-child{background-color:#fa8070}`})))()}var f=t({Demo:()=>w,__namedExportsOrder:()=>T,default:()=>C}),p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{r(),i(),s(),c(),l(),d(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m=`forge-split-view`,h=p(`forge-split-view-panel-will-resize`),g=p(`forge-split-view-panel-resize-start`),_=p(`forge-split-view-panel-resize-end`),v=p(`forge-split-view-panel-resize`),y=p(`forge-split-view-panel-will-open`),b=p(`forge-split-view-panel-will-close`),x=p(`forge-split-view-panel-did-open`),S=p(`forge-split-view-panel-did-close`),C={title:`Components/Split View`,render:e=>n`
    <forge-split-view
      .orientation=${e.orientation}
      .disabled=${e.disabled}
      .allowClose=${e.allowClose}
      .autoClose=${e.autoClose}
      .autoCloseThreshold=${e.autoCloseThreshold}
      @forge-split-view-panel-will-resize=${h}
      @forge-split-view-panel-resize-start=${g}
      @forge-split-view-panel-resize-end=${_}
      @forge-split-view-panel-resize=${v}
      @forge-split-view-panel-will-open=${y}
      @forge-split-view-panel-will-close=${b}
      @forge-split-view-panel-did-open=${x}
      @forge-split-view-panel-did-close=${S}>
      <forge-split-view-panel>
        <div>Panel 1</div>
      </forge-split-view-panel>
      <forge-split-view-panel size="200">
        <div>Panel 2</div>
      </forge-split-view-panel>
    </forge-split-view>
  `,component:m,subcomponents:{"Split View Panel":`forge-split-view-panel`},decorators:[o(u)],parameters:{actions:{disable:!0}},argTypes:{...a({tagName:m,category:`Split View`,controls:{orientation:{control:`select`,options:[`horizontal`,`vertical`]}}}),...a({tagName:`forge-split-view-panel`,category:`Split View Panel`,exclude:[`accessibleLabel`]})},args:{autoCloseThreshold:120,disabled:!1,allowClose:!1,autoClose:!1,orientation:`horizontal`,resizable:`off`,size:200,min:0,open:!0}},w={},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T=[`Demo`]})))()}export{f as n,E as r,w as t};