import"./lit-element-JplMEnZc.js";import{x as t}from"./lit-html-paDGiEfB.js";import"./feature-detection-DRCh51Sa.js";import"./card-C10NOeAn.js";import"./scaffold-D66s8WNO.js";import"./button-DaDzbT7D.js";import"./focus-indicator-DzT8BbE-.js";import"./index-BmocOEUj.js";import"./state-layer-IxmMcKDT.js";import"./text-field-JRlbvyCs.js";import"./base-field-BRvJFKQ_.js";import"./label-BV_ZyirU.js";import"./button-toggle-group-BMa49BMk.js";import"./checkbox-DKABHoWa.js";import"./icon-button-Cj-mvUQ9.js";import"./icon-DB7kP3Ec.js";import"./switch-BXC-NkYO.js";import{s as n}from"./decorators-DOnQS6BC.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./base-button-adapter-CyoupZ7K.js";import"./index-ByifSpfC.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./tooltip-BEr6TQlq.js";import"./overlay-es9tef1H.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-C80072oY.js";import"./with-form-associated-Bje5Hee1.js";import"./_commonjsHelpers-Cpj98o6Y.js";const R={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    `)],render:()=>t`
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
    `)],render:()=>t`
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
    `},e={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-card {
        --forge-card-padding: 0;
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)],render:()=>t`
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
}`,...(s=(l=r.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};var p,c,m;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const T=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,e as NoClippingFixExample,T as __namedExportsOrder,R as default};
