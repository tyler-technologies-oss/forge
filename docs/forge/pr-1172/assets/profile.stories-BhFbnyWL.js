import{b as d}from"./iframe-BQuUdi9A.js";import{s as u,g as f}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-C99VL_Si.js";import"./app-bar-menu-button-B1YJblx-.js";import"./app-bar-profile-button-DY69iVIm.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons--haAADqW.js";import"./menu-D-lcVz-r.js";import"./linear-progress-VpC6qUWa.js";import"./list-DJY0Qsvo.js";import"./popover-C49q6_k0.js";import"./overlay-DlXgJPae.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnhVRD4Y.js";import"./list-item-ByLOjRzX.js";import"./avatar-C2T-zYOr.js";import"./icon-button-CqF7oM9r.js";import"./autocomplete-BJ_VtbTx.js";import"./label-BnmMXl01.js";import"./base-field-U1vI4X4O.js";import"./focus-indicator--VpOaZ6F.js";import"./text-field-CZ4Y4cDf.js";import"./backdrop-Dvs4MPLP.js";import"./badge-1n88vZyR.js";import"./banner-DcmTFn1M.js";import"./bottom-sheet-rwCTNSQ0.js";import"./dialog-Ch3czCB_.js";import"./button-area-JSx8c1Ta.js";import"./button-toggle-group-BuqjjRXG.js";import"./button-0aFc-rvC.js";import"./calendar-BkUv1tz_.js";import"./card-D4nNosYG.js";import"./checkbox-BovgCLF2.js";import"./chip-set-SskbQuYZ.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-CScFxF5l.js";import"./date-picker-ClEqQLzS.js";import"./date-range-picker-CeGattXb.js";import"./divider-BoT5wEQw.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-CVDUP46z.js";import"./open-icon-CZoIkz9V.js";import"./file-picker-DwlZKZeJ.js";import"./floating-action-button-ZuubCkXA.js";import"./inline-message-BXrlbIvc.js";import"./key-item-DBS9G46B.js";import"./keyboard-shortcut-Cp3ihP7e.js";import"./label-value-CDNJ622N.js";import"./meter-group-mw7VEZKc.js";import"./page-state-C_fHeyC9.js";import"./paginator-BxGpJb65.js";import"./radio-group-CTxw9zFP.js";import"./scaffold-D8DtzjhO.js";import"./secret-6NlzqR4z.js";import"./select-dropdown-CJVQOKyZ.js";import"./select-BG3qUTBk.js";import"./skip-link-rwUi_sBN.js";import"./slider-DO-XGDxi.js";import"./split-view-CR0DiTXv.js";import"./stack-E4V9OTtJ.js";import"./stepper-DhAMGtbB.js";import"./switch-BHB_lLoE.js";import"./table-BXy-6v7Z.js";import"./tab-panel-DCnI4SeF.js";import"./time-picker-BmvPIvcX.js";import"./timestamp-DS_mc1Uu.js";import"./toast-NB_2MhbI.js";import"./toolbar-u0CVrqbx.js";import"./tooltip-Dq2Q0xN1.js";import"./tree-item-lIPln6pc.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-CEm-Gzfb.js";import"./split-button-DcSGNSsY.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
