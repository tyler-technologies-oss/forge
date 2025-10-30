import{x as s,E as i}from"./iframe-DhhXTQKZ.js";import{g as c,a as v}from"./utils-C83vs9tY.js";import{e as p}from"./class-map-BTQG__GG.js";import{o as g}from"./style-map-bg7VR1JS.js";import{s as f}from"./decorators-BrcrxnMY.js";import"./service-adapter-CffG5Lhq.js";import"./toolbar-U0axkpKl.js";const a="forge-toolbar",m={title:"Components/Toolbar",render:o=>s`
    <forge-toolbar .inverted=${o.inverted}>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `,component:a,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:a})},args:{inverted:!1}},e={},r={render:()=>s`
    <forge-toolbar inverted>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `},t={decorators:[f(`
.placeholder-container {
    border: 2px dashed var(--forge-theme-outline);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-block: 8px;
    margin-block: 4px;
}
  `)],render:({inverted:o,...d})=>{const n=v(d),l=n?g(n):i;return s`<div class=${p({"forge-toolbar":!0,"forge-toolbar--inverted":o})} style=${l}>
      <div class="forge-toolbar__start placeholder-container">Start</div>
      <div class="forge-toolbar__center placeholder-container">Center</div>
      <div class="forge-toolbar__end placeholder-container">End</div>
    </div>`}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-toolbar inverted>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  \`
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
.placeholder-container {
    border: 2px dashed var(--forge-theme-outline);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-block: 8px;
    margin-block: 4px;
}
  \`)],
  render: ({
    inverted,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-toolbar': true,
      'forge-toolbar--inverted': inverted
    };
    return html\`<div class=\${classMap(classes)} style=\${style}>
      <div class="forge-toolbar__start placeholder-container">Start</div>
      <div class="forge-toolbar__center placeholder-container">Center</div>
      <div class="forge-toolbar__end placeholder-container">End</div>
    </div>\`;
  }
}`,...t.parameters?.docs?.source}}};const b=["Demo","Inverted","CSSOnly"],E=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:e,Inverted:r,__namedExportsOrder:b,default:m},Symbol.toStringTag,{value:"Module"}));export{t as C,e as D,r as I,E as T};
