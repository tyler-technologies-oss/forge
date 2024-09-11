import"./lit-element-Dk2-kgKT.js";import{k as m,D as n}from"./lit-html-DZH-Jm0H.js";import{b as f,g as b}from"./utils-D1kchwVb.js";import{s as v}from"./style-map-DxfbqtuX.js";import{R as _}from"./class-map-D93gIiBE.js";import{s as y}from"./decorators-DvEJi2JG.js";import"./constants-DjE6emXm.js";import"./scaffold-R2qvsZCm.js";const q=".scaffold-example{--forge-scaffold-height: 500px;--forge-scaffold-width: 100%}.scaffold-example div[slot],.forge-scaffold>div[class^=forge-scaffold__]{border:2px dashed var(--forge-theme-outline-low);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:var(--forge-spacing-xsmall);margin:var(--forge-spacing-xsmall);box-sizing:border-box}",t="forge-scaffold",h={title:"Components/Scaffold",render:e=>{const a=f(e),o=a?v(a):n;return m`
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
    `},component:t,parameters:{actions:{disable:!0}},decorators:[y(q)],argTypes:{...b({tagName:t})},args:{viewport:!1}},s={},i={render:({viewport:e,...a})=>{const o=f(a),g=o?v(o):n;return m`
      <div class=${_({"scaffold-example":!0,"forge-scaffold":!0,"forge-button--viewport":e})} style=${g}>
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
    `}};var d,r,c;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(c=(r=s.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};var l,u,p;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=(u=i.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const S=["Demo","CSSOnly"],$=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:i,Demo:s,__namedExportsOrder:S,default:h},Symbol.toStringTag,{value:"Module"}));export{i as C,s as D,$ as S};
