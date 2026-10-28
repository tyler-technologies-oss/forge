import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{a as u,c as d,i as f,l as p,n as m,o as h,r as g,s as _,t as v}from"./Listbox.stories-jDfTIV_2.js";function y(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:u}),`
`,(0,x.jsx)(o,{}),`
`,(0,x.jsx)(n.p,{children:`Listboxes allow users to select one or more options from a list.`}),`
`,(0,x.jsx)(a,{of:v}),`
`,(0,x.jsx)(n.h2,{id:`multiple-selection`,children:`Multiple Selection`}),`
`,(0,x.jsxs)(n.p,{children:[`Set `,(0,x.jsx)(n.code,{children:`multiple`}),` to allow more than one option to be selected at a time. When `,(0,x.jsx)(n.code,{children:`multiple`}),` is set, the
`,(0,x.jsx)(n.code,{children:`value`}),` property contains an array of selected values.`]}),`
`,(0,x.jsx)(a,{of:h}),`
`,(0,x.jsx)(n.h2,{id:`dense`,children:`Dense`}),`
`,(0,x.jsxs)(n.p,{children:[`Set `,(0,x.jsx)(n.code,{children:`dense`}),` for a compact listbox.`]}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsx)(n.h2,{id:`disabled`,children:`Disabled`}),`
`,(0,x.jsxs)(n.p,{children:[`Individual options can be disabled by setting `,(0,x.jsx)(n.code,{children:`disabled`}),` directly on a `,(0,x.jsx)(n.code,{children:`<forge-option>`}),` element.
Disabled options cannot be selected, and are skipped when navigating with the keyboard.`]}),`
`,(0,x.jsxs)(n.p,{children:[`To disable the entire listbox, set `,(0,x.jsx)(n.code,{children:`disabled`}),` on the `,(0,x.jsx)(n.code,{children:`<forge-listbox>`}),` element instead.`]}),`
`,(0,x.jsx)(a,{of:g}),`
`,(0,x.jsx)(n.h2,{id:`option-groups`,children:`Option Groups`}),`
`,(0,x.jsxs)(n.p,{children:[`Related options can be grouped together with a label by using the
`,(0,x.jsx)(n.a,{href:`?path=/docs/components-option--docs`,children:`<forge-option-group>`}),` component. Provide the group's
label via the `,(0,x.jsx)(n.code,{children:`label`}),` slot.`]}),`
`,(0,x.jsx)(a,{of:d}),`
`,(0,x.jsx)(n.h2,{id:`reordering`,children:`Reordering`}),`
`,(0,x.jsxs)(n.p,{children:[`Set `,(0,x.jsx)(n.code,{children:`reorderable`}),` to allow options to be reordered within the listbox via drag and drop. Dropped
options are not automatically rearranged in the listbox. You'll need to use information provided in
the `,(0,x.jsx)(n.code,{children:`forge-listbox-drop`}),` event to rearrange the DOM elements via your own script.`]}),`
`,(0,x.jsx)(n.p,{children:`When reordering is enabled, be sure to also include buttons alongside the listbox to allow users to
accessibly reorder the options without relying solely on drag and drop.`}),`
`,(0,x.jsx)(a,{of:_}),`
`,(0,x.jsx)(n.h2,{id:`dragging-between-listboxes`,children:`Dragging Between Listboxes`}),`
`,(0,x.jsxs)(n.p,{children:[`Options can be dragged from one listbox to another. Both listboxes must opt in: set `,(0,x.jsx)(n.code,{children:`drag-link`}),` on
the source listbox with a space-separated list of target listbox `,(0,x.jsx)(n.code,{children:`id`}),`s that it's allowed to drop
into, and set `,(0,x.jsx)(n.code,{children:`drop-link`}),` on the target listbox with a space-separated list of source listbox
`,(0,x.jsx)(n.code,{children:`id`}),`s that are allowed to drop into it.`]}),`
`,(0,x.jsxs)(n.p,{children:[`When an option is dropped, the target listbox dispatches a `,(0,x.jsx)(n.code,{children:`forge-listbox-drop`}),` event and the
source listbox dispatches a `,(0,x.jsx)(n.code,{children:`forge-listbox-drag-out`}),` event.`]}),`
`,(0,x.jsx)(a,{of:f}),`
`,(0,x.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,x.jsx)(l,{}),`
`,(0,x.jsx)(n.h2,{id:`keyboard-shortcuts`,children:`Keyboard Shortcuts`}),`
`,(0,x.jsxs)(n.table,{children:[(0,x.jsx)(n.thead,{children:(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.th,{style:{textAlign:`left`},children:`Name`}),(0,x.jsx)(n.th,{style:{textAlign:`left`},children:`Description`})]})}),(0,x.jsxs)(n.tbody,{children:[(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`arrow up / arrow down`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Moves focus to the previous/next option, wrapping at the ends.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`home`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Moves focus to the first option.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`end`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Moves focus to the last option.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`space / enter`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Selects the focused option.`})]})]})]}),`
`,(0,x.jsx)(n.h3,{id:`multiple-selection-1`,children:`Multiple Selection`}),`
`,(0,x.jsxs)(n.table,{children:[(0,x.jsx)(n.thead,{children:(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.th,{style:{textAlign:`left`},children:`Name`}),(0,x.jsx)(n.th,{style:{textAlign:`left`},children:`Description`})]})}),(0,x.jsxs)(n.tbody,{children:[(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`ctrl/cmd + a`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Selects all options.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`shift + arrow up`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Moves focus to and toggles selection of the previous option.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`shift + arrow down`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Moves focus to and toggles selection of the next option.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`shift + space`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Selects all options between the last selected option and the focused option.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`ctrl/cmd + shift + home`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Selects all options between the focused option and the first option. Moves focus to the first option.`})]}),(0,x.jsxs)(n.tr,{children:[(0,x.jsx)(n.td,{style:{textAlign:`left`},children:(0,x.jsx)(n.code,{children:`ctrl/cmd + shift + end`})}),(0,x.jsx)(n.td,{style:{textAlign:`left`},children:`Selects all options between the focused option and the last option. Moves focus to the last option.`})]})]})]}),`
`,(0,x.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`The listbox automatically applies the `,(0,x.jsx)(n.code,{children:`listbox`}),` role, along with the appropriate
`,(0,x.jsx)(n.code,{children:`aria-multiselectable`}),`, `,(0,x.jsx)(n.code,{children:`aria-disabled`}),`, and `,(0,x.jsx)(n.code,{children:`aria-readonly`}),` attributes based on its current
state.`]}),`
`,(0,x.jsxs)(n.li,{children:[`Ensure that the listbox is labelled with a visible label or an `,(0,x.jsx)(n.code,{children:`aria-label`}),` or `,(0,x.jsx)(n.code,{children:`aria-labelledby`}),`
attribute.`]}),`
`,(0,x.jsx)(n.li,{children:`If a listbox allows options to be reordered or moved to another listbox, ensure that the
functionality is available without requiring users to drag and drop options. As an example, you
may provide clearly labeled buttons alongside the listbox to shift a selected option up or down,
or to move it to another listbox.`}),`
`]})]})}function b(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,x.jsx)(n,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=r(),n(),i(),c(),p()})))()}S();export{b as default};