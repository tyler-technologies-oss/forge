function p(t,e){const r=t.toLowerCase().indexOf(e.toLowerCase());if(r!==-1){const o=r+e.length,i=document.createElement("span"),s=document.createElement("span");return s.style.fontWeight="bold",s.textContent=t.substring(r,o),i.appendChild(document.createTextNode(t.substring(0,r))),i.appendChild(s),i.appendChild(document.createTextNode(t.substring(o))),i}}function g(t,{capture:e=!0,pointerenter:n=!0,focusin:r=!0}={}){let o;const i=()=>{typeof o=="function"&&o()};return{userInteraction:new Promise(d=>{const c={once:!0,capture:e},a=f=>{r&&t.removeEventListener("focusin",u,c),d(f)},u=f=>{n&&t.removeEventListener("pointerenter",a,c),d(f)};o=()=>{n&&t.removeEventListener("pointerenter",a,c),r&&t.removeEventListener("focusin",u,c)},n&&t.addEventListener("pointerenter",a,c),r&&t.addEventListener("focusin",u,c)}),destroy:i}}function l(t,e){if(!(t&&e))return!1;const n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return!(n.top>r.bottom||n.right<r.left||n.bottom<r.top||n.left>r.right)}function v({x:t,y:e},n){if(!n)return!1;const{top:r,left:o,bottom:i,right:s}=n.getBoundingClientRect();return t>=o&&t<=s&&e>=r&&e<=i}function m(t,e){let n=null;return e&&(n=h(t,e)),n||t.parentElement}function h(t,e){const n=t.getRootNode();return e===":host"&&n instanceof ShadowRoot?n.host:n.querySelector(`#${e}`)}function E(t,e,n=!0){return n&&e.append(...t.childNodes),t.insertAdjacentElement("beforebegin",e),t.remove(),e}function C(t,e=","){return t.split(e).map(n=>n.trim())}function L(t,e,n){if(!t.length)return;const r=t[0].parentNode;r&&(r.insertBefore(e,t[0]),t.forEach(o=>{n!=null&&n.length&&n.some(i=>o.matches(i))||e.append(o)}))}function N(t){const e=t.parentNode;if(e){for(;t.firstChild;)e.insertBefore(t.firstChild,t);t.remove()}}function b(t){const e=window.devicePixelRatio||1;return Math.round(t*e)/e}export{h as a,g as b,C as c,E as d,l as e,p as h,v as i,m as l,b as r,N as u,L as w};