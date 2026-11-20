import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import forgeMemberDenyListPlugin from './member-deny-list.mjs';

function filterMembers(names) {
  const moduleDoc = { declarations: [{ kind: 'class', members: names.map(name => ({ name })) }] };
  forgeMemberDenyListPlugin().moduleLinkPhase({ moduleDoc });
  return moduleDoc.declarations[0].members.map(member => member.name);
}

describe('member deny list', () => {
  it('should remove members with a leading underscore or hash and Symbol members', () => {
    assert.deepEqual(filterMembers(['open', '_state', '#internals', '[Symbol.iterator]']), ['open']);
  });

  it('should keep public members that contain an underscore after the first character', () => {
    assert.deepEqual(filterMembers(['page_size', 'open']), ['page_size', 'open']);
  });
});
