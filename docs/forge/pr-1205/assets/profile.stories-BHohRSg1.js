import{b as d}from"./iframe-CDZPIrnA.js";import{s as u,g as f}from"./utils-BUKDVvEj.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C0S88n-h.js";import"./app-bar-profile-button-TnBJAWMO.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D-GJLevi.js";import"./menu-YOllCC2W.js";import"./linear-progress-D4Cj2MuD.js";import"./list-CQgl2N9z.js";import"./popover-CG55Lm15.js";import"./overlay-DIU5fAP8.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BQUueydM.js";import"./avatar-BPt_toH5.js";import"./icon-button-BGGeCJn0.js";import"./focus-indicator-C6gjbqoY.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-Ch7vfQqt.js";import"./label-CcXTC4gs.js";import"./base-field-BPEQdQpN.js";import"./text-field-DnDu7gxA.js";import"./backdrop-DWOkfyRe.js";import"./badge-L5wVc6Hk.js";import"./banner-fIISV49_.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-CQmcjUc6.js";import"./button-toggle-group-BlLUDMd1.js";import"./button-C0WR4Msg.js";import"./calendar-CHFBl4nC.js";import"./card-BvL89Hpb.js";import"./checkbox-ChE9HdSQ.js";import"./chip-set-BESn29Zp.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-DLUoCOlg.js";import"./date-picker-BlAaPMc0.js";import"./date-range-picker-VX9pIDtb.js";import"./divider-DGfw4r81.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-DPFk1rbx.js";import"./open-icon-CeNJR1p8.js";import"./file-picker-DW51wknD.js";import"./floating-action-button-DGER2WAt.js";import"./inline-message-MRVYAzAu.js";import"./key-item-DF5zcEUk.js";import"./keyboard-shortcut-CA-aVP2o.js";import"./label-value-CWmtlzqa.js";import"./option-group-DJVodTxK.js";import"./meter-group-DCt7b_Y3.js";import"./page-state-j1LLkVCi.js";import"./paginator-BHyLGFOz.js";import"./radio-group-iA9o4SWr.js";import"./scaffold-CssrLcVP.js";import"./secret-DDFgtS4_.js";import"./select-dropdown-D-mPohCZ.js";import"./select-BVisZcNX.js";import"./skip-link-Dtz4gn0m.js";import"./slider-CJKHVo8o.js";import"./split-view-yF3TEDy7.js";import"./stack-Cu7r2NOS.js";import"./stepper-DO4GMjN4.js";import"./switch-MZMXToWJ.js";import"./table-BU6zVD8s.js";import"./tab-panel-BeufWbc3.js";import"./time-picker-asLiPXMl.js";import"./timestamp-CMfwhzFL.js";import"./toast-DkzBQHKc.js";import"./toolbar-CzMdbTAp.js";import"./tooltip-DTYSc0BY.js";import"./tree-item-rcopXKR8.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-CIwQevej.js";import"./split-button-BHYPI_7p.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
