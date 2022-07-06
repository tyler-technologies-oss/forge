import addons from '@storybook/addons';

const toggleDarkTheme = (function () {
    let darkHasBeenSet = false;
    return async isDark => {

        // this function can get called multiple times on theme change. Only do the work when it's needed
        if (isDark && darkHasBeenSet || !(isDark || darkHasBeenSet)) {
            return;
        }

        if (isDark) {
            const stylesheet = (await import('../../lib/forge-dark.scss?inline' as string)).default;
            let styleTag = document.querySelector('#forge-dark');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'forge-dark';
            }
            styleTag.textContent = stylesheet;
            document.head.appendChild(styleTag);
            document.body.classList.add('forge-storybook-dark');
            darkHasBeenSet = true;
        } else {
            const darkStyleTag = document.head.querySelector('#forge-dark')
            if (darkStyleTag) {
                darkStyleTag.remove();
                document.body.classList.remove('forge-storybook-dark');
                darkHasBeenSet = false;
            }
        }
    }
})();

// Changes the forge theme when the storybook theme is changed (only support light/dark)
export const listenToThemeChange = () => {
    const channel = addons.getChannel();
    channel.on('DARK_MODE', isDark => toggleDarkTheme(isDark));
    channel.off('DARK_MODE', isDark => toggleDarkTheme(isDark));
}

export const addDefaultForgeTheme = async () => {
    const stylesheet = (await import('../../lib/forge.scss?inline' as string)).default;
    let styleTag = document.querySelector('#forge-stylesheet');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'forge-stylesheet';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = stylesheet;
    // We need to set the typography on the body and can only do that programmatically in storybook
    document.body.classList.add('forge-typography');
};
