import{b as d}from"./iframe-DkPiitrC.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bft1KYTZ.js";import"./app-bar-profile-button-BccSJnQl.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-AW4xHEvO.js";import"./menu-CSDXcoFN.js";import"./linear-progress-dFUODLVX.js";import"./list-U-EsoDH6.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-B6chPF29.js";import"./icon-button-BPC8xvtB.js";import"./focus-indicator-CoVWMvtA.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-D_xLVBzb.js";import"./label-CCJpr-qV.js";import"./base-field-SLgFjVwO.js";import"./text-field-BgvmEmwH.js";import"./backdrop--ezx6yHr.js";import"./badge-DLSg4EEH.js";import"./banner-COBkP9Oe.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-DmOqPTQk.js";import"./button-toggle-group-ByOzG7_a.js";import"./button-CzVHO11F.js";import"./calendar-3sIvgK9v.js";import"./card-fNg0rjd_.js";import"./checkbox-DmoEtC-x.js";import"./chip-set-UrZ-3ZSP.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-DnuCPSJ3.js";import"./date-picker-eBlUkm1Z.js";import"./date-range-picker-BicCm06k.js";import"./divider-BqEH_Pqm.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-Bwu0lI6t.js";import"./open-icon-_TxO7zX7.js";import"./file-picker-BwlwlhwB.js";import"./floating-action-button-DdXHD1Wz.js";import"./inline-message-1YYbEfHN.js";import"./key-item-BEhcEP45.js";import"./keyboard-shortcut-CoyZVPSf.js";import"./label-value-CMJEsLJf.js";import"./meter-group-DfKvxYjV.js";import"./page-state-BwPC_Hd9.js";import"./paginator-DKTNh-Gp.js";import"./radio-group-DfVygGGc.js";import"./scaffold-BAVRvYZ-.js";import"./secret-BwHjKTBO.js";import"./select-dropdown-C6zsKS6F.js";import"./select-DHGD13-1.js";import"./skip-link-gpUxmPut.js";import"./slider-WpAP6ogM.js";import"./split-view-CqigWcxZ.js";import"./stack-BRmnsrL_.js";import"./stepper-DmTnkdIe.js";import"./switch-BexSob7j.js";import"./table-BpH87K7N.js";import"./tab-bar-BGJjqQ49.js";import"./time-picker-Cl678r--.js";import"./toast-Bzi_dBJJ.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-DPTfFrQ9.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-l0JzMd6q.js";import"./split-button-3f16CVNe.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
