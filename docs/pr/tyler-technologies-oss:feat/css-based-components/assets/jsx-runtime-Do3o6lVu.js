import{ao as l}from"./index-C25FxklW.js";var f={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=l,m=Symbol.for("react.element"),a=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,y=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function i(o,r,p){var e,t={},s=null,_=null;p!==void 0&&(s=""+p),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(_=r.ref);for(e in r)x.call(r,e)&&!v.hasOwnProperty(e)&&(t[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)t[e]===void 0&&(t[e]=r[e]);return{$$typeof:m,type:o,key:s,ref:_,props:t,_owner:y.current}}n.Fragment=a;n.jsx=i;n.jsxs=i;f.exports=n;var d=f.exports;export{d as j};
