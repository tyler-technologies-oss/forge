declare module '*.scss?inline' {
  const css: string;
  export default css;
}

declare module 'virtual:forge-blocks' {
  const blocks: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    category: string;
    url: string;
  }[];
  export default blocks;
}
