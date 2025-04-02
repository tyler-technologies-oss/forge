import{a as b}from"./index-B-lxVbXh.js";import"./lit-element-B3QVTycr.js";import{x as C}from"./lit-html-CuBe1DX_.js";import{g as y,s as h}from"./utils-DXeqrvgL.js";import"./feature-detection-CY6TVbRZ.js";import"./accordion-BRn7SW34.js";import"./expansion-panel-Bf3k9a5a.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-BVLv3bOe.js";import"./state-layer-sxQMIn2c.js";import"./focus-indicator-NbLDNrYT.js";import{I}from"./icon-D5yjdXv8.js";import"./menu-D9NLnmlg.js";import{t as v,a as x,b as L,c as P}from"./index-RsKXMDm2.js";import"./linear-progress-BTmLtQyy.js";import"./list-DOSD_vEq.js";import"./popover-DBZ1E3cM.js";import"./overlay-8j8D8Fh1.js";import"./skeleton-DtUhqb6H.js";import"./avatar-BWgToAik.js";import"./icon-button-4fx-LScl.js";import"./autocomplete-D-TdFpNa.js";import"./label-BYO0DIp3.js";import"./button-CutPPNni.js";import"./button-toggle-group-C9JpSiFv.js";import"./checkbox-DwEe44-q.js";import"./switch-Clw9p9oC.js";import"./base-field-clkE_wGg.js";import"./text-field-BwqsFKuZ.js";import"./backdrop-jq8rFG8Z.js";import"./badge-N67hmSaz.js";import"./banner-D4viMWcU.js";import"./bottom-sheet-C-agtKY-.js";import"./dialog-C3DUV3Gv.js";import"./button-area-D5z4Qv2i.js";import"./calendar-BS7cV5QE.js";import"./card-a2QiXPzd.js";import"./chip-set-DKdHKrJ0.js";import"./circular-progress-_R2O5GKK.js";import"./color-picker-NiCjfu7D.js";import"./date-picker-C9-pXBl6.js";import"./date-range-picker-BSksB4-Z.js";import"./divider-Cb0KSfcl.js";import"./base-drawer-D1JU0w69.js";import"./drawer-DaOS-IYi.js";import"./modal-drawer-DhKRuBwR.js";import"./mini-drawer-DqPi7Wyw.js";import"./file-picker-Lrj_0LoL.js";import"./floating-action-button-DpM1uSuo.js";import"./inline-message-BqwREKp3.js";import"./key-item-Buf2jZTh.js";import"./keyboard-shortcut-Cht-19cs.js";import"./label-value-CvLCRz5B.js";import"./meter-group-QEOdWLJM.js";import"./page-state-BPazfpGD.js";import"./paginator-DrKy-SVn.js";import"./scaffold-BHN26cwL.js";import"./select-dropdown-DuumYXHS.js";import"./select-C5MpHAi7.js";import"./skip-link-DS-CmTbk.js";import"./slider-C2umfVsV.js";import"./split-view-BcyiVqBm.js";import"./stack-B6UBpofK.js";import"./stepper-ydsrVuEd.js";import"./table-J8Lbrwec.js";import"./tab-bar-BcTLttPU.js";import"./time-picker-BGWaiu8w.js";import"./toast-BhVYtotM.js";import"./toolbar-D4yu8hpj.js";import"./tooltip-BgQLBWUo.js";import"./view-switcher-qE3Ob8TM.js";import"./deprecated-icon-button-CHiknbON.js";import"./split-button-B0Zrf59V.js";const s="forge-app-bar-profile-button",$=b("forge-profile-card-profile"),w=b("forge-profile-card-sign-out");I.define([v,x,L,P]);const B={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>C`
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
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const M=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:M,default:B},Symbol.toStringTag,{value:"Module"}));export{l as D,Qt as P,m as W};
