import{C as w,j as B,B as W,l as C,a as G,m as v,k as Q,d as Z,s as F,b as tt,i as H,e as et}from"./constants-DHnR0122.js";import{B as M,c as l}from"./base-adapter-B_B1W7NX.js";import{c as b,i as E,E as Y,r as q,n as it,D as st,t as N}from"./feature-detection-C61kIZu7.js";import{M as nt,N as ot}from"./index-RsKXMDm2.js";import{C as rt}from"./circular-progress-CbpfkaY8.js";import{W as lt,a as at}from"./with-form-associated-BgRoomBE.js";import{W as pt,a as dt}from"./with-default-aria-COlelyab.js";import{W as ht}from"./with-label-aware-CbEUrhML.js";import{B as c,F as _,a as _t}from"./base-field-BDCxUf4S.js";import"./focus-indicator-DydcbRnf.js";import"./index-CiLSBptl.js";import{I as ct,a as ut}from"./icon-DNSPAaK0.js";import{I as bt}from"./icon-button-DJSm0po0.js";import"./state-layer-Y8UVngaT.js";import{L as mt,a as gt}from"./list-BEAQdsdb.js";import{a as ft,P as Lt}from"./popover-DlgaZ2F2.js";import"./overlay-C2J-mFMD.js";import{S as At}from"./scaffold-CWDbFKLY.js";import{T as Et}from"./toolbar-CM1YCrRV.js";import"./linear-progress-Brg7kVg_.js";import"./skeleton-Cfb12itF.js";import{L as It,a as Ot}from"./list-dropdown-aware-core-DGLK3WC5.js";import{d as Ct,s as U}from"./utils-CRxrUqQD.js";import{a as yt}from"./list-dropdown-BxzSJ6qG.js";function Tt(s){class t extends s{constructor(...i){super(...i)}initializeFieldInstance(i){this._fieldElement=i,this._fieldElement.shadowRoot||window.customElements.upgrade(this._fieldElement)}attributeChangedCallback(i,o,r){var a;switch(i){case c.observedAttributes.LABEL_POSITION:this.labelPosition=r;return;case c.observedAttributes.LABEL_ALIGNMENT:this.labelAlignment=r;return;case c.observedAttributes.INVALID:this.invalid=b(r);return;case c.observedAttributes.REQUIRED:this.required=b(r);return;case c.observedAttributes.OPTIONAL:this.optional=b(r);return;case c.observedAttributes.DISABLED:this.disabled=b(r);return;case c.observedAttributes.FLOAT_LABEL:this.floatLabel=b(r);return;case c.observedAttributes.VARIANT:this.variant=r;return;case c.observedAttributes.THEME:this.theme=r;return;case c.observedAttributes.SHAPE:this.shape=r;return;case c.observedAttributes.DENSITY:this.density=r;return;case c.observedAttributes.DENSE:this.dense=b(r);return;case c.observedAttributes.POPOVER_ICON:this.popoverIcon=b(r);return;case c.observedAttributes.SUPPORT_TEXT_INSET:this.supportTextInset=r;return}(a=super.attributeChangedCallback)==null||a.call(this,i,o,r)}get labelPosition(){return this._fieldElement.labelPosition}set labelPosition(i){this._fieldElement.labelPosition!==i&&(this._fieldElement.labelPosition=i,this.setAttribute(_.attributes.LABEL_POSITION,i))}get labelAlignment(){return this._fieldElement.labelAlignment}set labelAlignment(i){this._fieldElement.labelAlignment!==i&&(this._fieldElement.labelAlignment=i,this.setAttribute(_.attributes.LABEL_ALIGNMENT,i))}get invalid(){return this._fieldElement.invalid}set invalid(i){this._fieldElement.invalid!==i&&(this._fieldElement.invalid=i,this.toggleAttribute(_.attributes.INVALID,i))}get required(){return this._fieldElement.required}set required(i){this._fieldElement.required!==i&&(this._fieldElement.required=i,this.toggleAttribute(_.attributes.REQUIRED,i))}get optional(){return this._fieldElement.optional}set optional(i){this._fieldElement.optional!==i&&(this._fieldElement.optional=i,this.toggleAttribute(_.attributes.OPTIONAL,i))}get disabled(){return this._fieldElement.disabled}set disabled(i){this._fieldElement.disabled!==i&&(this._fieldElement.disabled=i,this.toggleAttribute(_.attributes.DISABLED,i))}get floatLabel(){return this._fieldElement.floatLabel}set floatLabel(i){this._fieldElement.floatLabel!==i&&(this._fieldElement.floatLabel=i,this.toggleAttribute(_.attributes.FLOAT_LABEL,i))}get variant(){return this._fieldElement.variant}set variant(i){this._fieldElement.variant!==i&&(this._fieldElement.variant=i,this.setAttribute(_.attributes.VARIANT,i))}get theme(){return this._fieldElement.theme}set theme(i){this._fieldElement.theme!==i&&(this._fieldElement.theme=i,this.setAttribute(_.attributes.THEME,i))}get shape(){return this._fieldElement.shape}set shape(i){this._fieldElement.shape!==i&&(this._fieldElement.shape=i,this.setAttribute(_.attributes.SHAPE,i))}get density(){return this._fieldElement.density}set density(i){this._fieldElement.density!==i&&(this._fieldElement.density=i,this.setAttribute(_.attributes.DENSITY,i))}get dense(){return this._fieldElement.dense}set dense(i){this._fieldElement.dense!==i&&(this._fieldElement.dense=i,this.toggleAttribute(_.attributes.DENSE,i))}get popoverIcon(){return this._fieldElement.popoverIcon}set popoverIcon(i){this._fieldElement.popoverIcon!==i&&(this._fieldElement.popoverIcon=i,this.toggleAttribute(_.attributes.POPOVER_ICON,i))}get supportTextInset(){return this._fieldElement.supportTextInset}set supportTextInset(i){this._fieldElement.supportTextInset!==i&&(this._fieldElement.supportTextInset=i,this.setAttribute(_.attributes.SUPPORT_TEXT_INSET,i))}floatLabelWithoutAnimation(i){this._fieldElement.floatLabelWithoutAnimation(i)}}return t}class Dt extends M{constructor(t){super(t)}}const $=`${w}option`,St={DISABLED:"disabled",DIVIDER:"divider",LABEL:"label",SECONDARY_LABEL:"secondary-label",LEADING_ICON_CLASS:"leading-icon-class",LEADING_ICON_TYPE:"leading-icon-type",LEADING_ICON:"leading-icon",OPTION_CLASS:"option-class",TRAILING_ICON_CLASS:"trailing-icon-class",TRAILING_ICON_TYPE:"trailing-icon-type",TRAILING_ICON:"trailing-icon",TOOLTIP:"tooltip",VALUE:"value"},Nt={VALUE_CHANGE:`${$}-value-change`},n={elementName:$,attributes:St,events:Nt};class vt{constructor(t){this._adapter=t,this._disabled=!1,this._divider=!1,this._optionClass=[]}get value(){return this._value}set value(t){this._value!==t&&(this._value=t,this._adapter.emitHostEvent(n.events.VALUE_CHANGE,this._value))}get label(){return this._label}set label(t){this._label!==t&&(this._label=t,this._adapter.toggleHostAttribute(n.attributes.LABEL,!!this._label,this._label))}get secondaryLabel(){return this._secondaryLabel}set secondaryLabel(t){this._secondaryLabel!==t&&(this._secondaryLabel=t,this._adapter.toggleHostAttribute(n.attributes.SECONDARY_LABEL,!!this._secondaryLabel,this._secondaryLabel))}get disabled(){return this._disabled}set disabled(t){this._disabled!==t&&(this._disabled=t,this._adapter.toggleHostAttribute(n.attributes.DISABLED,this._disabled))}get divider(){return this._divider}set divider(t){this._divider!==t&&(this._divider=t,this._adapter.toggleHostAttribute(n.attributes.DIVIDER,this._divider))}get optionClass(){return this._optionClass}set optionClass(t){t?typeof t=="string"&&(t=t.split(" ")):t=[],t=t.filter(e=>e&&!/\s+/.test(e)),this._optionClass.toString()!==t.toString()&&(this._optionClass=t,this._adapter.toggleHostAttribute(n.attributes.OPTION_CLASS,this._optionClass&&!!this._optionClass.length,this._optionClass.join(" ")))}get leadingIcon(){return this._leadingIcon}set leadingIcon(t){this._leadingIcon!==t&&(this._leadingIcon=t,this._adapter.toggleHostAttribute(n.attributes.LEADING_ICON,!!this._leadingIcon,this._leadingIcon))}get leadingIconClass(){return this._leadingIconClass}set leadingIconClass(t){this._leadingIconClass!==t&&(this._leadingIconClass=t,this._adapter.toggleHostAttribute(n.attributes.LEADING_ICON_CLASS,!!this._leadingIconClass,this._leadingIconClass))}get leadingIconType(){return this._leadingIconType}set leadingIconType(t){this._leadingIconType!==t&&(this._leadingIconType=t,this._adapter.toggleHostAttribute(n.attributes.LEADING_ICON_TYPE,!!this._leadingIconType,this._leadingIconType))}get leadingIconComponentProps(){return this._leadingIconComponentProps}set leadingIconComponentProps(t){this._leadingIconComponentProps!==t&&(this._leadingIconComponentProps=t)}get trailingIcon(){return this._trailingIcon}set trailingIcon(t){this._trailingIcon!==t&&(this._trailingIcon=t,this._adapter.toggleHostAttribute(n.attributes.TRAILING_ICON,!!this._trailingIcon,this._trailingIcon))}get trailingIconClass(){return this._trailingIconClass}set trailingIconClass(t){this._trailingIconClass!==t&&(this._trailingIconClass=t,this._adapter.toggleHostAttribute(n.attributes.TRAILING_ICON_CLASS,!!this._trailingIconClass,this._trailingIconClass))}get trailingIconType(){return this._trailingIconType}set trailingIconType(t){this._trailingIconType!==t&&(this._trailingIconType=t,this._adapter.toggleHostAttribute(n.attributes.TRAILING_ICON_TYPE,!!this._trailingIconType,this._trailingIconType))}get trailingIconComponentProps(){return this._trailingIconComponentProps}set trailingIconComponentProps(t){this._trailingIconComponentProps!==t&&(this._trailingIconComponentProps=t)}get leadingBuilder(){return this._leadingBuilder}set leadingBuilder(t){this._leadingBuilder!==t&&(this._leadingBuilder=t)}get trailingBuilder(){return this._trailingBuilder}set trailingBuilder(t){this._trailingBuilder!==t&&(this._trailingBuilder=t)}get tooltip(){return this._tooltip}set tooltip(t){this._tooltip!==t&&(this._tooltip=t)}}var Pt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,d=(s,t,e,i)=>{for(var o=i>1?void 0:i?xt(t,e):t,r=s.length-1,a;r>=0;r--)(a=s[r])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&Pt(t,e,o),o};let p=class extends W{static get observedAttributes(){return[n.attributes.VALUE,n.attributes.LABEL,n.attributes.SECONDARY_LABEL,n.attributes.DISABLED,n.attributes.DIVIDER,n.attributes.OPTION_CLASS,n.attributes.LEADING_ICON,n.attributes.LEADING_ICON_CLASS,n.attributes.LEADING_ICON_TYPE,n.attributes.TRAILING_ICON,n.attributes.TRAILING_ICON_CLASS,n.attributes.TRAILING_ICON_TYPE,n.attributes.TOOLTIP]}constructor(){super(),this._core=new vt(new Dt(this))}attributeChangedCallback(s,t,e){switch(s){case n.attributes.VALUE:this.value=e;break;case n.attributes.LABEL:this.label=e;break;case n.attributes.SECONDARY_LABEL:this.secondaryLabel=e;break;case n.attributes.DISABLED:this.disabled=b(e);break;case n.attributes.DIVIDER:this.divider=this.hasAttribute(n.attributes.DIVIDER);break;case n.attributes.OPTION_CLASS:this.optionClass=e;break;case n.attributes.LEADING_ICON:this.leadingIcon=e;break;case n.attributes.LEADING_ICON_CLASS:this.leadingIconClass=e;break;case n.attributes.LEADING_ICON_TYPE:this.leadingIconType=e;break;case n.attributes.TRAILING_ICON:this.trailingIcon=e;break;case n.attributes.TRAILING_ICON_CLASS:this.trailingIconClass=e;break;case n.attributes.TRAILING_ICON_TYPE:this.trailingIconType=e;break;case n.attributes.TOOLTIP:this.tooltip=e?{text:e}:void 0;break}}};d([l()],p.prototype,"value",2);d([l()],p.prototype,"label",2);d([l()],p.prototype,"secondaryLabel",2);d([l()],p.prototype,"disabled",2);d([l()],p.prototype,"divider",2);d([l()],p.prototype,"optionClass",2);d([l()],p.prototype,"leadingIcon",2);d([l()],p.prototype,"leadingIconClass",2);d([l()],p.prototype,"leadingIconType",2);d([l()],p.prototype,"leadingIconComponentProps",2);d([l()],p.prototype,"trailingIcon",2);d([l()],p.prototype,"trailingIconClass",2);d([l()],p.prototype,"trailingIconType",2);d([l()],p.prototype,"trailingIconComponentProps",2);d([l()],p.prototype,"leadingBuilder",2);d([l()],p.prototype,"trailingBuilder",2);d([l()],p.prototype,"tooltip",2);p=d([B({name:n.elementName})],p);const wt=`${w}option-group`,Bt={LABEL:"label"},A={elementName:wt,attributes:Bt};var kt=Object.getOwnPropertyDescriptor,Rt=(s,t,e,i)=>{for(var o=i>1?void 0:i?kt(t,e):t,r=s.length-1,a;r>=0;r--)(a=s[r])&&(o=a(o)||o);return o};let P=class extends W{static get observedAttributes(){return[A.attributes.LABEL]}constructor(){super()}attributeChangedCallback(s,t,e){switch(s){case A.attributes.LABEL:this.label=e;break}}get label(){return this._label}set label(s){this._label!==s&&(this._label=s||"",this.setAttribute(A.attributes.LABEL,this._label))}get text(){return this._label}set text(s){this.label=s}};P=Rt([B({name:A.elementName})],P);var x=(s=>(s[s.Option=0]="Option",s[s.Group=1]="Group",s))(x||{});function z(s,t){const e=s.some(o=>j(o)),i=s.some(o=>Vt(o));return e&&t===1||i&&t===0}function j(s){return E(s)&&Y(s)&&s.hasOwnProperty("options")}function Vt(s){return E(s)&&Y(s)&&s.hasOwnProperty("label")&&s.hasOwnProperty("value")}class Gt extends M{constructor(t){super(t)}get popupElement(){var t;return(t=this._listDropdown)==null?void 0:t.dropdownElement}getOptions(){const t=Array.from(this._component.querySelectorAll(A.elementName));if(t.length)return t.map(e=>{const i=Array.from(e.querySelectorAll(n.elementName)),o=this._createOptionsFromElements(i);return{text:e.label,builder:e.builder,value:e.value,options:o}});{const e=Array.from(this._component.querySelectorAll(n.elementName));return this._createOptionsFromElements(e)}}_createOptionsFromElements(t){return t.map(e=>{let i=e.hasAttribute(n.attributes.OPTION_CLASS)?e.getAttribute(n.attributes.OPTION_CLASS):e.optionClass;return typeof i=="string"&&(i=i.split(" ")),{label:e.hasAttribute(n.attributes.LABEL)?e.getAttribute(n.attributes.LABEL):E(e.label)?e.label:e.innerText,secondaryLabel:e.hasAttribute(n.attributes.SECONDARY_LABEL)?e.getAttribute(n.attributes.SECONDARY_LABEL):E(e.secondaryLabel)?e.secondaryLabel:void 0,value:e.hasAttribute(n.attributes.VALUE)?e.getAttribute(n.attributes.VALUE):e.value,disabled:e.hasAttribute(n.attributes.DISABLED),divider:e.hasAttribute(n.attributes.DIVIDER),optionClass:i,leadingIcon:e.hasAttribute(n.attributes.LEADING_ICON)?e.getAttribute(n.attributes.LEADING_ICON):e.leadingIcon,leadingIconClass:e.hasAttribute(n.attributes.LEADING_ICON_CLASS)?e.getAttribute(n.attributes.LEADING_ICON_CLASS):e.leadingIconClass,leadingIconType:e.hasAttribute(n.attributes.LEADING_ICON_TYPE)?e.getAttribute(n.attributes.LEADING_ICON_TYPE):e.leadingIconType,leadingIconComponentProps:e.leadingIconComponentProps,trailingIcon:e.hasAttribute(n.attributes.TRAILING_ICON)?e.getAttribute(n.attributes.TRAILING_ICON):e.trailingIcon,trailingIconClass:e.hasAttribute(n.attributes.TRAILING_ICON_CLASS)?e.getAttribute(n.attributes.TRAILING_ICON_CLASS):e.trailingIconClass,trailingIconType:e.hasAttribute(n.attributes.TRAILING_ICON_TYPE)?e.getAttribute(n.attributes.TRAILING_ICON_TYPE):e.trailingIconType,trailingIconComponentProps:e.trailingIconComponentProps,leadingBuilder:e.leadingBuilder,trailingBuilder:e.trailingBuilder,tooltip:e.tooltip}})}open(t){var e;if(this._listDropdown=new yt(this._targetElement,t),this._listDropdown.open(),this._component.id){const i=(e=this._listDropdown.dropdownElement)==null?void 0:e.querySelector("forge-list");i==null||i.setAttribute("aria-labelledby",this._component.id)}}async close(){this._listDropdown&&(await this._listDropdown.close(),this.destroyListDropdown())}destroyListDropdown(){var t;(t=this._listDropdown)==null||t.destroy(),this._listDropdown=void 0}setDismissListener(t){!this._listDropdown||!this._listDropdown.dropdownElement||this._listDropdown.dropdownElement.addEventListener(ft.events.TOGGLE,t)}toggleOptionMultiple(t,e){var i;(i=this._listDropdown)==null||i.toggleOptionMultiple(t,e)}getActiveOptionIndex(){var t;return((t=this._listDropdown)==null?void 0:t.getActiveOptionIndex())??-1}activateSelectedOption(){var t;(t=this._listDropdown)==null||t.activateSelectedOption()}activateFirstOption(){var t;(t=this._listDropdown)==null||t.activateFirstOption()}highlightActiveOption(t){var e;(e=this._listDropdown)==null||e.activateOption(t)}patchSelectedValues(t){var e;(e=this._listDropdown)==null||e.setSelectedValues(t)}setOptionsListener(t){const e=o=>{o.stopPropagation(),t(this.getOptions())};this._component.addEventListener(n.events.VALUE_CHANGE,e);const i=new MutationObserver(()=>t(this.getOptions()));return i.observe(this._component,{childList:!0,subtree:!0}),()=>{this._component.removeEventListener(n.events.VALUE_CHANGE,e),i.disconnect()}}setOptions(t,e=!0){e&&this._clearOptions();for(const i of t)if(j(i)){const o=this._createOptionGroupElement(i);for(const r of i.options){const a=this._createOptionElement(r);o.appendChild(a)}this._component.appendChild(o)}else{const o=this._createOptionElement(i);this._component.appendChild(o)}}appendDropdownOptions(t){var e;(e=this._listDropdown)==null||e.appendOptions(t)}setDropdownOptions(t){var e;(e=this._listDropdown)==null||e.setOptions(t)}scrollSelectedOptionIntoView(){var t;(t=this._listDropdown)==null||t.scrollSelectedOptionIntoView()}isFocusWithinPopup(t){return!this._listDropdown||!this._listDropdown.dropdownElement?!1:this._listDropdown.dropdownElement.contains(t)}queueDropdownPositionUpdate(){this.popupElement&&window.requestAnimationFrame(()=>{const t=this.popupElement;t==null||t.position()})}_clearOptions(){Array.from(this._component.querySelectorAll(A.elementName)).forEach(i=>q(i)),Array.from(this._component.querySelectorAll(n.elementName)).forEach(i=>q(i))}_createOptionGroupElement(t){const e=document.createElement("forge-option-group");return Object.assign(e,t),e}_createOptionElement(t){const e=document.createElement("forge-option");return Object.assign(e,t),e.textContent=t.label,t.elementAttributes&&t.elementAttributes.forEach((i,o)=>{e.setAttribute(o,i)}),e}}const K={VALUE:"value",MULTIPLE:"multiple",OBSERVE_SCROLL:"observe-scroll",OBSERVE_SCROLL_THRESHOLD:"observe-scroll-threshold",POPUP_CLASSES:"popup-classes",OPTION_LIMIT:"option-limit",SYNC_POPUP_WIDTH:"sync-popup-width",CONSTRAIN_POPUP_WIDTH:"constrain-popup-width",WRAP_OPTION_TEXT:"wrap-option-text"},Ft={...K},Ht={CHANGE:"change"},y={observedAttributes:K,attributes:Ft,events:Ht};class qt extends It{constructor(t){super(),this._adapter=t,this._options=[],this._value=[],this._multiple=!1,this._open=!1,this._selectedValues=[],this._selectedLabels=[],this._selectedIndexes=[],this._filterString="",this._focusListener=e=>this._onFocus(e),this._blurListener=e=>this._onBlur(e),this._clickListener=e=>this._onClick(e),this._keydownListener=e=>this._onKeydown(e),this._optionsChangedListener=e=>this._onOptionsChanged(e),this._activeChangeListener=e=>this._onActiveOptionChanged(e),this._dropdownScrollEndListener=()=>this._onDropdownScrollEnd(),this._dismissListener=()=>this._onDismiss(),this._identifier=it()}_onFocus(t){}initialize(){this._optionListenerDestructor&&this._optionListenerDestructor(),this._optionListenerDestructor=this._adapter.setOptionsListener(this._optionsChangedListener),this._initializeValue()}initializeTarget(){this._adapter.initializeAccessibility(),this._adapter.addClickListener(this._clickListener),this._adapter.addTargetListener("blur",this._blurListener),this._adapter.addTargetListener("focus",this._focusListener),this._adapter.addTargetListener("keydown",this._keydownListener)}destroy(){this._adapter.removeClickListener(this._clickListener),this._adapter.removeTargetListener("blur",this._blurListener),this._adapter.removeTargetListener("focus",this._focusListener),this._adapter.removeTargetListener("keydown",this._keydownListener),this._optionListenerDestructor&&this._optionListenerDestructor(),this._open=!1,this._adapter.destroyListDropdown()}appendOptions(t){this._adapter.setOptions(t,!1),this._open&&this._adapter.appendDropdownOptions(t)}selectAll(){this._multiple&&(this.value=this._flatOptions.map(t=>t.value))}deselectAll(){this._multiple&&(this.value=[])}get _flatOptions(){return z(this._options,x.Group)?[].concat.apply([],this._options.map(t=>t.options)):this._options}get _nonDividerOptions(){return this._flatOptions.filter(t=>!t.divider)}_initializeValue(){const t=this._options.length&&this._options||this._adapter.getOptions();E(this._value)&&t.length&&this._applyValue(this._value)}_onClick(t){t.button===0&&(this._open?this._closeDropdown():this._openDropdown())}_onBlur(t){this._adapter.isFocusWithinPopup(t.relatedTarget)||this._open&&this._closeDropdown()}_openDropdown(){if(this._options=this._adapter.getOptions(),!this._flatOptions.length)return;this._open=!0;const t={options:this._options,referenceElement:this._adapter.hostElement,multiple:this._multiple,selectedValues:[...this._selectedValues],id:this._identifier,optionBuilder:this._optionBuilder,syncWidth:this._syncPopupWidth,constrainViewportWidth:this._constrainPopupWidth,wrapOptionText:this._wrapOptionText,observeScroll:this._observeScroll,observeScrollThreshold:this._observeScrollThreshold,scrollEndListener:this._dropdownScrollEndListener,activeChangeCallback:this._activeChangeListener,targetWidthCallback:this._targetWidthCallback,popupClasses:this._popupClasses,optionLimit:this._optionLimit,headerBuilder:this._popupHeaderBuilder,footerBuilder:this._popupFooterBuilder,closeCallback:()=>this._closeDropdown(),selectCallback:e=>{const i=this._flatOptions,o=i.find(r=>r.value===e);if(o){const r=i.indexOf(o);this._onSelect(o,r,!0)}}};this._adapter.open(t),this._adapter.setDismissListener(this._dismissListener)}_closeDropdown(){this._open=!1,this._adapter.close()}async _onSelect(t,e,i=!0){return new Promise(async o=>{if(this._valueChanging)return Promise.resolve(!1);const r=t?t.value:"",a=t?t.label:"",O=[...this._value],D=[...this._selectedValues],S=[...this._selectedLabels],k=[...this._selectedIndexes];if(this._multiple)if(this._selectedValues.includes(r)){const f=this._selectedValues.indexOf(r);this._selectedValues.splice(f,1),this._selectedLabels.splice(f,1),this._selectedIndexes.splice(f,1)}else this._selectedValues.push(r),this._selectedLabels.push(a),this._selectedIndexes.push(e);else E(r)?(this._selectedValues[0]=r,this._selectedLabels[0]=a,this._selectedIndexes[0]=e):(this._selectedValues=[],this._selectedLabels=[],this._selectedIndexes=[]);this._value=[...this._selectedValues];const h=()=>{this._selectedValues=[...D],this._selectedLabels=[...S],this._selectedIndexes=[...k],this._value=[...O]},L=()=>{if(this._multiple){const f=this._selectedIndexes.includes(e);this._adapter.toggleOptionMultiple(e,f)}this._applySelection()},R=this.multiple?[...this._selectedValues]:this._selectedValues[0];if(this._open&&i&&!this._multiple&&this._closeDropdown(),typeof this._beforeValueChange=="function"){this._valueChanging=Promise.resolve(this._beforeValueChange.call(null,R));const f=await this._valueChanging;if(this._valueChanging=void 0,!f)return h(),this._tryUpdateDropdownPosition(),o(!1)}const V=!this._adapter.emitHostEvent(y.events.CHANGE,R,!0,!0);V?h():L(),this._tryUpdateDropdownPosition(),o(!V)})}_selectActiveOption(){const t=this._adapter.getActiveOptionIndex();t>=0&&this._nonDividerOptions[t]&&this._onSelect(this._nonDividerOptions[t],t)}_tryUpdateDropdownPosition(){this._open&&this._adapter.queueDropdownPositionUpdate()}_reset(){this._selectedValues=[],this._selectedLabels=[],this._selectedIndexes=[]}_applyValue(t){this._selectedValues=[],this._selectedLabels=[],this._options=this._adapter.getOptions(),Array.isArray(t)||(t=[t]),this._value=[];for(const e of t){this._value.includes(e)||this._value.push(e);const i=this._flatOptions.find(o=>st(o.value,e));i&&(this._selectedValues.push(i.value),this._selectedLabels.push(i.label))}this._selectedIndexes=this._selectedValues.map(e=>this._flatOptions.findIndex(i=>i.value===e)),this._adapter.patchSelectedValues(this._selectedValues)}_onDismiss(){this._closeDropdown()}_getSelectedText(){if(typeof this._selectedTextBuilder=="function"){const t=this._flatOptions.filter(e=>this._selectedValues.includes(e.value));return this._selectedTextBuilder(t)}return this._multiple?this._selectedLabels.length?this._selectedLabels.length===1?this._selectedLabels[0]:`${this._selectedLabels.length} options selected`:"":this._selectedLabels.filter(t=>t&&t.length).join(" ").trim()}_onKeydown(t){const e=t.key==="Escape"||t.keyCode===27,i=t.key==="Enter"||t.keyCode===13,o=t.key==="Space"||t.keyCode===32,r=t.key==="ArrowDown"||t.keyCode===40,a=t.key==="ArrowUp"||t.keyCode===38,O=t.keyCode>=48&&t.keyCode<=90,D=t.key==="Home"||t.keyCode===36,S=t.key==="End"||t.keyCode===35;if(t.key==="Tab"&&this._open&&!this._multiple){this._selectActiveOption();return}if(!O&&this._filterTimeout&&(window.clearTimeout(this._filterTimeout),this._filterString="",this._filterTimeout=void 0),e&&(t.preventDefault(),t.stopPropagation(),this._open)){this._closeDropdown();return}if(o)t.preventDefault(),t.stopPropagation(),this._open?this._closeDropdown():this._openDropdown();else if(i)this._open&&(t.stopPropagation(),t.preventDefault(),this._options=this._adapter.getOptions(),this._selectActiveOption());else if(a||r){if(t.preventDefault(),!this._open){this._openDropdown(),this._adapter.activateFirstOption();return}if(this._flatOptions.length===0)return;let h=0;this._open?(h=this._adapter.getActiveOptionIndex(),h===-1&&(h=this._getFirstSelectedOptionIndex())):h=this._getFirstSelectedOptionIndex(),a?h=this._getPreviousHighlightableOptionIndex(h,this._nonDividerOptions):h=this._getNextHighlightableOptionIndex(h,this._nonDividerOptions),this._adapter.highlightActiveOption(h)}else if(D)this._open&&(t.preventDefault(),this._adapter.highlightActiveOption(this._nonDividerOptions.findIndex(h=>!h.disabled)));else if(S){if(this._open){t.preventDefault();const h=this._nonDividerOptions;for(let L=h.length-1;L>=0;L--)if(!h[L].disabled){this._adapter.highlightActiveOption(L);break}}}else O&&this._filter(t.key)}_getFirstSelectedOptionIndex(){return this._nonDividerOptions.findIndex(t=>this._selectedValues.includes(t.value))}_getPreviousHighlightableOptionIndex(t,e){let i=t;return i<=0?i=e.length-1:i--,e[i].disabled?this._getPreviousHighlightableOptionIndex(i,e):i}_getNextHighlightableOptionIndex(t,e){let i=t;return i===e.length-1?i=0:i++,e[i].disabled?this._getNextHighlightableOptionIndex(i,e):i}_filter(t){this._filterTimeout&&(window.clearTimeout(this._filterTimeout),this._filterTimeout=void 0),this._filterString+=t,this._filterTimeout=window.setTimeout(()=>{this._filterString="",this._filterTimeout=void 0},300),this._options=this._adapter.getOptions();const e=this._flatOptions.find(({disabled:i,label:o})=>!i&&o.trim().toLowerCase().startsWith(this._filterString.trim().toLowerCase()));if(e){const i=this._flatOptions.indexOf(e);this._open?this._adapter.highlightActiveOption(i):this._multiple||this._onSelect(e,i,!1)}}_onOptionsChanged(t){this._options=t,this._applyValue(this._value)}_onActiveOptionChanged(t){this._adapter.updateActiveDescendant(t)}get value(){return this._multiple?[...this._value]:this._value[0]}set value(t){let e;Array.isArray(t)?e=[...t]:e=t,this._applyValue(e)}get selectedIndex(){return this._multiple?[...this._selectedIndexes]:this._selectedIndexes[0]}set selectedIndex(t){this._options=this._adapter.getOptions();let e;if(Array.isArray(t)?e=[...t]:e=[t],e.sort(),this.multiple)this.value=e.map(i=>this._flatOptions[i]).filter(i=>i).map(i=>i.value);else{const i=this._flatOptions[e[e.length-1]];if(!i)return;this.value=i.value}}get options(){return this._adapter.getOptions()}set options(t){let e;z(t,x.Group)?e=t.map(i=>({...i})):e=t.map(i=>({...i})),this._options=e,this._adapter.setOptions(e),this._initializeValue(),this._open&&this._adapter.setDropdownOptions(e)}get multiple(){return this._multiple}set multiple(t){this._multiple!==t&&(this._multiple=t,this._reset(),this._open&&this._closeDropdown())}get open(){return this._open}set open(t){this._open!==t&&(t?this._openDropdown():this._closeDropdown())}get optionBuilder(){return this._optionBuilder}set optionBuilder(t){this._optionBuilder=t}get selectedTextBuilder(){return this._selectedTextBuilder}set selectedTextBuilder(t){this._selectedTextBuilder=t}get optionLimit(){return this._optionLimit}set optionLimit(t){this._optionLimit=t}get popupClasses(){return this._popupClasses}set popupClasses(t){this._popupClasses=t}get popupHeaderBuilder(){return this._popupHeaderBuilder}set popupHeaderBuilder(t){this._popupHeaderBuilder=t}get popupFooterBuilder(){return this._popupFooterBuilder}set popupFooterBuilder(t){this._popupFooterBuilder=t}get popupElement(){return this._adapter.popupElement}get beforeValueChange(){return this._beforeValueChange}set beforeValueChange(t){this._beforeValueChange=t}}var Ut=Object.defineProperty,g=(s,t,e,i)=>{for(var o=void 0,r=s.length-1,a;r>=0;r--)(a=s[r])&&(o=a(t,e,o)||o);return o&&Ut(t,e,o),o};class m extends Ot{constructor(){super()}attributeChangedCallback(t,e,i){switch(super.attributeChangedCallback(t,e,i),t){case y.attributes.MULTIPLE:this.multiple=b(i);break;case y.attributes.VALUE:this.value=i;break}}appendOptions(t){this._core.appendOptions(t)}selectAll(){this._core.selectAll()}deselectAll(){this._core.deselectAll()}connectedCallback(){this._core.initialize()}disconnectedCallback(){this._core.destroy()}}g([l()],m.prototype,"value");g([l()],m.prototype,"selectedIndex");g([l()],m.prototype,"options");g([l()],m.prototype,"multiple");g([l()],m.prototype,"open");g([l()],m.prototype,"optionBuilder");g([l()],m.prototype,"selectedTextBuilder");g([l()],m.prototype,"beforeValueChange");g([l({set:!1})],m.prototype,"popupElement");const X=`${w}select`,zt={FIELD:"#field",SELECTED_TEXT:"#selected-text",LABEL:"#select-label"},J={OPEN:"open",TYPE:"type",VALUE:"value",LABEL:"label",MULTIPLE:"multiple",DISABLED:"disabled",PLACEHOLDER:"placeholder",OBSERVE_SCROLL:"observe-scroll",OBSERVE_SCROLL_THRESHOLD:"observe-scroll-threshold"},Wt={...J},Mt={SCROLLED_BOTTOM:`${X}-scrolled-bottom`},u={elementName:X,observedAttributes:J,attributes:Wt,selectors:zt,events:Mt};class Yt extends Gt{constructor(t){super(t),this._fieldElement=C(t,u.selectors.FIELD),this._labelElement=C(t,u.selectors.LABEL),this._selectedTextElement=C(t,u.selectors.SELECTED_TEXT),this._fieldElement.setAttribute("exportparts",Object.values(_.parts).join(", ")),this._fieldElement.focusIndicatorTargetElement=this._component}get fieldElement(){return this._fieldElement}initializeAccessibility(){this._component.setAttribute("role","combobox"),this._component.setAttribute("aria-haspopup","true"),this._component.setAttribute("aria-expanded","false"),Ct(),U(this._component),this.fieldElement.required&&this.setHostAttribute("aria-required","true"),this.fieldElement.disabled&&this.setHostAttribute("aria-disabled","true"),this.fieldElement.invalid&&this.setHostAttribute("aria-invalid","true"),this._component[G]=!this._component.disabled}setLabel(t){const i=!(this._fieldElement.labelPosition==="inset"&&(this._fieldElement.density==="extra-small"||this._fieldElement.dense))&&!!(t!=null&&t.trim());(!this._component.hasAttribute("aria-label")||this._component.getAttribute("aria-label")===this._labelElement.textContent)&&this._component.setAttribute("aria-label",t),i?(this._labelElement.isConnected||this._fieldElement.insertAdjacentElement("afterbegin",this._labelElement),this._labelElement.textContent=t):this._labelElement.remove()}setPlaceholderText(t){N(this._selectedTextElement,!!(t!=null&&t.trim()),"placeholder",t)}open(t){this._targetElement||(this._targetElement=C(this._fieldElement,_.selectors.POPOVER_TARGET)),super.open(t),this._component.setAttribute("aria-controls",`list-dropdown-popup-${t.id}`),this._component.setAttribute("aria-expanded","true"),this._fieldElement.popoverExpanded=!0}close(){return this._component.setAttribute("aria-expanded","false"),this._component.removeAttribute("aria-activedescendant"),U(this._component),this._fieldElement.popoverExpanded=!1,super.close()}floatLabel(t){this._fieldElement.floatLabel=t}updateActiveDescendant(t){N(this._component,!!t,"aria-activedescendant",t)}setSelectedText(t){this._selectedTextElement.textContent=t}setDisabled(t){this._component[G]=!t,N(this._component,t,"aria-disabled","true")}setRequired(){this._component[v]()}addClickListener(t){this._component.addEventListener("click",t)}removeClickListener(t){this._component.removeEventListener("click",t)}addTargetListener(t,e){this._component.addEventListener(t,e)}removeTargetListener(t,e){this._component.removeEventListener(t,e)}syncValue(t){const i=(Array.isArray(t)?!t.length||!t.some(r=>r!=null):t==null)?null:new FormData,o=JSON.stringify(t);i&&t&&i.append(this._component.name,o),this._component.setFormValue(i,o),this._component[v]()}}class $t extends qt{constructor(t){super(t),this._label="",this._required=!1,this._permanentlyFloatLabel=!1,this._mousedownListener=this._onMouseDown.bind(this)}initialize(){this._adapter.tryApplyGlobalConfiguration(["labelPosition","variant"]),super.initialize(),super.initializeTarget(),this._initializeLabel(),this._initializeAccessibility(),this._adapter.addTargetListener("mousedown",this._mousedownListener)}destroy(){super.destroy(),this._adapter.removeTargetListener("mousedown",this._mousedownListener)}syncFloatingLabelState({force:t}={}){t!==void 0&&(this._permanentlyFloatLabel=t),this._updateLabel(),this._tryFloatLabel()}setDisabled(t){this._adapter.setDisabled(t)}_initializeLabel(){this._updateLabel(),this._tryFloatLabel()}_initializeValue(){super._initializeValue(),this._tryFloatLabel()}_initializeAccessibility(){this._adapter.initializeAccessibility()}_onMouseDown(t){t.preventDefault()}_onClick(t){this._adapter.fieldElement.disabled||t.composedPath().find(i=>{var o;return(o=i.matches)==null?void 0:o.call(i,"slot[name=accessory]")})||(this._adapter.focusHost(),super._onClick(t))}_openDropdown(){super._openDropdown(),this._open&&this._adapter.toggleHostAttribute(u.attributes.OPEN,!0)}_closeDropdown(){super._closeDropdown(),this._open||this._adapter.toggleHostAttribute(u.attributes.OPEN,!1)}_onDismiss(){super._onDismiss()}_onDropdownScrollEnd(){this._adapter.emitHostEvent(u.events.SCROLLED_BOTTOM)}async _onSelect(t,e,i=!0){const o=await super._onSelect(t,e,i);return o&&(this._adapter.setSelectedText(this._getSelectedText()),i&&!this._multiple&&this._adapter.focusHost()),this._tryFloatLabel(),this._adapter.syncValue(this._value),o}_reset(){super._reset(),this._adapter.setSelectedText(""),this._tryFloatLabel()}_tryFloatLabel(){if(this._permanentlyFloatLabel){this._adapter.floatLabel(!0);return}const t=!!this._getSelectedText()||!!this._selectedValues.length,e=!!this._placeholder;this._adapter.floatLabel(t||e)}_updateLabel(){this._adapter.setLabel(this._label)}_applyValue(t){super._applyValue(t),this._adapter.syncValue(this._value);const e=this._getSelectedText();this._adapter.setSelectedText(e),this._tryFloatLabel()}get label(){return this._label}set label(t){this._label!==t&&(this._label=t,this._updateLabel(),this._label&&this._initializeLabel(),this._adapter.toggleHostAttribute(u.attributes.LABEL,!!this._label,this._label))}get placeholder(){return this._placeholder}set placeholder(t){this._placeholder!==t&&(this._placeholder=t,this._adapter.setPlaceholderText(this._placeholder),this._initializeLabel())}get multiple(){return super.multiple}set multiple(t){this._multiple!==t&&(super.multiple=t,this._adapter.toggleHostAttribute(u.attributes.MULTIPLE,t))}set required(t){this._required!==t&&this._adapter.setRequired()}}const jt=`<template>
  <forge-field id="field" popover-icon focus-indicator-allow-focus focus-indicator-focus-mode="focus">
    <span id="select-label" slot="label"></span>
    <slot slot="start" name="start"></slot>
    <div data-forge-field-input class="selected-text-container" part="text-container" aria-live="assertive" aria-atomic="true">
      <slot name="value">
        <span id="selected-text" class="selected-text" part="text"></span>
      </slot>
    </div>
    <slot slot="end" name="end"></slot>
    <slot slot="accessory" name="accessory"></slot>
    <slot slot="support-text" name="support-text"></slot>
    <slot slot="support-text-end" name="support-text-end"></slot>

    <!-- Include deprecated leading alias -->
    <slot slot="start" name="leading"></slot>
    <!-- Include deprecated trailing alias -->
    <slot slot="end" name="trailing"></slot>
    <!-- Include deprecated addon-end alias -->
    <slot slot="accessory" name="addon-end"></slot>
    <!-- Include deprecated helper-text alias -->
    <slot slot="support-text" name="helper-text"></slot>
  </forge-field>
</template>
`,Kt=":host{display:block;outline:none}:host([hidden]){display:none}forge-field{--_select-placeholder-color: var(--forge-select-placeholder-color, var(--forge-field-placeholder-color, var(--forge-theme-text-medium, rgba(0, 0, 0, .6))))}.selected-text-container{display:grid;align-items:center;cursor:pointer}::slotted([slot=value]),.selected-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.selected-text:empty:before{content:attr(placeholder);color:var(--_select-placeholder-color);font-size:inherit}:host([disabled]) .selected-text-container{cursor:not-allowed}forge-field{display:contents}";var Xt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,T=(s,t,e,i)=>{for(var o=i>1?void 0:i?Jt(t,e):t,r=s.length-1,a;r>=0;r--)(a=s[r])&&(o=(i?a(t,e,o):a(o))||o);return i&&o&&Xt(t,e,o),o};let I=class extends lt(ht(at(pt(dt(Tt(m)))))){static get observedAttributes(){return[...Object.values(c.observedAttributes),...Object.values(u.observedAttributes),...Object.values(y.observedAttributes)]}constructor(){var t;super(),ct.define([nt,ot]),Q(this,jt,Kt);const s=(t=this.shadowRoot)==null?void 0:t.querySelector(_.elementName);this.initializeFieldInstance(s),this[Z]="select",this._core=new $t(new Yt(this))}connectedCallback(){super.connectedCallback(),this[F]({role:"combobox",ariaDisabled:this.disabled?"true":"false",ariaRequired:this.required?"true":"false"})}attributeChangedCallback(s,t,e){switch(s){case u.observedAttributes.OPEN:this.open=b(e);return;case u.observedAttributes.LABEL:this.label=e;return;case u.observedAttributes.PLACEHOLDER:this.placeholder=e;return}super.attributeChangedCallback(s,t,e)}[tt](){return this.value}[v](){this[H].setValidity({valueMissing:this.required&&!this.value},this[et]({required:this.required,value:this.value}))}formResetCallback(){this.value=null}formStateRestoreCallback(s){this.value=JSON.parse(s)}labelClickedCallback(){this.click(),this.focus()}labelChangedCallback(s){this[F]({ariaLabel:s})}setFormValue(s,t){this[H].setFormValue(s,t)}get floatLabel(){return super.floatLabel}set floatLabel(s){this._core.syncFloatingLabelState({force:s})}get density(){return super.density}set density(s){super.density=s,this._core.syncFloatingLabelState()}get dense(){return super.dense}set dense(s){super.dense=s,this._core.syncFloatingLabelState()}get disabled(){return super.disabled}set disabled(s){super.disabled=s,this._core.setDisabled(s)}get required(){return super.required}set required(s){super.required=s,this._core.required=s}get labelPosition(){return super.labelPosition}set labelPosition(s){super.labelPosition=s,this._core.syncFloatingLabelState()}};T([l()],I.prototype,"label",2);T([l()],I.prototype,"placeholder",2);T([l()],I.prototype,"readonly",2);I=T([B({name:u.elementName,dependencies:[_t,p,P,Lt,mt,gt,rt,ut,At,Et,bt]})],I);export{qt as B,p as O,I as S,Gt as a,P as b,m as c,y as d};
