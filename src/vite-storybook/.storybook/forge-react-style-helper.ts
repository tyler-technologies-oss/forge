export const addForgeDocsCoreStyles = async () => {
    const stylesheet = (await import('../node_modules/@tylertech/forge-docs-core/dist/forge-docs-core.css?inline' as string)).default;
    let styleTag = document.querySelector('#forge-react');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'forge-react';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = stylesheet;
};
