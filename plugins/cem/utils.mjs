/**
 * Get all custom element declarations from a custom elements manifest.
 */
export function getCustomElements(customElementsManifest) {
  return customElementsManifest.modules.flatMap(module => module.declarations.filter(declaration => declaration.customElement && !!declaration.tagName));
}

/**
 * Get all public members of a custom element declaration.
 */
export function getPublicMembers(declaration) {
  return (
    declaration.members?.filter(
      member =>
        member.kind === 'field' &&
        member.privacy !== 'private' &&
        member.privacy !== 'protected' &&
        !member.static &&
        !member.attribute &&
        !member.name.startsWith('#')
    ) ?? []
  );
}
