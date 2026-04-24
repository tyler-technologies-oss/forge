import{b as d}from"./iframe-DUkN5F6u.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B-cnkCow.js";import"./app-bar-profile-button-Co6Zx_s5.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-JX1t2Wgz.js";import"./menu-B32ONFPp.js";import"./linear-progress-BUmXHJif.js";import"./list-BAO5WLfe.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-CzebwZlC.js";import"./icon-button-BI3Gi8KU.js";import"./focus-indicator-W9h7yghR.js";import"./state-layer-Cext-Euv.js";import"./autocomplete-Bade8mxx.js";import"./label-ChEf3nsR.js";import"./button-BfDjVlOn.js";import"./button-toggle-group-d8VBhwh6.js";import"./checkbox-Zq5Z_KaC.js";import"./switch-DSFhR9rO.js";import"./base-field-fIAFHhCf.js";import"./text-field-DQaGBRQ4.js";import"./backdrop-B_VtJyIN.js";import"./badge-BJ1zHjmA.js";import"./banner-XGO97KM-.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-BRZUtsF-.js";import"./calendar-D5k-kDej.js";import"./card-6J-3YmIr.js";import"./chip-set-DXiXemNA.js";import"./circular-progress-BmiDq0cM.js";import"./color-picker-CX8AQDp2.js";import"./date-picker-DhP_yOyr.js";import"./date-range-picker-7hxtDG6y.js";import"./divider-B9fBVaPR.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DR-_gUVX.js";import"./modal-drawer-DJ67kJSZ.js";import"./mini-drawer-BybnH3Bp.js";import"./expansion-panel-CAbXM4YB.js";import"./open-icon-CnAVOSV2.js";import"./file-picker-BznVrmLi.js";import"./floating-action-button-D-UNxJhl.js";import"./inline-message-DtdgdAmC.js";import"./key-item-SF3u5EXg.js";import"./keyboard-shortcut-XAMlS6sS.js";import"./label-value-CCas1rcR.js";import"./meter-group-DFvlcFJO.js";import"./page-state-CG7zxuxw.js";import"./paginator-BmkKHqF8.js";import"./scaffold-D_SIXSFE.js";import"./secret-CqVY90ks.js";import"./select-dropdown-DNFoFcj4.js";import"./select-C9ARblnh.js";import"./skip-link-CxBPeYBz.js";import"./slider-BBNjY5Go.js";import"./split-view-CYMLb1_M.js";import"./stack-BuaXNRar.js";import"./stepper-Bli_5YoI.js";import"./table-92tS76MY.js";import"./tab-bar-B_88SM4v.js";import"./time-picker-DRuQCNpV.js";import"./toast-BsqeA54N.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-huMzrRDe.js";import"./tree-item-BcMa1zEz.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-ylYrQD7h.js";import"./split-button-sCODDVMY.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
