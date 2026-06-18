import{b as d}from"./iframe-C_mPYkbV.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-z1Gg8d_g.js";import"./app-bar-profile-button-1fOy_naZ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BfSLPSM6.js";import"./menu-Bsnc-5zL.js";import"./linear-progress-dFUODLVX.js";import"./list-moFX1MGq.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-Co8jB2wB.js";import"./icon-button-BSSpwoGt.js";import"./focus-indicator-CrQLjwmJ.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-Ciic3XTQ.js";import"./label-CCJpr-qV.js";import"./base-field-C3IP6xwH.js";import"./text-field-BAkbQy2e.js";import"./backdrop--ezx6yHr.js";import"./badge-CqG-TeYo.js";import"./banner-CM5y-UTw.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-D6YnG6yI.js";import"./button-toggle-group-BCoSG6eZ.js";import"./button-Ch9qOK2B.js";import"./calendar-Bpd4XdF2.js";import"./card-BiVDLDtR.js";import"./checkbox-bovh3mxa.js";import"./chip-set-BGzR8RsX.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-CW4hZZX5.js";import"./date-picker-DZuheWlG.js";import"./date-range-picker-DFZ6eiK1.js";import"./divider-CiWAS7cL.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-taTyBVrV.js";import"./open-icon-CGE4Kqh9.js";import"./file-picker-CNTToPTg.js";import"./floating-action-button-mcgUmeVd.js";import"./inline-message-1YYbEfHN.js";import"./key-item-CMaxv-Lf.js";import"./keyboard-shortcut-F0de5q7F.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BSggUqIb.js";import"./page-state-BwPC_Hd9.js";import"./paginator-CN_rZhcL.js";import"./radio-group-Dgz4A9VD.js";import"./scaffold-BAVRvYZ-.js";import"./secret-D51l5tgC.js";import"./select-dropdown-D6s8-9MQ.js";import"./select-DeIGA4UD.js";import"./skip-link-CU1w15Z9.js";import"./slider-C8Om0D42.js";import"./split-view-nO7CS-Vd.js";import"./stack-BRmnsrL_.js";import"./stepper-DZRTvncv.js";import"./switch-C6UJl8U_.js";import"./table-DNcT4Zeq.js";import"./tab-bar-DanOLt2G.js";import"./time-picker-Emkcclcn.js";import"./toast-34UT63wS.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-B2ct_MYp.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-B2swxLuC.js";import"./split-button-BDm2U-zK.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
