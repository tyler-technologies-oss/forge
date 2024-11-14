import{j as e}from"./jsx-runtime-D-LBbuL1.js";import{u as o}from"./index-CFW7vm6F.js";import{ae as t}from"./index-CUxiiUmy.js";import"./iframe-DOkum4dF.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";function s(i){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Getting Started/Accessibility"}),`
`,e.jsx(n.h1,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:`Accessibility is a broad topic that covers many aspects of the web and beyond. The intention of this guide is to introduce you to
general web accessibility and how it relates to using Forge, as well as applications that consume Forge. We will also go into some
common tools that you can use to audit your applications for gaps in accessibility, and some techniques you can use in regards to
web development in general.`}),`
`,e.jsx(n.h2,{id:"forge",children:"Forge"}),`
`,e.jsx(n.p,{children:`The Tyler Forge components library strives to take care of a lot of the underlying accessibility requirements for you, but there are often scenarios
with many components where you may need to provide information that is relative to the context that the components are used in. This is where you can
use the component-specific accessibility guidance to help get the details on how you can do so on a per-component basis.`}),`
`,e.jsx(n.p,{children:`Each component in the library either make use of the proper built-in semantic HTML elements, or will provide the correct ARIA roles and attributes to
create the proper semantic structure.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`We are always looking to improve accessibility across the library. If you find any issues that you think we can take care of at a component-level,
please open an issue or pull request on the GitHub repository to get it taken care of as soon as possible.`}),`
`]}),`
`,e.jsx(n.h2,{id:"tools",children:"Tools"}),`
`,e.jsx(n.p,{children:`There are many tools out there to help you run accessibility audits, and get a general idea of the compliance level for given web page. Below we discuss
some of the more popular tools that we use when testing for accessibility.`}),`
`,e.jsx(n.h3,{id:"axe",children:e.jsx(n.a,{href:"https://www.deque.com/axe/",rel:"nofollow",children:"axe"})}),`
`,e.jsxs(n.p,{children:[`This is probably the most used accessibility tool on the web. It will audit your application and provide the necessary feedback about every possible issue
you could come across. The results are displayed in an easy to read format, and it even provides you with the information you need to understand and fix
the problem. This can be installed as an `,e.jsx(n.a,{href:"https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd",rel:"nofollow",children:"extension"}),`
in your browser.`]}),`
`,e.jsx(n.h3,{id:"axe-core",children:e.jsx(n.a,{href:"https://github.com/dequelabs/axe-core",rel:"nofollow",children:"axe-core"})}),`
`,e.jsx(n.p,{children:`This is the accessibility engine behind the axe. We're mentioning this separately because it is a great tool to integrate into your CI automation to
ensure that you inspect and receive feedback on accessibility as you make changes to your code.`}),`
`,e.jsx(n.h3,{id:"lighthouse",children:e.jsx(n.a,{href:"https://github.com/GoogleChrome/lighthouse",rel:"nofollow",children:"Lighthouse"})}),`
`,e.jsx(n.p,{children:"For those of you that use Chrome, you will find Lighthouse very useful for not only accessibility, but for auditing performance and general best practices."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," the accessibility audits in Lighthouse are run using axe-core!"]}),`
`]}),`
`,e.jsx(n.h3,{id:"storybook",children:e.jsx(n.a,{href:"https://storybook.js.org/",rel:"nofollow",children:"Storybook"})}),`
`,e.jsx(n.p,{children:`This documentation site is created with a tool called Storybook. When viewing the component demos you can view the "Accessibility" tab that displays the
accessibility status of the component in its current state. This can be very useful when developing components in isolation like this to get quick
feedback on compatibility.`}),`
`,e.jsx(n.p,{children:`Storybook is great tool that is not only for library developers, but it can be used in application projects as well to develop specific parts of an
application in isolation and you can take advantage of its vast feature set and various plugins created by the community.`}),`
`,e.jsx(n.h3,{id:"browser",children:"Browser"}),`
`,e.jsx(n.p,{children:`An often overlooked tool is the dev tools panel built-in to most web browsers. For example with Chrome, you can view contrast ratios, landmark elements,
accessibility tree... etc. quick and easily to get a great overall view of your accessibility status.`}),`
`,e.jsx(n.p,{children:`It can also be very useful to search and install web accessibility extensions available to your browser. This will add additional functionality to help
alert you to accessibility problems.`}),`
`,e.jsx(n.h3,{id:"editor",children:"Editor"}),`
`,e.jsx(n.p,{children:`For most editors you will find accessibility extensions that help alert you to accessibility problems as you are writing your code. Visual Studio Code is
our editor of choice and you can install accessibility linting extensions that use other tools such as axe to help give you immediate and accurate feedback.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Do you have any tools that you find useful that may be worth sharing with others? Please feel free to let us know and we'll get it added here!"}),`
`]}),`
`,e.jsx(n.h2,{id:"screen-readers",children:"Screen readers"}),`
`,e.jsx(n.p,{children:`It's very important that we test our applications with an actual screen reader. I suggest you close your eyes when doing this as you'll quickly get a good idea of
how difficult it can be if your page is not properly created with accessibility in mind. If you're having trouble or getting frustrated, imagine how a visually
impaired person might be feel if that's their only option.`}),`
`,e.jsx(n.p,{children:"Below you will find some common screen reader tools that you can use for testing."}),`
`,e.jsx(n.h3,{id:"nvda",children:e.jsx(n.a,{href:"https://www.nvaccess.org/",rel:"nofollow",children:"NVDA"})}),`
`,e.jsx(n.p,{children:"This is a free and open source screen reader for Windows."}),`
`,e.jsx(n.h3,{id:"jaws",children:e.jsx(n.a,{href:"https://www.freedomscientific.com/products/software/jaws/",rel:"nofollow",children:"JAWS"})}),`
`,e.jsx(n.p,{children:"This is another screen reader for Windows that has been around for a long time. It's very popular but will cost money to use."}),`
`,e.jsx(n.h3,{id:"voiceover",children:"VoiceOver"}),`
`,e.jsx(n.p,{children:"This is a great screen reader built-in to many of Apple's operating systems such as macOS."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"There are many browser extensions out there that you can install to be able to quickly enable and test a web page using a slimmed down screen reader."}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best practices"}),`
`,e.jsx(n.p,{children:`Below you will find a list of common accessibility guidance best practices that you should keep in mind when creating components and applications. These items
are commonly found in most applications and provide a great base level set of topics to remember in regards to creating properly accessible web pages.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[`The following list is not meant to be exhaustive, but is a great introduction and/or checklist to consider when building an application or library. For more
detailed information consider researching the topics on the official `,e.jsx(n.a,{href:"https://www.w3.org/WAI/standards-guidelines/wcag/",rel:"nofollow",children:"WCAG website"}),"."]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use heading elements such as ",e.jsx(n.code,{children:"<h1>"})," and ",e.jsx(n.code,{children:"<h2>"})," to create a ",e.jsx(n.strong,{children:"hierarchy"})," of headings rather than using them for styling purposes.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Every page should have an ",e.jsx(n.code,{children:"<h1>"})," tag as the first heading in the hierarchy."]}),`
`,e.jsxs(n.li,{children:["There should only be one ",e.jsx(n.code,{children:"<h1>"})," within a specific hierarchy of headings (note: elements such as dialogs that are appended to the ",e.jsx(n.code,{children:"<body>"})," create a new heading hierarch and can use an ",e.jsx(n.code,{children:"<h1>"})," if so)"]}),`
`,e.jsxs(n.li,{children:["Consider using the Forge ",e.jsx(n.a,{href:"?path=/docs/guides-typography--page",children:"typography"})," styles to create the proper design while keeping your heading hierarchy intact."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Always use ",e.jsx(n.code,{children:"alt"})," text on all images.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If you want the image to be perceived as decorative-only, set an empty ",e.jsx(n.code,{children:"alt"})," attribute: ",e.jsx(n.code,{children:'<img alt="">'})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Use the correct ARIA landmark elements and/or roles.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You should use semantic elements such as ",e.jsx(n.code,{children:"<header>"}),", ",e.jsx(n.code,{children:"<main>"}),", ",e.jsx(n.code,{children:"<footer>"}),", ",e.jsx(n.code,{children:"<aside>"}),"... etc. just to name a few."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Never use color only to convey information.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In addition to color, consider adding a relevant icon potentially."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Always add a label to all form fields.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This is commonly done with the ",e.jsx(n.code,{children:"<label>"})," element, but you can also use ARIA attributes such as ",e.jsx(n.code,{children:"aria-label"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Keep related form fields together.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["It is common to use elements such as ",e.jsx(n.code,{children:"<fieldset>"})," and ",e.jsx(n.code,{children:"<legend>"})," for this."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Focusable fields should always provide a clear focus indicator.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Forge components will handle the dirty work for you on this one, but keep it in mind for your own custom components."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Always ensure sufficient color contrast ratios are met between foreground and background.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Keep in mind that contrast ratios can change based on ",e.jsx(n.code,{children:"font-size"})," in regards to text."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Ensure that your web pages are usable via ",e.jsx(n.strong,{children:"only"})," keyboard and/or screen reader, specifically menus and navigating to relevant content.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is often times a very good indicator of whether a web page is accessible or not. It can be very frustrating for these users if otherwise."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Test your pages on mobile devices.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Learning to use a mobile-first design paradigm will help with this as it becomes built-in as part of your daily development workflow."}),`
`,e.jsx(n.li,{children:"Responsive design can go a long way to helping with this topic."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Last but not least: Take accessibility ",e.jsx(n.strong,{children:"seriously"}),". It cannot be ignored!"]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"}),` don't always assume that UI components you are using from libraries such as Forge are perfect. While we ourselves strive for great accessibility
support, please don't ignore issues you come across with the Forge components. We are guilty of mistakes just as much as anyone else, and we take accessibility
seriously and will get issues resolved quickly.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next steps?"}),`
`,e.jsx(n.p,{children:`Audit your application with the tools listed above, and review the component-specific documentation in this site to ensure that your applications and components
are properly in compliance with WCAG guidelines and best practices. Most issues are fairly quick to fix, and you'll quickly find that the more you pay attention
to accessibility that it becomes part of your normal development routine as you are writing your code.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`If you have any questions at all, or would like feedback on a particular accessibility topic please feel free to reach out to us at any time. We love talking about
and spreading the knowledge of accessibility.`}),`
`]})]})}function m(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{m as default};
