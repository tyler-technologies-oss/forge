import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,u as a}from"./blocks-DnEL0lHT.js";function o(e){let n={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`AI/React`}),`
`,(0,c.jsx)(n.h1,{id:`react`,children:`React`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`@tylertech/forge-ai`}),` ships typings for using its elements directly in `,(0,c.jsx)(n.strong,{children:`React 19`}),` JSX. There is no wrapper package: React 19 supports custom elements natively, so you render `,(0,c.jsx)(n.code,{children:`<forge-ai-prompt>`}),` and friends as-is.`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`React 19 is required.`}),` React 18 stringifies object props, does not attach `,(0,c.jsx)(n.code,{children:`on<event>`}),` props as listeners, and renders `,(0,c.jsx)(n.code,{children:`className`}),` literally instead of `,(0,c.jsx)(n.code,{children:`class`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`setup`,children:`Setup`}),`
`,(0,c.jsxs)(n.p,{children:[`Add the typings to `,(0,c.jsx)(n.code,{children:`compilerOptions.types`}),` in your `,(0,c.jsx)(n.code,{children:`tsconfig.json`}),`:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-json`,children:`{
  "compilerOptions": {
    "types": ["@tylertech/forge-ai/jsx"]
  }
}
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Setting `,(0,c.jsx)(n.code,{children:`types`}),` turns off automatic inclusion of other `,(0,c.jsx)(n.code,{children:`@types/*`}),` packages, so list the ones you need too (for example `,(0,c.jsx)(n.code,{children:`"types": ["node", "@tylertech/forge-ai/jsx"]`}),`).`]}),`
`,(0,c.jsx)(n.h2,{id:`registering-elements`,children:`Registering elements`}),`
`,(0,c.jsx)(n.p,{children:`The typings do not load the components. Register each element with a side-effect import:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`import '@tylertech/forge-ai/ai-prompt';

export function Chat() {
  return <forge-ai-prompt placeholder="Ask a question..." />;
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`properties`,children:`Properties`}),`
`,(0,c.jsx)(n.p,{children:`Use the camelCase property names. They are type-checked and work for every value type (arrays, objects, booleans, strings):`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`import type { MessageItem } from '@tylertech/forge-ai/types';

const items: MessageItem[] = [];

<forge-ai-message-thread messageItems={items} enableReactions />
`})}),`
`,(0,c.jsx)(n.p,{children:`TypeScript does not check hyphenated JSX attribute names, so a misspelled kebab-case attribute compiles silently. Prefer camelCase.`}),`
`,(0,c.jsxs)(n.p,{children:[`Booleans that default to `,(0,c.jsx)(n.code,{children:`true`}),` (for example `,(0,c.jsx)(n.code,{children:`cancelOnEscape`}),` on `,(0,c.jsx)(n.code,{children:`forge-ai-prompt`}),`) cannot be turned off with an attribute. Pass `,(0,c.jsx)(n.code,{children:`false`}),` as a property: `,(0,c.jsx)(n.code,{children:`<forge-ai-prompt cancelOnEscape={false} />`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`events`,children:`Events`}),`
`,(0,c.jsxs)(n.p,{children:[`Event props are `,(0,c.jsx)(n.code,{children:`on`}),` plus the event name exactly as dispatched, with no case conversion:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`<forge-ai-prompt onforge-ai-prompt-send={event => console.log(event.detail.value)} />
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`onForgeAiPromptSend`}),` does not work. As with attributes, a typo in a hyphenated event name is not caught by TypeScript, so copy event names from the component API tables.`]}),`
`,(0,c.jsx)(n.h2,{id:`refs`,children:`Refs`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`ref`}),` is typed to the element class, which gives you its full public API:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`import { useRef } from 'react';
import type { AiPromptComponent } from '@tylertech/forge-ai/ai-prompt';

const prompt = useRef<AiPromptComponent>(null);

<forge-ai-prompt ref={prompt} />;

prompt.current?.focus();
`})}),`
`,(0,c.jsx)(n.h2,{id:`slots`,children:`Slots`}),`
`,(0,c.jsxs)(n.p,{children:[`Use the standard `,(0,c.jsx)(n.code,{children:`slot`}),` attribute on children:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`<forge-ai-prompt>
  <forge-icon-button slot="actions" />
</forge-ai-prompt>
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};