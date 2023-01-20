// Allow for importing from .html files
declare module '*.html' {
  const value: string;
  export default value;
}

// Allow for importing from .scss files
declare module '*.scss?inline' {
  const styles: string;
  export default styles;
}
