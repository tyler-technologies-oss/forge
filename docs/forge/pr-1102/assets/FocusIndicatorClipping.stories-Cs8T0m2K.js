import{b as e}from"./iframe-HlIX8nsI.js";import"./service-adapter-CoGDs2_3.js";import"./card-C7PNSpyL.js";import"./scaffold-WBY1Y1UI.js";import"./button-C32nRzKT.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";import"./text-field-DXuIdBiY.js";import"./base-field-BqEaAztZ.js";import"./label-YoDu1hYe.js";import"./index-DTwfV0k0.js";import"./button-toggle-group-C7Z2oquR.js";import"./checkbox-IEt9rg4t.js";import"./icon-button-kXhWo8t5.js";import"./tyler-icons-B1nAV5VC.js";import"./switch-D4m-nLTp.js";import{s as n}from"./decorators-D7VHZGxl.js";import"./preload-helper-PPVm8Dsz.js";import"./base-lit-element-_81_THYZ.js";import"./directive-jorct-Oe.js";import"./utils-DU-9AqTO.js";import"./base-component-VHVExFFl.js";import"./dom-utils-DrFTp_YE.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./base-adapter-Bv1ZGQ1S.js";import"./base-button-core-P_-z6ImB.js";import"./with-label-aware-DpjVJhjv.js";import"./with-default-aria-DhENBwsq.js";import"./a11y-utils-BAVI_s0s.js";import"./tooltip-CfnSp6nA.js";import"./overlay-CKBuRB0A.js";import"./with-longpress-listener-v9rKrqen.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-form-associated-5ixz8BLc.js";import"./_commonjsHelpers-CqkleIqs.js";const J={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
}`,...t.parameters?.docs?.source}}};const K=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,K as __namedExportsOrder,J as default};
