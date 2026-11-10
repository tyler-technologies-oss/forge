import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{n as i,t as a}from"./ai-tool-call-CT4Umcxj.js";var o=t({Demo:()=>d,InProgress:()=>p,RenderOnStart:()=>f,__namedExportsOrder:()=>m,default:()=>u});function s(e){return{id:`tool-call-1`,messageId:`message-1`,name:`getCurrentWeather`,args:{location:`San Francisco`},result:e===`complete`?{temperature:68,condition:`Sunny`}:void 0,status:e,type:`agent`}}var c,l,u,d,f,p,m;function h(){return(h=e((()=>{r(),a(),c=`forge-ai-tool-call`,l={name:`getCurrentWeather`,displayName:`Get current weather`,renderer:i({render:e=>{let t=document.createElement(`p`),{temperature:n,condition:r}=e.result??{};return t.textContent=e.result?`${e.args.location}: ${n}°F, ${r}`:`Looking up ${e.args.location}...`,t}})},u={title:`AI/Components/Tools & Reasoning/Tool Call`,component:c,argTypes:{status:{control:`select`,options:[`pending`,`parsing`,`executing`,`complete`,`error`],description:"The status of the tool call. The renderer shows once the call is `complete`, or earlier if `renderOnStart` is set"},renderOnStart:{control:`boolean`,description:"Whether the renderer shows while the call is still `parsing` or `executing`"}},args:{status:`complete`,renderOnStart:!1},render:e=>n`
    <forge-ai-tool-call
      .toolCall=${s(e.status)}
      .toolDefinition=${{...l,renderOnStart:e.renderOnStart}}></forge-ai-tool-call>
  `},d={},f={args:{status:`executing`,renderOnStart:!0}},p={args:{status:`executing`,renderOnStart:!1}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'executing',
    renderOnStart: true
  }
}`,...f.parameters?.docs?.source},description:{story:"With `renderOnStart`, the renderer appears while the call is still executing.",...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'executing',
    renderOnStart: false
  }
}`,...p.parameters?.docs?.source},description:{story:"Without `renderOnStart`, nothing is rendered until the call completes.",...p.parameters?.docs?.description}}},m=[`Demo`,`RenderOnStart`,`InProgress`]})))()}export{h as i,d as n,f as r,o as t};