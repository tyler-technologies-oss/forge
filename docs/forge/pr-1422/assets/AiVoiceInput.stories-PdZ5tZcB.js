import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./stack-vA2I5ICp.js";import{t as a}from"./ai-voice-input-COMu-j54.js";var o=t({Demo:()=>c,__namedExportsOrder:()=>l,default:()=>s}),s,c,l;function u(){return(u=e((()=>{r(),i(),a(),s={title:`AI/Components/Input & Context/Voice Input`,component:`forge-ai-voice-input`,render:()=>n`
      <forge-stack gap="24">
        <forge-ai-voice-input @forge-ai-voice-input-result=${e=>{let t=document.getElementById(`result`);t&&(t.textContent=`"${e.detail.transcript}" (confidence: ${Math.round(e.detail.confidence*100)}%)`)}}></forge-ai-voice-input>
        <div>Result: <span id="result">Click the microphone and speak...</span></div>
      </forge-stack>
    `},c={},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l=[`Demo`]})))()}export{c as n,u as r,o as t};