import{b as d}from"./iframe-BgHZI532.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DdeMODCb.js";import"./app-bar-profile-button-D7P1BIef.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CsheopFW.js";import"./menu-Cx249NCa.js";import"./linear-progress-dFUODLVX.js";import"./list-Dvip_20z.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-FXxtxG0t.js";import"./icon-button-n3fs9knp.js";import"./focus-indicator-CCrT9cli.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-BMFqkmDt.js";import"./label-CCJpr-qV.js";import"./base-field-PHdCEj9t.js";import"./text-field-Q4OOc2wN.js";import"./backdrop--ezx6yHr.js";import"./badge-OS_tGTYr.js";import"./banner-CS9hRfux.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-CM4D46Ab.js";import"./button-toggle-group--Z-2FW7D.js";import"./button-D4I2Jx_K.js";import"./calendar-K4hQqP3Q.js";import"./card-DU5j9pEq.js";import"./checkbox-U-GdFo3c.js";import"./chip-set-H8-9iAMI.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-qEgnkFZV.js";import"./date-picker-KNCTk7fg.js";import"./date-range-picker-Bd7ICahl.js";import"./divider-DYupYZXv.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-VKxzTfgT.js";import"./open-icon-D2Vwo70O.js";import"./file-picker-Bfmetn1h.js";import"./floating-action-button-CTIZMHfN.js";import"./inline-message-1YYbEfHN.js";import"./key-item-7ILicyvM.js";import"./keyboard-shortcut-CAOQTAL5.js";import"./label-value-CMJEsLJf.js";import"./meter-group-CcLHeAOz.js";import"./page-state-BwPC_Hd9.js";import"./paginator-lkj5liy-.js";import"./radio-group-JgTNOyna.js";import"./scaffold-BAVRvYZ-.js";import"./secret-CB5E9iud.js";import"./select-dropdown-DFfGoplV.js";import"./select-B6RWn2Ko.js";import"./skip-link-DMkuetqr.js";import"./slider-Bbd72I3i.js";import"./split-view-BEfqaad9.js";import"./stack-BRmnsrL_.js";import"./stepper-DXxRegGO.js";import"./switch-CMWkk_1P.js";import"./table-C6IF2Wss.js";import"./tab-bar--ComstN0.js";import"./time-picker-CvKxGGuG.js";import"./toast-3rKklGa6.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-CEBS6jfp.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-D8d9MxOC.js";import"./split-button-D2KsIMsH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
