import{b as d,A as y}from"./iframe-CMEs_sKn.js";import{s as v,g as $,b as S,O as f}from"./utils-CyDCReHh.js";import{o as T}from"./style-map-qI3jyA2m.js";import{n as s,e as p}from"./ref-BRh9N0Ot.js";import"./service-adapter-CffG5Lhq.js";import{T as m}from"./toast-DZ-8oQar.js";import"./overlay-BhwPRyah.js";import{s as w}from"./decorators-D64daar0.js";import"./button-DEHIh3j-.js";import"./focus-indicator-ChcxzYYX.js";import"./state-layer-u9rLNX9t.js";import"./popover-oAFRtu_9.js";import"./index-DTwfV0k0.js";import"./scaffold-B_qTjcmL.js";import"./toolbar-BK4uxBaY.js";import"./text-field-Ja52xY-u.js";import"./base-field-4-pBtFkE.js";import"./label-GeOK_X5A.js";import"./button-toggle-group-CCIxYP5c.js";import"./checkbox-DFIeoBwP.js";import"./icon-button-CDfm2E3h.js";import"./tyler-icons-B0WPf66k.js";import"./switch-CbxUM1gP.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./backdrop-ZqVEdIYI.js";import"./mini-drawer-B6eLxgR7.js";import"./list-DdCZY5c1.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,c="forge-popover",x=g("forge-popover-toggle"),R=g("forge-popover-beforetoggle"),D={title:"Components/Popover",render:e=>{const o=S(e),t=o?T(o):y,r=p();function l(){r.value&&(r.value.open=!1)}return d`
      <forge-button id="popover-trigger" variant="raised">Show Popover</forge-button>
      <forge-popover
        ${s(r)}
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
        style=${t}
        @forge-popover-toggle=${x}
        @forge-popover-beforetoggle=${R}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start">Popover Title</h2>
          </forge-toolbar>
          <div slot="body" style="width: 300px; padding: var(--forge-spacing-medium);">Popover content</div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" variant="filled" @click=${l}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `},component:c,parameters:{layout:"centered"},argTypes:{...$({tagName:c,exclude:["overlay","anchorElement","anchor","noAnchor","boundary","boundaryElement"],controls:{animationType:{control:"select",options:["none","zoom","fade","slide"]},triggerType:{control:"multi-select",options:["click","hover","focus","longpress","doubleclick","contextmenu","manual"]},preset:{control:"select",options:["popover","dropdown","list"]},positionStrategy:{control:"select",options:["absolute","fixed"]},placement:{control:"select",options:f},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:f}}})},args:{open:!1,animationType:"zoom",triggerType:["click"],arrow:!1,longpressDelay:500,persistentHover:!1,hoverDelay:0,hoverDismissDelay:500,preset:"popover",inline:!1,placement:"bottom",positionStrategy:"fixed",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},n={},i={...v,render:()=>{const e=p(),o=p(),t=p();function r(){t.value&&(t.value.disabled=!o.value?.value)}function l(){o.value&&(o.value.value=""),t.value&&(t.value.disabled=!0),e.value&&(e.value.open=!1)}function b(){o.value?.value&&m.present({message:`Hello, ${o.value.value}!`}),l()}function h(u){u.detail.newState==="closed"&&o.value?.value&&(u.preventDefault(),m.present({message:"You have unsaved changes. "}))}return d`
      <forge-button id="popover-trigger-nonmodal" variant="raised">Show Non-modal Popover</forge-button>
      <forge-popover
        ${s(e)}
        anchor="popover-trigger-nonmodal"
        placement="bottom-start"
        arrow
        role="dialog"
        aria-modal="false"
        aria-labelledby="nonmodal-title"
        @forge-popover-beforetoggle=${h}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start" id="nonmodal-title">Enter Your Name</h2>
          </forge-toolbar>
          <div slot="body" id="nonmodal-description" style="width: 300px; padding: var(--forge-spacing-medium);">
            <form autocomplete="off">
              <forge-text-field>
                <input ${s(o)} autofocus @input=${r} type="text" name="your-name" value="" required aria-label="Enter your name" />
              </forge-text-field>
            </form>
          </div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" @click=${l} style="margin-right: var(--forge-spacing-medium);">Cancel</forge-button>
            <forge-button ${s(t)} slot="end" variant="filled" disabled @click=${b}>Save</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `}},a={...v,parameters:{layout:"padded"},decorators:[w(`
.popover-content {
  width: 300px;
  padding: var(--forge-spacing-medium);
}
    `)],render:()=>d`
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
  `};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const popoverRef = createRef<IPopoverComponent>();
    const inputRef = createRef<HTMLInputElement>();
    const saveButtonRef = createRef<IButtonComponent>();
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
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const q=["Demo","NonModal","Distinct"],re=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,Distinct:a,NonModal:i,__namedExportsOrder:q,default:D},Symbol.toStringTag,{value:"Module"}));export{n as D,i as N,re as P,a};
