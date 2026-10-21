import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{S as r,p as i}from"./iframe-Cygt-aqC.js";import{_ as a,m as o}from"./utils-C3ow8Ikc.js";import{n as s,t as ee}from"./decorators-CIf0wI47.js";import{C as te,S as ne,t as c,x as re}from"./dist-CPhmYI86.js";import{a as ie,p as l,r as ae}from"./async-directive-Q8FnHJMz.js";import{n as u,o as d,s as oe,t as se}from"./base-lit-element-DnyK-zrQ.js";import{t as ce}from"./class-map-DEew1OiS.js";import{t as le}from"./class-map-8zp5OV2u.js";import{s as ue,x as de}from"./utils-B2Tk8obI.js";import{o as fe,t as pe}from"./icon-D3E8ATav.js";import{A as me,B as he,Ht as f,N as p,Nt as m,P as h,Ut as g,Yt as _,t as v,u as y}from"./tyler-icons-CLXzO0Q_.js";import{p as b}from"./constants-jVWZdget.js";import{t as x}from"./decorate-2OK4V6AF.js";import{t as S}from"./icon-button-DiFzjO_-.js";import{n as C}from"./badge-TGECGPHy.js";import{t as w}from"./menu-CVB_jpKj.js";import{t as T}from"./button-BP1asP2i.js";import{t as E}from"./text-field-BOfJMjtJ.js";import{n as D,r as O,t as k}from"./card-CGPUt1wb.js";import{t as A}from"./file-picker-LAY79qhC.js";import{t as ge}from"./paginator-CZMB2NhC.js";import{t as j}from"./select-B0MQfp-w.js";import{t as M}from"./stack-DASCk9xk.js";import{t as N}from"./table-Dl4B8fxl.js";import{n as P,r as F,t as I}from"./content-scaffold-D_KFArvp.js";var L;function R(){return(R=e((()=>{L=`:host{--_structured-card-body-height:var(--forge-structured-card-body-height,auto);display:block}:host(:state(body-spacing-none)) forge-content-scaffold{--forge-content-scaffold-body-padding-inline:0;--forge-content-scaffold-footer-full-padding:var(--forge-spacing-small,12px) var(--forge-spacing-medium,16px);--forge-content-scaffold-body-padding-block:0}:host(:state(body-spacing-none)) .footer-container{padding-block-end:0}.header-container{grid-template-columns:auto 1fr auto;grid-template-areas:"start.actions";align-items:center;min-height:48px;display:grid}forge-content-scaffold{--forge-content-scaffold-body-height:var(--_structured-card-body-height)}.container{--forge-card-padding:0;--forge-card-gap:0;height:100%}.title-container{grid-area:start;align-items:center;gap:0;display:flex}.title-with-margin{margin-inline-start:var(--forge-spacing-medium,16px)}::slotted([slot=title]){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading3-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-heading3-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading3-font-size-scale,1.125)));font-weight:var(--forge-typography-heading3-font-weight,500);line-height:var(--forge-typography-heading3-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading3-line-height-scale,1.375)));letter-spacing:var(--forge-typography-heading3-letter-spacing,.00833333em);text-transform:var(--forge-typography-heading3-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-heading3-text-decoration,inherit);text-decoration:var(--forge-typography-heading3-text-decoration,inherit)}.actions-container{grid-area:actions;align-items:center;gap:0;display:flex}::slotted([slot=header-actions]){margin-inline-end:var(--forge-spacing-medium,16px)}::slotted([slot=body]){height:var(--_structured-card-body-height)}.footer-container{justify-content:space-between;align-items:center;column-gap:var(--forge-spacing-medium,16px);flex-wrap:wrap;display:flex}.footer-start-container{flex:1;flex-basis:content;justify-content:flex-end}.footer-actions{align-items:center;gap:var(--forge-spacing-medium,16px);display:flex}`})))()}var z,B;function V(){return(V=e((()=>{i(),ae(),le(),c(),u(),oe(),ue(),k(),I(),O(),F(),R(),z=`forge-structured-card`,B=class extends se{static{this[te]=z}static{this[ne]=[D,P]}static{this.styles=r(L)}#e;constructor(){super(),this.headingLevel=2,this.bodySpacing=`default`,this.#e=this.attachInternals()}willUpdate(e){e.has(`bodySpacing`)&&de(this.#e,`body-spacing-none`,this.bodySpacing===`none`)}render(){return n`
      <forge-card class="container">
        <forge-content-scaffold>
          <div slot="header" class="header-container" ${d()}>
            <div class="title-container">
              <slot name="before-title" @slotchange=${this.#t}></slot>
              <div
                role="heading"
                aria-level=${this.headingLevel}
                id="title"
                class=${ce({"title-with-margin":this._beforeTitleNodes.length===0})}>
                <slot name="title"></slot>
              </div>
            </div>
            <div class="actions-container" ${d()}>
              <slot name="header-actions"></slot>
              <slot name="after-header-actions"></slot>
            </div>
          </div>
          <slot name="body" slot="body"></slot>
          <div class="footer-container" slot="footer" ${d()}>
            <div class="footer-start-container">
              <slot name="footer-start"></slot>
            </div>
            <div class="footer-actions" ${d()}>
              <slot name="footer-secondary-action"></slot>
              <slot name="footer-primary-action"></slot>
            </div>
          </div>
        </forge-content-scaffold>
      </forge-card>
    `}#t(){this.requestUpdate()}},x([l({attribute:`heading-level`,type:Number})],B.prototype,`headingLevel`,void 0),x([l({attribute:`body-spacing`})],B.prototype,`bodySpacing`,void 0),x([ie({slot:`before-title`,flatten:!0})],B.prototype,`_beforeTitleNodes`,void 0),re(z,B)})))()}function H(){return(H=e((()=>{b()})))()}function U(){return(U=e((()=>{c(),V(),H()})))()}var _e=t({Demo:()=>K,HeaderIconButton:()=>J,ScrollableBodyContent:()=>Z,WithBeforeTitleSlot:()=>Y,WithForm:()=>q,WithTable:()=>X,__namedExportsOrder:()=>Q,default:()=>G}),W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),pe(),v(),ee(),o(),U(),T(),S(),w(),M(),E(),j(),A(),C(),N(),ge(),{action:W}=__STORYBOOK_MODULE_ACTIONS__,fe.define([y,me,p,h,he,m,f,g,_]),G={title:`Components/Structured Card`,component:`forge-structured-card`,render:()=>n`
    <forge-structured-card id="storybook-demo">
      <span slot="before-title" class="forge-typography--label1">before-title</span>
      <span slot="title" class="forge-typography--label1">title</span>
      <span slot="header-actions" class="forge-typography--label1">header-actions</span>
      <span slot="after-header-actions" class="forge-typography--label1">after-header-actions</span>
      <span slot="body" class="forge-typography--label1" style="height: 300px;">body</span>
      <span slot="footer-start" class="forge-typography--label1">footer-start</span>
      <span slot="footer-secondary-action" class="forge-typography--label1">footer-secondary-action</span>
      <span slot="footer-primary-action" class="forge-typography--label1">footer-primary-action</span>
    </forge-structured-card>
  `},K={decorators:[s(`
      forge-structured-card[id='storybook-demo'] [slot] {
        display: block;
        height: 100%;
        padding: var(--forge-spacing-xxsmall);
        border: 2px dashed;
        border-radius: 4px;
      }

      forge-structured-card[id='storybook-demo'] [slot='header-actions'],
      forge-structured-card[id='storybook-demo'] [slot='after-header-actions'],
      forge-structured-card[id='storybook-demo'] [slot='before-title'],
      forge-structured-card[id='storybook-demo'] [slot='title'] {
        background: var(--forge-theme-primary-container-low);
        border-color: var(--forge-theme-primary);
      }

      forge-structured-card[id='storybook-demo'] [slot='body'] {
        display: grid;
        place-content: center;
        background: var(--forge-theme-success-container-low);
        border-color: var(--forge-theme-success);
      }

      forge-structured-card[id='storybook-demo'] [slot='footer-start'],
      forge-structured-card[id='storybook-demo'] [slot='footer-secondary-action'],
      forge-structured-card[id='storybook-demo'] [slot='footer-primary-action'] {
        background: var(--forge-theme-tertiary-container-low);
        border-color: var(--forge-theme-tertiary);
      }
    `)]},q={...a,decorators:[s(`
      .actions-card-container {
        max-width: 600px;
      }
    `)],render:()=>n`
    <div class="actions-card-container">
      <forge-structured-card heading-level="2">
        <div slot="title">Project Details</div>

        <forge-badge theme="warning" slot="header-actions">
          <span>In progress</span>
          <forge-icon name="construction" slot="end"></forge-icon>
        </forge-badge>
        <form slot="body">
          <forge-stack>
            <forge-text-field label-position="block-start">
              <label>Project name</label>
              <input type="text" />
            </forge-text-field>
            <forge-text-field label-position="block-start">
              <label>Description</label>
              <textarea></textarea>
            </forge-text-field>
            <forge-select label="Category" label-position="block-start">
              <forge-option value="development">Development</forge-option>
              <forge-option value="design">Design</forge-option>
              <forge-option value="marketing">Marketing</forge-option>
              <forge-option value="research">Research</forge-option>
            </forge-select>
            <forge-text-field label-position="block-start">
              <label>Owner</label>
              <input type="text" />
            </forge-text-field>
            <forge-file-picker accept=".jpg,.png,.pdf">
              <forge-button variant="outlined">Attach files</forge-button>
            </forge-file-picker>
          </forge-stack>
        </form>
        <forge-button variant="text" slot="footer-secondary-action">
          <forge-icon slot="start" name="delete"></forge-icon>
          Cancel
        </forge-button>
        <forge-button variant="tonal" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  `},J={...a,decorators:[s(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>{let e=W(`forge-menu-select`);return n`
      <div class="actions-card-container">
        <forge-structured-card heading-level="2">
          <div slot="title">Project Details</div>
          <forge-menu slot="after-header-actions" .options=${[{label:`Edit`,value:`edit`,leadingIcon:`edit`,leadingIconType:`component`},{label:`Share`,value:`share`,leadingIcon:`share`,leadingIconType:`component`},{label:`Download`,value:`download`,leadingIcon:`download`,leadingIconType:`component`},{label:`Delete`,value:`delete`,leadingIcon:`delete`,leadingIconType:`component`}]} @forge-menu-select=${e}>
            <forge-icon-button aria-label="More actions">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </forge-menu>

          <div slot="body" class="card-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          <forge-button variant="text" slot="footer-secondary-action">
            <forge-icon slot="start" name="delete"></forge-icon>
            Cancel
          </forge-button>
          <forge-button variant="filled" slot="footer-primary-action">
            <forge-icon slot="start" name="save"></forge-icon>
            Save
          </forge-button>
        </forge-structured-card>
      </div>
    `}},Y={...a,decorators:[s(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>n`
    <div class="actions-card-container">
      <forge-structured-card heading-level="2">
        <forge-icon-button aria-label="Back" slot="before-title">
          <forge-icon name="arrow_back"></forge-icon>
        </forge-icon-button>
        <span slot="title">Project Details</span>
        <div slot="body" class="card-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <forge-button variant="text" slot="footer-secondary-action">
          <forge-icon slot="start" name="delete"></forge-icon>
          Cancel
        </forge-button>
        <forge-button variant="filled" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  `},X={...a,render:()=>n`
      <forge-structured-card heading-level="2" body-spacing="none">
        <div slot="title">User Management</div>
        <forge-icon-button aria-label="Refresh data" slot="after-header-actions">
          <forge-icon name="refresh"></forge-icon>
        </forge-icon-button>
        <forge-icon-button aria-label="Download report" slot="after-header-actions">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-table slot="body" .data=${[{id:1,name:`John Doe`,email:`john.doe@example.com`,role:`Admin`},{id:2,name:`Jane Smith`,email:`jane.smith@example.com`,role:`User`},{id:3,name:`Bob Johnson`,email:`bob.johnson@example.com`,role:`User`},{id:4,name:`Alice Williams`,email:`alice.williams@example.com`,role:`Manager`},{id:5,name:`Charlie Brown`,email:`charlie.brown@example.com`,role:`User`}]} .columnConfigurations=${[{property:`name`,header:`Name`},{property:`email`,header:`Email`},{property:`role`,header:`Role`}]}></forge-table>
        <forge-paginator slot="footer-primary-action" page-size="5" total="25" page-index="0"></forge-paginator>
      </forge-structured-card>
    `},Z={...a,decorators:[s(`
      * {
        box-sizing: border-box;
      }

      .card-container {
        max-width: 360px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>n`
    <div class="card-container">
      <forge-structured-card style="--forge-structured-card-body-height: 200px;">
        <span slot="title">Project Details</span>
        <forge-icon-button aria-label="More actions" slot="after-header-actions">
          <forge-icon name="more_vert"></forge-icon>
        </forge-icon-button>
        <div slot="body">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <forge-button variant="filled" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  `},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-structured-card[id='storybook-demo'] [slot] {
        display: block;
        height: 100%;
        padding: var(--forge-spacing-xxsmall);
        border: 2px dashed;
        border-radius: 4px;
      }

      forge-structured-card[id='storybook-demo'] [slot='header-actions'],
      forge-structured-card[id='storybook-demo'] [slot='after-header-actions'],
      forge-structured-card[id='storybook-demo'] [slot='before-title'],
      forge-structured-card[id='storybook-demo'] [slot='title'] {
        background: var(--forge-theme-primary-container-low);
        border-color: var(--forge-theme-primary);
      }

      forge-structured-card[id='storybook-demo'] [slot='body'] {
        display: grid;
        place-content: center;
        background: var(--forge-theme-success-container-low);
        border-color: var(--forge-theme-success);
      }

      forge-structured-card[id='storybook-demo'] [slot='footer-start'],
      forge-structured-card[id='storybook-demo'] [slot='footer-secondary-action'],
      forge-structured-card[id='storybook-demo'] [slot='footer-primary-action'] {
        background: var(--forge-theme-tertiary-container-low);
        border-color: var(--forge-theme-tertiary);
      }
    \`)]
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
      .actions-card-container {
        max-width: 600px;
      }
    \`)],
  render: () => html\`
    <div class="actions-card-container">
      <forge-structured-card heading-level="2">
        <div slot="title">Project Details</div>

        <forge-badge theme="warning" slot="header-actions">
          <span>In progress</span>
          <forge-icon name="construction" slot="end"></forge-icon>
        </forge-badge>
        <form slot="body">
          <forge-stack>
            <forge-text-field label-position="block-start">
              <label>Project name</label>
              <input type="text" />
            </forge-text-field>
            <forge-text-field label-position="block-start">
              <label>Description</label>
              <textarea></textarea>
            </forge-text-field>
            <forge-select label="Category" label-position="block-start">
              <forge-option value="development">Development</forge-option>
              <forge-option value="design">Design</forge-option>
              <forge-option value="marketing">Marketing</forge-option>
              <forge-option value="research">Research</forge-option>
            </forge-select>
            <forge-text-field label-position="block-start">
              <label>Owner</label>
              <input type="text" />
            </forge-text-field>
            <forge-file-picker accept=".jpg,.png,.pdf">
              <forge-button variant="outlined">Attach files</forge-button>
            </forge-file-picker>
          </forge-stack>
        </form>
        <forge-button variant="text" slot="footer-secondary-action">
          <forge-icon slot="start" name="delete"></forge-icon>
          Cancel
        </forge-button>
        <forge-button variant="tonal" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  \`
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    \`)],
  render: () => {
    const handleMenuSelect = action('forge-menu-select');
    const menuOptions: IMenuOption[] = [{
      label: 'Edit',
      value: 'edit',
      leadingIcon: 'edit',
      leadingIconType: 'component'
    }, {
      label: 'Share',
      value: 'share',
      leadingIcon: 'share',
      leadingIconType: 'component'
    }, {
      label: 'Download',
      value: 'download',
      leadingIcon: 'download',
      leadingIconType: 'component'
    }, {
      label: 'Delete',
      value: 'delete',
      leadingIcon: 'delete',
      leadingIconType: 'component'
    }];
    return html\`
      <div class="actions-card-container">
        <forge-structured-card heading-level="2">
          <div slot="title">Project Details</div>
          <forge-menu slot="after-header-actions" .options=\${menuOptions} @forge-menu-select=\${handleMenuSelect}>
            <forge-icon-button aria-label="More actions">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </forge-menu>

          <div slot="body" class="card-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          <forge-button variant="text" slot="footer-secondary-action">
            <forge-icon slot="start" name="delete"></forge-icon>
            Cancel
          </forge-button>
          <forge-button variant="filled" slot="footer-primary-action">
            <forge-icon slot="start" name="save"></forge-icon>
            Save
          </forge-button>
        </forge-structured-card>
      </div>
    \`;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    \`)],
  render: () => html\`
    <div class="actions-card-container">
      <forge-structured-card heading-level="2">
        <forge-icon-button aria-label="Back" slot="before-title">
          <forge-icon name="arrow_back"></forge-icon>
        </forge-icon-button>
        <span slot="title">Project Details</span>
        <div slot="body" class="card-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <forge-button variant="text" slot="footer-secondary-action">
          <forge-icon slot="start" name="delete"></forge-icon>
          Cancel
        </forge-button>
        <forge-button variant="filled" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  \`
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const tableData = [{
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin'
    }, {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User'
    }, {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'User'
    }, {
      id: 4,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      role: 'Manager'
    }, {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'User'
    }];
    const columnConfigurations = [{
      property: 'name',
      header: 'Name'
    }, {
      property: 'email',
      header: 'Email'
    }, {
      property: 'role',
      header: 'Role'
    }];
    return html\`
      <forge-structured-card heading-level="2" body-spacing="none">
        <div slot="title">User Management</div>
        <forge-icon-button aria-label="Refresh data" slot="after-header-actions">
          <forge-icon name="refresh"></forge-icon>
        </forge-icon-button>
        <forge-icon-button aria-label="Download report" slot="after-header-actions">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-table slot="body" .data=\${tableData} .columnConfigurations=\${columnConfigurations}></forge-table>
        <forge-paginator slot="footer-primary-action" page-size="5" total="25" page-index="0"></forge-paginator>
      </forge-structured-card>
    \`;
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
      * {
        box-sizing: border-box;
      }

      .card-container {
        max-width: 360px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    \`)],
  render: () => html\`
    <div class="card-container">
      <forge-structured-card style="--forge-structured-card-body-height: 200px;">
        <span slot="title">Project Details</span>
        <forge-icon-button aria-label="More actions" slot="after-header-actions">
          <forge-icon name="more_vert"></forge-icon>
        </forge-icon-button>
        <div slot="body">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <forge-button variant="filled" slot="footer-primary-action">
          <forge-icon slot="start" name="save"></forge-icon>
          Save
        </forge-button>
      </forge-structured-card>
    </div>
  \`
}`,...Z.parameters?.docs?.source}}},Q=[`Demo`,`WithForm`,`HeaderIconButton`,`WithBeforeTitleSlot`,`WithTable`,`ScrollableBodyContent`]})))()}export{Y as a,$ as c,_e as i,J as n,q as o,Z as r,X as s,K as t};