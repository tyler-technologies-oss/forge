import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./ai-suggestions-wcRpGKKy.js";import{t as a}from"./ai-empty-state-Dt6oAZHw.js";var o=t({Demo:()=>c,__namedExportsOrder:()=>l,default:()=>s}),s,c,l;function u(){return(u=e((()=>{r(),a(),i(),s={title:`AI/Components/Chat/Empty State`,component:`forge-ai-empty-state`,argTypes:{showSuggestions:{control:`boolean`,description:`Show or hide the suggestions`},headingText:{control:`text`,description:`Custom heading text for the heading slot (leave empty for default)`},customMessage:{control:`text`,description:`Custom message text (leave empty for default)`}},args:{showSuggestions:!0,headingText:`Forge AI`,customMessage:`Welcome to Forge AI! How can I assist you today?`},render:e=>n`
      <forge-ai-empty-state>
        <img slot="icon" src="./ai-logo.png" alt="AI Icon" />
        ${e.headingText?n`<span slot="heading">${e.headingText}</span>`:``}
        ${e.customMessage?n`<span slot="body">${e.customMessage}</span>`:``}
        ${e.showSuggestions?n` <forge-ai-suggestions slot="actions" variant="block" .suggestions=${[{text:`Help me write an email`,value:`email`},{text:`Create a presentation`,value:`presentation`},{text:`Write some code`,value:`code`},{text:`Plan a meeting`,value:`meeting`}]}> </forge-ai-suggestions> `:``}
      </forge-ai-empty-state>
    `},c={args:{customMessage:`Welcome to Forge AI!  `}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    customMessage: 'Welcome to Forge AI!  '
  }
}`,...c.parameters?.docs?.source}}},l=[`Demo`]})))()}export{c as n,u as r,o as t};