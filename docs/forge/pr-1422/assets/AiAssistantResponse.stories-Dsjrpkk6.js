import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{n as i,t as a}from"./ai-tool-call-CFCPne1C.js";import{t as o}from"./ai-assistant-response-UT3k0v69.js";var s=t({Demo:()=>h,Thinking:()=>_,WithToolCall:()=>g,__namedExportsOrder:()=>v,default:()=>m}),c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{r(),a(),o(),{action:c}=__STORYBOOK_MODULE_ACTIONS__,l=`forge-ai-assistant-response`,u=new Map([[`getCurrentWeather`,{name:`getCurrentWeather`,displayName:`Get current weather`,renderer:i({render:e=>{let t=document.createElement(`p`),{temperature:n,condition:r}=e.result??{};return t.textContent=`${e.args.location}: ${n}°F, ${r}`,t}})}]]),d={id:`response-1`,status:`complete`,timestamp:17e11,children:[{type:`text`,messageId:`message-1`,status:`complete`,content:"Generics let you write **reusable** code that works with different types while keeping type safety.\n\n- Use `<T>` to declare a type parameter\n- Constrain it with `extends`"}]},f={id:`response-2`,status:`complete`,timestamp:17e11,children:[{type:`text`,messageId:`message-1`,status:`complete`,content:`Let me check the weather for you.`},{type:`toolCall`,data:{id:`tool-call-1`,messageId:`message-1`,name:`getCurrentWeather`,args:{location:`San Francisco`},result:{temperature:68,condition:`Sunny`},status:`complete`,type:`agent`,startTimestamp:1e3,endTimestamp:1420}},{type:`text`,messageId:`message-2`,status:`complete`,content:`It's sunny and 68°F in San Francisco.`}]},p={id:`response-3`,status:`streaming`,timestamp:17e11,isThinking:!0,children:[]},m={title:`AI/Components/Messages/Assistant Response`,component:l,argTypes:{enableReactions:{control:`boolean`,description:`Whether the toolbar shows thumbs up and thumbs down buttons`},debugMode:{control:`boolean`,description:`Whether the tool call timeline also shows the arguments and result of each tool`},showThinking:{control:`boolean`,description:`Whether to show a thinking indicator while the response is in progress`}},args:{enableReactions:!0,debugMode:!1,showThinking:!1},render:e=>n`
    <forge-ai-assistant-response
      .response=${d}
      .tools=${u}
      ?enable-reactions=${e.enableReactions}
      ?debug-mode=${e.debugMode}
      ?show-thinking=${e.showThinking}
      @forge-ai-assistant-response-copy=${e=>c(`forge-ai-assistant-response-copy`)(e.detail)}
      @forge-ai-assistant-response-resend=${e=>c(`forge-ai-assistant-response-resend`)(e.detail)}
      @forge-ai-assistant-response-thumbs-up=${e=>c(`forge-ai-assistant-response-thumbs-up`)(e.detail)}
      @forge-ai-assistant-response-thumbs-down=${e=>c(`forge-ai-assistant-response-thumbs-down`)(e.detail)}>
    </forge-ai-assistant-response>
  `},h={},g={render:e=>n`
    <forge-ai-assistant-response
      .response=${f}
      .tools=${u}
      ?enable-reactions=${e.enableReactions}
      ?debug-mode=${e.debugMode}
      ?show-thinking=${e.showThinking}>
    </forge-ai-assistant-response>
  `},_={args:{showThinking:!0},render:e=>n`
    <forge-ai-assistant-response
      .response=${p}
      .tools=${u}
      ?enable-reactions=${e.enableReactions}
      ?debug-mode=${e.debugMode}
      ?show-thinking=${e.showThinking}>
    </forge-ai-assistant-response>
  `},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <forge-ai-assistant-response
      .response=\${toolCallResponse}
      .tools=\${tools}
      ?enable-reactions=\${args.enableReactions}
      ?debug-mode=\${args.debugMode}
      ?show-thinking=\${args.showThinking}>
    </forge-ai-assistant-response>
  \`
}`,...g.parameters?.docs?.source},description:{story:"Text and tool calls are rendered in order. A tool call with a `renderer` shows its result under the tool call timeline.",...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    showThinking: true
  },
  render: args => html\`
    <forge-ai-assistant-response
      .response=\${thinkingResponse}
      .tools=\${tools}
      ?enable-reactions=\${args.enableReactions}
      ?debug-mode=\${args.debugMode}
      ?show-thinking=\${args.showThinking}>
    </forge-ai-assistant-response>
  \`
}`,..._.parameters?.docs?.source},description:{story:"While a response is in progress with no content yet, `show-thinking` displays a thinking indicator.",..._.parameters?.docs?.description}}},v=[`Demo`,`WithToolCall`,`Thinking`]})))()}export{y as a,g as i,h as n,_ as r,s as t};