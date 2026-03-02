import{b as d}from"./iframe-BlOFKJDS.js";import{s as u,g as f}from"./utils-DUpaJ7b_.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Cz67_g8i.js";import"./app-bar-profile-button-DwOmon_c.js";import"./state-layer-D_bEeiyc.js";import"./focus-indicator-DF2HrkuM.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import"./menu-DvHm9QHD.js";import"./linear-progress-CYTe6uKP.js";import"./list-By4HPSzV.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";import"./avatar-DVJnqbC5.js";import"./icon-button-CBB1Wyv0.js";import"./autocomplete-BdRTgpmE.js";import"./label-PBJgWwVx.js";import"./button-CrEyna-l.js";import"./button-toggle-group-CSYMjEX6.js";import"./checkbox-D6KNXaeb.js";import"./switch-DfOCriK_.js";import"./base-field-ByG2tr7F.js";import"./text-field-DWvKFKKM.js";import"./backdrop-TsivOJBj.js";import"./badge-CBjRh4TS.js";import"./banner-COjey8tM.js";import"./bottom-sheet-C-Lkmp9F.js";import"./dialog-Ck64qUvQ.js";import"./button-area-BJWbO6Ds.js";import"./calendar-9mrIiH1U.js";import"./card-BDdCE95F.js";import"./chip-set-BjGoRsy4.js";import"./circular-progress-D8W_v512.js";import"./color-picker-g_UyFbrr.js";import"./date-picker-BMuFSZSu.js";import"./date-range-picker-BzKRGOCY.js";import"./divider-BL37Lb2g.js";import"./base-drawer-BOH6KPhP.js";import"./drawer-DqRX_445.js";import"./modal-drawer-UtKsh6g7.js";import"./mini-drawer-CjKFhsAv.js";import"./expansion-panel-Ddnhu1du.js";import"./open-icon-zfnrNF6k.js";import"./file-picker-DhRxsOTT.js";import"./floating-action-button-DxcH-M42.js";import"./inline-message-CbmpByuI.js";import"./key-item-CfyooAY3.js";import"./keyboard-shortcut-CWcwLsK9.js";import"./label-value-ChKN0id0.js";import"./meter-group-89d_HKwD.js";import"./page-state-mAXa5csm.js";import"./paginator-BobgBXHO.js";import"./scaffold-BiMWLKK6.js";import"./select-dropdown-DYe0O7fo.js";import"./select-Cxi7Lztq.js";import"./skip-link-DJYsPyar.js";import"./slider-BYiNWqMa.js";import"./split-view-CghQS3Zp.js";import"./stack-DCH7zCMl.js";import"./stepper-DC4AKtBO.js";import"./table-BN8dYzvU.js";import"./tab-bar-Di5yib90.js";import"./time-picker-CHm6ZMIu.js";import"./toast-D4CeBP8R.js";import"./toolbar-DJfFE6T6.js";import"./tooltip-BQwGelzj.js";import"./tree-item-BWJMCI7C.js";import"./view-switcher-ip2Cf1MD.js";import"./deprecated-icon-button-LU_LWcAr.js";import"./split-button-DYMTATvH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
