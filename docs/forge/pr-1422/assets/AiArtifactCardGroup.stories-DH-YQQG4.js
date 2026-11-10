import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{T as i,_ as a,g as o}from"./iframe-CbV23-8Y.js";import{t as s}from"./decorate-2OK4V6AF.js";import{a as c,d as l,p as u,t as d}from"./decorators-DcQFeJ4p.js";import{o as f,t as p}from"./icon-DTOjPWy9.js";import{_ as m,an as h,t as g}from"./tyler-icons-kuH1S-j5.js";import{n as _,r as v,t as y}from"./ai-artifact-card-BGnDuJjZ.js";var b;function x(){return(x=e((()=>{b=`@keyframes forge-focus-indicator-outward-grow {
  from {
    outline-width: 0;
  }
  to {
    outline-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-outward-shrink {
  from {
    outline-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-inward-grow {
  from {
    border-width: 0;
  }
  to {
    border-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-inward-shrink {
  from {
    border-width: var(--_focus-indicator-active-width);
  }
}
:host {
  display: block;
}

.artifact-card-group {
  overflow: hidden;
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: var(--forge-ai-artifact-card-group-border-radius, 12px);
  background: var(--forge-theme-surface, #ffffff);
}

/*
 * Every row carries a top divider and the list is pulled up by one pixel so the first visible row's
 * divider hides under the group border, whichever row that is once cards are hidden or collapsed.
 */
.list {
  margin-top: -1px;
}

::slotted(*) {
  border-top: 1px solid var(--forge-theme-outline, #e0e0e0);
}

/*
 * Rows meeting the group's rounded corners get its inner radius for their focus rings. The bottom row only
 * does when no toggle sits below it.
 */
.list ::slotted(:nth-child(1 of :not([hidden], [data-collapsed]))) {
  --_forge-ai-artifact-card-group-start-radius: calc(var(--forge-ai-artifact-card-group-border-radius, 12px) - 1px);
}

.artifact-card-group:not(:has(.toggle)) ::slotted(:nth-last-child(1 of :not([hidden], [data-collapsed]))) {
  --_forge-ai-artifact-card-group-end-radius: calc(var(--forge-ai-artifact-card-group-border-radius, 12px) - 1px);
}

.toggle {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
  width: 100%;
  min-height: var(--forge-spacing-xxlarge, 48px);
  padding: var(--forge-spacing-small, 12px);
  border: none;
  border-top: 1px solid var(--forge-theme-outline, #e0e0e0);
  background: transparent;
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
  text-align: start;
  cursor: pointer;
  outline: none;
  --_state-layer-display: var(--forge-state-layer-display, flex);
  --_state-layer-color: var(--forge-state-layer-color, var(--forge-theme-on-surface, #000000));
  --_state-layer-hover-color: var(--forge-state-layer-hover-color, var(--_state-layer-color));
  --_state-layer-hover-opacity: var(--forge-state-layer-hover-opacity, 0.08);
  --_state-layer-pressed-color: var(--forge-state-layer-pressed-color, var(--_state-layer-color));
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.12);
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 15ms);
  --_state-layer-pressed-duration: var(--forge-state-layer-pressed-duration, 105ms);
  --_state-layer-animation-duration: var(--forge-state-layer-animation-duration, 375ms);
}
.toggle::before {
  opacity: 0;
  position: absolute;
  backface-visibility: hidden;
  transform: translateZ(0);
  background-color: var(--_state-layer-hover-color);
  inset: 0;
  transition: opacity var(--_state-layer-hover-duration) linear, background-color var(--_state-layer-hover-duration) linear;
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 100ms);
  content: "";
  opacity: 0;
  border-radius: inherit;
}
.toggle:hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}
.toggle:active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.18);
}

.toggle svg {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.focus-indicator {
  position: absolute;
  display: none;
}

/* The toggle is always the bottom row, so its lower corners follow the group's inner radius */
.toggle:focus-visible .focus-indicator {
  --_focus-indicator-display: var(--forge-focus-indicator-display, flex);
  --_focus-indicator-width: var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));
  --_focus-indicator-active-width: var(--forge-focus-indicator-active-width, 6px);
  --_focus-indicator-color: var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
  --_focus-indicator-shape: var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));
  --_focus-indicator-duration: var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, 600ms));
  --_focus-indicator-easing: var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)));
  --_focus-indicator-shape-start-start: var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));
  --_focus-indicator-shape-start-end: var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-end: var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-start: var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));
  --_focus-indicator-outward-offset: var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));
  --_focus-indicator-inward-offset: var(--forge-focus-indicator-inward-offset, 0px);
  --_focus-indicator-offset-block: var(--forge-focus-indicator-offset-block, 0);
  --_focus-indicator-offset-inline: var(--forge-focus-indicator-offset-inline, 0);
  animation-delay: 0s, calc(var(--_focus-indicator-duration) * 0.25);
  animation-duration: calc(var(--_focus-indicator-duration) * 0.25), calc(var(--_focus-indicator-duration) * 0.75);
  animation-timing-function: var(--_focus-indicator-easing);
  box-sizing: border-box;
  color: var(--_focus-indicator-color);
  display: none;
  pointer-events: none;
  position: absolute;
  margin-block: var(--_focus-indicator-offset-block);
  margin-inline: var(--_focus-indicator-offset-inline);
  animation-name: forge-focus-indicator-inward-grow, forge-focus-indicator-inward-shrink;
  border-end-end-radius: calc(var(--_focus-indicator-shape-end-end) - var(--_focus-indicator-inward-offset));
  border-end-start-radius: calc(var(--_focus-indicator-shape-end-start) - var(--_focus-indicator-inward-offset));
  border-start-end-radius: calc(var(--_focus-indicator-shape-start-end) - var(--_focus-indicator-inward-offset));
  border-start-start-radius: calc(var(--_focus-indicator-shape-start-start) - var(--_focus-indicator-inward-offset));
  border: var(--_focus-indicator-width) solid currentColor;
  inset: var(--_focus-indicator-inward-offset);
  display: block;
  --forge-focus-indicator-shape-start-start: 0px;
  --forge-focus-indicator-shape-start-end: 0px;
  --forge-focus-indicator-shape-end-start: calc(var(--forge-ai-artifact-card-group-border-radius, 12px) - 1px);
  --forge-focus-indicator-shape-end-end: calc(var(--forge-ai-artifact-card-group-border-radius, 12px) - 1px);
}`})))()}var S,C,w;function T(){return(T=e((()=>{v(),x(),o(),d(),S=`forge-ai-artifact-card-group`,C=3,w=class extends a{constructor(...e){super(...e),this.visibleCount=C,this.expanded=!1,this.showMoreText=`{count} more`,this.showLessText=`Show less`,this.#r=n`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,this.#i=n`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M13.5 11.25L9 6.75L4.5 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `}static{this.styles=i(b)}get#e(){return this._cards.filter(e=>!e.hidden)}get#t(){return Number.isFinite(this.visibleCount)?Math.max(1,Math.floor(this.visibleCount)):C}get#n(){return Math.max(0,this.#e.length-this.#t)}#r;#i;updated(e){super.updated(e),this.#a()}#a(){this.#e.forEach((e,t)=>{e.toggleAttribute(_,!this.expanded&&t>=this.#t)})}#o(){this.requestUpdate()}#s(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent(`forge-ai-artifact-card-group-toggle`,{detail:{expanded:this.expanded},bubbles:!0,composed:!0}))}get#c(){if(this.#n===0)return r;let e=this.expanded?this.showLessText:this.showMoreText.replace(`{count}`,String(this.#n));return n`
      <button class="toggle" type="button" aria-expanded=${this.expanded} @click=${this.#s}>
        ${this.expanded?this.#i:this.#r}
        <span>${e}</span>
        <span class="focus-indicator"></span>
      </button>
    `}render(){return n`
      <div class="artifact-card-group">
        <div class="list" role="list">
          <slot @slotchange=${this.#o}></slot>
        </div>
        ${this.#c}
      </div>
    `}},s([l({type:Number,attribute:`visible-count`})],w.prototype,`visibleCount`,void 0),s([l({type:Boolean,reflect:!0})],w.prototype,`expanded`,void 0),s([l({attribute:`show-more-text`})],w.prototype,`showMoreText`,void 0),s([l({attribute:`show-less-text`})],w.prototype,`showLessText`,void 0),s([c({selector:`forge-ai-artifact-card`,flatten:!0})],w.prototype,`_cards`,void 0),w=s([u(S)],w)})))()}function E(){return(E=e((()=>{T()})))()}var D=t({ActiveRow:()=>L,Demo:()=>P,Expanded:()=>I,FitsWithoutToggle:()=>F,__namedExportsOrder:()=>R,default:()=>N});function O(e,t=-1){return M.slice(0,e).map((e,r)=>n`
      <forge-ai-artifact-card
        title-text=${e.title}
        subtitle-text=${e.subtitle}
        asset-id="result-${r+1}"
        ?active=${r===t}
        @forge-ai-artifact-card-open=${k(`forge-ai-artifact-card-open`)}>
        <forge-icon slot="icon" name=${e.icon}></forge-icon>
      </forge-ai-artifact-card>
    `)}var k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{o(),p(),g(),y(),E(),{action:k}=__STORYBOOK_MODULE_ACTIONS__,f.define([m,h]),A=`forge-ai-artifact-card-group`,j=n`<style>
  .artifact-card-group-story {
    max-inline-size: 480px;
  }
</style>`,M=[{title:`Traffic collisions by intersection`,subtitle:`Table · 2024 Collision Records · 1,284 rows`,icon:`table`},{title:`Collisions by month`,subtitle:`Chart · 2024 Collision Records`,icon:`bar_chart`},{title:`Injury collisions near schools`,subtitle:`Table · 2024 Collision Records · 212 rows`,icon:`table`},{title:`Q4 collision summary`,subtitle:`Report · 4 charts`,icon:`bar_chart`},{title:`Pedestrian collisions by district`,subtitle:`Table · 2024 Collision Records · 96 rows`,icon:`table`},{title:`Collisions by weather condition`,subtitle:`Chart · 2024 Collision Records`,icon:`bar_chart`}],N={title:`AI/Components/Artifacts/Artifact Card Group`,render:e=>n`
    ${j}
    <forge-ai-artifact-card-group
      class="artifact-card-group-story"
      visible-count=${e.visibleCount}
      ?expanded=${e.expanded}
      show-more-text=${e.showMoreText}
      show-less-text=${e.showLessText}
      @forge-ai-artifact-card-group-toggle=${k(`forge-ai-artifact-card-group-toggle`)}>
      ${O(e.cardCount)}
    </forge-ai-artifact-card-group>
  `,component:A,argTypes:{cardCount:{control:{type:`range`,min:1,max:M.length},description:`Story only: how many cards to render`},visibleCount:{control:{type:`number`,min:1},description:`How many cards show while the list is collapsed`},expanded:{control:`boolean`,description:`Whether every card is showing`},showMoreText:{control:`text`,description:"Label of the toggle while collapsed. `{count}` is replaced with the number of hidden cards"},showLessText:{control:`text`,description:`Label of the toggle while expanded`}},args:{cardCount:6,visibleCount:3,expanded:!1,showMoreText:`{count} more`,showLessText:`Show less`}},P={},F={args:{cardCount:3}},I={args:{expanded:!0}},L={render:()=>n`${j}<forge-ai-artifact-card-group class="artifact-card-group-story">${O(3,1)}</forge-ai-artifact-card-group> `},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    cardCount: 3
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    expanded: true
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:'{\n  render: () => html`${storyStyles}<forge-ai-artifact-card-group class="artifact-card-group-story">${renderCards(3, 1)}</forge-ai-artifact-card-group> `\n}',...L.parameters?.docs?.source}}},R=[`Demo`,`FitsWithoutToggle`,`Expanded`,`ActiveRow`]})))()}export{z as a,F as i,D as n,P as r,L as t};