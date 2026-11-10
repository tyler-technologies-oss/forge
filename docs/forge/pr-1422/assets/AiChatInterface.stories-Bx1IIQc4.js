import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./ai-chat-interface-DhifI1b6.js";import{t as a}from"./ai-chat-header-CT7uKciU.js";import{t as o}from"./ai-prompt-CBlfqRks.js";import{t as s}from"./ai-gradient-container-BG5fEAmM.js";import{t as c}from"./ai-user-message-BaR_ldtY.js";import{t as l}from"./ai-response-message-CVQiais_.js";import{t as u}from"./card-Dq3fw6oM.js";import{t as d}from"./ai-suggestions-wcRpGKKy.js";import{t as f}from"./ai-empty-state-Dt6oAZHw.js";var p=t({Demo:()=>h,WithEmptyState:()=>g,WithGradientBorderComponent:()=>y,WithInlineSuggestions:()=>v,WithMessages:()=>_,__namedExportsOrder:()=>b,default:()=>m}),m,h,g,_,v,y,b;function x(){return(x=e((()=>{r(),u(),i(),a(),c(),l(),d(),s(),f(),o(),m={title:`AI/Components/Chat/Chat Interface`,component:`forge-ai-chat-interface`,render:()=>n`
    <forge-ai-chat-interface>
      <forge-ai-chat-header slot="header"></forge-ai-chat-header>
      <forge-ai-prompt slot="prompt"></forge-ai-prompt>
    </forge-ai-chat-interface>
  `},h={},g={render:()=>n`
      <forge-ai-gradient-container>
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-empty-state>
            <forge-ai-suggestions slot="actions" variant="block" .suggestions=${[{text:`Help me write an email`,value:`email`},{text:`Create a presentation`,value:`presentation`},{text:`Write some code`,value:`code`},{text:`Plan a meeting`,value:`meeting`},{text:`Summarize a document`,value:`summarize`}]}> </forge-ai-suggestions>
          </forge-ai-empty-state>
          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `},_={render:()=>n`
    <forge-ai-chat-interface>
      <forge-ai-chat-header slot="header"></forge-ai-chat-header>
      <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
      <forge-ai-response-message>
        I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
        maintaining type safety.
      </forge-ai-response-message>
      <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
      <forge-ai-response-message>
        Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
      </forge-ai-response-message>
      <forge-ai-prompt slot="prompt"></forge-ai-prompt>
    </forge-ai-chat-interface>
  `},v={render:()=>n`
      <forge-ai-chat-interface>
        <forge-ai-chat-header slot="header"></forge-ai-chat-header>
        <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
        <forge-ai-response-message>
          I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
          maintaining type safety.
        </forge-ai-response-message>
        <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
        <forge-ai-response-message>
          Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
        </forge-ai-response-message>
        <forge-ai-suggestions slot="suggestions" .suggestions=${[{text:`Help me write an email`,value:`email`},{text:`Create a presentation`,value:`presentation`},{text:`Write some code`,value:`code`},{text:`Plan a meeting`,value:`meeting`},{text:`Summarize a document`,value:`summarize`}]}></forge-ai-suggestions>
        <forge-ai-prompt slot="prompt"></forge-ai-prompt>
      </forge-ai-chat-interface>
    `},y={render:()=>n`
      <forge-ai-gradient-container>
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
          <forge-ai-response-message>
            I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
            maintaining type safety.
          </forge-ai-response-message>
          <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
          <forge-ai-response-message>
            Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
          </forge-ai-response-message>
          <forge-ai-suggestions slot="suggestions" .suggestions=${[{text:`Help me write an email`,value:`email`},{text:`Create a presentation`,value:`presentation`},{text:`Write some code`,value:`code`},{text:`Plan a meeting`,value:`meeting`},{text:`Summarize a document`,value:`summarize`}]}></forge-ai-suggestions>
          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const suggestions = [{
      text: 'Help me write an email',
      value: 'email'
    }, {
      text: 'Create a presentation',
      value: 'presentation'
    }, {
      text: 'Write some code',
      value: 'code'
    }, {
      text: 'Plan a meeting',
      value: 'meeting'
    }, {
      text: 'Summarize a document',
      value: 'summarize'
    }] as Suggestion[];
    return html\`
      <forge-ai-gradient-container>
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-empty-state>
            <forge-ai-suggestions slot="actions" variant="block" .suggestions=\${suggestions}> </forge-ai-suggestions>
          </forge-ai-empty-state>
          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    \`;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-ai-chat-interface>
      <forge-ai-chat-header slot="header"></forge-ai-chat-header>
      <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
      <forge-ai-response-message>
        I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
        maintaining type safety.
      </forge-ai-response-message>
      <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
      <forge-ai-response-message>
        Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
      </forge-ai-response-message>
      <forge-ai-prompt slot="prompt"></forge-ai-prompt>
    </forge-ai-chat-interface>
  \`
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const suggestions = [{
      text: 'Help me write an email',
      value: 'email'
    }, {
      text: 'Create a presentation',
      value: 'presentation'
    }, {
      text: 'Write some code',
      value: 'code'
    }, {
      text: 'Plan a meeting',
      value: 'meeting'
    }, {
      text: 'Summarize a document',
      value: 'summarize'
    }] as Suggestion[];
    return html\`
      <forge-ai-chat-interface>
        <forge-ai-chat-header slot="header"></forge-ai-chat-header>
        <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
        <forge-ai-response-message>
          I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
          maintaining type safety.
        </forge-ai-response-message>
        <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
        <forge-ai-response-message>
          Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
        </forge-ai-response-message>
        <forge-ai-suggestions slot="suggestions" .suggestions=\${suggestions}></forge-ai-suggestions>
        <forge-ai-prompt slot="prompt"></forge-ai-prompt>
      </forge-ai-chat-interface>
    \`;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const suggestions = [{
      text: 'Help me write an email',
      value: 'email'
    }, {
      text: 'Create a presentation',
      value: 'presentation'
    }, {
      text: 'Write some code',
      value: 'code'
    }, {
      text: 'Plan a meeting',
      value: 'meeting'
    }, {
      text: 'Summarize a document',
      value: 'summarize'
    }] as Suggestion[];
    return html\`
      <forge-ai-gradient-container>
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
          <forge-ai-response-message>
            I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
            maintaining type safety.
          </forge-ai-response-message>
          <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
          <forge-ai-response-message>
            Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
          </forge-ai-response-message>
          <forge-ai-suggestions slot="suggestions" .suggestions=\${suggestions}></forge-ai-suggestions>
          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    \`;
  }
}`,...y.parameters?.docs?.source}}},b=[`Demo`,`WithEmptyState`,`WithMessages`,`WithInlineSuggestions`,`WithGradientBorderComponent`]})))()}export{h as n,x as r,p as t};