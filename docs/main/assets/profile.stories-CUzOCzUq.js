import{x as b}from"./iframe-CA3y3xue.js";import{g as y,s as I}from"./utils-Dya11Vqe.js";import"./feature-detection-uS6p5jc8.js";import"./accordion-BremYYNV.js";import"./expansion-panel-Cn_4I3Ho.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-0AV4dKCy.js";import"./state-layer-BFwsAUDA.js";import"./focus-indicator-IWpzSXYP.js";import{I as h,t as v,a as x,b as L,c as _}from"./icon-B8CdcxqJ.js";import"./menu-BfPyyeAQ.js";import"./linear-progress-2PahUgVv.js";import"./list-z5iQB-6r.js";import"./popover-xi3V_Oll.js";import"./overlay-D-bkGTD9.js";import"./skeleton-C4EH8VF8.js";import"./avatar-C_IMV2nE.js";import"./icon-button-DkluvO-9.js";import"./autocomplete-BF2xrY-Q.js";import"./label-BSASIOtP.js";import"./button-r2EMLpWm.js";import"./button-toggle-group-D5jBldBo.js";import"./checkbox-DOmkbh7U.js";import"./switch-Bt2bdQXJ.js";import"./base-field-PCIQc44M.js";import"./text-field-BnoM3v28.js";import"./backdrop-BZvWLwDX.js";import"./badge-D4S5q0xq.js";import"./banner-iv-1_6nx.js";import"./bottom-sheet-BZd-gbTi.js";import"./dialog-JQ2PS6Se.js";import"./button-area-Dgvn0HIt.js";import"./calendar-Buw9wM2z.js";import"./card-BlG-vYCu.js";import"./chip-set-BBt44dwa.js";import"./circular-progress-xrl2HF46.js";import"./color-picker-DD2G-EWp.js";import"./date-picker-DNc3Uyl5.js";import"./date-range-picker-CPAjtPS9.js";import"./divider-DoNAUeHX.js";import"./base-drawer-CIBCdxIp.js";import"./drawer-rHXDK_gj.js";import"./modal-drawer-DysXIZBQ.js";import"./mini-drawer-B7aElFMq.js";import"./file-picker-C4QqMTt4.js";import"./floating-action-button-Chj1MDjC.js";import"./inline-message-By3BVHSa.js";import"./key-item-ZFeksbsB.js";import"./keyboard-shortcut-Cs_3tUZu.js";import"./label-value-CaouEyrO.js";import"./meter-group-DTe0-NaN.js";import"./page-state-em5vC-QK.js";import"./paginator-CXvfd5FF.js";import"./scaffold-CGyusmPL.js";import"./select-dropdown-CLgG56ip.js";import"./select-CNKchHZ1.js";import"./skip-link-7_m7DPxL.js";import"./slider-BQev95re.js";import"./split-view-C0AmXn05.js";import"./stack-niTWfPr5.js";import"./stepper-DMgB9a3z.js";import"./table-CCO9Mmdw.js";import"./tab-bar-BUcnPGTN.js";import"./time-picker-BeT1bf_e.js";import"./toast-DVotDAeY.js";import"./toolbar-Byb6kcao.js";import"./tooltip-CcxiN_AO.js";import"./view-switcher-EfMcYRc9.js";import"./deprecated-icon-button-Ch8JZU3u.js";import"./split-button-40Nu64fp.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",O=C("forge-profile-card-profile"),P=C("forge-profile-card-sign-out");h.define([v,x,L,_]);const S={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>b`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${O}
          @forge-profile-card-sign-out=${P}
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
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...I,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return b`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var c,d,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(d=l.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const $=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:$,default:S},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
