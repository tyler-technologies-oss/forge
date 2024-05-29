import{x as R,T as x}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as $}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as C,g as P,s as E,O as d}from"./constants-P8PPbvcA.js";import{o as w}from"./style-map-CkvVWuL1.js";import{n as i,e as p}from"./ref-BHUNCdUQ.js";import{T as u}from"./toast-Beu8i0Pv.js";import"./overlay-z8UtHrkD.js";import"./button-DUm6tzq_.js";import"./focus-indicator-DiRJm8Fd.js";import"./index-Dh0vMUMR.js";import"./state-layer-D1kPUhtW.js";import"./popover-0sT-JrP5.js";import"./scaffold-DB667SiN.js";import"./toolbar-FB9uncb7.js";import"./text-field-DMz0HREu.js";import"./base-field-BAFktY9Z.js";import"./label-5YO4KLUG.js";import"./checkbox-OYooTbNv.js";import"./icon-button-BHFGZu_q.js";import"./icon-CbXHM6zD.js";import"./switch-DmuohxSI.js";const g="forge-popover",A=$("forge-popover-toggle"),B=$("forge-popover-beforetoggle"),D={title:"Components/Popover",render:n=>{const e=C(n),t=e?w(e):x,r=p();function s(){r.value&&(r.value.open=!1)}return R`
      <forge-button id="popover-trigger" variant="raised">Show Popover</forge-button>
      <forge-popover
        ${i(r)}
        anchor="popover-trigger"
        .open=${n.open}
        style=${t}
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
    `},component:g,parameters:{layout:"centered"},argTypes:{...P({tagName:g,exclude:["overlay","anchorElement","anchor","noAnchor","boundary","boundaryElement"],controls:{animationType:{control:"select",options:["none","zoom","fade","slide"]},triggerType:{control:"multi-select",options:["click","hover","focus","longpress","doubleclick","contextmenu","manual"]},preset:{control:"select",options:["popover","dropdown","list"]},positionStrategy:{control:"select",options:["absolute","fixed"]},placement:{control:"select",options:d},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:d}}})},args:{open:!1,animationType:"zoom",triggerType:["click"],arrow:!1,longpressDelay:500,persistentHover:!1,hoverDelay:0,hoverDismissDelay:500,preset:"popover",inline:!1,placement:"bottom",positionStrategy:"fixed",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},a={},l={...E,render:()=>{const n=p(),e=p(),t=p();function r(){var o;t.value&&(t.value.disabled=!((o=e.value)!=null&&o.value))}function s(){e.value&&(e.value.value=""),t.value&&(t.value.disabled=!0),n.value&&(n.value.open=!1)}function T(){var o;(o=e.value)!=null&&o.value&&u.present({message:`Hello, ${e.value.value}!`}),s()}function S(o){var f;o.detail.newState==="closed"&&(f=e.value)!=null&&f.value&&(o.preventDefault(),u.present({message:"You have unsaved changes. "}))}return R`
      <forge-button id="popover-trigger-nonmodal" variant="raised">Show Non-modal Popover</forge-button>
      <forge-popover
        ${i(n)}
        anchor="popover-trigger-nonmodal"
        placement="bottom-start"
        arrow
        role="dialog"
        aria-modal="false"
        aria-labelledby="nonmodal-title"
        @forge-popover-beforetoggle=${S}>
        <forge-scaffold>
          <forge-toolbar no-border slot="header">
            <h2 class="forge-typography--heading4" slot="start" id="nonmodal-title">Enter Your Name</h2>
          </forge-toolbar>
          <div slot="body" id="nonmodal-description" style="width: 300px; padding: var(--forge-spacing-medium);">
            <form autocomplete="off">
              <forge-text-field>
                <input ${i(e)} autofocus @input=${r} type="text" name="your-name" value="" required aria-label="Enter your name">
              </forge-text-field>
            </form>
          </div>
          <forge-toolbar no-border slot="footer">
            <forge-button slot="end" @click=${s} style="margin-right: var(--forge-spacing-medium);">Cancel</forge-button>
            <forge-button ${i(t)} slot="end" variant="filled" disabled @click=${T}>Save</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </forge-popover>
    `}};var c,m,v;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(v=(m=a.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var b,h,y;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
                <input \${ref(inputRef)} autofocus @input=\${handleInput} type="text" name="your-name" value="" required aria-label="Enter your name">
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
}`,...(y=(h=l.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const N=["Demo","NonModal"],oe=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,NonModal:l,__namedExportsOrder:N,default:D},Symbol.toStringTag,{value:"Module"}));export{a as D,l as N,oe as P};
