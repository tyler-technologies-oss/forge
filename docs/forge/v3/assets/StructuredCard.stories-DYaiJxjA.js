import{r as M,b as a}from"./iframe-Y92HmdHZ.js";import{C as T,a as E}from"./service-adapter-8tADcN_b.js";import{I as O,$ as j,a0 as A,V as R,W as $,a1 as B,O as U,a2 as W,a3 as N,a4 as z}from"./tyler-icons-SWWw4qdQ.js";import{s as f}from"./decorators-MNVuHF7U.js";import{s as m}from"./utils-DbbJplVM.js";import{h as u,B as J,t as H}from"./base-lit-element-DXQv51bq.js";import{n as S}from"./property-4XXebId8.js";import{n as Y}from"./query-assigned-nodes-D8SsSM9e.js";import{e as F}from"./class-map-COdHIAbq.js";import{t as G}from"./utils-DU-9AqTO.js";import{C as V}from"./card-De0-ErPh.js";import{C as q}from"./content-scaffold-_5JyRXNQ.js";import"./button-BUQjmV8l.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import"./icon-button-BG-KzVAg.js";import"./menu-Croe9Yxl.js";import"./linear-progress-Dj7Wb6Io.js";import"./list-CSKmw5w_.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FcTi7X6q.js";import"./list-item-DkeO-h5u.js";import"./stack-CSbxxxDz.js";import"./text-field-DSbKfCGl.js";import"./base-field-CkmJM5z3.js";import"./label-DSSUgOwJ.js";import"./select-dropdown-Hd3TElKH.js";import"./select-B4z0S6Zl.js";import"./file-picker-B5L1Tb3i.js";import"./badge-DIdXzCuH.js";import"./table-Cmw3BM4n.js";import"./checkbox-C1eMKEmS.js";import"./expansion-panel-BJnc3kmq.js";import"./open-icon-BWpwmz_Y.js";import"./paginator-BjVn02NB.js";const K=':host{display:block;--_structured-card-body-height: var(--forge-structured-card-body-height, auto)}:host(:state(body-spacing-none)) forge-content-scaffold{--forge-content-scaffold-body-padding-inline: 0;--forge-content-scaffold-footer-full-padding: var(--forge-spacing-small, 12px) var(--forge-spacing-medium, 16px);--forge-content-scaffold-body-padding-block: 0}:host(:state(body-spacing-none)) .footer-container{padding-block-end:0}.header-container{display:grid;grid-template-columns:auto 1fr auto;align-items:center;grid-template-areas:"start . actions";min-height:48px}forge-content-scaffold{--forge-content-scaffold-body-height: var(--_structured-card-body-height)}.container{--forge-card-padding: 0;--forge-card-gap: 0;height:100%}.title-container{display:flex;align-items:center;gap:0;grid-area:start}.title-with-margin{margin-inline-start:var(--forge-spacing-medium, 16px)}::slotted([slot=title]){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading3-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading3-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-font-size-scale, 1.125)));font-weight:var(--forge-typography-heading3-font-weight, 500);line-height:var(--forge-typography-heading3-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-heading3-letter-spacing, .0083333333em);text-transform:var(--forge-typography-heading3-text-transform, inherit);text-decoration:var(--forge-typography-heading3-text-decoration, inherit)}.actions-container{display:flex;align-items:center;gap:0;grid-area:actions}::slotted([slot=header-actions]){margin-inline-end:var(--forge-spacing-medium, 16px)}::slotted([slot=body]){height:var(--_structured-card-body-height)}.footer-container{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;column-gap:var(--forge-spacing-medium, 16px)}.footer-start-container{flex:1;flex-basis:content;justify-content:flex-end}.footer-actions{display:flex;align-items:center;gap:var(--forge-spacing-medium, 16px)}';var Q=Object.defineProperty,X=Object.getOwnPropertyDescriptor,_=e=>{throw TypeError(e)},h=(e,t,o,i)=>{for(var n=i>1?void 0:i?X(t,o):t,b=e.length-1,v;b>=0;b--)(v=e[b])&&(n=(i?v(t,o,n):v(n))||n);return i&&n&&Q(t,o,n),n},k=(e,t,o)=>t.has(e)||_("Cannot "+o),Z=(e,t,o)=>(k(e,t,"read from private field"),o?o.call(e):t.get(e)),w=(e,t,o)=>t.has(e)?_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),ee=(e,t,o,i)=>(k(e,t,"write to private field"),t.set(e,o),o),te=(e,t,o)=>(k(e,t,"access private method"),o),C,D,I,y,x,L;const P="forge-structured-card";let r=class extends(I=J,D=T,C=E,I){constructor(){super(),w(this,x),this.headingLevel=2,this.bodySpacing="default",w(this,y),ee(this,y,this.attachInternals())}willUpdate(e){e.has("bodySpacing")&&G(Z(this,y),"body-spacing-none",this.bodySpacing==="none")}render(){return a`
      <forge-card class="container">
        <forge-content-scaffold>
          <div slot="header" class="header-container" ${u()}>
            <div class="title-container">
              <slot name="before-title" @slotchange=${te(this,x,L)}></slot>
              <div
                role="heading"
                aria-level=${this.headingLevel}
                id="title"
                class=${F({"title-with-margin":this._beforeTitleNodes.length===0})}>
                <slot name="title"></slot>
              </div>
            </div>
            <div class="actions-container" ${u()}>
              <slot name="header-actions"></slot>
              <slot name="after-header-actions"></slot>
            </div>
          </div>
          <slot name="body" slot="body"></slot>
          <div class="footer-container" slot="footer" ${u()}>
            <div class="footer-start-container">
              <slot name="footer-start"></slot>
            </div>
            <div class="footer-actions" ${u()}>
              <slot name="footer-secondary-action"></slot>
              <slot name="footer-primary-action"></slot>
            </div>
          </div>
        </forge-content-scaffold>
      </forge-card>
    `}};y=new WeakMap;x=new WeakSet;L=function(){this.requestUpdate()};r[D]=P;r[C]=[V,q];r.styles=M(K);h([S({attribute:"heading-level",type:Number})],r.prototype,"headingLevel",2);h([S({attribute:"body-spacing"})],r.prototype,"bodySpacing",2);h([Y({slot:"before-title",flatten:!0})],r.prototype,"_beforeTitleNodes",2);r=h([H(P)],r);const{action:oe}=__STORYBOOK_MODULE_ACTIONS__;O.define([j,A,R,$,B,U,W,N,z]);const re="forge-structured-card",ne={title:"Components/Structured Card",component:re,render:()=>a`
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
  `},s={decorators:[f(`
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
    `)]},l={...m,decorators:[f(`
      .actions-card-container {
        max-width: 600px;
      }
    `)],render:()=>a`
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
  `},c={...m,decorators:[f(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>{const e=oe("forge-menu-select");return a`
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
    `}},d={...m,decorators:[f(`
      .actions-card-container {
        max-width: 600px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `)],render:()=>a`
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
  `},g={...m,render:()=>a`
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
    `},p={...m,decorators:[f(`
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
    `)],render:()=>a`
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
  `};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const ae=["Demo","WithForm","HeaderIconButton","WithBeforeTitleSlot","WithTable","ScrollableBodyContent"],He=Object.freeze(Object.defineProperty({__proto__:null,Demo:s,HeaderIconButton:c,ScrollableBodyContent:p,WithBeforeTitleSlot:d,WithForm:l,WithTable:g,__namedExportsOrder:ae,default:ne},Symbol.toStringTag,{value:"Module"}));export{s as D,c as H,He as S,l as W,d as a,g as b,p as c};
