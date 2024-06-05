/**
 * This plugin removes the specified members from the manifest.
 */
export default function forgeMemberDenyListPlugin() {
  const MEMBER_DENY_LIST = [
    /^\[.*\]$/, // All Symbol members
    'initializedCallback',
    'formStateRestoreCallback',
    'formResetCallback',
    'formAssociatedCallback',
    'formDisabledCallback',
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
        klass.members = klass?.members?.filter(member => {
          return member.name && !MEMBER_DENY_LIST.some(pattern => {
            if (typeof pattern === 'string') {
              return member.name === pattern;
            } else if (pattern instanceof RegExp) {
              return pattern.test(member.name);
            } else {
              return false;
            }
          });
        });
      });
    }
  };
}
