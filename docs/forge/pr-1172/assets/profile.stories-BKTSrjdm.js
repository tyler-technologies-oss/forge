import{b as d}from"./iframe-BxUalrPu.js";import{s as u,g as f}from"./utils-u3kxOSSj.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DXc2zuzs.js";import"./app-bar-profile-button-D3zvuTLP.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BqCFNdiX.js";import"./menu-D-TS0MB1.js";import"./linear-progress-BvuLf7up.js";import"./list-CNlqqAaz.js";import"./popover-C_VdMpUc.js";import"./overlay-B9OExFy4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-Ckr89ydy.js";import"./icon-button-BaryAIec.js";import"./autocomplete-B0XVMPSG.js";import"./label-Bggcm2-j.js";import"./button-YDv-pkxN.js";import"./button-toggle-group-LrQ5sMl2.js";import"./focus-indicator-BT7jGzHM.js";import"./checkbox-Ca0Pm52O.js";import"./switch-DA5cufmo.js";import"./base-field-pLsFNwdW.js";import"./text-field-DHPPifsF.js";import"./backdrop-SMwLBDG5.js";import"./badge-BbHjHdpE.js";import"./banner-aovlUp51.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-C29CrXJK.js";import"./calendar-KHuS0BHS.js";import"./card-B9wqRYc9.js";import"./chip-set-CrnTTstP.js";import"./state-layer-DRsbBcDh.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-BURiHElf.js";import"./date-picker-BdkuEBLc.js";import"./date-range-picker-9thQSxl-.js";import"./divider-DSwJcXyF.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DvBkj4vS.js";import"./open-icon-B_3-VfI2.js";import"./file-picker-BPipDLuh.js";import"./floating-action-button-DZ-nh9Yo.js";import"./inline-message-Dej6nioH.js";import"./key-item-CVenwBzN.js";import"./keyboard-shortcut-DyvK6K8g.js";import"./label-value-CJDyRgCt.js";import"./meter-group-C0TEC8Ct.js";import"./page-state-xtTZreUO.js";import"./paginator-Dpbq7BrY.js";import"./scaffold-l7cEUk27.js";import"./secret-Dv2IiZtN.js";import"./select-dropdown-HsI4oI1r.js";import"./select-Bo7VGTBg.js";import"./skip-link-CNnZ8_SA.js";import"./slider-lSbM1R8q.js";import"./split-view-D7xzGbs-.js";import"./stack-DYrRnd9D.js";import"./stepper-BtSKSBvi.js";import"./table-BVgyV-MZ.js";import"./tab-bar-gZp6oogD.js";import"./time-picker-BG4Q23Pz.js";import"./toast-B2rlZyT_.js";import"./toolbar-BlN182qF.js";import"./tooltip-BC3bf22f.js";import"./tree-item-CooWLj6L.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-CfVNU0dI.js";import"./split-button-A8wwHaXU.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
