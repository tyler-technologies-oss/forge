import{a as b}from"./index-B-lxVbXh.js";import"./lit-element-B3QVTycr.js";import{x as C}from"./lit-html-CuBe1DX_.js";import{g as y,s as h}from"./utils-Do5MGSMS.js";import"./feature-detection-C61kIZu7.js";import"./accordion-D9DRD9gp.js";import"./expansion-panel-tM2gL5Km.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-Db9vmw9L.js";import"./state-layer-Y8UVngaT.js";import"./focus-indicator-DydcbRnf.js";import{I}from"./icon-DNSPAaK0.js";import"./menu-BIp0gSDi.js";import{t as v,a as x,b as L,c as P}from"./index-RsKXMDm2.js";import"./linear-progress-Brg7kVg_.js";import"./list-BEAQdsdb.js";import"./popover-DlgaZ2F2.js";import"./overlay-C2J-mFMD.js";import"./skeleton-Cfb12itF.js";import"./avatar-CawfXDqL.js";import"./icon-button-DJSm0po0.js";import"./autocomplete-CfRy7s5s.js";import"./label-W_tr_-w0.js";import"./button-7EoU3XJS.js";import"./button-toggle-group-BIaWvq7W.js";import"./checkbox-CZ4HhXrD.js";import"./switch-CVhsVTET.js";import"./base-field-BDCxUf4S.js";import"./text-field-DxXALn2L.js";import"./backdrop-UaagznG1.js";import"./badge-B8aS-qp1.js";import"./banner-B9fsGtM7.js";import"./bottom-sheet-baVH4XVI.js";import"./dialog-DS9mWfRG.js";import"./button-area-h-qKNwB7.js";import"./calendar-Bv8ksB_u.js";import"./card-DnHcCLR_.js";import"./chip-set-B0yOrBQy.js";import"./circular-progress-CbpfkaY8.js";import"./color-picker-BdYfMrf8.js";import"./date-picker-BwEtYhEO.js";import"./date-range-picker-DubEfnI8.js";import"./divider-B48YHESn.js";import"./base-drawer-Lp4STqay.js";import"./drawer-Cli5cLb8.js";import"./modal-drawer-BkXqvSeM.js";import"./mini-drawer-CKdbSBK2.js";import"./file-picker-DUr_fBW1.js";import"./floating-action-button-Cr4Nb5gc.js";import"./inline-message-B-l04edk.js";import"./key-item-Drd7rxXP.js";import"./keyboard-shortcut-2NoS7Obq.js";import"./label-value-BkWOzHIE.js";import"./meter-group-2DHdEHcU.js";import"./page-state-CnNv8Q0J.js";import"./paginator-C8_E8mrh.js";import"./scaffold-CWDbFKLY.js";import"./select-dropdown-Cqi8qMIW.js";import"./select-GgERi9im.js";import"./skip-link-CqksV005.js";import"./slider-CCdSBSo8.js";import"./split-view-DezFwEpm.js";import"./stack-CePCofIq.js";import"./stepper-DvM17XVY.js";import"./table-DZLdwJXg.js";import"./tab-bar-BYmocEmS.js";import"./time-picker-CmHyRFQW.js";import"./toast-BxU8Qs2P.js";import"./toolbar-CM1YCrRV.js";import"./tooltip-Cafnl2Xo.js";import"./view-switcher-BmplNyU0.js";import"./deprecated-icon-button-DMq5qWIe.js";import"./split-button-D3UEgqvV.js";const s="forge-app-bar-profile-button",$=b("forge-profile-card-profile"),w=b("forge-profile-card-sign-out");I.define([v,x,L,P]);const B={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>C`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${$}
          @forge-profile-card-sign-out=${w}
          .avatarLetterCount=${n}
          .profileButton=${p}
          .profileButtonText=${e}
          .signOutButton=${t}
          .signOutButtonText=${o}
          .fullName=${r}
          .email=${i}
          .open=${a}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...h,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return C`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var d,c,u;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(u=(c=l.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }
    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;
      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);
      return listItemElement;
    }
    return html\`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=\${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    \`;
  }
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const M=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:M,default:B},Symbol.toStringTag,{value:"Module"}));export{l as D,Qt as P,m as W};
