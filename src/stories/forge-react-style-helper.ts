export const addForgeDocsCoreStyles = () => {
    const stylesheet = require('./node_modules/@tylertech/forge-docs-core/dist/forge-docs-core.css');
    let styleTag = document.querySelector('#forge-react');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'forge-react';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = stylesheet;
};
