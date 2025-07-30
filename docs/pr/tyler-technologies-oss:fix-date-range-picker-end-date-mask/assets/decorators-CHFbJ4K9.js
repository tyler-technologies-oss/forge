import{x as w}from"./iframe-DPNJ6rEU.js";import{g as L}from"./_commonjsHelpers-CqkleIqs.js";var b={exports:{}},v;function P(){return v||(v=1,function(d,R){(function(){function C(h,$){var c,s=0,q=h.length,l,t="",e,r,f,i,n,a,p,S,y=!0,k=!1,u;c=arguments.length>1?$:{},typeof c.indent>"u"&&(c.indent="    "),typeof c.openbrace=="string"&&(y=c.openbrace==="end-of-line"),typeof c.autosemicolon=="boolean"&&(k=c.autosemicolon);function A(o){return o===" "||o===`
`||o==="	"||o==="\r"||o==="\f"}function m(o){return o==="'"||o==='"'}function B(o){return e>="a"&&e<="z"||e>="A"&&e<="Z"||e>="0"&&e<="9"||"-_*.:#[]".indexOf(o)>=0}function x(){var o;for(o=a;o>0;o-=1)t+=c.indent}function E(){t=u(t),y?t+=" {":(t+=`
`,x(),t+="{"),r!==`
`&&(t+=`
`),a+=1}function g(){var o;a-=1,t=u(t),t.length>0&&k&&(o=t.charAt(t.length-1),o!==";"&&o!=="{"&&(t+=";")),t+=`
`,x(),t+="}",l.push(t),t=""}for(String.prototype.trimRight?u=function(o){return o.trimRight()}:u=function(o){return o.replace(/\s+$/,"")},n={Start:0,AtRule:1,Block:2,Selector:3,Ruleset:4,Property:5,Separator:6,Expression:7,URL:8},a=0,i=n.Start,S=!1,l=[],h=h.replace(/\r\n/g,`
`);s<q;){if(e=h.charAt(s),r=h.charAt(s+1),s+=1,m(p)){t+=e,e===p&&(p=null),e==="\\"&&r===p&&(t+=r,s+=1);continue}if(m(e)){t+=e,p=e;continue}if(S){t+=e,e==="*"&&r==="/"&&(S=!1,t+=r,s+=1);continue}if(e==="/"&&r==="*"){S=!0,t+=e,t+=r,s+=1;continue}if(i===n.Start){if(l.length===0&&A(e)&&t.length===0)continue;if(e<=" "||e.charCodeAt(0)>=128){i=n.Start,t+=e;continue}if(B(e)||e==="@"){if(f=u(t),f.length===0)l.length>0&&(t=`

`);else if(f.charAt(f.length-1)==="}"||f.charAt(f.length-1)===";")t=f+`

`;else for(;r=t.charAt(t.length-1),!(r!==" "&&r.charCodeAt(0)!==9);)t=t.substr(0,t.length-1);t+=e,i=e==="@"?n.AtRule:n.Selector;continue}}if(i===n.AtRule){if(e===";"){t+=e,i=n.Start;continue}if(e==="{"){f=u(t),E(),i=f==="@font-face"?n.Ruleset:n.Block;continue}t+=e;continue}if(i===n.Block){if(B(e)){if(f=u(t),f.length===0)l.length>0&&(t=`

`);else if(f.charAt(f.length-1)==="}")t=f+`

`;else for(;r=t.charAt(t.length-1),!(r!==" "&&r.charCodeAt(0)!==9);)t=t.substr(0,t.length-1);x(),t+=e,i=n.Selector;continue}if(e==="}"){g(),i=n.Start;continue}t+=e;continue}if(i===n.Selector){if(e==="{"){E(),i=n.Ruleset;continue}if(e==="}"){g(),i=n.Start;continue}t+=e;continue}if(i===n.Ruleset){if(e==="}"){g(),i=n.Start,a>0&&(i=n.Block);continue}if(e===`
`){t=u(t),t+=`
`;continue}if(!A(e)){t=u(t),t+=`
`,x(),t+=e,i=n.Property;continue}t+=e;continue}if(i===n.Property){if(e===":"){t=u(t),t+=": ",i=n.Expression,A(r)&&(i=n.Separator);continue}if(e==="}"){g(),i=n.Start,a>0&&(i=n.Block);continue}t+=e;continue}if(i===n.Separator){if(!A(e)){t+=e,i=n.Expression;continue}m(r)&&(i=n.Expression);continue}if(i===n.Expression){if(e==="}"){g(),i=n.Start,a>0&&(i=n.Block);continue}if(e===";"){t=u(t),t+=`;
`,i=n.Ruleset;continue}if(t+=e,e==="("&&t.charAt(t.length-2)==="l"&&t.charAt(t.length-3)==="r"&&t.charAt(t.length-4)==="u"){i=n.URL;continue}continue}if(i===n.URL&&e===")"&&t.charAt(t.length-1!=="\\")){t+=e,i=n.Expression;continue}t+=e}return t=l.join("")+t,t}d.exports=C})()}(b)),b.exports}var U=P();const j=L(U);function F(d){return R=>w`
      ${R()}

      <style>
${j(d,{indent:"  "})}
      </style>
    `}export{F as s};
