import{E,x as d}from"./iframe-yBsmFEOc.js";import{g as P,s as R,O as m,a as I}from"./utils-C1Kdi8dU.js";import{o as O}from"./style-map-DL7AAq5Z.js";import{n as p,e as u}from"./ref-CHKVkDBt.js";import"./feature-detection-uS6p5jc8.js";import{T as c}from"./toast-DVotDAeY.js";import"./overlay-D-bkGTD9.js";import{s as _}from"./decorators-2aHDzOSB.js";import"./button-r2EMLpWm.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./state-layer-BFwsAUDA.js";import"./popover-xi3V_Oll.js";import"./scaffold-CGyusmPL.js";import"./toolbar-Byb6kcao.js";import"./text-field-su1dEfif.js";import"./base-field-WJtNENB5.js";import"./label-BSASIOtP.js";import"./button-toggle-group-D5jBldBo.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-DkluvO-9.js";import"./icon-B8CdcxqJ.js";import"./switch-Bt2bdQXJ.js";import"./base-drawer-CIBCdxIp.js";import"./drawer-rHXDK_gj.js";import"./modal-drawer-DysXIZBQ.js";import"./backdrop-BZvWLwDX.js";import"./mini-drawer-B7aElFMq.js";import"./list-CWXU2VGN.js";const{action:D}=__STORYBOOK_MODULE_ACTIONS__,g="forge-popover",A=D("forge-popover-toggle"),B=D("forge-popover-beforetoggle"),L={title:"Components/Popover",render:e=>{const o=I(e),r=o?O(o):E,n=u();function s(){n.value&&(n.value.open=!1)}return d`
      <forge-button id="popover-trigger" variant="raised">Show Popover</forge-button>
      <forge-popover
        ${p(n)}
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
        style=${r}
        @forge-popover-toggle=${A}
        @forge-popover-beforetoggle=${B}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start">Popover Title</h2>
          </forge-toolbar>
          <div slot="body" style="width: 300px; padding: var(--forge-spacing-medium);">Popover content</div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" variant="filled" @click=${s}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `},component:g,parameters:{layout:"centered"},argTypes:{...P({tagName:g,exclude:["overlay","anchorElement","anchor","noAnchor","boundary","boundaryElement"],controls:{animationType:{control:"select",options:["none","zoom","fade","slide"]},triggerType:{control:"multi-select",options:["click","hover","focus","longpress","doubleclick","contextmenu","manual"]},preset:{control:"select",options:["popover","dropdown","list"]},positionStrategy:{control:"select",options:["absolute","fixed"]},placement:{control:"select",options:m},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:m}}})},args:{open:!1,animationType:"zoom",triggerType:["click"],arrow:!1,longpressDelay:500,persistentHover:!1,hoverDelay:0,hoverDismissDelay:500,preset:"popover",inline:!1,placement:"bottom",positionStrategy:"fixed",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},i={},a={...R,render:()=>{const e=u(),o=u(),r=u();function n(){var t;r.value&&(r.value.disabled=!((t=o.value)!=null&&t.value))}function s(){o.value&&(o.value.value=""),r.value&&(r.value.disabled=!0),e.value&&(e.value.open=!1)}function q(){var t;(t=o.value)!=null&&t.value&&c.present({message:`Hello, ${o.value.value}!`}),s()}function C(t){var f;t.detail.newState==="closed"&&(f=o.value)!=null&&f.value&&(t.preventDefault(),c.present({message:"You have unsaved changes. "}))}return d`
      <forge-button id="popover-trigger-nonmodal" variant="raised">Show Non-modal Popover</forge-button>
      <forge-popover
        ${p(e)}
        anchor="popover-trigger-nonmodal"
        placement="bottom-start"
        arrow
        role="dialog"
        aria-modal="false"
        aria-labelledby="nonmodal-title"
        @forge-popover-beforetoggle=${C}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start" id="nonmodal-title">Enter Your Name</h2>
          </forge-toolbar>
          <div slot="body" id="nonmodal-description" style="width: 300px; padding: var(--forge-spacing-medium);">
            <form autocomplete="off">
              <forge-text-field>
                <input ${p(o)} autofocus @input=${n} type="text" name="your-name" value="" required aria-label="Enter your name" />
              </forge-text-field>
            </form>
          </div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" @click=${s} style="margin-right: var(--forge-spacing-medium);">Cancel</forge-button>
            <forge-button ${p(r)} slot="end" variant="filled" disabled @click=${q}>Save</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `}},l={...R,parameters:{layout:"padded"},decorators:[_(`
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    `};var v,b,h;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:"{}",...(h=(b=i.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var y,$,S;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const popoverRef = createRef<IPopoverComponent>();
    const inputRef = createRef<HTMLInputElement>();
    const saveButtonRef = createRef<IButtonComponent>();
    function handleInput() {
      if (saveButtonRef.value) {
        saveButtonRef.value.disabled = !inputRef.value?.value;
      }
    }
    function handleClose() {
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
    function handleSave() {
      if (inputRef.value?.value) {
        ToastComponent.present({
          message: \`Hello, \${inputRef.value.value}!\`
        });
      }
      handleClose();
    }
    function handleBeforeToggle(evt: CustomEvent<IPopoverToggleEventData>) {
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
}`,...(S=($=a.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var T,x,w;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
  render: () => {
    return html\`
      <forge-drawer>
        <forge-list navlist>
          <forge-list-item id="li-1"><button type="button">List Item One</button></forge-list-item>
          <forge-popover arrow placement="right" trigger-type="hover" distinct="list-item-nav-popovers">
            <div class="popover-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    \`;
  }
}`,...(w=(x=l.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};const N=["Demo","NonModal","Distinct"],me=Object.freeze(Object.defineProperty({__proto__:null,Demo:i,Distinct:l,NonModal:a,__namedExportsOrder:N,default:L},Symbol.toStringTag,{value:"Module"}));export{i as D,a as N,me as P,l as a};
