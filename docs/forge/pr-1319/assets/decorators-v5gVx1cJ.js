import{a as e,n as t,t as n}from"./rolldown-runtime-sJBDdmOt.js";import{a as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";var a=n(((e,t)=>{(function(){function n(e,t){var n,r=0,i=e.length,a,o=``,s,c,l,u,d,f,p,m,h=!0,g=!1,_;n=arguments.length>1?t:{},n.indent===void 0&&(n.indent=`    `),typeof n.openbrace==`string`&&(h=n.openbrace===`end-of-line`),typeof n.autosemicolon==`boolean`&&(g=n.autosemicolon);function v(e){return e===` `||e===`
`||e===`	`||e===`\r`||e===`\f`}function y(e){return e===`'`||e===`"`}function b(e){return s>=`a`&&s<=`z`||s>=`A`&&s<=`Z`||s>=`0`&&s<=`9`||`-_*.:#[]`.indexOf(e)>=0}function x(){for(var e=f;e>0;--e)o+=n.indent}function S(){o=_(o),h?o+=` {`:(o+=`
`,x(),o+=`{`),c!==`
`&&(o+=`
`),f+=1}function C(){var e;--f,o=_(o),o.length>0&&g&&(e=o.charAt(o.length-1),e!==`;`&&e!==`{`&&(o+=`;`)),o+=`
`,x(),o+=`}`,a.push(o),o=``}for(_=String.prototype.trimRight?function(e){return e.trimRight()}:function(e){return e.replace(/\s+$/,``)},d={Start:0,AtRule:1,Block:2,Selector:3,Ruleset:4,Property:5,Separator:6,Expression:7,URL:8},f=0,u=d.Start,m=!1,a=[],e=e.replace(/\r\n/g,`
`);r<i;)if(s=e.charAt(r),c=e.charAt(r+1),r+=1,y(p))o+=s,s===p&&(p=null),s===`\\`&&c===p&&(o+=c,r+=1);else if(y(s))o+=s,p=s;else if(m)o+=s,s===`*`&&c===`/`&&(m=!1,o+=c,r+=1);else if(s===`/`&&c===`*`)m=!0,o+=s,o+=c,r+=1;else{if(u===d.Start){if(a.length===0&&v(s)&&o.length===0)continue;if(s<=` `||s.charCodeAt(0)>=128){u=d.Start,o+=s;continue}if(b(s)||s===`@`){if(l=_(o),l.length===0)a.length>0&&(o=`

`);else if(l.charAt(l.length-1)===`}`||l.charAt(l.length-1)===`;`)o=l+`

`;else for(;c=o.charAt(o.length-1),c===` `||c.charCodeAt(0)===9;)o=o.substr(0,o.length-1);o+=s,u=s===`@`?d.AtRule:d.Selector;continue}}if(u===d.AtRule){if(s===`;`){o+=s,u=d.Start;continue}if(s===`{`){l=_(o),S(),u=l===`@font-face`?d.Ruleset:d.Block;continue}o+=s}else if(u===d.Block){if(b(s)){if(l=_(o),l.length===0)a.length>0&&(o=`

`);else if(l.charAt(l.length-1)===`}`)o=l+`

`;else for(;c=o.charAt(o.length-1),c===` `||c.charCodeAt(0)===9;)o=o.substr(0,o.length-1);x(),o+=s,u=d.Selector;continue}if(s===`}`){C(),u=d.Start;continue}o+=s}else if(u===d.Selector){if(s===`{`){S(),u=d.Ruleset;continue}if(s===`}`){C(),u=d.Start;continue}o+=s}else if(u===d.Ruleset){if(s===`}`){C(),u=d.Start,f>0&&(u=d.Block);continue}if(s===`
`){o=_(o),o+=`
`;continue}if(!v(s)){o=_(o),o+=`
`,x(),o+=s,u=d.Property;continue}o+=s}else if(u===d.Property){if(s===`:`){o=_(o),o+=`: `,u=d.Expression,v(c)&&(u=d.Separator);continue}if(s===`}`){C(),u=d.Start,f>0&&(u=d.Block);continue}o+=s}else if(u===d.Separator){if(!v(s)){o+=s,u=d.Expression;continue}y(c)&&(u=d.Expression)}else if(u===d.Expression){if(s===`}`){C(),u=d.Start,f>0&&(u=d.Block);continue}if(s===`;`){o=_(o),o+=`;
`,u=d.Ruleset;continue}if(o+=s,s===`(`&&o.charAt(o.length-2)===`l`&&o.charAt(o.length-3)===`r`&&o.charAt(o.length-4)===`u`){u=d.URL;continue}}else u===d.URL&&s===`)`&&o.charAt(o.length-1!==`\\`)?(o+=s,u=d.Expression):o+=s}return o=a.join(``)+o,o}e===void 0?typeof window==`object`&&(window.cssbeautify=n):t.exports=e=n})()}));function o(e){return t=>r`
      ${t()}

      <style>
${(0,s.default)(e,{indent:`  `})}
      </style>
    `}var s;function c(){return(c=t((()=>{i(),s=e(a(),1)})))()}export{o as n,c as t};