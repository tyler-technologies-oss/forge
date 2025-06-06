import"./lit-element-BuSzPo2N.js";import{x as e}from"./lit-html-Ox1a2bD1.js";import"./feature-detection-CY6TVbRZ.js";import"./card-Cvm6cje1.js";import"./scaffold-BjMvQLbF.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import"./text-field-CGeuarYD.js";import"./base-field-DFQttNW4.js";import"./label-BM0pESju.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-BkG6pY8m.js";import"./icon-Bqgt-0wI.js";import"./switch-ZI6WyDhE.js";import{s as n}from"./decorators-CiKOYuay.js";import"./base-lit-element-D99bbIxp.js";import"./utils-CRxrUqQD.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./base-button-adapter-W6Bt-QcJ.js";import"./with-label-aware-DkCFYjRm.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./tooltip-BRjtM3KC.js";import"./overlay-D__9laOM.js";import"./with-longpress-listener-BDlFima-.js";import"./dismissible-stack-BdWcv7_4.js";import"./with-form-associated-9Gj0jfo_.js";import"./_commonjsHelpers-CqkleIqs.js";const T={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
