import{b as d}from"./iframe-BEWXVjd9.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-EdugfUnM.js";import"./app-bar-profile-button-BgWsUhSe.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-uVJIcwMo.js";import"./menu-ClcnE9Bw.js";import"./linear-progress-BmTkV8LG.js";import"./list-vGrIuHeR.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-C2w2qVrr.js";import"./icon-button-BVSucFuv.js";import"./focus-indicator-D-wWffhJ.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-B-QytHW-.js";import"./label-D_Zx1zB5.js";import"./button-Bdps6HIR.js";import"./button-toggle-group-Ck3cfAUB.js";import"./checkbox-DqtYked6.js";import"./switch-BIKy8F8e.js";import"./base-field-m2qxsLgV.js";import"./text-field-Ci9RdMFE.js";import"./backdrop-B-u3npFo.js";import"./badge-CvKVAGoJ.js";import"./banner-Dpiv3DnF.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-QKj_giXh.js";import"./calendar-C7LrUNNv.js";import"./card-rfSxY5MP.js";import"./chip-set-PTX7KGqo.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-HleNYrx6.js";import"./date-picker-BsGv7YLK.js";import"./date-range-picker-CJu_TpyD.js";import"./divider-BTyKVaN5.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-CnhvFm_A.js";import"./open-icon-Dtvp648c.js";import"./file-picker-pdyj8aTL.js";import"./floating-action-button-CnKkpgKc.js";import"./inline-message-rggUpLwV.js";import"./key-item-CFUJ3FwZ.js";import"./keyboard-shortcut-5n4s6eSf.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-C8G5H84I.js";import"./page-state-B9wnmWpA.js";import"./paginator-DJ9RsGX1.js";import"./scaffold-ALuq0Bgn.js";import"./secret-BNLdoiTQ.js";import"./select-dropdown-BRgdKuh0.js";import"./select-CRk4c4Bb.js";import"./skip-link-VyqtU5vp.js";import"./slider-DDCMNtTY.js";import"./split-view-BpN-IweY.js";import"./stack-DGYl-onA.js";import"./stepper-Bu2e6pbk.js";import"./table-JKg4UIYW.js";import"./tab-bar-CdK6gc2Q.js";import"./time-picker-BjELZ0CW.js";import"./toast-_3a-7o4g.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-D2srWmMe.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-CBIwsThq.js";import"./split-button-DpAJcXbO.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
