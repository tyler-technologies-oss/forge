/**
 * This plugin removes the specified members from the manifest.
 */
export default function forgeMemberDenyListPlugin() {
  const GENERAL_MEMBER_DENY_LIST = [
    /^\[.*\]$/, // All Symbol members
    'checkValidity',
    'form',
    'formAssociated',
    'formAssociatedCallback',
    'formDisabledCallback',
    'formResetCallback',
    'formStateRestoreCallback',
    'initializedCallback',
    'labelChangedCallback',
    'labelClickedCallback',
    'labels',
    'reportValidity',
    'setCustomValidity',
    'setFormValue',
    'validationMessage',
    'validity',
    'willValidate',
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

  const LIT_ELEMENT_CLASSES = ['LitElement', 'BaseLitElement', 'OptionConfigComponent', 'OptionGroupConfigComponent'];

  return {
    name: 'FORGE - MEMBER-DENYLIST',
    moduleLinkPhase({ moduleDoc }) {
      // All classes
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class' || declaration.kind === 'mixin');
      classes?.forEach(klass => (klass.members = klass?.members?.filter(deny(GENERAL_MEMBER_DENY_LIST))));

      // LitElement classes
      const litElementClasses = classes?.filter(klass => LIT_ELEMENT_CLASSES.includes(klass.superclass?.name));
      litElementClasses?.forEach(klass => (klass.members = klass?.members?.filter(deny(LIT_ELEMENT_MEMBER_DENY_LIST))));
    }
  };
}

function deny(denyList) {
  return member =>
    member.name &&
    !denyList.some(pattern => {
      if (typeof pattern === 'string') {
        return member.name === pattern;
      } else if (pattern instanceof RegExp) {
        return pattern.test(member.name);
      }
      return false;
    });
}
