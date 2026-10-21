import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-Cygt-aqC.js";import{_ as a,i as o,l as s,m as c,s as l}from"./utils-C3ow8Ikc.js";import{n as u,t as d}from"./decorators-CIf0wI47.js";import{t as f}from"./class-map-DEew1OiS.js";import{t as p}from"./class-map-8zp5OV2u.js";import{o as m,s as h,t as g}from"./overlay-B8gEKE3q.js";import{t as _}from"./button-BP1asP2i.js";import{r as v,t as y}from"./style-map-C_WKUe4Y.js";import{i as b,n as x,t as S}from"./ref-DsL_jvlp.js";var C;function w(){return(w=e((()=>{C=`.clipping-container{border:1px solid var(--forge-theme-outline);height:500px;overflow:auto}.clipping-container.force-containment{border:2px dashed var(--forge-theme-error);transform:translate(0,0)}.clipping-container.use-small-container{height:150px}.overlay-content{border:1px dashed var(--forge-theme-primary);background-color:var(--forge-theme-surface);width:300px;padding:8px}.scroll-container{justify-content:center;align-items:center;width:250%;height:250%;display:flex}`})))()}var T=t({ContextMenu:()=>M,Demo:()=>j,__namedExportsOrder:()=>N,default:()=>A});function E(e){e.preventDefault();let t=document.getElementById(`context-overlay`);t.open?t.anchorElement=m.fromEvent(e):(t.anchorElement=m.fromEvent(e),t.open=!0)}var D,O,k,A,j,M,N;function P(){return(P=e((()=>{i(),y(),S(),p(),c(),d(),_(),g(),w(),h(),{action:D}=__STORYBOOK_MODULE_ACTIONS__,O=`forge-overlay`,k=D(`forge-overlay-light-dismiss`),A={title:`Components/Overlay`,render:e=>{let t=s(e),i=t?v(t):r,a=x(),o=x(),c={"clipping-container":!0,"force-containment":e.forceContainment,"use-small-container":e.useSmallContainer};window.requestAnimationFrame(()=>{a.value?.scrollIntoView({block:`center`,inline:`center`})});function l(){o.value&&(o.value.open=!o.value.open)}return n`
      <div class=${f(c)} id="clipping-container">
        <div class="scroll-container">
          <forge-button ${b(a)} @click=${l} id="overlay-trigger" variant="raised">Toggle Overlay</forge-button>
          <forge-overlay
            ${b(o)}
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
            style=${i}
            @forge-overlay-light-dismiss=${k}>
            <div class="overlay-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui auctor, ultricies nunc nec, ultricies nunc. Nullam in dui auctor, ultricies
              nunc nec, ultricies nunc.
            </div>
          </forge-overlay>
        </div>
      </div>
    `},component:O,argTypes:{...l({tagName:O,exclude:[`arrowElement`,`arrowElementOffset`,`anchorElement`,`noAnchor`,`anchor`,`boundary`,`boundaryElement`,`positionStrategy`,`inline`],controls:{placement:{control:`select`,options:o},offset:{control:`object`},hide:{control:`select`,options:[`anchor-hidden`,`never`]},flip:{control:`select`,options:[`auto`,`main`,`cross`,`never`]},fallbackPlacements:{control:`multi-select`,options:o}}}),useSmallContainer:{control:`boolean`},forceContainment:{control:`boolean`}},args:{useSmallContainer:!1,forceContainment:!1,open:!1,placement:`bottom`,offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:`anchor-hidden`,persistent:!1,flip:`auto`}},j={decorators:[u(C)]},M={...a,decorators:[u(`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  `)],render:()=>(document.addEventListener(`contextmenu`,E),n`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    `)},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N=[`Demo`,`ContextMenu`]})))()}export{P as i,j as n,T as r,M as t};