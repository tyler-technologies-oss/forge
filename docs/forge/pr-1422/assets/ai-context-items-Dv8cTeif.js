import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-CbV23-8Y.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,p as c,t as l}from"./decorators-DcQFeJ4p.js";import{t as u}from"./ai-context-chip-D4RVdIn5.js";var d;function f(){return(f=e((()=>{d=`:host {
  display: block;
  min-width: 0;
}

.context-items {
  display: grid;
  gap: var(--forge-spacing-xxsmall, 4px);
  min-width: 0;
  padding: var(--forge-spacing-xsmall, 8px);
  padding-block-end: 0;
}

.context-list::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.context-list::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.context-list::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.context-list::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.context-list::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.context-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.context-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--forge-spacing-xsmall, 8px);
  padding-block-end: var(--forge-spacing-xxsmall, 4px);
  overflow-y: auto;
  max-height: 75px;
}`})))()}var p,m;function h(){return(h=e((()=>{u(),f(),a(),l(),p=`forge-ai-context-items`,m=class extends i{constructor(...e){super(...e),this.items=[]}static{this.styles=r(d)}#e(e){this.dispatchEvent(new CustomEvent(`forge-ai-context-items-remove`,{detail:{id:e.detail.id,item:e.detail.item},bubbles:!0,composed:!0}))}get#t(){return t`
      ${this.items.map(e=>t`
          <forge-ai-context-chip
            .id=${e.id}
            .label=${e.label}
            .sublabel=${e.sublabel}
            .type=${e.type}
            ?loading=${e.loading??!1}
            .removable=${e.removable??!0}
            @forge-ai-context-chip-remove=${this.#e}>
          </forge-ai-context-chip>
        `)}
    `}render(){return this.items.length===0?n:t`
      <div class="context-items">
        <div class="context-list">${this.#t}</div>
      </div>
    `}},o([s({attribute:!1})],m.prototype,`items`,void 0),m=o([c(p)],m)})))()}function g(){return(g=e((()=>{h()})))()}export{g as t};