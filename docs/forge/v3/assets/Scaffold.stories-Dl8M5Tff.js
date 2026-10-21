import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{l as a,m as o,s}from"./utils-C3ow8Ikc.js";import{n as c,t as l}from"./decorators-B2qNZTl0.js";import{t as u}from"./class-map-DEew1OiS.js";import{t as d}from"./class-map-8zp5OV2u.js";import{r as f,t as p}from"./style-map-C_WKUe4Y.js";import{t as m}from"./scaffold-NUY7AQ8t.js";var h;function g(){return(g=e((()=>{h=`.scaffold-example{--forge-scaffold-height:500px;--forge-scaffold-width:100%}.scaffold-example div[slot],.forge-scaffold>div[class^=forge-scaffold__]{border:2px dashed var(--forge-theme-outline-low);padding:var(--forge-spacing-xsmall);margin:var(--forge-spacing-xsmall);box-sizing:border-box;flex-direction:column;justify-content:center;align-items:center;display:flex}`})))()}var _=t({CSSOnly:()=>x,Demo:()=>b,__namedExportsOrder:()=>S,default:()=>y}),v,y,b,x,S;function C(){return(C=e((()=>{i(),o(),p(),d(),l(),m(),g(),v=`forge-scaffold`,y={title:`Components/Scaffold`,render:e=>{let t=a(e),i=t?f(t):r;return n`
      <forge-scaffold class="scaffold-example" style=${i} .viewport=${e.viewport}>
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
    `},component:v,parameters:{actions:{disable:!0}},decorators:[c(h)],argTypes:{...s({tagName:v})},args:{viewport:!1}},b={},x={render:({viewport:e,...t})=>{let i=a(t),o=i?f(i):r;return n`
      <div class=${u({"scaffold-example":!0,"forge-scaffold":!0,"forge-button--viewport":e})} style=${o}>
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
    `}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S=[`Demo`,`CSSOnly`]})))()}export{C as i,b as n,_ as r,x as t};