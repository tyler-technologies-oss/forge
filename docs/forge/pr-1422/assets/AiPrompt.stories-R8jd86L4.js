import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{o as i,t as a}from"./icon-DTOjPWy9.js";import{E as o,pn as s,t as c}from"./tyler-icons-kuH1S-j5.js";import{t as l}from"./ai-prompt-CBlfqRks.js";import{t as u}from"./ai-voice-input-COMu-j54.js";import{t as d}from"./ai-file-picker-ZI_ui4NN.js";import{t as f}from"./button-5s54CFRd.js";var p=t({Demo:()=>g,__namedExportsOrder:()=>_,default:()=>h}),m,h,g,_;function v(){return(v=e((()=>{r(),l(),u(),d(),a(),f(),c(),{action:m}=__STORYBOOK_MODULE_ACTIONS__,i.define([o,s]),h={title:`AI/Components/Chat/Prompt`,component:`forge-ai-prompt`,argTypes:{variant:{control:`select`,options:[`stacked`,`inline`],description:`Layout variant for the prompt component`},placeholder:{control:`text`,description:`Placeholder text for the textarea field`},autofocus:{control:`boolean`,description:`Whether to autofocus the textarea field when the component renders`},sendDisabled:{control:`boolean`,description:`Whether the send button is disabled`},inputDisabled:{control:`boolean`,description:`Whether the textarea field is disabled`},cancelOnEscape:{control:`boolean`,description:`Whether to dispatch cancel events when Escape key is pressed`},showAdditionalAction:{control:`boolean`,description:`Show additional action button (only visible in stacked variant)`}},args:{variant:`stacked`,placeholder:`Ask a question...`,sendDisabled:!1,inputDisabled:!1,cancelOnEscape:!0,showAdditionalAction:!1},render:e=>{let t=m(`forge-ai-prompt-send`),r=m(`forge-ai-prompt-cancel`),i=m(`forge-ai-prompt-attachment`);return n`
      <forge-ai-prompt
        variant=${e.variant}
        placeholder=${e.placeholder}
        ?send-disabled=${e.sendDisabled}
        ?input-disabled=${e.inputDisabled}
        ?cancel-on-escape=${e.cancelOnEscape}
        @forge-ai-prompt-send=${t}
        @forge-ai-prompt-cancel=${r}
        @forge-ai-prompt-attachment=${i}>
        <forge-ai-file-picker slot="actions-start"></forge-ai-file-picker>
        ${e.showAdditionalAction?n`
              <forge-button slot="actions-start" variant="outlined">
                <forge-icon name="web_alt" slot="leading"></forge-icon>
                Web search
              </forge-button>
              <forge-button slot="actions-start" variant="outlined">
                GPT-4
                <forge-icon name="chevron_down" slot="trailing"></forge-icon>
              </forge-button>
            `:``}
        <forge-ai-voice-input slot="actions-end"></forge-ai-voice-input>
      </forge-ai-prompt>
    `}},g={},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_=[`Demo`]})))()}export{g as n,v as r,p as t};