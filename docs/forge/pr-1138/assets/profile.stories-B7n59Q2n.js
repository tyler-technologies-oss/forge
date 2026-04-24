import{b as d}from"./iframe-KAvO3ccT.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D5XfBQxl.js";import"./app-bar-profile-button-Dvo_RRHh.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BC4d5Cu4.js";import"./menu-VKmXUI1w.js";import"./linear-progress-BUmXHJif.js";import"./list-XqqqC6OJ.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-D_Y8ZKFb.js";import"./icon-button-Cwrtmqh7.js";import"./focus-indicator-DE6BE6Uv.js";import"./state-layer-Cext-Euv.js";import"./autocomplete-CX7xj5Xq.js";import"./label-ChMnju8c.js";import"./button-B5NlTkj8.js";import"./button-toggle-group-E89YZq-N.js";import"./checkbox-CMtbRh3b.js";import"./switch-ID_p_BOB.js";import"./base-field-C6jVam4u.js";import"./text-field-qnY6BVQ8.js";import"./backdrop-B_VtJyIN.js";import"./badge-D99JGlXy.js";import"./banner-foIAb-2T.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-C4GCLeo1.js";import"./calendar-Z_IH4SG6.js";import"./card-Dq3841Rq.js";import"./chip-set-D4jkMuJm.js";import"./circular-progress-BmiDq0cM.js";import"./color-picker-Dsx38eQ9.js";import"./date-picker-CBGeg93Y.js";import"./date-range-picker-CwMyQUZ3.js";import"./divider-Dh2pUGDD.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DR-_gUVX.js";import"./modal-drawer-DJ67kJSZ.js";import"./mini-drawer-BybnH3Bp.js";import"./expansion-panel-B8e6E0H2.js";import"./open-icon-DZfKtTGb.js";import"./file-picker-BakGFfKq.js";import"./floating-action-button-CRQ4kY52.js";import"./inline-message-DtdgdAmC.js";import"./key-item-C_TT3hp3.js";import"./keyboard-shortcut-xoJzkXIl.js";import"./label-value-CCas1rcR.js";import"./meter-group-BLN-xgwQ.js";import"./page-state-CG7zxuxw.js";import"./paginator-D137Beav.js";import"./scaffold-D_SIXSFE.js";import"./secret-Y3MDz7dH.js";import"./select-dropdown-DZYnvdfe.js";import"./select-XCoX1MbZ.js";import"./skip-link-D_PWBBp6.js";import"./slider-C5tOZugV.js";import"./split-view-CFihLVyS.js";import"./stack-BuaXNRar.js";import"./stepper-DsmE4xKX.js";import"./table-BxDj5MEJ.js";import"./tab-bar-BAcbVpIv.js";import"./time-picker-juS0T7ky.js";import"./toast-2oQNtDju.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-huMzrRDe.js";import"./tree-item-CGV06dzl.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-ydCGehuV.js";import"./split-button-BIGJarCC.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${I}
        @forge-profile-card-sign-out=${h}
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
