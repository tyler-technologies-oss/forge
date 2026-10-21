import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{_ as a,l as o,m as s,s as c}from"./utils-C3ow8Ikc.js";import{n as l,t as u}from"./decorators-B2qNZTl0.js";import{r as d,t as f}from"./style-map-C_WKUe4Y.js";import{t as p}from"./text-field-Ba2hY42s.js";import{t as m}from"./stack-DjO_Q-_b.js";var h;function g(){return(g=e((()=>{h=`.box{border:var(--forge-border-thick) dotted var(--forge-theme-outline-medium);background-color:var(--forge-theme-surface-container-low);border-radius:var(--forge-shape-large)}.small{width:25px;height:25px}.medium{width:75px;height:75px}.large{width:100px;height:100px}.xlarge{width:125px;height:125px}`})))()}var _=t({CSSOnly:()=>w,ComplexForm:()=>C,Demo:()=>b,GapSizes:()=>x,SimpleVerticalForm:()=>S,__namedExportsOrder:()=>T,default:()=>y}),v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),f(),s(),u(),m(),p(),g(),v=`forge-stack`,y={title:`Components/Stack`,component:v,render:e=>{let t=o(e),i=t?d(t):r;return n`
      <div class="stack-container">
        <forge-stack
          .inline=${e.inline}
          .wrap=${e.wrap}
          .stretch=${e.stretch}
          .gap=${e.gap}
          .alignment=${e.alignment}
          .justify=${e.justify}
          style=${i}>
          <div class="box small"></div>
          <div class="box medium"></div>
          <div class="box large"></div>
          <div class="box xlarge"></div>
        </forge-stack>
      </div>
    `},parameters:{actions:{disable:!0}},argTypes:{...c({tagName:v,controls:{alignment:{control:`select`,options:[`start`,`center`,`end`]},justify:{control:`select`,options:[`start`,`center`,`end`]},gap:{control:{type:`range`,min:0,max:100,step:1}}}})},args:{inline:!1,wrap:!1,stretch:!1,gap:16,alignment:`start`,justify:`start`}},b={decorators:[l(h)]},x={decorators:[l(h)],argTypes:{gap:{control:`select`,options:[`xxxs`,`xxs`,`xs`,`s`,`m`,`ml`,`l`,`xl`,`xxl`,`xxxl`]}},args:{gap:`m`}},S={render:e=>{let t=o(e),i=t?d(t):r;return n`
      <form>
        <forge-stack
          .inline=${e.inline}
          .wrap=${e.wrap}
          .stretch=${e.stretch}
          .gap=${e.gap}
          .alignment=${e.alignment}
          .justify=${e.justify}
          style=${i}>
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
    `}},C={...a,render:()=>n`
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
  `},w={...a,render:()=>n`
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
  `},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Demo`,`GapSizes`,`SimpleVerticalForm`,`ComplexForm`,`CSSOnly`]})))()}export{S as a,x as i,C as n,_ as o,b as r,E as s,w as t};