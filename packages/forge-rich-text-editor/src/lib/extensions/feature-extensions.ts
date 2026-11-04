import { type AnyExtension } from '@tiptap/core';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { UndoRedo } from '@tiptap/extensions';

/**
 * Every rich text feature, named after its `forge-rte-*` element.
 */
export const RICH_TEXT_FEATURES = [
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'bullet-list',
  'ordered-list',
  'heading',
  'align',
  'link',
  'undo-redo'
] as const;

export type RichTextFeature = (typeof RICH_TEXT_FEATURES)[number];

/**
 * The features `forge-rte-standard-tools` renders, grouped as they appear between its dividers. The
 * element renders from this list, so it is the single source for what standard tools contains.
 */
export const RICH_TEXT_STANDARD_FEATURE_GROUPS: readonly (readonly RichTextFeature[])[] = [
  ['heading'],
  ['bold', 'italic', 'underline', 'strike'],
  ['bullet-list', 'ordered-list'],
  ['align'],
  ['undo-redo']
];

/**
 * The features `forge-rte-standard-tools` composes.
 */
export const RICH_TEXT_STANDARD_FEATURES: readonly RichTextFeature[] = RICH_TEXT_STANDARD_FEATURE_GROUPS.flat();

/**
 * Extensions every editor and renderer includes, whatever features are slotted.
 */
export const BASE_EXTENSIONS: AnyExtension[] = [Document, Paragraph, Text];

/**
 * The single source of each feature's extensions, read by the feature elements, the renderer and
 * `toRichTextDocument` so they cannot drift apart.
 */
export const FEATURE_EXTENSIONS: Record<RichTextFeature, AnyExtension[]> = {
  bold: [Bold],
  italic: [Italic],
  underline: [Underline],
  strike: [Strike],
  code: [Code],
  'bullet-list': [BulletList, ListItem],
  'ordered-list': [OrderedList, ListItem],
  heading: [Heading.configure({ levels: [1, 2, 3] })],
  align: [TextAlign.configure({ types: [Heading.name, Paragraph.name] })],
  link: [
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    })
  ],
  'undo-redo': [UndoRedo]
};

/**
 * Removes extensions that share a name, keeping the first. Features can contribute the same
 * extension, such as `ListItem` from both list features.
 */
export function dedupeExtensions(extensions: AnyExtension[]): AnyExtension[] {
  return extensions.filter((ext, index, self) => self.findIndex(e => e.name === ext.name) === index);
}

const isRichTextFeature = (feature: string): feature is RichTextFeature => Object.hasOwn(FEATURE_EXTENSIONS, feature);

/**
 * Returns the extensions an editor builds from the given features. Unknown names, which can only
 * arrive from untyped callers, are skipped with a warning.
 */
export function getFeatureExtensions(features: readonly RichTextFeature[]): AnyExtension[] {
  const featureExtensions = features.flatMap(feature => {
    if (isRichTextFeature(feature)) {
      return FEATURE_EXTENSIONS[feature];
    }
    console.warn(`[RTE] Unknown rich text feature "${feature}" ignored`);
    return [];
  });

  return dedupeExtensions([...BASE_EXTENSIONS, ...featureExtensions]);
}
