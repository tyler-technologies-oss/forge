import{b as d}from"./iframe-CdbO8ZWL.js";import{s as u,g as f}from"./utils-CjnDZgMw.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DlEcUnKb.js";import"./app-bar-profile-button-B8eD34fF.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CP3IuoxV.js";import"./menu-BPXGi9ZL.js";import"./linear-progress-D4Cj2MuD.js";import"./list-zoQskWC0.js";import"./popover-Br804OQS.js";import"./overlay-BkwGtAvs.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CItCGZ0G.js";import"./avatar-kLL4w04k.js";import"./icon-button-CzzNgYJ5.js";import"./focus-indicator-CP_rFuyY.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-BZ7SlAQE.js";import"./label-CVi-YE1S.js";import"./base-field-_1zGY7FX.js";import"./text-field-BWVPyHXO.js";import"./backdrop-DWOkfyRe.js";import"./badge-CMGQXeTZ.js";import"./banner-CyfcIhSE.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-CbOpfH_e.js";import"./button-toggle-group-D2QlThN6.js";import"./button-BrC_FCoP.js";import"./calendar-CtsdANWB.js";import"./card-Cd5hCNYZ.js";import"./checkbox-oR1uAFLJ.js";import"./chip-set-BQ1G3V3B.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-BW2oVSBs.js";import"./date-picker-CwP0vNG2.js";import"./date-range-picker-TM8_6bZS.js";import"./divider-CWiGColg.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-YLFRr9Um.js";import"./open-icon-IasJz46n.js";import"./file-picker-B_uAc6z5.js";import"./floating-action-button-DGyp64De.js";import"./inline-message-MRVYAzAu.js";import"./key-item-CsZbJmdm.js";import"./keyboard-shortcut-CopzA2XR.js";import"./label-value-CWmtlzqa.js";import"./option-group-BPrct8lp.js";import"./meter-group-Dhl1dx1e.js";import"./page-state-j1LLkVCi.js";import"./paginator-CQ8VaWSr.js";import"./radio-group-cU3ZIX7Y.js";import"./scaffold-CssrLcVP.js";import"./secret-26QEXgJA.js";import"./select-dropdown-5oQY2MO7.js";import"./select-BsPtEYvJ.js";import"./skip-link-CqRRQvtp.js";import"./slider-DMDPXy5u.js";import"./split-view-dUjZXcD6.js";import"./stack-Cu7r2NOS.js";import"./stepper-yB4T19-h.js";import"./switch-GoP0XgUB.js";import"./table-CGqq0FlL.js";import"./tab-panel-D5ouAr0u.js";import"./time-picker-CkU-F63k.js";import"./timestamp-KCj83cQC.js";import"./toast-l-w7-lnx.js";import"./toolbar-zcd0Pa-9.js";import"./tooltip-CO01zmCT.js";import"./tree-item-r89von9U.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-Bc3anY8l.js";import"./split-button-BIPsb1xL.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
