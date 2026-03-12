import{b as e}from"./iframe-E0MPjD_W.js";import"./service-adapter-8tADcN_b.js";import"./card-kkctYUou.js";import"./scaffold-DpCXKOUM.js";import"./button-BZE1KUUl.js";import"./focus-indicator-DAaQEzxM.js";import"./state-layer-D0SSeJ16.js";import"./text-field-BiRJUbiq.js";import"./base-field-OixKx3fo.js";import"./label-6rc0QyL9.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-toggle-group-DKUgvTLL.js";import"./checkbox-GJD21Guw.js";import"./icon-button-Bc6oVsA8.js";import"./tyler-icons-hEV9SdRe.js";import"./switch-ByEDesx_.js";import{s as n}from"./decorators-DNWbgOCU.js";import"./preload-helper-PPVm8Dsz.js";import"./base-lit-element-CWFcJNg5.js";import"./directive-jorct-Oe.js";import"./utils-DU-9AqTO.js";import"./base-component-CO2WY6zR.js";import"./dom-utils-DwwuHIHk.js";import"./utils-BAu2K3HG.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./base-adapter-D5-g7qkF.js";import"./base-button-core-C3U0EfST.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-DAVgwKPN.js";import"./a11y-utils-DMBxzGbw.js";import"./tooltip-P-CrpSEv.js";import"./overlay-Cgb5IAlb.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-form-associated-CEg80Bzz.js";import"./_commonjsHelpers-CqkleIqs.js";const L={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
}`,...t.parameters?.docs?.source}}};const P=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,P as __namedExportsOrder,L as default};
