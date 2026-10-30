/**
 * Fixes in this module compensate for the manifest itself, not for any one framework generator, so
 * they apply to whatever a generator reads. They mutate the manifest in place.
 */

const normalizeName = name => name.replace(/-/g, '').toLowerCase();

const isPublicMember = member => member.privacy !== 'private' && member.privacy !== 'protected' && !member.name.startsWith('_') && !member.name.startsWith('#');

/**
 * Attributes documented with a manual `@attribute` JSDoc tag reach the manifest with no
 * `fieldName`, because nothing links the tag back to a class field. Generators that name props from
 * `fieldName` then emit a prop literally named `undefined`.
 *
 * Recovering the field by matching on a normalized name rather than camel-casing the attribute
 * matters: `forge-rich-text-context` maps the `readonly` attribute to a `readOnly` property, which
 * no camel-casing of `readonly` produces. Requiring exactly one match means a tag pointing at a
 * property that does not exist fails the build instead of silently producing a broken prop.
 *
 * This is not a niche problem - `@tylertech/forge`'s own manifest has several hundred attributes
 * with no `fieldName` - so any package adopting a generator that reads attributes needs this.
 *
 * @param {object[]} declarations Custom element declarations to fix in place.
 * @returns {number} How many attributes were backfilled.
 */
export function backfillAttributeFieldNames(declarations) {
  let backfilled = 0;

  for (const declaration of declarations) {
    const publicMembers = (declaration.members ?? []).filter(isPublicMember);

    for (const attribute of declaration.attributes ?? []) {
      if (attribute.fieldName) {
        continue;
      }

      const matches = publicMembers.filter(member => normalizeName(member.name) === normalizeName(attribute.name));

      if (matches.length !== 1) {
        throw new Error(
          `${declaration.tagName}: attribute "${attribute.name}" has no fieldName in the manifest and ${matches.length} public members match it. ` +
            'Point the @attribute JSDoc tag at a real property, or remove it.'
        );
      }

      attribute.fieldName = matches[0].name;
      backfilled++;
    }
  }

  return backfilled;
}

/**
 * Rewrites event types documented as `@event {CustomEvent<Detail>}` down to just `Detail`.
 *
 * Generators that wrap the manifest type in `CustomEvent<...>` themselves would otherwise emit
 * `CustomEvent<CustomEvent<Detail>>`, and at least `custom-element-react-wrappers` also skips
 * importing any type containing `<`, which leaves the detail type referenced but never imported.
 *
 * `void` is rewritten to `undefined` because that generator's excluded-type list omits `void`, so a
 * detail-less event would emit `import { void }`. The two are equivalent for an event with no
 * detail, and `undefined` is on the excluded list.
 *
 * @param {object[]} declarations Custom element declarations to fix in place.
 * @returns {number} How many event types were unwrapped.
 */
export function unwrapEventDetailTypes(declarations) {
  let unwrapped = 0;

  for (const declaration of declarations) {
    for (const event of declaration.events ?? []) {
      const detail = event.type?.text?.match(/^CustomEvent<(.+)>$/)?.[1];

      if (detail) {
        event.type.text = detail === 'void' ? 'undefined' : detail;
        unwrapped++;
      }
    }
  }

  return unwrapped;
}
