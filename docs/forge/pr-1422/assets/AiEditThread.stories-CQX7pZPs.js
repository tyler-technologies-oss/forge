import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-edit-thread-CfImOYCV.js";var a=t({Demo:()=>u,Medium:()=>d,__namedExportsOrder:()=>f,default:()=>l}),o,s,c,l,u,d,f;function p(){return(p=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s=`forge-ai-edit-thread`,c={id:`thread-1`,title:`Quarterly planning`,createdAt:`2025-01-15T10:00:00.000Z`},l={title:`AI/Components/Conversations/Edit Thread`,component:s,argTypes:{value:{control:`text`,description:`The initial text of the input`},density:{control:`select`,options:[`small`,`medium`],description:`The density of the cancel and save buttons`}},args:{value:c.title,density:`small`},render:e=>n`
    <forge-ai-edit-thread
      .thread=${c}
      value=${e.value}
      density=${e.density}
      @forge-ai-edit-thread-save=${e=>o(`forge-ai-edit-thread-save`)(e.detail)}
      @forge-ai-edit-thread-cancel=${o(`forge-ai-edit-thread-cancel`)}>
    </forge-ai-edit-thread>
  `},u={},d={args:{density:`medium`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    density: 'medium'
  }
}`,...d.parameters?.docs?.source},description:{story:`The medium density uses larger cancel and save buttons.`,...d.parameters?.docs?.description}}},f=[`Demo`,`Medium`]})))()}export{u as n,p as r,a as t};