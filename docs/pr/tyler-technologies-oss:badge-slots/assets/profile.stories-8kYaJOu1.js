import{a as b}from"./index-B-lxVbXh.js";import"./lit-element-BuSzPo2N.js";import{x as C}from"./lit-html-Ox1a2bD1.js";import{g as y,s as h}from"./utils-C9ubTmun.js";import"./feature-detection-CY6TVbRZ.js";import"./accordion-Dm9xnQv4.js";import"./expansion-panel-D16dSnMu.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-DmiB2VeR.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import{I,t as v,a as x,b as L,c as P}from"./icon-Bqgt-0wI.js";import"./menu-DoGfQb_z.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./skeleton-DocRecw2.js";import"./avatar-J3yRSZ-u.js";import"./icon-button-BkG6pY8m.js";import"./autocomplete-DypEH4r3.js";import"./label-BM0pESju.js";import"./button-CC-L5W3b.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./switch-ZI6WyDhE.js";import"./base-field-DFQttNW4.js";import"./text-field-CGeuarYD.js";import"./backdrop-Bv12Tb1U.js";import"./badge-DZcU4TLt.js";import"./banner-BiV2PXva.js";import"./bottom-sheet-CgdS1vNC.js";import"./dialog-DEObTM6-.js";import"./button-area-DkxJjLzq.js";import"./calendar-CT4vE586.js";import"./card-Cvm6cje1.js";import"./chip-set-BaPPEndZ.js";import"./circular-progress-pTvFqlis.js";import"./color-picker-C-nN1HcS.js";import"./date-picker-CI7xepNt.js";import"./date-range-picker-nZeORJPW.js";import"./divider-DBTw_7sm.js";import"./base-drawer-C68FwRuM.js";import"./drawer-DpoxQTjp.js";import"./modal-drawer-XYvP5Fib.js";import"./mini-drawer-uH-d4rqn.js";import"./file-picker-C7CcS7b7.js";import"./floating-action-button-CJ2m4J0M.js";import"./inline-message-CTo_BAYA.js";import"./key-item-fm9Fe_DR.js";import"./keyboard-shortcut-wz335gzF.js";import"./label-value-BHIrdMWh.js";import"./meter-group-Bwzct4Py.js";import"./page-state-Bl7puESY.js";import"./paginator-CUEGWPKf.js";import"./scaffold-BjMvQLbF.js";import"./select-dropdown-CZdSzMMv.js";import"./select-Deij91Nn.js";import"./skip-link-CkowTV5X.js";import"./slider-CTd3yYpZ.js";import"./split-view-CMQfhTzS.js";import"./stack-CpbYXLv7.js";import"./stepper-DmXVaR4b.js";import"./table-CXiILDHY.js";import"./tab-bar-C57kyXDQ.js";import"./time-picker-2LYr3XTv.js";import"./toast-d_4OHFWC.js";import"./toolbar-CJj-iw1_.js";import"./tooltip-BRjtM3KC.js";import"./view-switcher-CMdWoHU0.js";import"./deprecated-icon-button-taoMeYaJ.js";import"./split-button-1ZOFPfW2.js";const s="forge-app-bar-profile-button",$=b("forge-profile-card-profile"),w=b("forge-profile-card-sign-out");I.define([v,x,L,P]);const B={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>C`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${$}
          @forge-profile-card-sign-out=${w}
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
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...h,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return C`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var d,c,u;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(u=(c=l.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const M=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:M,default:B},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
