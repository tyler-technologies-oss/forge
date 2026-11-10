import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{i,t as a}from"./ref-CKV-hb40.js";import{t as o}from"./ai-slash-command-menu2-DNrHDmJ3.js";function s(){return(s=e((()=>{o()})))()}var c=t({Demo:()=>p,Filtered:()=>m,__namedExportsOrder:()=>h,default:()=>f}),l,u,d,f,p,m,h;function g(){return(g=e((()=>{r(),a(),s(),{action:l}=__STORYBOOK_MODULE_ACTIONS__,u=`forge-ai-slash-command-menu`,d=[{id:`clear`,name:`Clear conversation`,group:`Conversation`},{id:`export`,name:`Export conversation`,group:`Conversation`},{id:`info`,name:`About this assistant`,group:`Help`},{id:`debug`,name:`Toggle debug mode`,group:`Help`}],f={title:`AI/Components/Input & Context/Slash Command Menu`,component:u,argTypes:{open:{control:`boolean`,description:"Whether the menu is shown. It also requires an `anchor`"},filterQuery:{control:`text`,description:`Text used to filter commands by name, ignoring case`}},args:{open:!0,filterQuery:``},render:e=>{let t,r;return n`
      <style>
        .slash-command-menu-story {
          padding-block-start: 160px;
          max-inline-size: 480px;
        }
        .slash-command-menu-story input {
          box-sizing: border-box;
          inline-size: 100%;
        }
      </style>
      <div class="slash-command-menu-story">
        <input
          type="text"
          aria-label="Message"
          placeholder="Type a message"
          ${i(e=>t=e)}
          @keydown=${e=>r?.handleKeyDown(e)} />
        <forge-ai-slash-command-menu
          ${i(e=>{r=e,r&&t&&(r.anchor=t)})}
          .commands=${d}
          .open=${e.open}
          filter-query=${e.filterQuery}
          @forge-ai-slash-command-menu-select=${e=>l(`forge-ai-slash-command-menu-select`)(e.detail)}
          @forge-ai-slash-command-menu-close=${l(`forge-ai-slash-command-menu-close`)}>
        </forge-ai-slash-command-menu>
      </div>
    `}},p={},m={args:{filterQuery:`conv`}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    filterQuery: 'conv'
  }
}`,...m.parameters?.docs?.source},description:{story:'Commands whose name does not contain `filterQuery` are hidden. With no matches the menu shows "No commands found".',...m.parameters?.docs?.description}}},h=[`Demo`,`Filtered`]})))()}export{g as i,p as n,m as r,c as t};