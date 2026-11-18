import matchHelper from 'posthtml-match-helper';
import { findAllChildNodes, setAttr, removeAttr } from '../posthtml-helpers.mjs';

export default function transform(tree) {
  // Remove the "static" attribute as list items are now static by default
  tree.match(matchHelper('forge-list[static]'), node => {
    removeAttr(node, 'static');
    return node;
  });

  // Remove the "static" attribute as list items are now static by default
  tree.match(matchHelper('forge-list-item[static]'), node => {
    removeAttr(node, 'static');
    return node;
  });

  // Add test "navlist" attribute to <forge-list> elements if they are within a drawer
  const drawerTags = [{ tag: 'forge-drawer' }, { tag: 'forge-modal-drawer' }, { tag: 'forge-mini-drawer' }];
  tree.match(drawerTags, node => {
    const lists = findAllChildNodes(node, child => child.tag === 'forge-list');
    if (lists.length) {
      for (const list of lists) {
        setAttr(list, 'navlist', '');
      }
    }
    return node;
  });

  // Slot adjustments
  tree.match({ tag: 'forge-list-item' }, node => {
    // Rename the "leading" slot to "start"
    const slottedLeadingElements = findAllChildNodes(node, child => child.attrs?.slot === 'leading');
    if (slottedLeadingElements) {
      slottedLeadingElements.forEach(el => setAttr(el, 'slot', 'start'));
    }

    // Rename the "trailing" slot to "end"
    const slottedTrailingElements = findAllChildNodes(node, child => child.attrs?.slot === 'trailing');
    if (slottedTrailingElements) {
      slottedTrailingElements.forEach(el => setAttr(el, 'slot', 'end'));
    }

    // Remove the "title" slot; is now the default slot
    const slottedTitleElements = findAllChildNodes(node, child => child.attrs?.slot === 'title');
    if (slottedTitleElements) {
      slottedTitleElements.forEach(el => removeAttr(el, 'slot'));
    }

    // Rename the "subtitle" slot to "secondary-text"
    const slottedSubtitleElements = findAllChildNodes(node, child => child.attrs?.slot === 'subtitle');
    if (slottedSubtitleElements) {
      slottedSubtitleElements.forEach(el => setAttr(el, 'slot', 'secondary-text'));
    }

    // Rename the "tertiary-title" slot to "tertiary-text"
    const slottedTertiaryTitleElements = findAllChildNodes(node, child => child.attrs?.slot === 'tertiary-title');
    if (slottedTertiaryTitleElements) {
      slottedTertiaryTitleElements.forEach(el => setAttr(el, 'slot', 'tertiary-text'));
    }

    // Rename the "avatar" slot to "leading"
    const slottedAvatarElements = findAllChildNodes(node, child => child.attrs?.slot === 'avatar');
    if (slottedAvatarElements) {
      slottedAvatarElements.forEach(el => setAttr(el, 'slot', 'leading'));
    }

    return node;
  });
}
