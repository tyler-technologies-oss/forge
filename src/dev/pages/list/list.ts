import '$src/shared';
import '@tylertech/forge/list';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/radio';
import '@tylertech/forge/icon';
import '@tylertech/forge/divider';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/drawer';
import '@tylertech/forge/list/forge-list.scss';
import './list.scss';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconBluetooth, tylIconCode, tylIconDataUsage, tylIconFace, tylIconInfo, tylIconWifi, tylIconOpenInNew } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconWifi,
  tylIconBluetooth,
  tylIconDataUsage,
  tylIconInfo,
  tylIconCode,
  tylIconFace,
  tylIconOpenInNew
]);

const listDemoRootEl = document.getElementById('list-demo-root') as HTMLElement;
listDemoRootEl.addEventListener('forge-list-item-select', console.log);
