import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-thread-actions-menu-DT2H7O27.js";var a=t({Demo:()=>u,RenameOnly:()=>d,__namedExportsOrder:()=>f,default:()=>l}),o,s,c,l,u,d,f;function p(){return(p=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s=`forge-ai-thread-actions-menu`,c={id:`thread-1`,title:`Quarterly planning`,createdAt:`2025-01-15T10:00:00.000Z`},l={title:`AI/Components/Conversations/Thread Actions Menu`,component:s,argTypes:{showRename:{control:`boolean`,description:`Whether the menu includes a Rename item`},showDelete:{control:`boolean`,description:`Whether the menu includes a Delete item`},density:{control:`select`,options:[`small`,`medium`,`large`],description:`The density of the trigger button`}},args:{showRename:!0,showDelete:!0,density:`small`},render:e=>n`
    <forge-ai-thread-actions-menu
      .thread=${c}
      ?show-rename=${e.showRename}
      ?show-delete=${e.showDelete}
      density=${e.density}
      @forge-ai-thread-actions-menu-rename=${e=>o(`forge-ai-thread-actions-menu-rename`)(e.detail)}
      @forge-ai-thread-actions-menu-delete-click=${e=>o(`forge-ai-thread-actions-menu-delete-click`)(e.detail)}
      @forge-ai-thread-actions-menu-open=${e=>o(`forge-ai-thread-actions-menu-open`)(e.detail)}
      @forge-ai-thread-actions-menu-close=${o(`forge-ai-thread-actions-menu-close`)}>
    </forge-ai-thread-actions-menu>
  `},u={},d={args:{showDelete:!1}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    showDelete: false
  }
}`,...d.parameters?.docs?.source},description:{story:`Show only the actions your app supports. Here the menu offers rename and no delete.`,...d.parameters?.docs?.description}}},f=[`Demo`,`RenameOnly`]})))()}export{p as i,u as n,d as r,a as t};