import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./AiThreadsSearch.stories-vWt3_Ufa.js";function _(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:g}),`
`,(0,y.jsx)(o,{}),`
`,(0,y.jsxs)(n.p,{children:[`A searchable list of past conversations with an optional back button and "New chat" button. Use it for a chat history view. It renders the `,(0,y.jsx)(n.code,{children:`threads`}),` you give it and reports user intent through events, so your app owns loading and persistence.`]}),`
`,(0,y.jsx)(a,{of:f}),`
`,(0,y.jsx)(n.h2,{id:`search`,children:`Search`}),`
`,(0,y.jsxs)(n.p,{children:[`By default the list filters `,(0,y.jsx)(n.code,{children:`threads`}),` by title as the user types. To search elsewhere (for example on a server), cancel `,(0,y.jsx)(n.code,{children:`forge-ai-threads-search-query`}),` with `,(0,y.jsx)(n.code,{children:`preventDefault()`}),` and pass results to `,(0,y.jsx)(n.code,{children:`setResults`}),` in the event detail.`]}),`
`,(0,y.jsx)(a,{of:d}),`
`,(0,y.jsx)(n.pre,{children:(0,y.jsx)(n.code,{className:`language-ts`,children:`threadsSearch.addEventListener('forge-ai-threads-search-query', evt => {
  evt.preventDefault();
  const { query, setResults } = evt.detail;
  fetchThreads(query).then(setResults);
});
`})}),`
`,(0,y.jsx)(n.h2,{id:`paging`,children:`Paging`}),`
`,(0,y.jsxs)(n.p,{children:[`Set `,(0,y.jsx)(n.code,{children:`total-chats`}),` to the full count to enable infinite scroll, and append more with `,(0,y.jsx)(n.code,{children:`appendResults`}),` from the `,(0,y.jsx)(n.code,{children:`forge-ai-threads-search-load-more`}),` event.`]}),`
`,(0,y.jsx)(a,{of:u}),`
`,(0,y.jsx)(n.h2,{id:`renaming-and-deleting`,children:`Renaming and deleting`}),`
`,(0,y.jsxs)(n.p,{children:[`Set `,(0,y.jsx)(n.code,{children:`show-thread-rename`}),` and `,(0,y.jsx)(n.code,{children:`show-thread-delete`}),` to show a per-thread menu. The rename and delete events are cancelable. Cancel one to handle the change yourself, then call `,(0,y.jsx)(n.code,{children:`onSuccess()`}),` or `,(0,y.jsx)(n.code,{children:`onError()`}),` from the event detail. Cancel `,(0,y.jsx)(n.code,{children:`forge-ai-threads-search-delete-confirm`}),` to show your own confirmation, then call `,(0,y.jsx)(n.code,{children:`confirmThreadDelete(thread)`}),` once accepted.`]}),`
`,(0,y.jsx)(a,{of:p}),`
`,(0,y.jsx)(n.h2,{id:`errors`,children:`Errors`}),`
`,(0,y.jsxs)(n.p,{children:[`Set `,(0,y.jsx)(n.code,{children:`error-message`}),` when a load fails. It shows a retry banner, or a compact line above or below the list if threads are already loaded. Clear it once the retry succeeds.`]}),`
`,(0,y.jsx)(a,{of:m}),`
`,(0,y.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,y.jsx)(l,{})]})}function v(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,y.jsx)(n,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=r(),n(),i(),c(),h()})))()}b();export{v as default};