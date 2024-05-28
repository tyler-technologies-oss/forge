/**
 * This plugin removes the specified members from the manifest.
 */
function forgeMemberDenyListPlugin() {
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

/**
 * This plugin sets the privacy of all members to public if the privacy is not set.
 */
function forgePublicMemberPrivacyPlugin() {
  return {
    name: 'FORGE - PUBLIC-MEMBER-PRIVACY',
    moduleLinkPhase({ moduleDoc }) {
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class' || declaration.kind === 'mixin');
      classes?.forEach(klass => {
        klass?.members?.forEach(member => {
          if (!member.privacy) {
            member.privacy = 'public';
          }
        });
      });
    }
  };
}

export default {
  // Relative to src/lib directory
  globs: ['**/*.ts'],
  exclude: [
    '**/index.ts',
    '**/*.test.ts',
    '**/*-foundation.ts',
    '**/*-adapter.ts',
    '**/*-constants.ts',
    '**/*-component-delegate.ts',
    '**/core/**/*.ts',
    '**/*-utils.ts',
    'constants.ts'
  ],
  plugins: [
    forgeMemberDenyListPlugin(),
    forgePublicMemberPrivacyPlugin()
  ]
};
