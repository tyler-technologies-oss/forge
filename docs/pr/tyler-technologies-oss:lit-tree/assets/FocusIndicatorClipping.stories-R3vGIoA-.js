import"./lit-element-JplMEnZc.js";import{x as e}from"./lit-html-paDGiEfB.js";import"./feature-detection-DRCh51Sa.js";import"./card-C10NOeAn.js";import"./scaffold-D66s8WNO.js";import"./button-BRfTMEeh.js";import"./focus-indicator-CFAnWQXZ.js";import"./index-BgGCUUFB.js";import"./state-layer-DCupnvce.js";import"./text-field-AvpciTks.js";import"./base-field-CiyMRbdM.js";import"./label-DRSqqPa2.js";import"./button-toggle-group-Dvk8YwvA.js";import"./checkbox-qSS9ySuf.js";import"./icon-button-nddYOp-w.js";import"./icon-B5R9pr_c.js";import"./switch-BhcBCb-7.js";import{s as n}from"./decorators-DOnQS6BC.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./base-button-adapter-BFQz2IKA.js";import"./index-CbZAylpk.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./utils-CYJ0zQHl.js";import"./tooltip-BhK_7K0r.js";import"./overlay-DyVP2d0e.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-kdhTFvbL.js";import"./with-form-associated-Bje5Hee1.js";import"./_commonjsHelpers-Cpj98o6Y.js";const T={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    `)],render:()=>e`
      <forge-card>
        <forge-scaffold>
          <div slot="body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    `},r={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)],render:()=>e`
      <forge-card class="my-card">
        <forge-scaffold>
          <div slot="body" class="my-scaffold-body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    `},t={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-card {
        --forge-card-padding: 0;
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)],render:()=>e`
      <forge-card class="my-card">
        <forge-scaffold>
          <div slot="body" class="my-scaffold-body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    `};var d,a,i;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    \`)],
  render: () => {
    return html\`
      <forge-card>
        <forge-scaffold>
          <div slot="body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    \`;
  }
}`,...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var f,l,s;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    \`)],
  render: () => {
    return html\`
      <forge-card class="my-card">
        <forge-scaffold>
          <div slot="body" class="my-scaffold-body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    \`;
  }
}`,...(s=(l=r.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};var p,m,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-card {
        --forge-card-padding: 0;
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    \`)],
  render: () => {
    return html\`
      <forge-card class="my-card">
        <forge-scaffold>
          <div slot="body" class="my-scaffold-body">
            <forge-text-field>
              <label for="my-input">My Input</label>
              <input id="my-input" type="text" />
            </forge-text-field>
            <forge-button>My Button</forge-button>
          </div>
        </forge-scaffold>
      </forge-card>
    \`;
  }
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const U=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,U as __namedExportsOrder,T as default};
