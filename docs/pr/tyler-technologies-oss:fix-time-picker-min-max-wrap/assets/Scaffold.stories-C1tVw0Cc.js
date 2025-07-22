import{E as m,x as n}from"./iframe-DgPlgY2v.js";import{g as b,a as f}from"./utils-Bnph8n13.js";import{o as v}from"./style-map-C_BEBmZn.js";import{e as _}from"./class-map-VyyRAxMT.js";import{s as y}from"./decorators-B1lzNiGh.js";import"./feature-detection-uS6p5jc8.js";import"./scaffold-CGyusmPL.js";const q=".scaffold-example{--forge-scaffold-height: 500px;--forge-scaffold-width: 100%}.scaffold-example div[slot],.forge-scaffold>div[class^=forge-scaffold__]{border:2px dashed var(--forge-theme-outline-low);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:var(--forge-spacing-xsmall);margin:var(--forge-spacing-xsmall);box-sizing:border-box}",t="forge-scaffold",h={title:"Components/Scaffold",render:e=>{const a=f(e),o=a?v(a):m;return n`
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
    `},component:t,parameters:{actions:{disable:!0}},decorators:[y(q)],argTypes:{...b({tagName:t})},args:{viewport:!1}},i={},s={render:({viewport:e,...a})=>{const o=f(a),g=o?v(o):m;return n`
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
    `}};var d,r,c;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(c=(r=i.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};var l,u,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const S=["Demo","CSSOnly"],V=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:i,__namedExportsOrder:S,default:h},Symbol.toStringTag,{value:"Module"}));export{s as C,i as D,V as S};
