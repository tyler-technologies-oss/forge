import{b as d}from"./iframe-BlLbDnlR.js";import{s as u,g as f}from"./utils-BaIZrU9D.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D4YQO9Ue.js";import"./app-bar-menu-button-BaGw08-A.js";import"./app-bar-profile-button-C2m-3y6g.js";import{I as g}from"./icon-CJqXyQad.js";import"./menu-BJm1EpsD.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-C7kfQ7Om.js";import"./popover-COR2BVeW.js";import"./overlay-BwE7oRiM.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CBQ6kPse.js";import"./list-item-BteMMJXx.js";import"./avatar-B0LT2awf.js";import"./icon-button-CyhNoOEa.js";import"./autocomplete-BjizbZOM.js";import"./label-hOmdyDz5.js";import"./base-field-ClmyUAzy.js";import"./focus-indicator-CIttc_vs.js";import"./text-field-CJFYHWJt.js";import"./backdrop-ngk7d2eo.js";import"./badge-DVN63XgK.js";import"./banner-DG6x1V1F.js";import"./bottom-sheet-D_0DL6CS.js";import"./dialog-fH8z4QHs.js";import"./breadcrumb-overflow-menu-D5QuRlsa.js";import"./button-area-B8NThN95.js";import"./button-toggle-group-C_A4IeEk.js";import"./button-Dkyk4iXI.js";import"./calendar-CcyMAGNl.js";import"./card-BaX7aQWQ.js";import"./checkbox-CxpcJLs8.js";import"./chip-set-DU1xiE8U.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-BHUUTKxr.js";import"./date-picker-QGXL8HPu.js";import"./date-range-picker-X_fjR-FI.js";import"./divider-C7tnw8-Z.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-B9ysxp4s.js";import"./open-icon-BNsFzF3j.js";import"./file-picker-DjI6oZXa.js";import"./floating-action-button-yYTCKSia.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-D_KWbOTS.js";import"./key-item-D3JeWuxH.js";import"./keyboard-shortcut-BPiQX7UA.js";import"./label-value-C0-wovkK.js";import"./listbox-UqO_sJWD.js";import"./meter-group-Ceno2x1f.js";import"./page-state-DvaZGddB.js";import"./paginator-Di27Dqdj.js";import"./process-stepper-6G8CUGs9.js";import"./radio-group-fOpingEl.js";import"./scaffold-Ca9xBuAs.js";import"./secret-DS_HWtus.js";import"./option-DxaBBGMg.js";import"./select-dropdown-hojASTf6.js";import"./select-Bt2_Ex7X.js";import"./skip-link-CWvksz5L.js";import"./slider-D2xy5yd8.js";import"./split-view-CXC7o5sS.js";import"./stack-B7ywhmtQ.js";import"./stepper-CJCkjvVA.js";import"./switch-BsUixfA2.js";import"./table-IspVLf4I.js";import"./tab-panel-CfmqUZqN.js";import"./time-picker-DCBHQU9I.js";import"./timestamp-BjfoJRKY.js";import"./toast-BzMem4Sw.js";import"./toolbar-Uh-GtQd7.js";import"./tooltip-CQvCJDFH.js";import"./tree-item-ow1ztNkc.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-n4v3SZL_.js";import"./split-button-DmHAT2Hm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],te=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,te as P,l as W};
