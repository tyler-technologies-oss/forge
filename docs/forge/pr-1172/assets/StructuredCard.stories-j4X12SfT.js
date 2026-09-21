var S=e=>{throw TypeError(e)};var x=(e,o,t)=>o.has(e)||S("Cannot "+t);var D=(e,o,t)=>(x(e,o,"read from private field"),t?t.call(e):o.get(e)),k=(e,o,t)=>o.has(e)?S("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,t),_=(e,o,t,b)=>(x(e,o,"write to private field"),b?b.call(e,t):o.set(e,t),t),L=(e,o,t)=>(x(e,o,"access private method"),t);import{r as O,b as r}from"./iframe-DQLkTsj5.js";import{t as R,C as $,a as A}from"./service-adapter-DlT-lJx7.js";import{I as B,$ as U,a0 as N,V as z,W,a1 as J,O as H,a2 as Y,a3 as F,a4 as V}from"./tyler-icons-DPuUJ4cJ.js";import{s as m}from"./decorators-OLNLdARR.js";import{s as u}from"./utils-RooUwGan.js";import{n as T}from"./property-CTzj-79N.js";import{n as q}from"./query-assigned-nodes-D8SsSM9e.js";import{e as G}from"./class-map-EigTEi9S.js";import{h as y,B as K}from"./base-lit-element-D917_3Iy.js";import{t as Q}from"./utils-DU-9AqTO.js";import{C as X}from"./card-C3gFyNEB.js";import{C as Z}from"./content-scaffold-DrSDkcAf.js";import"./button-DT_Na7FY.js";import"./icon-button-CMY5cmct.js";import"./menu-Cx7fFLhB.js";import"./linear-progress-VpC6qUWa.js";import"./list-nmWb3pVb.js";import"./popover-TR9PPKD2.js";import"./overlay-DGZ2XdhX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CwILcSG1.js";import"./list-item-DEpPizi1.js";import"./stack-E4V9OTtJ.js";import"./text-field-L_Zp44sz.js";import"./base-field-SrDjUvEH.js";import"./focus-indicator-BzR77xDT.js";import"./label-CR5s3CYN.js";import"./select-dropdown-DsNzj9e7.js";import"./select-B0NkVT0c.js";import"./file-picker-kQziegkh.js";import"./badge-B-qmCmuX.js";import"./table-DzZfPIf7.js";import"./checkbox-BzNarstH.js";import"./expansion-panel-zjQkefOT.js";import"./open-icon-DJjxABQQ.js";import"./paginator-CTj70Paf.js";const ee=':host{display:block;--_structured-card-body-height: var(--forge-structured-card-body-height, auto)}:host(:state(body-spacing-none)) forge-content-scaffold{--forge-content-scaffold-body-padding-inline: 0;--forge-content-scaffold-footer-full-padding: var(--forge-spacing-small, 12px) var(--forge-spacing-medium, 16px);--forge-content-scaffold-body-padding-block: 0}:host(:state(body-spacing-none)) .footer-container{padding-block-end:0}.header-container{display:grid;grid-template-columns:auto 1fr auto;align-items:center;grid-template-areas:"start . actions";min-height:48px}forge-content-scaffold{--forge-content-scaffold-body-height: var(--_structured-card-body-height)}.container{--forge-card-padding: 0;--forge-card-gap: 0;height:100%}.title-container{display:flex;align-items:center;gap:0;grid-area:start}.title-with-margin{margin-inline-start:var(--forge-spacing-medium, 16px)}::slotted([slot=title]){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading3-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading3-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-font-size-scale, 1.125)));font-weight:var(--forge-typography-heading3-font-weight, 500);line-height:var(--forge-typography-heading3-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-heading3-letter-spacing, .0083333333em);text-transform:var(--forge-typography-heading3-text-transform, inherit);text-decoration:var(--forge-typography-heading3-text-decoration, inherit)}.actions-container{display:flex;align-items:center;gap:0;grid-area:actions}::slotted([slot=header-actions]){margin-inline-end:var(--forge-spacing-medium, 16px)}::slotted([slot=body]){height:var(--_structured-card-body-height)}.footer-container{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;column-gap:var(--forge-spacing-medium, 16px)}.footer-start-container{flex:1;flex-basis:content;justify-content:flex-end}.footer-actions{display:flex;align-items:center;gap:var(--forge-spacing-medium, 16px)}';var oe=Object.defineProperty,w=(e,o,t,b)=>{for(var n=void 0,v=e.length-1,I;v>=0;v--)(I=e[v])&&(n=I(o,t,n)||n);return n&&oe(o,t,n),n},C,P,M;const E="forge-structured-card";var f,h,j;const p=class p extends(M=K,P=$,C=A,M){constructor(){super();k(this,h);k(this,f);this.headingLevel=2,this.bodySpacing="default",_(this,f,this.attachInternals())}willUpdate(t){t.has("bodySpacing")&&Q(D(this,f),"body-spacing-none",this.bodySpacing==="none")}render(){return r`
      <forge-card class="container">
        <forge-content-scaffold>
          <div slot="header" class="header-container" ${y()}>
            <div class="title-container">
              <slot name="before-title" @slotchange=${L(this,h,j)}></slot>
              <div
                role="heading"
                aria-level=${this.headingLevel}
                id="title"
                class=${G({"title-with-margin":this._beforeTitleNodes.length===0})}>
                <slot name="title"></slot>
              </div>
            </div>
            <div class="actions-container" ${y()}>
              <slot name="header-actions"></slot>
              <slot name="after-header-actions"></slot>
            </div>
          </div>
          <slot name="body" slot="body"></slot>
          <div class="footer-container" slot="footer" ${y()}>
            <div class="footer-start-container">
              <slot name="footer-start"></slot>
            </div>
            <div class="footer-actions" ${y()}>
              <slot name="footer-secondary-action"></slot>
              <slot name="footer-primary-action"></slot>
            </div>
          </div>
        </forge-content-scaffold>
      </forge-card>
    `}};f=new WeakMap,h=new WeakSet,j=function(){this.requestUpdate()},p[P]=E,p[C]=[X,Z],p.styles=O(ee);let a=p;w([T({attribute:"heading-level",type:Number})],a.prototype,"headingLevel");w([T({attribute:"body-spacing"})],a.prototype,"bodySpacing");w([q({slot:"before-title",flatten:!0})],a.prototype,"_beforeTitleNodes");R(E,a);const{action:te}=__STORYBOOK_MODULE_ACTIONS__;B.define([U,N,z,W,J,H,Y,F,V]);const re="forge-structured-card",ne={title:"Components/Structured Card",component:re,render:()=>r`
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
  `},i={decorators:[m(`
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
    `)]},s={...u,decorators:[m(`
      .actions-card-container {
        max-width: 600px;
      }
    `)],render:()=>r`
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
  `},l={...u,decorators:[m(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>{const e=te("forge-menu-select");return r`
      <div class="actions-card-container">
        <forge-structured-card heading-level="2">
          <div slot="title">Project Details</div>
          <forge-menu slot="after-header-actions" .options=${[{label:"Edit",value:"edit",leadingIcon:"edit",leadingIconType:"component"},{label:"Share",value:"share",leadingIcon:"share",leadingIconType:"component"},{label:"Download",value:"download",leadingIcon:"download",leadingIconType:"component"},{label:"Delete",value:"delete",leadingIcon:"delete",leadingIconType:"component"}]} @forge-menu-select=${e}>
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
    `}},c={...u,decorators:[m(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>r`
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
  `},d={...u,render:()=>r`
      <forge-structured-card heading-level="2" body-spacing="none">
        <div slot="title">User Management</div>
        <forge-icon-button aria-label="Refresh data" slot="after-header-actions">
          <forge-icon name="refresh"></forge-icon>
        </forge-icon-button>
        <forge-icon-button aria-label="Download report" slot="after-header-actions">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-table slot="body" .data=${[{id:1,name:"John Doe",email:"john.doe@example.com",role:"Admin"},{id:2,name:"Jane Smith",email:"jane.smith@example.com",role:"User"},{id:3,name:"Bob Johnson",email:"bob.johnson@example.com",role:"User"},{id:4,name:"Alice Williams",email:"alice.williams@example.com",role:"Manager"},{id:5,name:"Charlie Brown",email:"charlie.brown@example.com",role:"User"}]} .columnConfigurations=${[{property:"name",header:"Name"},{property:"email",header:"Email"},{property:"role",header:"Role"}]}></forge-table>
        <forge-paginator slot="footer-primary-action" page-size="5" total="25" page-index="0"></forge-paginator>
      </forge-structured-card>
    `},g={...u,decorators:[m(`
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
    `)],render:()=>r`
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
  `};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const ae=["Demo","WithForm","HeaderIconButton","WithBeforeTitleSlot","WithTable","ScrollableBodyContent"],He=Object.freeze(Object.defineProperty({__proto__:null,Demo:i,HeaderIconButton:l,ScrollableBodyContent:g,WithBeforeTitleSlot:c,WithForm:s,WithTable:d,__namedExportsOrder:ae,default:ne},Symbol.toStringTag,{value:"Module"}));export{i as D,l as H,He as S,s as W,c as a,d as b,g as c};
