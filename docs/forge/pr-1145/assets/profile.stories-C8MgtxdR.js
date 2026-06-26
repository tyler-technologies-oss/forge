import{b as d}from"./iframe-DvRgMH1Z.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DnIUlW92.js";import"./app-bar-profile-button-BAu76ey-.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DY7l1OxK.js";import"./menu-CYrHNy7e.js";import"./linear-progress-dFUODLVX.js";import"./list-B1Kb4rH0.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-CNdDCss2.js";import"./icon-button-BZ6c14ku.js";import"./focus-indicator-DslyF6n3.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-CW9PY6r_.js";import"./label-CCJpr-qV.js";import"./base-field-Blagcw7s.js";import"./text-field-Eup0IWR4.js";import"./backdrop--ezx6yHr.js";import"./badge-BycA3yXl.js";import"./banner-Dgr8otTL.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-VwuPslrh.js";import"./button-toggle-group-BBqE8luf.js";import"./button-pcykOHfM.js";import"./calendar-wVpnPokE.js";import"./card-DcmnAY7y.js";import"./checkbox-uN5aVz4o.js";import"./chip-set-BQhf3erc.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-DDAjoDRE.js";import"./date-picker-DjKz7r_W.js";import"./date-range-picker-Bz_YDMO6.js";import"./divider-CQAhn822.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-T91I6L20.js";import"./open-icon-CiViOIZy.js";import"./file-picker-CSHSwHYy.js";import"./floating-action-button-CiKDxg7B.js";import"./inline-message-1YYbEfHN.js";import"./key-item-Th8lWXjR.js";import"./keyboard-shortcut-CkuKz5f6.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BjXjdSCt.js";import"./page-state-BwPC_Hd9.js";import"./paginator-Cnba4hSg.js";import"./radio-group-FuXhVeuQ.js";import"./scaffold-BAVRvYZ-.js";import"./secret-DPydhcIH.js";import"./select-dropdown-CcGqCfFu.js";import"./select-BWgpRmSB.js";import"./skip-link-DYQfTb9I.js";import"./slider-BXGevxz7.js";import"./split-view-jjeqlyh9.js";import"./stack-BRmnsrL_.js";import"./stepper-D7HmLGxJ.js";import"./switch-Bsjl1Vyy.js";import"./table-Dv6gy66C.js";import"./tab-bar-BHTxAUsO.js";import"./time-picker-C-Wz9kCV.js";import"./toast-C9BK4LOp.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-BTCFmHcE.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-DS9Pj2Zd.js";import"./split-button-DJnYrszj.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
