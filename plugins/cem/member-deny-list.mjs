/**
 * This plugin removes the specified members from the manifest.
 */
export default function forgeMemberDenyListPlugin() {
  const GENERAL_MEMBER_DENY_LIST = [
    /^\[.*\]$/, // All Symbol members
    'initializedCallback',
    'formStateRestoreCallback',
    'formResetCallback',
    'formAssociatedCallback',
    'formDisabledCallback',
    'labelClickedCallback',
    'labelChangedCallback',
    'formAssociated',
    'form',
    'labels',
    '_core',
    '_internals'
  ];

  const LIT_ELEMENT_MEMBER_DENY_LIST = [
    'styles',
    'properties',
    'requestUpdate',
    'createRenderRoot',
    'scheduleUpdate',
    'performUpdate',
    'shouldUpdate',
    'update',
    'render',
    'firstUpdated',
    'updated',
    'willUpdate'
  ];

  return {
    name: 'FORGE - MEMBER-DENYLIST',
    moduleLinkPhase({ moduleDoc }) {
      // All classes
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class' || declaration.kind === 'mixin');
      classes?.forEach(klass => (klass.members = klass?.members?.filter(deny(GENERAL_MEMBER_DENY_LIST))));

      // LitElement classes
      const litElementClasses = classes?.filter(klass => klass.superclass?.name === 'LitElement' || klass.superclass?.name === 'BaseLitElement');
      litElementClasses?.forEach(klass => (klass.members = klass?.members?.filter(deny(LIT_ELEMENT_MEMBER_DENY_LIST))));
    }
  };
}

function deny(denyList) {
  return member => {
    return (
      member.name &&
      !denyList.some(pattern => {
        if (typeof pattern === 'string') {
          return member.name === pattern;
        } else if (pattern instanceof RegExp) {
          return pattern.test(member.name);
        }
        return false;
      })
    );
  };
}
