import{a as $}from"./chunk-454WOBUV-CM0pFb8Z.js";import"./lit-element-Dk2-kgKT.js";import{k as y,D as E}from"./lit-html-DZH-Jm0H.js";import{s as S}from"./style-map-DxfbqtuX.js";import{K as i,i as s}from"./ref-9TtedaQt.js";import{R as O}from"./class-map-D93gIiBE.js";import{b as w,g as k,s as A,O as c}from"./utils-BE6XR6X1.js";import{s as h}from"./decorators-DvEJi2JG.js";import"./constants-DjE6emXm.js";import"./button-CbYZUGFb.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";import{V as l}from"./overlay-BjQy6-wl.js";const T=".clipping-container{height:500px;border:1px solid var(--forge-theme-outline);overflow:auto}.clipping-container.force-containment{transform:translateZ(0);border:2px dashed var(--forge-theme-error)}.clipping-container.use-small-container{height:150px}.overlay-content{width:300px;padding:8px;border:1px dashed var(--forge-theme-primary);background-color:var(--forge-theme-surface)}.scroll-container{height:250%;width:250%;display:flex;align-items:center;justify-content:center}",m="forge-overlay",_=$("forge-overlay-light-dismiss"),R={title:"Components/Overlay",render:e=>{const o=w(e),x=o?S(o):E,a=s(),r=s(),b={"clipping-container":!0,"force-containment":e.forceContainment,"use-small-container":e.useSmallContainer};window.requestAnimationFrame(()=>{a.value.scrollIntoView({block:"center",inline:"center"})});function C(){r.value.open=!r.value.open}return y`
      <div class=${O(b)} id="clipping-container">
        <div class="scroll-container">
          <forge-button ${i(a)} @click=${C} id="overlay-trigger" variant="raised">Toggle Overlay</forge-button>
          <forge-overlay
            ${i(r)}
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
    `},component:m,argTypes:{...k({tagName:m,exclude:["arrowElement","arrowElementOffset","anchorElement","noAnchor","anchor","boundary","boundaryElement","positionStrategy","inline"],controls:{placement:{control:"select",options:c},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:c}}}),useSmallContainer:{control:"boolean"},forceContainment:{control:"boolean"}},args:{useSmallContainer:!1,forceContainment:!1,open:!1,placement:"bottom",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},t={decorators:[h(T)]},n={...A,decorators:[h(`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  `)],render:()=>(document.addEventListener("contextmenu",D),y`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    `)};function D(e){e.preventDefault();const o=document.getElementById("context-overlay");o.open?o.anchorElement=l.fromEvent(e):(o.anchorElement=l.fromEvent(e),o.open=!0)}var d,p,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(v=(g=n.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const M=["Demo","ContextMenu"],H=Object.freeze(Object.defineProperty({__proto__:null,ContextMenu:n,Demo:t,__namedExportsOrder:M,default:R},Symbol.toStringTag,{value:"Module"}));export{n as C,t as D,H as O};
