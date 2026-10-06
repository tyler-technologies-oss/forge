import{b as o,A as d}from"./iframe-OKJOnn65.js";import{o as p}from"./style-map-SzPyW2OI.js";import{s as c,b as x,g as m}from"./utils-DqCQojVn.js";import{s as g}from"./decorators-C2xErDWb.js";import"./service-adapter-8tADcN_b.js";import"./stack-BNz3vfmV.js";import"./text-field-Bd9kQUjl.js";import"./base-field-CUfsciqC.js";import"./focus-indicator-CILpCuRH.js";import"./label-Bl7KteXW.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";const u=".box{border:var(--forge-border-thick) dotted var(--forge-theme-outline-medium);background-color:var(--forge-theme-surface-container-low);border-radius:var(--forge-shape-large)}.small{height:25px;width:25px}.medium{height:75px;width:75px}.large{height:100px;width:100px}.xlarge{height:125px;width:125px}",f="forge-stack",y={title:"Components/Stack",component:f,render:e=>{const t=x(e),a=t?p(t):d;return o`
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
    `},parameters:{actions:{disable:!0}},argTypes:{...m({tagName:f,controls:{alignment:{control:"select",options:["start","center","end"]},justify:{control:"select",options:["start","center","end"]},gap:{control:{type:"range",min:0,max:100,step:1}}}})},args:{inline:!1,wrap:!1,stretch:!1,gap:16,alignment:"start",justify:"start"}},r={decorators:[g(u)]},i={decorators:[g(u)],argTypes:{gap:{control:"select",options:["xxxs","xxs","xs","s","m","ml","l","xl","xxl","xxxl"]}},args:{gap:"m"}},n={render:e=>{const t=x(e),a=t?p(t):d;return o`
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
    `}},l={...c,render:()=>o`
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
  `},s={...c,render:()=>o`
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
  decorators: [storyStyles(styles)],
  argTypes: {
    gap: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 's', 'm', 'ml', 'l', 'xl', 'xxl', 'xxxl']
    }
  },
  args: {
    gap: 'm'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
}`,...s.parameters?.docs?.source}}};const k=["Demo","GapSizes","SimpleVerticalForm","ComplexForm","CSSOnly"],O=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,ComplexForm:l,Demo:r,GapSizes:i,SimpleVerticalForm:n,__namedExportsOrder:k,default:y},Symbol.toStringTag,{value:"Module"}));export{l as C,r as D,i as G,O as S,n as a,s as b};
