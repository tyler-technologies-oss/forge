import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-BbUsXXnT.js";import{t as a}from"./decorate-2OK4V6AF.js";import{p as o,r as s,t as c}from"./decorators-Ci1onliJ.js";import{n as l}from"./when-Daf2bbVy.js";import{t as u}from"./ai-gradient-container2-By0vINXT.js";var d;function f(){return(f=e((()=>{d=`:host {
  display: block;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  --_ai-chat-interface-message-container-padding: 0;
}

.ai-chat-interface {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  color: var(--forge-theme-on-surface, #000000);
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(to top, var(--forge-theme-primary-container-minimum, #f7f8fc), var(--forge-theme-surface, #ffffff));
  border-radius: inherit;
  overflow: hidden;
}

.messages-container::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.messages-container::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.messages-container::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.messages-container::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.messages-container::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.messages-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.messages-container {
  padding: var(--forge-ai-chat-interface-message-container-padding, var(--_ai-chat-interface-message-container-padding));
  overflow-y: auto;
  display: grid;
  flex-grow: 1;
  gap: var(--forge-spacing-medium, 16px);
}
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .messages-container {
      overflow-y: scroll;
    }
  }
}

.suggestions-container {
  padding-inline: var(--forge-spacing-medium, 16px);
  padding-block-start: var(--forge-spacing-medium, 16px);
}

.attachments-container {
  padding-block-end: var(--forge-spacing-medium, 16px);
  padding: var(--forge-spacing-xsmall, 8px) var(--forge-spacing-medium, 16px) 0;
}

.prompt-container {
  padding: var(--forge-spacing-medium, 16px);
}`})))()}var p,m;function h(){return(h=e((()=>{u(),f(),i(),c(),p=`forge-ai-chat-interface`,m=class extends r{static{this.styles=n(d)}#e=t`<slot name="header" @slotchange=${this.#c}></slot>`;#t=t`<slot name="attachments" @slotchange=${this.#c}></slot>`;#n=t`<slot name="suggestions" @slotchange=${this.#c}></slot>`;get#r(){let e=this._slottedSuggestionsNodes.length>0;return l(e,()=>t`<div class="suggestions-container">${this.#n}</div>`,()=>this.#n)}get#i(){let e=this._slottedAttachmentsNodes.length>0;return l(e,()=>t`<div class="attachments-container">${this.#t}</div>`,()=>t`${this.#t}`)}#a=t`<slot name="prompt" @slotchange=${this.#c}></slot>`;get#o(){return this.#a}get#s(){return t`
      <div class="messages-container" part="messages">
        <slot @slotchange=${this.#c}></slot>
      </div>
    `}#c(e){let t=e.target.name;[`header`,`suggestions`,`prompt`,`attachments`].includes(t)&&this.requestUpdate()}scrollToBottom(){let e=this.shadowRoot?.querySelector(`.messages-container`);e?.scrollTo({top:e.scrollHeight,behavior:`smooth`})}render(){return t`
      <div class="ai-chat-interface">
        ${this.#e} ${this.#s} ${this.#r} ${this.#i}
        <div class="prompt-container">
          ${this.#o}
          <slot name="disclaimer"></slot>
        </div>
      </div>
    `}},a([s({slot:`suggestions`,flatten:!0})],m.prototype,`_slottedSuggestionsNodes`,void 0),a([s({slot:`attachments`,flatten:!0})],m.prototype,`_slottedAttachmentsNodes`,void 0),m=a([o(p)],m)})))()}function g(){return(g=e((()=>{h()})))()}export{g as t};