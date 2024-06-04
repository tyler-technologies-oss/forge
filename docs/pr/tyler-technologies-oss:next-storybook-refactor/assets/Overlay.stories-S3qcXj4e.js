import{a as S}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{x as b,T as C}from"./lit-element-BOOoordI.js";import{w as $}from"./lit-html-BWgXkSvR.js";import{o as w}from"./style-map-D0ILlpbs.js";import{n as l,e as m}from"./ref-BorTy8X1.js";import{e as O,i as T,t as A}from"./directive-CF8sV3Lr.js";import{a as k,g as _,s as j,O as d}from"./utils-DyetTxuG.js";import{s as E}from"./decorators-B79PnA5z.js";import"./button-BDRrw9v7.js";import"./focus-indicator-By3BQe1w.js";import"./index-Dh0vMUMR.js";import"./state-layer-b0IlkqgO.js";import{V as p}from"./overlay-BAE6BB-F.js";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=O(class extends T{constructor(e){var t;if(super(e),e.type!==A.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var s,n;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in t)t[o]&&!((s=this.nt)!=null&&s.has(o))&&this.st.add(o);return this.render(t)}const r=e.element.classList;for(const o of this.st)o in t||(r.remove(o),this.st.delete(o));for(const o in t){const c=!!t[o];c===this.st.has(o)||(n=this.nt)!=null&&n.has(o)||(c?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return $}}),L=".clipping-container{height:500px;border:1px solid var(--forge-theme-outline);overflow:auto}.clipping-container.force-containment{transform:translateZ(0);border:2px dashed var(--forge-theme-error)}.clipping-container.use-small-container{height:150px}.overlay-content{width:300px;padding:8px;border:1px dashed var(--forge-theme-primary);background-color:var(--forge-theme-surface)}.scroll-container{height:250%;width:250%;display:flex;align-items:center;justify-content:center}",u="forge-overlay",P=S("forge-overlay-light-dismiss"),R={title:"Components/Overlay",render:e=>{const t=k(e),r=t?w(t):C,s=m(),n=m(),o={"clipping-container":!0,"force-containment":e.forceContainment,"use-small-container":e.useSmallContainer};window.requestAnimationFrame(()=>{s.value.scrollIntoView({block:"center",inline:"center"})});function c(){n.value.open=!n.value.open}return b`
      <div class=${M(o)} id="clipping-container">
        <div class="scroll-container">
          <forge-button ${l(s)} @click=${c} id="overlay-trigger" variant="raised">Toggle Overlay</forge-button>
          <forge-overlay
            ${l(n)}
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
            style=${r}
            @forge-overlay-light-dismiss=${P}>
            <div class="overlay-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui auctor, ultricies nunc nec, ultricies nunc. Nullam in dui auctor, ultricies nunc nec, ultricies nunc.
            </div>
          </forge-overlay>
        </div>
      </div>
    `},component:u,argTypes:{..._({tagName:u,exclude:["arrowElement","arrowElementOffset","anchorElement","noAnchor","anchor","boundary","boundaryElement","positionStrategy","inline"],controls:{placement:{control:"select",options:d},offset:{control:"object"},hide:{control:"select",options:["anchor-hidden","never"]},flip:{control:"select",options:["auto","main","cross","never"]},fallbackPlacements:{control:"multi-select",options:d}}}),useSmallContainer:{control:"boolean"},forceContainment:{control:"boolean"}},args:{useSmallContainer:!1,forceContainment:!1,open:!1,placement:"bottom",offset:{mainAxis:0,crossAxis:0,alignmentAxis:0},shift:!1,hide:"anchor-hidden",persistent:!1,flip:"auto"}},i={decorators:[E(L)]},a={...j,decorators:[E(`
    .context-menu {
      background-color: var(--forge-theme-surface-container);
      border: var(--forge-border-thin) solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-medium);
      padding: var(--forge-spacing-medium);
    }
  `)],render:()=>(document.addEventListener("contextmenu",V),b`
      <p>Right-click anywhere to open the context menu.</p>

      <forge-overlay id="context-overlay">
        <div class="context-menu">Context menu</div>
      </forge-overlay>
    `)};function V(e){e.preventDefault();const t=document.getElementById("context-overlay");t.open?t.anchorElement=p.fromEvent(e):(t.anchorElement=p.fromEvent(e),t.open=!0)}var f,h,g;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  decorators: [storyStyles(styles)]
}`,...(g=(h=i.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var v,y,x;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(x=(y=a.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const D=["Demo","ContextMenu"],Q=Object.freeze(Object.defineProperty({__proto__:null,ContextMenu:a,Demo:i,__namedExportsOrder:D,default:R},Symbol.toStringTag,{value:"Module"}));export{a as C,i as D,Q as O};
