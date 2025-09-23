import{E as d,x as r}from"./iframe-CCqKG2bu.js";import{g as p,a as c}from"./utils-Cqbxq2Mi.js";import{o as l}from"./style-map-DFpOfcj5.js";import{e as m}from"./class-map-BY6QcHee.js";import{s as n}from"./decorators-CbiUzzdr.js";import"./service-adapter-CffG5Lhq.js";import"./scaffold-BrokB2Ba.js";const f=".scaffold-example{--forge-scaffold-height: 500px;--forge-scaffold-width: 100%}.scaffold-example div[slot],.forge-scaffold>div[class^=forge-scaffold__]{border:2px dashed var(--forge-theme-outline-low);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:var(--forge-spacing-xsmall);margin:var(--forge-spacing-xsmall);box-sizing:border-box}",t="forge-scaffold",v={title:"Components/Scaffold",render:e=>{const a=c(e),o=a?l(a):d;return r`
      <forge-scaffold class="scaffold-example" style=${o} .viewport=${e.viewport}>
        <div slot="left">left</div>
        <div slot="header">header</div>
        <div slot="body-header">body-header</div>
        <div slot="body-left">body-left</div>
        <div slot="body">body</div>
        <div slot="body-right">body-right</div>
        <div slot="body-footer">body-footer</div>
        <div slot="footer">footer</div>
        <div slot="right">right</div>
      </forge-scaffold>
    `},component:t,parameters:{actions:{disable:!0}},decorators:[n(f)],argTypes:{...p({tagName:t})},args:{viewport:!1}},i={},s={render:({viewport:e,...a})=>{const o=c(a),u=o?l(o):d;return r`
      <div class=${m({"scaffold-example":!0,"forge-scaffold":!0,"forge-button--viewport":e})} style=${u}>
        <div class="forge-scaffold__left">left</div>
        <div class="forge-scaffold__header">header</div>
        <div class="forge-scaffold__body">
          <div class="forge-scaffold">
            <div class="forge-scaffold__left">
              <div>Body Left</div>
            </div>
            <div class="forge-scaffold__right">
              <div>Body Right</div>
            </div>
            <div class="forge-scaffold__header">
              <div>Body Header</div>
            </div>
            <div class="forge-scaffold__body" tabindex="0">
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
              </div>
            </div>
            <div class="forge-scaffold__footer">
              <div>Body Footer</div>
            </div>
          </div>
        </div>
        <div class="forge-scaffold__footer">footer</div>
        <div class="forge-scaffold__right">right</div>
      </div>
    `}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: ({
    viewport,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'scaffold-example': true,
      'forge-scaffold': true,
      'forge-button--viewport': viewport
    };
    return html\`
      <div class=\${classMap(classes)} style=\${style}>
        <div class="forge-scaffold__left">left</div>
        <div class="forge-scaffold__header">header</div>
        <div class="forge-scaffold__body">
          <div class="forge-scaffold">
            <div class="forge-scaffold__left">
              <div>Body Left</div>
            </div>
            <div class="forge-scaffold__right">
              <div>Body Right</div>
            </div>
            <div class="forge-scaffold__header">
              <div>Body Header</div>
            </div>
            <div class="forge-scaffold__body" tabindex="0">
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt distinctio est praesentium. Sed
                  saepe eius, voluptatibus officia dolores recusandae cum. Molestias est numquam odio.
                </p>
              </div>
            </div>
            <div class="forge-scaffold__footer">
              <div>Body Footer</div>
            </div>
          </div>
        </div>
        <div class="forge-scaffold__footer">footer</div>
        <div class="forge-scaffold__right">right</div>
      </div>
    \`;
  }
}`,...s.parameters?.docs?.source}}};const g=["Demo","CSSOnly"],L=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:i,__namedExportsOrder:g,default:v},Symbol.toStringTag,{value:"Module"}));export{s as C,i as D,L as S};
