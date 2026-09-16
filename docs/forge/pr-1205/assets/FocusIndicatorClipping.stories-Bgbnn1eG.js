import{b as e}from"./iframe-Ce60v_-f.js";import"./service-adapter-8tADcN_b.js";import"./card-M5cMUYXh.js";import"./scaffold-DgAVuyRY.js";import"./button-CRDfQpBx.js";import"./focus-indicator-Bp7--dbz.js";import"./state-layer-B1dog9AJ.js";import"./text-field-BheLYwpD.js";import"./base-field-CfQJ5Dx6.js";import"./label-BAtycYFU.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import{s as n}from"./decorators-FICfwD4n.js";import"./preload-helper-PPVm8Dsz.js";import"./base-lit-element-Brymr2Xb.js";import"./directive-CwRn8Fwj.js";import"./utils-DU-9AqTO.js";import"./base-component-BoZ3BOE8.js";import"./utils-C1mY2kke.js";import"./constants-C0GaoY7q.js";import"./feature-detection-DY5_mT0R.js";import"./base-adapter-CKKMXnbe.js";import"./dom-utils-QqrulHvL.js";import"./tyler-icons-QQy6qJP1.js";import"./base-button-core-BYoPIJvz.js";import"./with-label-aware-DJh6XnsV.js";import"./with-default-aria-BAmqN2O9.js";import"./a11y-utils-BgIwxT0N.js";import"./button-constants-ArVUKZNu.js";import"./icon-button-s40OUgVh.js";import"./icon-button-constants-BSMIhnB8.js";import"./tooltip-Bb9XI6kj.js";import"./overlay-BNDDgKF7.js";import"./with-longpress-listener-BgqEFSVx.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-toggle-group-constants-A7cCH4X9.js";import"./checkbox-constants-Cl8zWkZ4.js";import"./switch-constants-BA2CMaHg.js";import"./_commonjsHelpers-CqkleIqs.js";const P={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
  `};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    \`)],
  render: () => html\`
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
  \`
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    \`)],
  render: () => html\`
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
  \`
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
  render: () => html\`
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
  \`
}`,...t.parameters?.docs?.source}}};const R=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,R as __namedExportsOrder,P as default};
