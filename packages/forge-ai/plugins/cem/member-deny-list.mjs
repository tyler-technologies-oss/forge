const MEMBER_DENY_LIST = [
  /^\[.*\]$/, // All Symbol members
  /^#|_/ // All private members
];

/**
 * This plugin removes the specified members from the manifest.
 */
export default function forgeMemberDenyListPlugin() {
  return {
    name: 'FORGE - MEMBER-DENYLIST',
    moduleLinkPhase({ moduleDoc }) {
      const classes = moduleDoc?.declarations?.filter(declaration => declaration.kind === 'class' || declaration.kind === 'mixin');
      classes?.forEach(klass => (klass.members = klass?.members?.filter(deny(MEMBER_DENY_LIST))));
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
