import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{l as a,m as o,n as s,s as c}from"./utils-Cppiha4b.js";import{r as l,t as u}from"./style-map-C_WKUe4Y.js";import{t as d}from"./button-toggle-B336WQdG.js";var f=t({Demo:()=>y,__namedExportsOrder:()=>b,default:()=>v}),p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),o(),u(),d(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m=`forge-button-toggle-group`,h=`forge-button-toggle`,g=p(`forge-button-toggle-group-change`),_=p(`forge-button-toggle-select`),v={title:`Components/Button Toggle`,render:e=>{let t=a(e),i=t?l(t):r;return n`
      <forge-button-toggle-group
        .outlined=${e.outlined}
        .multiple=${e.multiple}
        .stretch=${e.stretch}
        .mandatory=${e.mandatory}
        .vertical=${e.vertical}
        .disabled=${e.disabled}
        .dense=${e.dense}
        .theme=${e.theme}
        ?readonly=${e.readonly}
        ?required=${e.required}
        aria-label="Choose communication type"
        @forge-button-toggle-group-change=${g}
        style=${i}>
        <forge-button-toggle .required=${e.selected} .selected=${e.selected} value="email" @forge-button-toggle-select=${_}
          >By email</forge-button-toggle
        >
        <forge-button-toggle value="mail" @forge-button-toggle-select=${_}>By mail</forge-button-toggle>
        <forge-button-toggle value="phone" @forge-button-toggle-select=${_}>By phone</forge-button-toggle>
      </forge-button-toggle-group>
    `},component:m,subcomponents:{"Button Toggle":h},argTypes:{...c({tagName:`${m}`,exclude:[`value`,`required`],controls:{theme:{control:`select`,options:[`default`,...s]}}}),...c({tagName:`${h}`,exclude:[`value`,`required`]})},args:{outlined:!0,multiple:!1,stretch:!1,mandatory:!1,vertical:!1,disabled:!1,readonly:!1,dense:!1,selected:!1,theme:`tertiary`}},y={},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b=[`Demo`]})))()}export{y as n,x as r,f as t};