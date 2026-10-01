import{b as d}from"./iframe-xkxJQMA3.js";import{s as u,g as f}from"./utils-Cc_oRLiJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B5YFS3rn.js";import"./app-bar-menu-button-Dk1fkbj-.js";import"./app-bar-profile-button-VQtAflmX.js";import{I as g}from"./icon-CTJHsNpY.js";import"./menu-Be51duky.js";import{a as E,b,c as C,d as y}from"./tyler-icons-D62AQmQV.js";import"./linear-progress-BuMeIIdZ.js";import"./list-ip2ib_Bz.js";import"./popover-DoQj6sL6.js";import"./overlay-CnHwB7Zc.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FmKl34ig.js";import"./list-item-B5Smd2RI.js";import"./avatar-CGWQd0jJ.js";import"./icon-button-Bcp4Vx6c.js";import"./autocomplete-h53yFeSz.js";import"./label-DTGg67i-.js";import"./base-field-Cvd5WuZP.js";import"./focus-indicator-ChAMx-S6.js";import"./text-field-1XWmdId_.js";import"./backdrop-ngk7d2eo.js";import"./badge-Dl-LgDVA.js";import"./banner-Bcn5wHSv.js";import"./bottom-sheet-Bc5g48ar.js";import"./dialog-Bk-hd-_h.js";import"./button-area-rTkxn6yw.js";import"./button-toggle-group-CZyTtF8T.js";import"./button-B533j5XO.js";import"./calendar-B628fXxT.js";import"./card-CStXZYBQ.js";import"./checkbox-M11aOjjs.js";import"./chip-set-DLNJjsSI.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-4Eae0iN2.js";import"./date-picker-BZmI4LPB.js";import"./date-range-picker-DnW1lPOE.js";import"./divider-CifZUp5Y.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-7i1KrNC4.js";import"./open-icon-DFfFTKwM.js";import"./file-picker-Z8H_fcul.js";import"./floating-action-button-BkUC1UBH.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-CJKzhViJ.js";import"./key-item-BSz8YPKM.js";import"./keyboard-shortcut-D9cZyIfR.js";import"./label-value-C0-wovkK.js";import"./listbox-D80IIvP2.js";import"./meter-group-mkmqsxqN.js";import"./page-state-DvaZGddB.js";import"./paginator-BQCz34S-.js";import"./process-stepper-Ma-CqKvR.js";import"./radio-group-0wLjQfa9.js";import"./scaffold-Ca9xBuAs.js";import"./secret-BdNIYxfX.js";import"./option-Bp_cWeeo.js";import"./select-dropdown-J6Pk5Wb-.js";import"./select-DgDHy1xO.js";import"./skip-link-Bcd21Uye.js";import"./slider-Cc3ExHkf.js";import"./split-view-BbGD9SR1.js";import"./stack-Bd7iC-xk.js";import"./stepper-D4xKXArm.js";import"./switch-DHIhuw52.js";import"./table-Cd1JvATj.js";import"./tab-panel-DJfuxWF3.js";import"./time-picker-CwaSQ7ZH.js";import"./timestamp-C_R9ITm5.js";import"./toast-Dl-hDxgv.js";import"./toolbar-CaPjVYmc.js";import"./tooltip-s8I4hRgc.js";import"./tree-item-D0O1Idgb.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BB5lg2Ok.js";import"./split-button-Cg5HF9W5.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Zt as P,l as W};
