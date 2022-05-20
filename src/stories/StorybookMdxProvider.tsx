import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react';
import {
  Blockquote,
  Code,
  CodeSwitcher,
  ContentDivider,
  LiveDemo,
  MethodDef,
  PageSection,
  PropertyDef
} from '@tylertech/forge-docs-core';
import { ThemeWrapper } from './StorybookTheme';
import { ForgeCard } from '@tylertech/forge-react';
import { LiveDemoStage } from './src/core/live-demo-stage';

export const StorybookMdxComponents: Record<string, FC> = {
  wrapper: ({ children }: any) => <ForgeCard outlined style={{ '--forge-card-padding': '16px 0' }}>{children}</ForgeCard>,
  h1: (props: any) => <h1 {...props} className="forge-typography--headline5" style={{marginTop: '16px'}}>{props.children}</h1>,
  h2: (props: any) => <h2 {...props} className="forge-typography--title forge-docs-core--header1">{props.children}</h2>,
  h3: (props: any) => <h3 {...props} className="forge-typography--subtitle1-secondary forge-docs-core--header2">{props.children}</h3>,
  table: (props: any) => <table {...props} className="forge-docs-core__table" />,
  section: (props: any) => <section {...props} className="forge-docs-core__section">{props.children}</section>,
  blockquote: (props: any) => <Blockquote {...props} />,
  hr: (props: any) => <ContentDivider {...props} />,
  span: (props: any) => <span {...props} />,
  inlineCode: (props: any) => <ThemeWrapper><code className="forge-docs-core__inline-code">{props.children}</code></ThemeWrapper>,
  code: (props: any) => <ThemeWrapper><Code {...props} /></ThemeWrapper>,
  pre: (props: any) => <div {...props}></div>,
  img: ({ src }: any) => <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '32px 0' }}><img src={src} /></div>,
  CodeSwitcher: (props: any) => <ThemeWrapper><CodeSwitcher {...props}/></ThemeWrapper>,
  ContentDivider,
  LiveDemo: (props: any) => <ThemeWrapper><LiveDemo {...props}/></ThemeWrapper>,
  MethodDef,
  PropertyDef,
  PageSection,
  LiveDemoStage
};

export const StorybookMdxProvider: FC = ({ children }) => {
  return <MDXProvider components={StorybookMdxComponents}>{children}</MDXProvider>;
};
