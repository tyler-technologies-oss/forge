import{b as e}from"./iframe-BTsZxqzu.js";import"./service-adapter-DlT-lJx7.js";import"./card-Qhb2yYy0.js";import"./scaffold-D8DtzjhO.js";import"./button-ClyH3Yl3.js";import"./text-field-Ch1FWqHZ.js";import"./base-field-CobvQUzz.js";import"./focus-indicator-BxamY3-n.js";import"./label-OjWKjQls.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import{s as n}from"./decorators-D8XWS9tu.js";import"./preload-helper-PPVm8Dsz.js";import"./property-DkOodoSL.js";import"./utils-DxVSXevv.js";import"./base-lit-element-fjOVRZ-k.js";import"./directive-CwRn8Fwj.js";import"./base-component-DokdPcmx.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./class-map-B2uIhfTt.js";import"./tyler-icons-DhRbvloE.js";import"./state-layer-UyeTOOS1.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./base-button-DyFlNd1j.js";import"./state-BuOq48og.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./button-constants-Dh8wxsDb.js";import"./icon-button-CSxHjIC-.js";import"./icon-button-constants-wbi3a2tN.js";import"./tooltip-DAcILSGy.js";import"./overlay-knVFCZgv.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-Cj5gwv2p.js";import"./with-element-internals-BVdcaC_W.js";import"./with-label-aware-BdoJiGXC.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./switch-constants-CzmANmsv.js";import"./_commonjsHelpers-CqkleIqs.js";const V={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
}`,...t.parameters?.docs?.source}}};const W=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,W as __namedExportsOrder,V as default};
