import"./lit-element-B3QVTycr.js";import{E as h,x as o}from"./lit-html-CuBe1DX_.js";import{o as T}from"./style-map-CeP1Mntv.js";import{g as w,s as S,b as $}from"./utils-Do5MGSMS.js";import{s as j}from"./decorators-CBntP_d2.js";import"./feature-detection-C61kIZu7.js";import"./stack-CePCofIq.js";import"./text-field-DxXALn2L.js";import"./base-field-BDCxUf4S.js";import"./focus-indicator-DydcbRnf.js";import"./index-CiLSBptl.js";import"./label-W_tr_-w0.js";import"./button-7EoU3XJS.js";import"./state-layer-Y8UVngaT.js";import"./button-toggle-group-BIaWvq7W.js";import"./checkbox-CZ4HhXrD.js";import"./icon-button-DJSm0po0.js";import"./icon-DNSPAaK0.js";import"./switch-CVhsVTET.js";const C=".box{border:var(--forge-border-thick) dotted var(--forge-theme-outline-medium);background-color:var(--forge-theme-surface-container-low);border-radius:var(--forge-shape-large)}.small{height:25px;width:25px}.medium{height:75px;width:75px}.large{height:100px;width:100px}.xlarge{height:125px;width:125px}",s="forge-stack",V={title:"Components/Stack",component:s,render:e=>{const t=$(e),a=t?T(t):h;return o`
      <div class="stack-container">
        <forge-stack
          .inline=${e.inline}
          .wrap=${e.wrap}
          .stretch=${e.stretch}
          .gap=${e.gap}
          .alignment=${e.alignment}
          .justify=${e.justify}
          style=${a}>
          <div class="box small"></div>
          <div class="box medium"></div>
          <div class="box large"></div>
          <div class="box xlarge"></div>
        </forge-stack>
      </div>
    `},parameters:{actions:{disable:!0}},argTypes:{...w({tagName:s,controls:{alignment:{control:"select",options:["start","center","end"]},justify:{control:"select",options:["start","center","end"]},gap:{control:{type:"range",min:0,max:100,step:1}}}})},args:{inline:!1,wrap:!1,stretch:!1,gap:16,alignment:"start",justify:"start"}},r={decorators:[j(C)]},i={render:e=>{const t=$(e),a=t?T(t):h;return o`
      <form>
        <forge-stack
          .inline=${e.inline}
          .wrap=${e.wrap}
          .stretch=${e.stretch}
          .gap=${e.gap}
          .alignment=${e.alignment}
          .justify=${e.justify}
          style=${a}>
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
    `}},n={...S,render:()=>o`
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
    `},l={...S,render:()=>o`
      <div class="forge-stack">
        <div class="forge-field">
          <input type="text" placeholder="Text field" />
        </div>
        <div class="forge-stack forge-stack--inline forge-stack--stretch">
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
        </div>
        <div class="forge-stack forge-stack--inline forge-stack--stretch">
          <div class="forge-stack forge-stack--inline forge-stack--stretch">
            <div class="forge-field">
              <input type="text" placeholder="Text field" />
            </div>
            <div class="forge-field">
              <input type="text" placeholder="Text field" />
            </div>
          </div>
          <div class="forge-stack forge-stack--inline forge-stack--stretch">
            <div class="forge-field">
              <input type="text" placeholder="Text field" />
            </div>
          </div>
        </div>
      </div>
    `};var f,d,p;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var c,x,g;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(g=(x=i.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var u,m,k;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(k=(m=n.parameters)==null?void 0:m.docs)==null?void 0:k.source}}};var y,b,v;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <div class="forge-stack">
        <div class="forge-field">
          <input type="text" placeholder="Text field" />
        </div>
        <div class="forge-stack forge-stack--inline forge-stack--stretch">
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
          <div class="forge-field">
            <input type="text" placeholder="Text field" />
          </div>
        </div>
        <div class="forge-stack forge-stack--inline forge-stack--stretch">
          <div class="forge-stack forge-stack--inline forge-stack--stretch">
            <div class="forge-field">
              <input type="text" placeholder="Text field" />
            </div>
            <div class="forge-field">
              <input type="text" placeholder="Text field" />
            </div>
          </div>
          <div class="forge-stack forge-stack--inline forge-stack--stretch">
            <div class="forge-field">
              <input type="text" placeholder="Text field" />
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(v=(b=l.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const A=["Demo","SimpleVerticalForm","ComplexForm","CSSOnly"],U=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,ComplexForm:n,Demo:r,SimpleVerticalForm:i,__namedExportsOrder:A,default:V},Symbol.toStringTag,{value:"Module"}));export{n as C,r as D,U as S,i as a,l as b};
