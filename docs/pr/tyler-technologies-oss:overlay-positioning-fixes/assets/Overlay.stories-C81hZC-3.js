import{a as C}from"./index-B-lxVbXh.js";import"./lit-element-B3QVTycr.js";import{E,x as y}from"./lit-html-CuBe1DX_.js";import{o as S}from"./style-map-CeP1Mntv.js";import{e as i,n as s}from"./ref-BHdy32Cl.js";import{e as O}from"./class-map-CuXcqkpw.js";import{g as w,s as A,O as c,b as T}from"./utils-BEyWTXMe.js";import{s as h}from"./decorators-CBntP_d2.js";import"./feature-detection-C61kIZu7.js";import"./button-DOA_SM9C.js";import"./focus-indicator-B_9E-jM6.js";import"./index-CiLSBptl.js";import"./state-layer-DA2sYK0k.js";import{V as l}from"./overlay-B56HkyOr.js";const k=".clipping-container{height:500px;border:1px solid var(--forge-theme-outline);overflow:auto}.clipping-container.force-containment{transform:translateZ(0);border:2px dashed var(--forge-theme-error)}.clipping-container.use-small-container{height:150px}.overlay-content{width:300px;padding:8px;border:1px dashed var(--forge-theme-primary);background-color:var(--forge-theme-surface)}.scroll-container{height:250%;width:250%;display:flex;align-items:center;justify-content:center}",m="forge-overlay",_=C("forge-overlay-light-dismiss"),M={title:"Components/Overlay",render:e=>{const o=T(e),x=o?S(o):E,a=i(),r=i(),b={"clipping-container":!0,"force-containment":e.forceContainment,"use-small-container":e.useSmallContainer};window.requestAnimationFrame(()=>{a.value.scrollIntoView({block:"center",inline:"center"})});function $(){r.value.open=!r.value.open}return y`
      <div class=${O(b)} id="clipping-container">
        <div class="scroll-container">
          <forge-button ${s(a)} @click=${$} id="overlay-trigger" variant="raised">Toggle Overlay</forge-button>
          <forge-overlay
            ${s(r)}
            anchor="overlay-trigger"
            .open=${e.open}
            .animationType=${e.animationType}
            .triggerType=${e.triggerType}
            .arrow=${e.arrow}
            .inline=${e.inline}
            .placement=${e.placement}
            .positionStrategy=${e.positionStrategy}
            .offset=${e.offset}
            .shift=${e.shift}
            .hide=${e.hide}
            .persistent=${e.persistent}
            .flip=${e.flip}
            style=${x}
            @forge-overlay-light-dismiss=${_}>
            <div class="overlay-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui auctor, ultricies nunc nec, ultricies nunc. Nullam in dui auctor, ultricies
              nunc nec, ultricies nunc.
            </div>
          </forge-overlay>
        </div>
      </div>
    `},component:m,argTypes:{...w({tagName:m,exclude:["arrowElement","arrowElementOffset","anchorElement","noAnchor","anchor","boundary","boundaryElement","positionStrategy","inline"],controls:{placement:{control:"select",options:c},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:c}}}),useSmallContainer:{control:"boolean"},forceContainment:{control:"boolean"}},args:{useSmallContainer:!1,forceContainment:!1,open:!1,placement:"bottom",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},t={decorators:[h(k)]},n={...A,decorators:[h(`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  `)],render:()=>(document.addEventListener("contextmenu",P),y`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    `)};function P(e){e.preventDefault();const o=document.getElementById("context-overlay");o.open?o.anchorElement=l.fromEvent(e):(o.anchorElement=l.fromEvent(e),o.open=!0)}var d,p,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var f,g,v;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  \`)],
  render: () => {
    document.addEventListener('contextmenu', createContextMenu);
    return html\`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    \`;
  }
}`,...(v=(g=n.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const V=["Demo","ContextMenu"],J=Object.freeze(Object.defineProperty({__proto__:null,ContextMenu:n,Demo:t,__namedExportsOrder:V,default:M},Symbol.toStringTag,{value:"Module"}));export{n as C,t as D,J as O};
