import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-C-z8vi0w.js";import{_ as a,i as o,l as s,m as c,s as l}from"./utils-BktKkMbo.js";import{n as u,t as d}from"./decorators-Eg-GwljX.js";import{t as f}from"./list-B4jau5I5.js";import{t as p}from"./popover-BjeE38qE.js";import{t as m}from"./button-BCGxI4mr.js";import{r as h,t as g}from"./style-map-C_WKUe4Y.js";import{t as _}from"./toolbar-D1sAxtpp.js";import{t as v}from"./text-field-DoxOOXb7.js";import{i as y,n as b,t as x}from"./ref-tIG-hx5K.js";import{t as S}from"./drawer-CJkaSbVB.js";import{t as C}from"./scaffold-NUY7AQ8t.js";import{n as w,t as T}from"./toast-Cdmb9Ojq.js";var E=t({Demo:()=>M,Distinct:()=>P,NonModal:()=>N,__namedExportsOrder:()=>F,default:()=>j}),D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{i(),c(),g(),x(),T(),d(),m(),p(),C(),_(),v(),S(),f(),{action:D}=__STORYBOOK_MODULE_ACTIONS__,O=`forge-popover`,k=D(`forge-popover-toggle`),A=D(`forge-popover-beforetoggle`),j={title:`Components/Popover`,render:e=>{let t=s(e),i=t?h(t):r,a=b();function o(){a.value&&(a.value.open=!1)}return n`
      <forge-button id="popover-trigger" variant="raised">Show Popover</forge-button>
      <forge-popover
        ${y(a)}
        anchor="popover-trigger"
        .open=${e.open}
        .animationType=${e.animationType}
        .triggerType=${e.triggerType}
        .arrow=${e.arrow}
        .longpressDelay=${e.longpressDelay}
        .persistentHover=${e.persistentHover}
        .hoverDelay=${e.hoverDelay}
        .hoverDismissDelay=${e.hoverDismissDelay}
        .preset=${e.preset}
        .inline=${e.inline}
        .placement=${e.placement}
        .positionStrategy=${e.positionStrategy}
        .offset=${e.offset}
        .shift=${e.shift}
        .hide=${e.hide}
        .persistent=${e.persistent}
        .flip=${e.flip}
        style=${i}
        @forge-popover-toggle=${k}
        @forge-popover-beforetoggle=${A}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start">Popover Title</h2>
          </forge-toolbar>
          <div slot="body" style="width: 300px; padding: var(--forge-spacing-medium);">Popover content</div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" variant="filled" @click=${o}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `},component:O,parameters:{layout:`centered`},argTypes:{...l({tagName:O,exclude:[`overlay`,`anchorElement`,`anchor`,`noAnchor`,`boundary`,`boundaryElement`],controls:{animationType:{control:`select`,options:[`none`,`zoom`,`fade`,`slide`]},triggerType:{control:`multi-select`,options:[`click`,`hover`,`focus`,`longpress`,`doubleclick`,`contextmenu`,`manual`]},preset:{control:`select`,options:[`popover`,`dropdown`,`list`]},positionStrategy:{control:`select`,options:[`absolute`,`fixed`]},placement:{control:`select`,options:o},offset:{control:`object`},hide:{control:`select`,options:[`anchor-hidden`,`never`]},flip:{control:`select`,options:[`auto`,`main`,`cross`,`never`]},fallbackPlacements:{control:`multi-select`,options:o}}})},args:{open:!1,animationType:`zoom`,triggerType:[`click`],arrow:!1,longpressDelay:500,persistentHover:!1,hoverDelay:0,hoverDismissDelay:500,preset:`popover`,inline:!1,placement:`bottom`,positionStrategy:`fixed`,offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:`anchor-hidden`,persistent:!1,flip:`auto`}},M={},N={...a,render:()=>{let e=b(),t=b(),r=b();function i(){r.value&&(r.value.disabled=!t.value?.value)}function a(){t.value&&(t.value.value=``),r.value&&(r.value.disabled=!0),e.value&&(e.value.open=!1)}function o(){t.value?.value&&w.present({message:`Hello, ${t.value.value}!`}),a()}function s(e){e.detail.newState===`closed`&&t.value?.value&&(e.preventDefault(),w.present({message:`You have unsaved changes. `}))}return n`
      <forge-button id="popover-trigger-nonmodal" variant="raised">Show Non-modal Popover</forge-button>
      <forge-popover
        ${y(e)}
        anchor="popover-trigger-nonmodal"
        placement="bottom-start"
        arrow
        role="dialog"
        aria-modal="false"
        aria-labelledby="nonmodal-title"
        @forge-popover-beforetoggle=${s}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start" id="nonmodal-title">Enter Your Name</h2>
          </forge-toolbar>
          <div slot="body" id="nonmodal-description" style="width: 300px; padding: var(--forge-spacing-medium);">
            <form autocomplete="off">
              <forge-text-field>
                <input ${y(t)} autofocus @input=${i} type="text" name="your-name" value="" required aria-label="Enter your name" />
              </forge-text-field>
            </form>
          </div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" @click=${a} style="margin-right: var(--forge-spacing-medium);">Cancel</forge-button>
            <forge-button ${y(r)} slot="end" variant="filled" disabled @click=${o}>Save</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `}},P={...a,parameters:{layout:`padded`},decorators:[u(`
.popover-content {
  width: 300px;
  padding: var(--forge-spacing-medium);
}
    `)],render:()=>n`
    <forge-drawer>
      <forge-list navlist>
        <forge-list-item id="li-1"><button type="button">List Item One</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </forge-popover>

        <forge-list-item id="li-2"><button type="button">List Item Two</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </forge-popover>

        <forge-list-item id="li-3"><button type="button">List Item Three</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </div>
        </forge-popover>
      </forge-list>
    </forge-drawer>
  `},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const popoverRef = createRef<IPopoverComponent>();
    const inputRef = createRef<HTMLInputElement>();
    const saveButtonRef = createRef<ButtonComponent>();
    function handleInput(): void {
      if (saveButtonRef.value) {
        saveButtonRef.value.disabled = !inputRef.value?.value;
      }
    }
    function handleClose(): void {
      if (inputRef.value) {
        inputRef.value.value = '';
      }
      if (saveButtonRef.value) {
        saveButtonRef.value.disabled = true;
      }
      if (popoverRef.value) {
        popoverRef.value.open = false;
      }
    }
    function handleSave(): void {
      if (inputRef.value?.value) {
        ToastComponent.present({
          message: \`Hello, \${inputRef.value.value}!\`
        });
      }
      handleClose();
    }
    function handleBeforeToggle(evt: CustomEvent<IPopoverToggleEventData>): void {
      if (evt.detail.newState === 'closed') {
        if (inputRef.value?.value) {
          evt.preventDefault();
          ToastComponent.present({
            message: 'You have unsaved changes. '
          });
        }
      }
    }
    return html\`
      <forge-button id="popover-trigger-nonmodal" variant="raised">Show Non-modal Popover</forge-button>
      <forge-popover
        \${ref(popoverRef)}
        anchor="popover-trigger-nonmodal"
        placement="bottom-start"
        arrow
        role="dialog"
        aria-modal="false"
        aria-labelledby="nonmodal-title"
        @forge-popover-beforetoggle=\${handleBeforeToggle}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start" id="nonmodal-title">Enter Your Name</h2>
          </forge-toolbar>
          <div slot="body" id="nonmodal-description" style="width: 300px; padding: var(--forge-spacing-medium);">
            <form autocomplete="off">
              <forge-text-field>
                <input \${ref(inputRef)} autofocus @input=\${handleInput} type="text" name="your-name" value="" required aria-label="Enter your name" />
              </forge-text-field>
            </form>
          </div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" @click=\${handleClose} style="margin-right: var(--forge-spacing-medium);">Cancel</forge-button>
            <forge-button \${ref(saveButtonRef)} slot="end" variant="filled" disabled @click=\${handleSave}>Save</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    \`;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  parameters: {
    layout: 'padded'
  },
  decorators: [storyStyles(\`
.popover-content {
  width: 300px;
  padding: var(--forge-spacing-medium);
}
    \`)],
  render: () => html\`
    <forge-drawer>
      <forge-list navlist>
        <forge-list-item id="li-1"><button type="button">List Item One</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </forge-popover>

        <forge-list-item id="li-2"><button type="button">List Item Two</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </forge-popover>

        <forge-list-item id="li-3"><button type="button">List Item Three</button></forge-list-item>
        <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
          <div class="popover-content">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </div>
        </forge-popover>
      </forge-list>
    </forge-drawer>
  \`
}`,...P.parameters?.docs?.source}}},F=[`Demo`,`NonModal`,`Distinct`]})))()}export{I as a,E as i,P as n,N as r,M as t};