import{E as f,x as o}from"./iframe-DI7yp4Es.js";import{o as d}from"./style-map-DjATG3MH.js";import{g as x,s as p,a as c}from"./utils-BwTYAoRH.js";import{s as g}from"./decorators-Dkt4QYLX.js";import"./service-adapter-CffG5Lhq.js";import"./stack-Ca0GDYK5.js";import"./text-field-COqDLaMN.js";import"./base-field-CRqwZkGO.js";import"./focus-indicator-BC5BEuUe.js";import"./label-C-kHiLFY.js";import"./index-5CPwzmQS.js";import"./button-CJ5YWwCL.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-BAovUuzx.js";import"./checkbox-DiSqW2_u.js";import"./icon-button-CQgGxtJo.js";import"./icon-kuXwuZAY.js";import"./switch-Bin0Siuv.js";const u=".box{border:var(--forge-border-thick) dotted var(--forge-theme-outline-medium);background-color:var(--forge-theme-surface-container-low);border-radius:var(--forge-shape-large)}.small{height:25px;width:25px}.medium{height:75px;width:75px}.large{height:100px;width:100px}.xlarge{height:125px;width:125px}",s="forge-stack",m={title:"Components/Stack",component:s,render:e=>{const t=c(e),a=t?d(t):f;return o`
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
    `},parameters:{actions:{disable:!0}},argTypes:{...x({tagName:s,controls:{alignment:{control:"select",options:["start","center","end"]},justify:{control:"select",options:["start","center","end"]},gap:{control:{type:"range",min:0,max:100,step:1}}}})},args:{inline:!1,wrap:!1,stretch:!1,gap:16,alignment:"start",justify:"start"}},r={decorators:[g(u)]},i={render:e=>{const t=c(e),a=t?d(t):f;return o`
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
    `}},n={...p,render:()=>o`
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
    `},l={...p,render:()=>o`
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
    `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const k=["Demo","SimpleVerticalForm","ComplexForm","CSSOnly"],M=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,ComplexForm:n,Demo:r,SimpleVerticalForm:i,__namedExportsOrder:k,default:m},Symbol.toStringTag,{value:"Module"}));export{n as C,r as D,M as S,i as a,l as b};
