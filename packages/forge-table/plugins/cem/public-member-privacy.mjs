/**
 * This plugin sets the privacy of all members to public if the privacy is not set.
 */
export default function forgePublicMemberPrivacyPlugin() {
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
