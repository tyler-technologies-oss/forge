import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{_ as a,l as o,m as s,s as c}from"./utils-Cppiha4b.js";import{r as l,t as u}from"./style-map-C_WKUe4Y.js";import{t as d}from"./stepper-Bvd5Y9JS.js";var f=t({Demo:()=>_,Vertical:()=>v,__namedExportsOrder:()=>y,default:()=>g}),p,m,h,g,_,v,y;function b(){return(b=e((()=>{i(),s(),u(),d(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m=`forge-stepper`,h=p(`forge-step-select`),g={title:`Components/Stepper`,render:e=>{let t=o(e),i=t?l(t):r;return n`
      <forge-stepper
        .alternative=${e.alternative}
        .layoutMode=${e.layoutMode}
        .layoutAlign=${e.layoutAlign}
        .disabled=${e.disabled}
        .vertical=${e.vertical}
        .linear=${e.linear}
        style=${i}
        @forge-step-select=${h}>
        <forge-step>Step 1</forge-step>
        <forge-step>
          Step 2
          <span slot="optional">Optional</span>
        </forge-step>
        <forge-step>
          <div slot="expansion-content">Expansion Content</div>
          ${e.vertical?`Expand me`:`Step 3`}
        </forge-step>
        <forge-step>Step 4</forge-step>
      </forge-stepper>
    `},component:m,subcomponents:{Step:`forge-step`},argTypes:{...c({tagName:m,exclude:[`steps`,`selectedIndex`],controls:{layoutMode:{control:`select`,options:[`fixed`,`clustered`]},layoutAlign:{control:`select`,options:[`left`,`center`,`right`]}}})},args:{layoutMode:`fixed`}},_={},v={...a,render:e=>n`
    <forge-stepper vertical="true">
      <forge-step>Step 1</forge-step>
      <forge-step>
        Step 2
        <span slot="optional">Optional</span>
      </forge-step>
      <forge-step>
        <div slot="expansion-content">Expansion Content</div>
        ${e.vertical?`Expand me`:`Step 3`}
      </forge-step>
      <forge-step>Step 4</forge-step>
    </forge-stepper>
  `},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => html\`
    <forge-stepper vertical="true">
      <forge-step>Step 1</forge-step>
      <forge-step>
        Step 2
        <span slot="optional">Optional</span>
      </forge-step>
      <forge-step>
        <div slot="expansion-content">Expansion Content</div>
        \${args.vertical ? 'Expand me' : 'Step 3'}
      </forge-step>
      <forge-step>Step 4</forge-step>
    </forge-stepper>
  \`
}`,...v.parameters?.docs?.source}}},y=[`Demo`,`Vertical`]})))()}export{b as i,f as n,v as r,_ as t};