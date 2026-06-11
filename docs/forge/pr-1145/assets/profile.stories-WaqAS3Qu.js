import{b as d}from"./iframe-nwfEqjXP.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D7P8cFWH.js";import"./app-bar-profile-button-BqrX5Of1.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D-3plDG8.js";import"./menu-B2Nru305.js";import"./linear-progress-dFUODLVX.js";import"./list-D760QyAx.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-BILtS06H.js";import"./icon-button-Ds-NwOJs.js";import"./focus-indicator-yCT41UC-.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-zTJYP57z.js";import"./label-CCJpr-qV.js";import"./base-field-2dg960Ox.js";import"./text-field-BuDCTr5f.js";import"./backdrop--ezx6yHr.js";import"./badge-CBzPLkqC.js";import"./banner-CxRzCXUP.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-DANkixUZ.js";import"./button-toggle-group-CnhTuJub.js";import"./button-DydTFhxd.js";import"./calendar-BBFamLO5.js";import"./card-UX8tBW6B.js";import"./checkbox-MDDz3-X5.js";import"./chip-set-Ccm-NrLK.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-BffDEu1S.js";import"./date-picker-j4szO18t.js";import"./date-range-picker-_fvUaGpl.js";import"./divider-gzLiiEq5.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-DyY7TldG.js";import"./open-icon-Cp0A1_fL.js";import"./file-picker-C3nvGJFp.js";import"./floating-action-button-DqxJriay.js";import"./inline-message-1YYbEfHN.js";import"./key-item-fa7kCfx6.js";import"./keyboard-shortcut-BjhOJiov.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BQWaGuIZ.js";import"./page-state-BwPC_Hd9.js";import"./paginator-DYUVoDQ6.js";import"./radio-group-BqcoPHDv.js";import"./scaffold-BAVRvYZ-.js";import"./secret-sRwQep_r.js";import"./select-dropdown-XUVyXI0e.js";import"./select-CCfD3cF2.js";import"./skip-link-BBVJCon7.js";import"./slider-Dmpimt2n.js";import"./split-view-BpNUcOBk.js";import"./stack-BRmnsrL_.js";import"./stepper-C1amd8_M.js";import"./switch-CnQ_BOJK.js";import"./table-BN_FGxlA.js";import"./tab-bar-BaKfxdBz.js";import"./time-picker-D-_WTAnX.js";import"./toast-0i_Ri1xy.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-ChyckF97.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-CMp2Auyb.js";import"./split-button-CF9aQjmk.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
