import{E as v,x as d}from"./iframe-DFzVZZcU.js";import{o as y}from"./style-map-CEjQg-09.js";import{e as i,n as s}from"./ref-V0mADGsP.js";import{e as h}from"./class-map-O4CmAr6B.js";import{g as x,s as b,O as c,a as C}from"./utils-D7E3BSWv.js";import{s as p}from"./decorators-yautNURy.js";import"./service-adapter-CffG5Lhq.js";import"./button-DPXJWeBj.js";import"./focus-indicator-C_d3jG0d.js";import"./state-layer-gAgMwMHF.js";import{V as l}from"./overlay-B5pGv-rV.js";const E=".clipping-container{height:500px;border:1px solid var(--forge-theme-outline);overflow:auto}.clipping-container.force-containment{transform:translateZ(0);border:2px dashed var(--forge-theme-error)}.clipping-container.use-small-container{height:150px}.overlay-content{width:300px;padding:8px;border:1px dashed var(--forge-theme-primary);background-color:var(--forge-theme-surface)}.scroll-container{height:250%;width:250%;display:flex;align-items:center;justify-content:center}",{action:S}=__STORYBOOK_MODULE_ACTIONS__,m="forge-overlay",$=S("forge-overlay-light-dismiss"),O={title:"Components/Overlay",render:e=>{const o=C(e),u=o?y(o):v,a=i(),r=i(),f={"clipping-container":!0,"force-containment":e.forceContainment,"use-small-container":e.useSmallContainer};window.requestAnimationFrame(()=>{a.value.scrollIntoView({block:"center",inline:"center"})});function g(){r.value.open=!r.value.open}return d`
      <div class=${h(f)} id="clipping-container">
        <div class="scroll-container">
          <forge-button ${s(a)} @click=${g} id="overlay-trigger" variant="raised">Toggle Overlay</forge-button>
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
            style=${u}
            @forge-overlay-light-dismiss=${$}>
            <div class="overlay-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui auctor, ultricies nunc nec, ultricies nunc. Nullam in dui auctor, ultricies
              nunc nec, ultricies nunc.
            </div>
          </forge-overlay>
        </div>
      </div>
    `},component:m,argTypes:{...x({tagName:m,exclude:["arrowElement","arrowElementOffset","anchorElement","noAnchor","anchor","boundary","boundaryElement","positionStrategy","inline"],controls:{placement:{control:"select",options:c},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:c}}}),useSmallContainer:{control:"boolean"},forceContainment:{control:"boolean"}},args:{useSmallContainer:!1,forceContainment:!1,open:!1,placement:"bottom",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},t={decorators:[p(E)]},n={...b,decorators:[p(`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  `)],render:()=>(document.addEventListener("contextmenu",_),d`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    `)};function _(e){e.preventDefault();const o=document.getElementById("context-overlay");o.open?o.anchorElement=l.fromEvent(e):(o.anchorElement=l.fromEvent(e),o.open=!0)}t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const w=["Demo","ContextMenu"],I=Object.freeze(Object.defineProperty({__proto__:null,ContextMenu:n,Demo:t,__namedExportsOrder:w,default:O},Symbol.toStringTag,{value:"Module"}));export{n as C,t as D,I as O};
