import{x as o,T as b}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as y}from"./style-map-D0ILlpbs.js";import{a as k,g as h,s as T}from"./utils-C7XotN6S.js";import{s as $}from"./decorators-EVhofM2Q.js";import"./constants-CmaEVTEu.js";import"./stack-C5tb535Q.js";import"./text-field-CK1t5rdO.js";import"./base-field-DVx6gGpT.js";import"./focus-indicator-CexacDHl.js";import"./index-Dh0vMUMR.js";import"./label-BsLwoMJm.js";import"./button-DqH9YfaW.js";import"./state-layer-DjEoH8hN.js";import"./button-toggle-group-CSWkQPk2.js";import"./checkbox-DJehbw3q.js";import"./icon-button-Cqg7QjNu.js";import"./icon-DdNu5rAq.js";import"./switch-DYQgudGV.js";const v=".box{border:var(--forge-border-thick) dotted var(--forge-theme-outline-medium);background-color:var(--forge-theme-surface-container-low);border-radius:var(--forge-shape-large)}.small{height:25px;width:25px}.medium{height:75px;width:75px}.large{height:100px;width:100px}.xlarge{height:125px;width:125px}",a="forge-stack",S={title:"Components/Stack",component:a,render:t=>{const e=k(t),l=e?y(e):b;return o`
      <div class="stack-container">
        <forge-stack
          .inline=${t.inline}
          .wrap=${t.wrap}
          .stretch=${t.stretch}
          .gap=${t.gap}
          .alignment=${t.alignment}
          .justify=${t.justify}
          style=${l}>
          <div class="box small"></div>
          <div class="box medium"></div>
          <div class="box large"></div>
          <div class="box xlarge"></div>
        </forge-stack>
      </div>
    `},parameters:{actions:{disable:!0}},argTypes:{...h({tagName:a,controls:{alignment:{control:"select",options:["start","center","end"]},justify:{control:"select",options:["start","center","end"]},gap:{control:{type:"range",min:0,max:100,step:1}}}})},args:{inline:!1,wrap:!1,stretch:!1,gap:16,alignment:"start",justify:"start"}},r={decorators:[$(v)]},i={render:t=>{const e=k(t),l=e?y(e):b;return o`
      <form>
        <forge-stack
          .inline=${t.inline}
          .wrap=${t.wrap}
          .stretch=${t.stretch}
          .gap=${t.gap}
          .alignment=${t.alignment}
          .justify=${t.justify}
          style=${l}>
          <forge-text-field>
            <label for="input-text-1">Text field</label>
            <input type="text" id="input-text-1" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-2">Text field</label>
            <input type="text" id="input-text-2" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-3">Text field</label>
            <input type="text" id="input-text-3" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-4">Text field</label>
            <input type="text" id="input-text-4" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-5">Text field</label>
            <input type="text" id="input-text-5" />
          </forge-text-field>
        </forge-stack>
      </form>
    `}},n={...T,render:()=>o`
      <form>
        <forge-stack>
          <forge-stack>
            <forge-stack>
              <forge-text-field>
                <label for="input-text-01">Text field</label>
                <input type="text" id="input-text-1" />
              </forge-text-field>
              <forge-stack inline stretch>
                <forge-text-field>
                  <label for="input-text-2">Text field</label>
                  <input type="text" id="input-text-2" />
                </forge-text-field>
                <forge-text-field>
                  <label for="input-text-3">Text field</label>
                  <input type="text" id="input-text-3" />
                </forge-text-field>
              </forge-stack>
            </forge-stack>
            <forge-stack inline stretch>
              <forge-stack inline stretch>
                <forge-text-field>
                  <input type="text" id="input-text-4" />
                  <label for="input-text-4">Text field</label>
                </forge-text-field>
                <forge-text-field>
                  <input type="text" id="input-text-5" />
                  <label for="input-text-5">Text field</label>
                </forge-text-field>
              </forge-stack>
              <forge-stack inline stretch>
                <forge-text-field>
                  <input type="text" id="input-text-6" />
                  <label for="input-text-6">Text field</label>
                </forge-text-field>
              </forge-stack>
            </forge-stack>
          </forge-stack>
        </forge-stack>
      </form>
    `};var f,s,p;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...(p=(s=r.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};var x,d,g;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <form>
        <forge-stack
          .inline=\${args.inline}
          .wrap=\${args.wrap}
          .stretch=\${args.stretch}
          .gap=\${args.gap}
          .alignment=\${args.alignment}
          .justify=\${args.justify}
          style=\${style}>
          <forge-text-field>
            <label for="input-text-1">Text field</label>
            <input type="text" id="input-text-1" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-2">Text field</label>
            <input type="text" id="input-text-2" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-3">Text field</label>
            <input type="text" id="input-text-3" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-4">Text field</label>
            <input type="text" id="input-text-4" />
          </forge-text-field>
          <forge-text-field>
            <label for="input-text-5">Text field</label>
            <input type="text" id="input-text-5" />
          </forge-text-field>
        </forge-stack>
      </form>
    \`;
  }
}`,...(g=(d=i.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var c,u,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <form>
        <forge-stack>
          <forge-stack>
            <forge-stack>
              <forge-text-field>
                <label for="input-text-01">Text field</label>
                <input type="text" id="input-text-1" />
              </forge-text-field>
              <forge-stack inline stretch>
                <forge-text-field>
                  <label for="input-text-2">Text field</label>
                  <input type="text" id="input-text-2" />
                </forge-text-field>
                <forge-text-field>
                  <label for="input-text-3">Text field</label>
                  <input type="text" id="input-text-3" />
                </forge-text-field>
              </forge-stack>
            </forge-stack>
            <forge-stack inline stretch>
              <forge-stack inline stretch>
                <forge-text-field>
                  <input type="text" id="input-text-4" />
                  <label for="input-text-4">Text field</label>
                </forge-text-field>
                <forge-text-field>
                  <input type="text" id="input-text-5" />
                  <label for="input-text-5">Text field</label>
                </forge-text-field>
              </forge-stack>
              <forge-stack inline stretch>
                <forge-text-field>
                  <input type="text" id="input-text-6" />
                  <label for="input-text-6">Text field</label>
                </forge-text-field>
              </forge-stack>
            </forge-stack>
          </forge-stack>
        </forge-stack>
      </form>
    \`;
  }
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const w=["Demo","SimpleVerticalForm","ComplexForm"],K=Object.freeze(Object.defineProperty({__proto__:null,ComplexForm:n,Demo:r,SimpleVerticalForm:i,__namedExportsOrder:w,default:S},Symbol.toStringTag,{value:"Module"}));export{n as C,r as D,K as S,i as a};
