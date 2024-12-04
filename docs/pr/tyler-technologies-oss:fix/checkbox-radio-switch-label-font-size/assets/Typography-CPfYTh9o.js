import{ae as e,af as i,ao as s}from"./index-CWr1otLv.js";import{u as d}from"./index-6hc0jYJf.js";import"./iframe-Bxl6NTqi.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";function n(l){const t={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...d(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started/Typography"}),`
`,e.jsx(t.h1,{id:"typography",children:"Typography"}),`
`,e.jsx(t.p,{children:"Typography defines a set of consistent font styles use throughout your application(s)."}),`
`,e.jsx(t.h2,{id:"font",children:"Font"}),`
`,e.jsxs(t.p,{children:["Forge provides a default font that is available for use in your applications. The default font family is ",e.jsx(t.code,{children:"Roboto"}),"."]}),`
`,e.jsxs(t.p,{children:["The Tyler font is hosted on the Forge CDN, and can be included in your application by adding the following ",e.jsx(t.code,{children:"<link>"})," to your HTML:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"Note: The font includes only the weights and styles from Roboto that are governed by the design system."}),`
`]}),`
`,e.jsx(t.h2,{id:"stylesheet",children:"Stylesheet"}),`
`,e.jsx(t.p,{children:`The Forge typography styles are available as a CSS stylesheet that can be included in your application. The stylesheet includes a
set of classes that can be used to apply the Forge typography styles to your content.`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`@use '@tylertech/forge/dist/typography/forge-typography';
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["Note: When loading this stylesheet, default styles will be automatically applied to the ",e.jsx(t.code,{children:"<body>"})," element to set the ",e.jsx(t.code,{children:"body2"})," style."]}),`
`]}),`
`,e.jsx(t.h2,{id:"semantic-html-vs-typography-styles",children:"Semantic HTML vs Typography Styles"}),`
`,e.jsxs(t.p,{children:["It's important to prioritize using the correct semantic HTML hierarchy over visual typography classes. For example, use ",e.jsx(t.code,{children:"<h1>"}),` for page titles,
`,e.jsx(t.code,{children:"<h2>"}),` for section headings, and so on. Typography classes should then be used for applying the correct design to your page, but it should never
drive which semantic HTML element you use.`]}),`
`,e.jsxs(t.p,{children:["For example, you can create an ",e.jsx(t.code,{children:"<h1>"})," that uses the ",e.jsx(t.code,{children:"heading6"}),` style, and that is perfectly valid. You do not need to need to use a matching
semantic heading element for each typography class.`]}),`
`,e.jsx(t.h2,{id:"scale",children:"Scale"}),`
`,e.jsx(t.p,{children:`Forge uses a typographic scale to define the sizes of text elements. The scale is based on a modular scale, which is a sequence of numbers that
are related to each other by a consistent ratio. This ratio is used to determine the size of each text element in the scale. The scale uses an incremental
numbering system, where the number represents the size of the text element from smallest to largest for each style.`}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"These scale sizes should never drive which semantic HTML element you use."})}),`
`,e.jsx(t.h2,{id:"display",children:"Display"}),`
`,e.jsx(t.p,{children:"Display styles are used for large, prominent text such as page titles and headings."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display1"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display1",children:"Display 1"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display2"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display2",children:"Display 2"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display3"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display3",children:"Display 3"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display4"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display4",children:"Display 4"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display5"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display5",children:"Display 5"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display6"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display6",children:"Display 6"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display7"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display7",children:"Display 7"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--display8"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--display8",children:"Display 8"})})]})]})]})}),`
`,e.jsx(t.h2,{id:"heading",children:"Heading"}),`
`,e.jsx(t.p,{children:"Heading styles are used for page titles and section headings."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading1"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading1",children:"Heading 1"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading2"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading2",children:"Heading 2"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading3"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading3",children:"Heading 3"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading4"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading4",children:"Heading 4"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading5"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading5",children:"Heading 5"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading6"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading6",children:"Heading 6"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading7"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading7",children:"Heading 7"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--heading8"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--heading8",children:"Heading 8"})})]})]})]})}),`
`,e.jsx(t.h2,{id:"subheading",children:"Subheading"}),`
`,e.jsx(t.p,{children:"Subheading styles are used for section subheadings."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading1"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading1",children:"Subheading 1"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading2"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading2",children:"Subheading 2"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading3"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading3",children:"Subheading 3"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading4"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading4",children:"Subheading 4"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading5"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading5",children:"Subheading 5"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading6"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading6",children:"Subheading 6"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading7"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading7",children:"Subheading 7"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--subheading8"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--subheading8",children:"Subheading 8"})})]})]})]})}),`
`,e.jsx(t.h2,{id:"body",children:"Body"}),`
`,e.jsx(t.p,{children:"Body styles are used for paragraph text and general content text."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--body1"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--body1",children:"Body 1"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--body2"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--body2",children:"Body 2"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--body3"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--body3",children:"Body 3"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--body4"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--body4",children:"Body 4"})})]})]})]})}),`
`,e.jsx(t.h2,{id:"label",children:"Label"}),`
`,e.jsx(t.p,{children:"Label styles are used for small text such as form labels and captions."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--label1"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--label1",children:"Label 1"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--label2"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--label2",children:"Label 2"})})]})]})]})}),`
`,e.jsx(t.h2,{id:"button",children:"Button"}),`
`,e.jsx(t.p,{children:"Button styles are used for button text."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsx(t.tbody,{children:e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--button"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--button",children:"Button"})})]})})]})}),`
`,e.jsx(t.h2,{id:"overline",children:"Overline"}),`
`,e.jsx(t.p,{children:"Overline styles are used for small, uppercase text such as section headers."}),`
`,e.jsx(s,{children:e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Class"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Example"})]})}),e.jsx(t.tbody,{children:e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"forge-typography--overline"})}),e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx("div",{className:"forge-typography--overline",children:"Overline"})})]})})]})}),`
`,e.jsx("style",{children:`
.sb-unstyled table {
  border-collapse: collapse;
}

.sb-unstyled table tr th:first-of-type {
  width: 320px;
}

.sb-unstyled table tr:not(:last-of-type) td {
  border-bottom: 1px solid var(--forge-theme-outline);
}

.sb-unstyled table tr td > div {
  min-height: 48px;
  align-content: center;
}

.section:not(:last-of-type) {
  margin-block-end: var(--forge-spacing-large);
}
`})]})}function p(l={}){const{wrapper:t}={...d(),...l.components};return t?e.jsx(t,{...l,children:e.jsx(n,{...l})}):n(l)}export{p as default};
