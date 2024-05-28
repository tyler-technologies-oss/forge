/**
 * This plugin removes the specified members from the manifest.
 */
export default function forgeMemberDenyListPlugin() {
  const MEMBER_DENY_LIST = [
    '[getFormState]',
    '[getFormValue]',
    '[setValidity]',
    '[tryDismiss]',
    '[tryCheck]',
    '[setDefaultAria]',
    '[internals]',
    'initializedCallback',
    'formStateRestoreCallback',
    'formResetCallback',
    'formAssociatedCallback',
    'labelClickedCallback',
    'labelChangedCallback',
    'formAssociated',
    '_foundation'
  ];

  return {
    name: 'FORGE - MEMBER-DENYLIST',
    moduleLinkPhase({ moduleDoc }) {
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class' || declaration.kind === 'mixin');
      classes?.forEach(klass => {
        klass.members = klass?.members?.filter(member => member.name && !MEMBER_DENY_LIST.includes(member.name));
      });
    }
  };
}
