import{b as d}from"./iframe-ZvzVysMB.js";import{s as u,g as f}from"./utils-D5x2rMta.js";import"./service-adapter-8tADcN_b.js";import"./accordion-5GbCI4xt.js";import"./app-bar-profile-button-CUxb0Xdj.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-H8C0T-24.js";import"./menu-iIi5F8Tp.js";import"./linear-progress-Bb0VsHdX.js";import"./list-BXM5oFgP.js";import"./popover-qCA9PGyj.js";import"./overlay-DZcAclZS.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-QEOzuRnR.js";import"./avatar-CogGad_2.js";import"./icon-button-wfw28VlB.js";import"./autocomplete-CqtINfQ8.js";import"./label-DLG3xkby.js";import"./button-B8ecmhvI.js";import"./button-toggle-group-DGSVgR77.js";import"./focus-indicator-D_djYoC-.js";import"./checkbox-BVNiu6nH.js";import"./switch-CCh3ISmz.js";import"./base-field-C3qoTWst.js";import"./text-field-DtSml0Xe.js";import"./backdrop-CJeGwdvM.js";import"./badge-C9ERgbqJ.js";import"./banner-Due-4cKM.js";import"./bottom-sheet-BbPe0My8.js";import"./dialog-DeYKv41n.js";import"./button-area-BYzf39yi.js";import"./calendar-Bcdl9Tdj.js";import"./card-B0LsWTph.js";import"./chip-set-BaGgSBZW.js";import"./state-layer-BjPyszbg.js";import"./circular-progress-CMqvPe99.js";import"./color-picker-RYFTuZNS.js";import"./date-picker-DxYzDfY8.js";import"./date-range-picker-BBI1DIJC.js";import"./divider-CjRPWH8q.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DjvThjH_.js";import"./modal-drawer-COSMbJws.js";import"./mini-drawer-CgzMGYo3.js";import"./expansion-panel-DR1Mvixy.js";import"./open-icon-DjVhjUr1.js";import"./file-picker-DY9QYq4S.js";import"./floating-action-button-eBg_Z6J8.js";import"./inline-message-CJe4-CHc.js";import"./key-item-Bgva_T8Q.js";import"./keyboard-shortcut-CAXYUc0u.js";import"./label-value-cj79W541.js";import"./meter-group-BZ_GZRqC.js";import"./page-state-BMZmoTs6.js";import"./paginator-Cvy5kStb.js";import"./scaffold-BxvL1G0m.js";import"./secret-CrFv_9fK.js";import"./select-dropdown-B4f1gBlD.js";import"./select-BRSYUHiU.js";import"./skip-link-BvziHuTe.js";import"./slider-DVukgl3T.js";import"./split-view-S5cq6mhO.js";import"./stack-_B9Egjn2.js";import"./stepper-C_ZzV-_y.js";import"./table-D-k-NSgC.js";import"./tab-bar-DZ9YLrMO.js";import"./time-picker-JhCbDo4r.js";import"./timestamp-DfAWLzE-.js";import"./toast-BaONwOs2.js";import"./toolbar-CgcJD7J8.js";import"./tooltip-D6dXzQ5h.js";import"./tree-item-DN8vQ8iq.js";import"./view-switcher-CxkXvxxP.js";import"./deprecated-icon-button-DXXxRxeQ.js";import"./split-button-C_a1-j5b.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
