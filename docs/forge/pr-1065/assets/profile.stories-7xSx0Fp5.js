import{b as d}from"./iframe-pqTvACNP.js";import{s as u,g as f}from"./utils-Cntew3lg.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-D8n3fbCt.js";import"./expansion-panel-huBiB0DZ.js";import"./open-icon-BIuINibX.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-B1oFki5a.js";import"./state-layer-DGD4bZzf.js";import"./focus-indicator-B_dAHUd_.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CBdZU-Tr.js";import"./menu-CcEjeL3H.js";import"./linear-progress-CpNoMDP5.js";import"./list-a6IB0DPO.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";import"./avatar-D-YCuW2k.js";import"./icon-button-B_qVG_it.js";import"./autocomplete-BgysD7Fj.js";import"./label-Blmy9e6R.js";import"./button-DIUHasWh.js";import"./button-toggle-group-CH9NiA1W.js";import"./checkbox-Dv_UGdzf.js";import"./switch-CicCqkci.js";import"./base-field-CdA0iQoJ.js";import"./text-field-gs39rriO.js";import"./backdrop-CaFxRXEM.js";import"./badge-BgAW2MVS.js";import"./banner-C6Sq7_TM.js";import"./bottom-sheet-9RBhFU7Z.js";import"./dialog-CGP43TQA.js";import"./button-area-CUbw0tU-.js";import"./calendar-BZuDsAIh.js";import"./card-CeH2SdBX.js";import"./chip-set-yZLLHaLw.js";import"./circular-progress-C2aFmJj-.js";import"./color-picker-Da_a5Bnt.js";import"./date-picker-D-tZYruE.js";import"./date-range-picker-Xc3yj4yH.js";import"./divider-Dq-Slgl_.js";import"./base-drawer-CNdRFpRQ.js";import"./drawer-D79-TANn.js";import"./modal-drawer-DO8CNRCC.js";import"./mini-drawer-CPIvZj6f.js";import"./file-picker-7LLhR8yu.js";import"./floating-action-button-hkupvqUw.js";import"./inline-message-kV-z6eDt.js";import"./key-item-H-_JZqKa.js";import"./keyboard-shortcut-48xwLAq2.js";import"./label-value-CmUo1iy-.js";import"./meter-group-C9Nx9c7t.js";import"./page-state-CSOfrMln.js";import"./paginator-DdPmkNw5.js";import"./scaffold-CspBWUuL.js";import"./select-dropdown-BDxRxeN8.js";import"./select-DEzE72V8.js";import"./skip-link-gsezxPAN.js";import"./slider-B2ZiCoxI.js";import"./split-view-B4nSGAYd.js";import"./stack-B5sNQmDm.js";import"./stepper-D7R_npXr.js";import"./table-D1qIp2da.js";import"./tab-bar-BItD-GAX.js";import"./time-picker-CX-RnTNR.js";import"./toast-LD-5tkSc.js";import"./toolbar-DM62Euqg.js";import"./tooltip-DxbQteKS.js";import"./tree-item-BoUZ1T6Z.js";import"./view-switcher-BguW3JYm.js";import"./deprecated-icon-button-D5lxZbHu.js";import"./split-button-D0_9kHBR.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ht=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ht as P,m as W};
