import"./lit-element-Dk2-kgKT.js";import{k as w}from"./lit-html-DZH-Jm0H.js";import{g as L}from"./_commonjsHelpers-Cpj98o6Y.js";var E={exports:{}};(function(d,R){(function(){function v(h,C){var u,a=0,$=h.length,s,t="",e,r,f,i,n,l,p,S,b=!0,k=!1,c;u=arguments.length>1?C:{},typeof u.indent>"u"&&(u.indent="    "),typeof u.openbrace=="string"&&(b=u.openbrace==="end-of-line"),typeof u.autosemicolon=="boolean"&&(k=u.autosemicolon);function A(o){return o===" "||o===`
`||o==="	"||o==="\r"||o==="\f"}function x(o){return o==="'"||o==='"'}function y(o){return e>="a"&&e<="z"||e>="A"&&e<="Z"||e>="0"&&e<="9"||"-_*.:#[]".indexOf(o)>=0}function m(){var o;for(o=l;o>0;o-=1)t+=u.indent}function B(){t=c(t),b?t+=" {":(t+=`
`,m(),t+="{"),r!==`
`&&(t+=`
`),l+=1}function g(){var o;l-=1,t=c(t),t.length>0&&k&&(o=t.charAt(t.length-1),o!==";"&&o!=="{"&&(t+=";")),t+=`
`,m(),t+="}",s.push(t),t=""}for(String.prototype.trimRight?c=function(o){return o.trimRight()}:c=function(o){return o.replace(/\s+$/,"")},n={Start:0,AtRule:1,Block:2,Selector:3,Ruleset:4,Property:5,Separator:6,Expression:7,URL:8},l=0,i=n.Start,S=!1,s=[],h=h.replace(/\r\n/g,`
`);a<$;){if(e=h.charAt(a),r=h.charAt(a+1),a+=1,x(p)){t+=e,e===p&&(p=null),e==="\\"&&r===p&&(t+=r,a+=1);continue}if(x(e)){t+=e,p=e;continue}if(S){t+=e,e==="*"&&r==="/"&&(S=!1,t+=r,a+=1);continue}if(e==="/"&&r==="*"){S=!0,t+=e,t+=r,a+=1;continue}if(i===n.Start){if(s.length===0&&A(e)&&t.length===0)continue;if(e<=" "||e.charCodeAt(0)>=128){i=n.Start,t+=e;continue}if(y(e)||e==="@"){if(f=c(t),f.length===0)s.length>0&&(t=`

`);else if(f.charAt(f.length-1)==="}"||f.charAt(f.length-1)===";")t=f+`

`;else for(;r=t.charAt(t.length-1),!(r!==" "&&r.charCodeAt(0)!==9);)t=t.substr(0,t.length-1);t+=e,i=e==="@"?n.AtRule:n.Selector;continue}}if(i===n.AtRule){if(e===";"){t+=e,i=n.Start;continue}if(e==="{"){f=c(t),B(),i=f==="@font-face"?n.Ruleset:n.Block;continue}t+=e;continue}if(i===n.Block){if(y(e)){if(f=c(t),f.length===0)s.length>0&&(t=`

`);else if(f.charAt(f.length-1)==="}")t=f+`

`;else for(;r=t.charAt(t.length-1),!(r!==" "&&r.charCodeAt(0)!==9);)t=t.substr(0,t.length-1);m(),t+=e,i=n.Selector;continue}if(e==="}"){g(),i=n.Start;continue}t+=e;continue}if(i===n.Selector){if(e==="{"){B(),i=n.Ruleset;continue}if(e==="}"){g(),i=n.Start;continue}t+=e;continue}if(i===n.Ruleset){if(e==="}"){g(),i=n.Start,l>0&&(i=n.Block);continue}if(e===`
`){t=c(t),t+=`
`;continue}if(!A(e)){t=c(t),t+=`
`,m(),t+=e,i=n.Property;continue}t+=e;continue}if(i===n.Property){if(e===":"){t=c(t),t+=": ",i=n.Expression,A(r)&&(i=n.Separator);continue}if(e==="}"){g(),i=n.Start,l>0&&(i=n.Block);continue}t+=e;continue}if(i===n.Separator){if(!A(e)){t+=e,i=n.Expression;continue}x(r)&&(i=n.Expression);continue}if(i===n.Expression){if(e==="}"){g(),i=n.Start,l>0&&(i=n.Block);continue}if(e===";"){t=c(t),t+=`;
`,i=n.Ruleset;continue}if(t+=e,e==="("&&t.charAt(t.length-2)==="l"&&t.charAt(t.length-3)==="r"&&t.charAt(t.length-4)==="u"){i=n.URL;continue}continue}if(i===n.URL&&e===")"&&t.charAt(t.length-1!=="\\")){t+=e,i=n.Expression;continue}t+=e}return t=s.join("")+t,t}d.exports=v})()})(E);var P=E.exports;const U=L(P);function D(d){return R=>w`
      ${R()}

      <style>
        ${U(d,{indent:"  "})}
      </style>
    `}export{D as s};
