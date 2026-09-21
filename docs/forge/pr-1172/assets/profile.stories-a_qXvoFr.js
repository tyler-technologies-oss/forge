import{b as d}from"./iframe-BaLQ_A2d.js";import{s as u,g as f}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-Ca9Y-bf7.js";import"./app-bar-menu-button-DrBTzQf-.js";import"./app-bar-profile-button-DpM6C9r4.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DfIaYIv7.js";import"./menu-Bpyhfaa_.js";import"./linear-progress-VpC6qUWa.js";import"./list-CtFWDf9k.js";import"./popover-BqWv_wJF.js";import"./overlay-DFZfpbSi.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnMa3F30.js";import"./list-item-Bra_7jX-.js";import"./avatar-BzhNyOik.js";import"./icon-button-IKvoqhNZ.js";import"./autocomplete-CWp43el_.js";import"./label-BIsRcMc6.js";import"./base-field-B2hMeS19.js";import"./focus-indicator-BeZvj0X5.js";import"./text-field-DpRJB-zB.js";import"./backdrop-Dvs4MPLP.js";import"./badge-DymMcnze.js";import"./banner-BvLty6Wy.js";import"./bottom-sheet-l8KRqCyS.js";import"./dialog-CWWGCOKC.js";import"./button-area-BmWGh6OZ.js";import"./button-toggle-group-CTKt_zci.js";import"./button-C5R_qqOK.js";import"./calendar-DYHmb5gP.js";import"./card-BdewD5or.js";import"./checkbox-DQTRdMdm.js";import"./chip-set-C3aByb5u.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-C0DblbD6.js";import"./date-picker-BLOopeVA.js";import"./date-range-picker-C_qAOYjd.js";import"./divider-DGwf0Vud.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-B_L_Rszi.js";import"./open-icon-Z3xYPoD8.js";import"./file-picker-CZjM4RSC.js";import"./floating-action-button-qq1q08PY.js";import"./inline-message-BXrlbIvc.js";import"./key-item-BQTnQgUN.js";import"./keyboard-shortcut-DQrU0P4T.js";import"./label-value-CDNJ622N.js";import"./meter-group-Be5UpxIj.js";import"./page-state-C_fHeyC9.js";import"./paginator-BDDWgHNa.js";import"./radio-group-BqfKTB-V.js";import"./scaffold-D8DtzjhO.js";import"./secret-Dv15S7Kn.js";import"./select-dropdown-Bb9B8K7M.js";import"./select-ByzXAQSi.js";import"./skip-link-DYN6GQqt.js";import"./slider-CsETvoUl.js";import"./split-view-Cj_5rNkN.js";import"./stack-E4V9OTtJ.js";import"./stepper-CF-eM1eu.js";import"./switch-aCewe0Hv.js";import"./table-Bzuns9tR.js";import"./tab-panel-COnKVwN9.js";import"./time-picker-B_JKVOM4.js";import"./timestamp-jg_-Mtnl.js";import"./toast-BP5KJUuF.js";import"./toolbar-Cijcphd3.js";import"./tooltip-C0ic2qYj.js";import"./tree-item-DH-5zwd9.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-DttVKQ2I.js";import"./split-button-BYSaAg6v.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
