import{x as s,E as y}from"./iframe-uO4rUnhr.js";import{g as _,a as h}from"./utils-DlEBVKaK.js";import{e as S}from"./class-map-DoPvD_Gh.js";import{o as x}from"./style-map-DpF1fvt1.js";import{s as C}from"./decorators-BHo2GvWW.js";import"./feature-detection-uS6p5jc8.js";import"./toolbar-Byb6kcao.js";const a="forge-toolbar",A={title:"Components/Toolbar",render:o=>s`
    <forge-toolbar .inverted=${o.inverted}>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `,component:a,parameters:{actions:{disable:!0}},argTypes:{..._({tagName:a})},args:{inverted:!1}},e={},r={render:()=>s`
    <forge-toolbar inverted>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  `},t={decorators:[C(`
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
  `)],render:({inverted:o,...b})=>{const n=h(b),u=n?x(n):y;return s`<div class=${S({"forge-toolbar":!0,"forge-toolbar--inverted":o})} style=${u}>
      <div class="forge-toolbar__start placeholder-container">Start</div>
      <div class="forge-toolbar__center placeholder-container">Center</div>
      <div class="forge-toolbar__end placeholder-container">End</div>
    </div>`}};var d,l,i;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var c,v,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => html\`
    <forge-toolbar inverted>
      <div slot="before-start">Before start</div>
      <div slot="start">Start</div>
      <div slot="center">Center</div>
      <div slot="end">End</div>
      <div slot="after-end">After end</div>
    </forge-toolbar>
  \`
}`,...(p=(v=r.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var g,f,m;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(m=(f=t.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const E=["Demo","Inverted","CSSOnly"],I=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:e,Inverted:r,__namedExportsOrder:E,default:A},Symbol.toStringTag,{value:"Module"}));export{t as C,e as D,r as I,I as T};
