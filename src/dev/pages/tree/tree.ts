import '$src/shared';
 import { IconRegistry } from '@tylertech/forge/icon';
 import { ISwitchComponent } from '@tylertech/forge/switch';
 import '@tylertech/forge/tree/tree';
 import '@tylertech/forge/tree/tree-item';
 import { tylIconBird, tylIconTree, tylIconWater } from '@tylertech/tyler-icons/extended';
 import { tylIconGrass } from '@tylertech/tyler-icons/standard';
 import './tree.scss';

 IconRegistry.define([
   tylIconBird,
   tylIconGrass,
   tylIconTree,
   tylIconWater
 ]);

 const trees = document.querySelectorAll('forge-tree');
 const modeSelect = document.getElementById('opt-mode') as HTMLSelectElement;
 const selectionFollowsFocusSwitch = document.getElementById('opt-selection-follows-focus') as ISwitchComponent;
 const accordionSwitch = document.getElementById('opt-accordion') as ISwitchComponent;
 const indentLinesSwitch = document.getElementById('opt-indent-lines') as ISwitchComponent;
 const preventSelectionSwitch = document.getElementById('opt-prevent-selection') as ISwitchComponent;

const preventSelectionListener: EventListener = (evt: CustomEvent) => evt.preventDefault();
 
// window.addEventListener('forge-tree-item-select', console.log);

 modeSelect.addEventListener('change', () => {
   trees.forEach(tree => {
     tree.mode = modeSelect.value as any;
   });
 });

 selectionFollowsFocusSwitch.addEventListener('change', () => {
   trees.forEach(tree => {
     tree.selectionFollowsFocus = selectionFollowsFocusSwitch.on;
   });
 });

 accordionSwitch.addEventListener('change', () => {
   trees.forEach(tree => {
     tree.accordion = accordionSwitch.on;
   });
 });

 indentLinesSwitch.addEventListener('change', () => {
   trees.forEach(tree => {
     tree.indentLines = indentLinesSwitch.on;
   });
 });

 preventSelectionSwitch.addEventListener('change', () => {
   trees.forEach(tree => {
     if (preventSelectionSwitch.on) {
       tree.addEventListener('forge-tree-item-select', preventSelectionListener);
     } else {
       tree.removeEventListener('forge-tree-item-select', preventSelectionListener);
     }
   });
 });
