import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-B8S20_VI.js";import{t as a}from"./esm-OTWZXAw3.js";import{t as o}from"./features-DPIoBwSZ.js";var s=t({BasicUsage:()=>_,ContentValidation:()=>y,Demo:()=>g,DisabledState:()=>b,FullFeatured:()=>v,PasteHandling:()=>C,PrePopulatedContent:()=>S,ReadOnlyState:()=>x,__namedExportsOrder:()=>w,default:()=>h}),c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{i(),a(),o(),{action:c}=__STORYBOOK_MODULE_ACTIONS__,l=`forge-rich-text-editor`,u=c(`change`),d=c(`validation`),f=c(`initialized`),p=c(`initialization-error`),m=c(`error`),h={title:`Rich Text Editor/Editor`,render:e=>n`
    <forge-rich-text-editor
      .content=${e.content}
      .disabled=${e.disabled}
      .readOnly=${e.readOnly}
      .maxLength=${e.maxLength}
      .errorMessage=${e.errorMessage}
      .showCharacterCount=${e.showCharacterCount}
      .showWordCount=${e.showWordCount}
      .allowPasteFormatting=${e.allowPasteFormatting}
      .allowPasteImages=${e.allowPasteImages}
      @change=${u}
      @validation=${d}
      @initialized=${f}
      @initialization-error=${p}
      @error=${m}>
      <forge-rte-standard-tools></forge-rte-standard-tools>
      ${e.showAdditionalFeatures?n`
            <forge-rte-divider></forge-rte-divider>
            <forge-rte-code></forge-rte-code>
            <forge-rte-link .autoProtocol=${e.autoProtocol}></forge-rte-link>
          `:r}
    </forge-rich-text-editor>
  `,component:l,subcomponents:{Renderer:`forge-rich-text-renderer`,Context:`forge-rich-text-context`,Content:`forge-rich-text-content`},argTypes:{content:{control:`text`,description:`The editor content. Accepts an HTML string or a ProseMirror document.`},disabled:{control:`boolean`,description:`Whether the editor is disabled`},readOnly:{control:`boolean`,description:`Whether the editor is in readonly mode`},maxLength:{control:`number`,description:`Maximum character length allowed (0 = no limit)`},errorMessage:{control:`text`,description:`Custom error message to display when validation fails`},showCharacterCount:{control:`boolean`,description:`Whether to show character count below the editor`},showWordCount:{control:`boolean`,description:`Whether to show word count below the editor`},allowPasteFormatting:{control:`boolean`,description:`Whether pasted content retains formatting (false = plain text only)`},allowPasteImages:{control:`boolean`,description:`Preserves img elements through paste sanitization. No image extension is registered, so the schema still discards them - this option currently has no observable effect.`},showAdditionalFeatures:{control:`boolean`,description:`Show the code and link features in addition to the standard tools`},autoProtocol:{control:`boolean`,description:`Whether to automatically add https:// to a link URL that has no protocol`}},args:{content:``,disabled:!1,readOnly:!1,maxLength:0,errorMessage:``,showCharacterCount:!1,showWordCount:!1,allowPasteFormatting:!0,allowPasteImages:!1,showAdditionalFeatures:!0,autoProtocol:!0}},g={},_={args:{showAdditionalFeatures:!1},parameters:{docs:{description:{story:`A rich text editor with only the standard formatting tools. This is the recommended starting point for most applications. The toolbar is built by slotting feature elements, and each one contributes its own schema support - an editor with no features slotted keeps text but no formatting.`}}}},v={args:{showAdditionalFeatures:!0},parameters:{docs:{description:{story:`A fully-featured editor with code and hyperlink support in addition to the standard tools. Use this when you need maximum formatting flexibility.`}}}},y={args:{maxLength:500,showCharacterCount:!0,showWordCount:!0,errorMessage:`Content exceeds the maximum length of 500 characters`,content:`<p>Start typing to watch the character and word counts update.</p>`},parameters:{docs:{description:{story:"The editor supports character limits, character counts and word counts. The limit is a hard input limit: once it is reached, typing, pasting and new paragraphs are all refused, so typing cannot push the editor into an invalid state. A block boundary counts as one character, the way a textarea with `maxlength` counts a newline. Content assigned through `content` is not filtered the same way - it loads intact even when it exceeds the limit and reports itself invalid, which is when `errorMessage` and the `validation` event come into play."}}}},b={args:{disabled:!0,content:`<h2>Disabled Editor</h2><p>This editor is <strong>disabled</strong> and cannot be edited. All toolbar buttons are also disabled.</p>`},parameters:{docs:{description:{story:`When disabled, the editor prevents all interactions. Content remains visible but cannot be modified, and toolbar buttons are disabled.`}}}},x={args:{readOnly:!0,content:`<h2>Read-Only Editor</h2><p>This editor is <strong>read-only</strong>. You can select and copy text, but cannot modify the content. Toolbar buttons are disabled.</p>`},parameters:{docs:{description:{story:`Read-only mode allows users to view and select content without making changes. Useful for content that should not be modified but may need to be copied.`}}}},S={args:{content:`
      <h1>Welcome to the Rich Text Editor</h1>
      <p>This editor comes pre-populated with <strong>formatted content</strong> including:</p>
      <ul>
        <li><p><strong>Bold</strong> and <em>italic</em> text</p></li>
        <li><p><u>Underlined</u> and <s>strikethrough</s> text</p></li>
        <li><p>Multiple heading levels</p></li>
      </ul>
      <h2>Formatting Examples</h2>
      <p style="text-align: center">This paragraph is center-aligned.</p>
      <p style="text-align: right">This paragraph is right-aligned.</p>
      <ol>
        <li><p>Numbered lists work too</p></li>
        <li><p>With multiple items</p></li>
      </ol>
      <p>Try selecting text and applying formatting with the toolbar above.</p>
    `},parameters:{docs:{description:{story:"The editor accepts pre-populated content through the `content` property, as either an HTML string or a ProseMirror document. Alignment arrives as a `text-align` style declaration, which the sanitizer keeps; formatting that no slotted feature supports is dropped, and attributes held in `class` or `data-*` are stripped."}}}},C={args:{allowPasteFormatting:!1,content:`<p>Try pasting content from a word processor or any formatted source. With <code>allowPasteFormatting</code> set to <code>false</code>, only plain text is preserved.</p>`},parameters:{docs:{description:{story:"Control how pasted content is handled with `allowPasteFormatting`. When false, formatting is stripped and only plain text is inserted. Ctrl+Shift+V (Cmd+Shift+V on Mac) pastes as plain text regardless of the setting. Pasted markup is sanitized: dangerous elements are removed, and only schema-supported style declarations survive."}}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    showAdditionalFeatures: false
  },
  parameters: {
    docs: {
      description: {
        story: 'A rich text editor with only the standard formatting tools. This is the recommended starting point for most applications. The toolbar is built by slotting feature elements, and each one contributes its own schema support - an editor with no features slotted keeps text but no formatting.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    showAdditionalFeatures: true
  },
  parameters: {
    docs: {
      description: {
        story: 'A fully-featured editor with code and hyperlink support in addition to the standard tools. Use this when you need maximum formatting flexibility.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    maxLength: 500,
    showCharacterCount: true,
    showWordCount: true,
    errorMessage: 'Content exceeds the maximum length of 500 characters',
    content: '<p>Start typing to watch the character and word counts update.</p>'
  },
  parameters: {
    docs: {
      description: {
        story: 'The editor supports character limits, character counts and word counts. The limit is a hard input limit: once it is reached, typing, pasting and new paragraphs are all refused, so typing cannot push the editor into an invalid state. A block boundary counts as one character, the way a textarea with \`maxlength\` counts a newline. Content assigned through \`content\` is not filtered the same way - it loads intact even when it exceeds the limit and reports itself invalid, which is when \`errorMessage\` and the \`validation\` event come into play.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    content: '<h2>Disabled Editor</h2><p>This editor is <strong>disabled</strong> and cannot be edited. All toolbar buttons are also disabled.</p>'
  },
  parameters: {
    docs: {
      description: {
        story: 'When disabled, the editor prevents all interactions. Content remains visible but cannot be modified, and toolbar buttons are disabled.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    content: '<h2>Read-Only Editor</h2><p>This editor is <strong>read-only</strong>. You can select and copy text, but cannot modify the content. Toolbar buttons are disabled.</p>'
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only mode allows users to view and select content without making changes. Useful for content that should not be modified but may need to be copied.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    content: \`
      <h1>Welcome to the Rich Text Editor</h1>
      <p>This editor comes pre-populated with <strong>formatted content</strong> including:</p>
      <ul>
        <li><p><strong>Bold</strong> and <em>italic</em> text</p></li>
        <li><p><u>Underlined</u> and <s>strikethrough</s> text</p></li>
        <li><p>Multiple heading levels</p></li>
      </ul>
      <h2>Formatting Examples</h2>
      <p style="text-align: center">This paragraph is center-aligned.</p>
      <p style="text-align: right">This paragraph is right-aligned.</p>
      <ol>
        <li><p>Numbered lists work too</p></li>
        <li><p>With multiple items</p></li>
      </ol>
      <p>Try selecting text and applying formatting with the toolbar above.</p>
    \`
  },
  parameters: {
    docs: {
      description: {
        story: 'The editor accepts pre-populated content through the \`content\` property, as either an HTML string or a ProseMirror document. Alignment arrives as a \`text-align\` style declaration, which the sanitizer keeps; formatting that no slotted feature supports is dropped, and attributes held in \`class\` or \`data-*\` are stripped.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    allowPasteFormatting: false,
    content: '<p>Try pasting content from a word processor or any formatted source. With <code>allowPasteFormatting</code> set to <code>false</code>, only plain text is preserved.</p>'
  },
  parameters: {
    docs: {
      description: {
        story: 'Control how pasted content is handled with \`allowPasteFormatting\`. When false, formatting is stripped and only plain text is inserted. Ctrl+Shift+V (Cmd+Shift+V on Mac) pastes as plain text regardless of the setting. Pasted markup is sanitized: dangerous elements are removed, and only schema-supported style declarations survive.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w=[`Demo`,`BasicUsage`,`FullFeatured`,`ContentValidation`,`DisabledState`,`ReadOnlyState`,`PrePopulatedContent`,`PasteHandling`]})))()}export{C as a,s as i,g as n,x as o,b as r,T as s,y as t};