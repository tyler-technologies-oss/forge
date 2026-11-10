import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-CbV23-8Y.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,p as c,t as l}from"./decorators-DcQFeJ4p.js";import{n as u}from"./when-Daf2bbVy.js";import{t as d}from"./ai-copy-button2-BpXNZp-R.js";var f;function p(){return(p=e((()=>{f=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-label-value {
  --_label-value-align:var(--forge-label-value-align, start);
  --_label-value-label-spacing:var(--forge-label-value-label-spacing, var(--forge-spacing-xxsmall, 4px));
  --_label-value-label-block-start-spacing:var(--forge-label-value-label-block-start-spacing, var(--_label-value-label-spacing));
  --_label-value-label-block-end-spacing:var(--forge-label-value-label-block-end-spacing, var(--_label-value-label-spacing));
  --_label-value-label-color:var(--forge-label-value-label-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
  --_label-value-icon-spacing:var(--forge-label-value-icon-spacing, var(--forge-spacing-xxsmall, 4px));
  --_label-value-inline-label-spacing:var(--forge-label-value-inline-label-spacing, var(--forge-spacing-xsmall, 8px));
  --_label-value-empty-color:var(--forge-label-value-empty-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
  --_label-value-empty-style:var(--forge-label-value-empty-style, italic);
}

.forge-label-value {
  display: inline-block;
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "icon label" "icon value";
}

.forge-label-value--inline {
  display: flex;
  align-items: center;
}

.forge-label-value--inline .forge-label-value__label {
  margin-block: 0;
  margin-inline-end: var(--_label-value-inline-label-spacing);
}

.forge-label-value--empty .forge-label-value__value {
  color: var(--_label-value-empty-color);
  font-style: var(--_label-value-empty-style);
}

.forge-label-value--ellipsis .forge-label-value__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  justify-self: auto;
}

.forge-label-value__icon, .forge-label-value .forge-icon, .forge-label-value forge-icon {
  display: inline-flex;
  grid-area: icon;
  margin-inline-end: var(--_label-value-icon-spacing);
}

.forge-label-value__label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.8125)));
  font-weight: var(--forge-typography-label2-font-weight, 400);
  line-height: var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label2-letter-spacing, 0.0096153846em);
  text-transform: var(--forge-typography-label2-text-transform, inherit);
  text-decoration: var(--forge-typography-label2-text-decoration, inherit);
  grid-area: label;
  justify-self: var(--_label-value-align);
  margin-block-start: var(--_label-value-label-block-start-spacing);
  margin-block-end: var(--_label-value-label-block-end-spacing);
  line-height: normal;
  text-align: var(--_label-value-align);
  overflow-wrap: anywhere;
  color: var(--_label-value-label-color);
}

.forge-label-value__value {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));
  font-weight: var(--forge-typography-body2-font-weight, 400);
  line-height: var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));
  letter-spacing: var(--forge-typography-body2-letter-spacing, 0.015625em);
  text-transform: var(--forge-typography-body2-text-transform, inherit);
  text-decoration: var(--forge-typography-body2-text-decoration, inherit);
  grid-area: value;
  display: grid;
  align-items: center;
  justify-self: var(--_label-value-align);
  line-height: normal;
  text-align: var(--_label-value-align);
  overflow-wrap: anywhere;
}

:host {
  display: block;
}

.forge-label-value {
  grid-template-rows: auto 1fr;
}
.forge-label-value .forge-label-value__value {
  align-self: start;
}

.agent-info-container {
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-medium, 16px);
}

.agent-info-header {
  display: flex;
  gap: var(--forge-spacing-medium, 16px);
}
.agent-info-header .forge-label-value {
  flex: 1 1 0;
  min-width: 0;
}

.agent-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--forge-spacing-medium, 16px);
}

.agent-info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--forge-spacing-medium, 16px);
}

.with-copy-button {
  position: relative;
}
.with-copy-button forge-ai-copy-button {
  position: absolute;
  top: -4px;
  right: 0;
  transform: translateY(50%);
}
.with-copy-button .forge-label-value__value {
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  align-items: center;
  gap: var(--forge-spacing-xsmall, 8px);
}
.with-copy-button .value-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-inline-end: 36px;
}`})))()}var m,h;function g(){return(g=e((()=>{d(),p(),a(),l(),m=`forge-ai-agent-info`,h=class extends i{static{this.styles=r(f)}render(){return this.agentInfo?t`
      <div class="agent-info-container">
        <div class="agent-info-row">
          ${u(this.agentInfo.name,()=>t`
              <div class="forge-label-value">
                <div class="forge-label-value__label">Agent name</div>
                <div class="forge-label-value__value">${this.agentInfo?.name}</div>
              </div>
            `)}
          ${u(this.agentInfo.version,()=>t`
              <div class="forge-label-value">
                <div class="forge-label-value__label">Version</div>
                <div class="forge-label-value__value">${this.agentInfo?.version}</div>
              </div>
            `)}
        </div>
        ${u(this.agentInfo.identifier,()=>t`<div class="forge-label-value with-copy-button">
              <div class="forge-label-value__label">Agent ID</div>
              <div class="forge-label-value__value">
                <span class="value-text">${this.agentInfo?.identifier}</span>
                <forge-ai-copy-button .value=${this.agentInfo?.identifier}></forge-ai-copy-button>
              </div>
            </div>`)}
        ${u(this.agentInfo.threadId,()=>t`<div class="forge-label-value with-copy-button">
              <div class="forge-label-value__label">Session ID</div>
              <div class="forge-label-value__value">
                <span class="value-text">${this.agentInfo?.threadId}</span>
                <forge-ai-copy-button .value=${this.agentInfo?.threadId}></forge-ai-copy-button>
              </div>
            </div>`)}
      </div>
    `:t`${n}`}},o([s({type:Object,attribute:!1})],h.prototype,`agentInfo`,void 0),h=o([c(m)],h)})))()}export{g as t};