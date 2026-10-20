import './styles.scss';
import animation from '../tokens/animation.json';
import border from '../tokens/border.json';
import emphasis from '../tokens/color/emphasis.json';
import palette from '../tokens/color/palette.json';
import elevation from '../tokens/elevation.json';
import shape from '../tokens/shape.json';
import spacing from '../tokens/spacing.json';
import light from '../tokens/theme/light.json';
import typography from '../tokens/typography.json';
import zIndex from '../tokens/z-index.json';

const PREFIX = 'forge';
const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';
const TOAST_DURATION = 1800;
const LUMINANCE_THRESHOLD = 0.5;
const CURVE_SIZE = 56;
const SOURCES = [animation, border, emphasis, palette, elevation, shape, spacing, light, typography, zIndex];
const TYPOGRAPHY_GROUPS = ['display', 'heading', 'subheading', 'body', 'label', 'button', 'overline', 'kbd'];

const isToken = node => node !== null && typeof node === 'object' && '$value' in node;

const flatten = (node, path = []) =>
  Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .flatMap(([key, child]) => (isToken(child) ? [{ path: [...path, key], token: child }] : flatten(child, [...path, key])));

const lookup = path => SOURCES.map(source => path.reduce((node, key) => node?.[key], source)).find(isToken);

const resolve = value => {
  if (typeof value !== 'string') {
    return value;
  }
  const whole = value.match(/^\{([^}]+)\}$/);
  if (whole) {
    return resolve(lookup(whole[1].split('.')).$value);
  }
  return value.replace(/\{([^}]+)\}/g, (_, reference) => resolve(lookup(reference.split('.')).$value));
};

const tokensOf = (root, ...path) =>
  flatten(
    path.reduce((node, key) => node[key], root),
    path
  );

const cssVar = (...parts) => `--${PREFIX}-${parts.join('-')}`;

const isLight = hex => {
  const [r, g, b] = hex
    .replace('#', '')
    .match(/.{2}/g)
    .map(channel => parseInt(channel, 16) / 255)
    .map(channel => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > LUMINANCE_THRESHOLD;
};

const readVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const copyButton = (copy, label, content, className = 'token-name') =>
  `<button type="button" class="${className}" data-copy="${copy}" aria-label="Copy ${label}">${content}</button>`;

const sections = [];

const addSection = ({ id, title, lead, render }) => sections.push({ id, title, lead, render });

addSection({
  id: 'theme',
  title: 'Theme',
  lead: 'Semantic color roles. These switch values between the light and dark themes. Click a swatch to copy its custom property.',
  render: () => {
    const names = tokensOf(light, 'theme')
      .filter(({ token }) => /^(#|rgb)/.test(resolve(token.$value)))
      .map(({ path }) => path[1]);
    const families = Map.groupBy(names, name => name.replace(/^on-/, '').split('-')[0]);
    return [...families]
      .map(
        ([family, members]) => `
          <h3>${family}</h3>
          <div class="swatch-grid">
            ${members
              .map(name => {
                const property = cssVar('theme', name);
                return `
                  <div class="swatch">
                    ${copyButton(`var(${property})`, property, `<div class="swatch__color" style="background: var(${property})"></div>`, 'swatch__button')}
                    <div class="swatch__meta">
                      ${copyButton(`var(${property})`, property, name)}
                      <span class="token-value" data-theme-value="${property}"></span>
                    </div>
                  </div>`;
              })
              .join('')}
          </div>`
      )
      .join('');
  }
});

addSection({
  id: 'palette',
  title: 'Color palette',
  lead: 'The raw colors the theme is composed from. Click a step to copy its hex value.',
  render: () => {
    const entries = Object.entries(palette.color.palette).filter(([key]) => !key.startsWith('$'));
    const base = entries.filter(([, node]) => isToken(node));
    const ramps = [['base', Object.fromEntries(base)], ...entries.filter(([, node]) => !isToken(node))];
    return ramps
      .map(([name, steps]) => {
        const cells = Object.entries(steps)
          .filter(([key]) => !key.startsWith('$'))
          .map(([step, { $value }]) => {
            const foreground = isLight($value) ? '#000' : '#fff';
            return `<button type="button" class="ramp__step" style="background: ${$value}; color: ${foreground}" data-copy="${$value}" aria-label="Copy ${name} ${step} ${$value}"><span>${step}</span><span>${$value}</span></button>`;
          })
          .join('');
        return `<div class="ramp"><div class="ramp__name">${name.replaceAll('-', ' ')}</div>${cells}</div>`;
      })
      .join('');
  }
});

addSection({
  id: 'typography',
  title: 'Typography',
  lead: `The base font is ${resolve('{typography.font-family}')} at ${resolve('{typography.font-size}')}. Each style is available as a Sass mixin and a generated utility class.`,
  render: () => {
    const styles = tokensOf(typography, 'typography', 'style').map(({ path }) => path[2]);
    const styleNames = [...new Set(styles)];
    return TYPOGRAPHY_GROUPS.map(group => {
      const members = styleNames.filter(name => name.replace(/\d+$/, '') === group);
      const rows = members
        .map(name => {
          const read = prop => resolve(`{typography.style.${name}.${prop}}`);
          const details = `${read('font-size')}rem / ${read('line-height')} · ${read('font-weight')}`;
          return `
            <div class="type-row">
              <div>
                ${copyButton(`@include typography.style(${name});`, `${name} mixin`, name)}
                <span class="token-value">${details}</span>
              </div>
              <div class="type-row__sample ${PREFIX}-typography--${name}">${SAMPLE_TEXT}</div>
            </div>`;
        })
        .join('');
      return `<h3>${group}</h3>${rows}`;
    }).join('');
  }
});

addSection({
  id: 'spacing',
  title: 'Spacing',
  lead: spacing.spacing.$description,
  render: () =>
    tokensOf(spacing, 'spacing')
      .map(({ path: [, name], token }) => {
        const property = cssVar('spacing', name);
        return `
          <div class="spacing-row">
            ${copyButton(`var(${property})`, property, name)}
            <span class="token-value">${token.$value}</span>
            <div class="spacing-row__bar" style="inline-size: var(${property})"></div>
          </div>`;
      })
      .join('')
});

addSection({
  id: 'shape',
  title: 'Shape',
  lead: 'Corner radius values. Each size also has block-start, block-end, inline-start and inline-end variants that round only one side.',
  render: () => {
    const tiles = tokensOf(shape, 'shape')
      .filter(({ path: [, name] }) => !/-(block|inline)-(start|end)$/.test(name))
      .map(({ path: [, name], token }) => {
        const property = cssVar('shape', name);
        return `
          <div class="tile">
            <div class="tile__preview tile__preview--surface"><div class="shape-sample" style="border-radius: var(${property})"></div></div>
            ${copyButton(`var(${property})`, property, name)}
            <span class="token-value">${token.$value}</span>
          </div>`;
      })
      .join('');
    return `<div class="tile-grid">${tiles}</div>`;
  }
});

addSection({
  id: 'border',
  title: 'Border',
  lead: 'Border width values.',
  render: () => {
    const tiles = tokensOf(border, 'border')
      .map(({ path: [, name], token }) => {
        const property = cssVar('border', name);
        return `
          <div class="tile">
            <div class="tile__preview tile__preview--surface"><div class="border-sample" style="border-width: var(${property})"></div></div>
            ${copyButton(`var(${property})`, property, name)}
            <span class="token-value">${token.$value}</span>
          </div>`;
      })
      .join('');
    return `<div class="tile-grid">${tiles}</div>`;
  }
});

addSection({
  id: 'elevation',
  title: 'Elevation',
  lead: 'Shadow levels built from an umbra, penumbra and ambient layer.',
  render: () => {
    const tiles = tokensOf(elevation, 'elevation', 'level')
      .map(({ path: [, , level] }) => {
        const property = cssVar('elevation', level);
        return `
          <div class="tile">
            <div class="tile__preview tile__preview--surface"><div class="elevation-sample" style="box-shadow: var(${property})"></div></div>
            ${copyButton(`var(${property})`, property, `level ${level}`)}
          </div>`;
      })
      .join('');
    return `<div class="tile-grid">${tiles}</div>`;
  }
});

addSection({
  id: 'z-index',
  title: 'Z-index',
  lead: zIndex['z-index'].$description,
  render: () => {
    const layers = tokensOf(zIndex, 'z-index')
      .sort((a, b) => a.token.$value - b.token.$value)
      .map(({ path: [, name], token }, index) => {
        const property = cssVar('z-index', name);
        return `<div class="z-stack__layer" style="--layer: ${index}; --z: var(${property})">${name} (${token.$value})</div>`;
      })
      .join('');
    return `<div class="z-stack">${layers}</div>`;
  }
});

const curvePath = ([x1, y1, x2, y2]) => {
  const point = (x, y) => `${x * CURVE_SIZE},${CURVE_SIZE - y * CURVE_SIZE}`;
  return `M${point(0, 0)} C${point(x1, y1)} ${point(x2, y2)} ${point(1, 1)}`;
};

const motionItem = ({ label, copy, meta, style, graphic = '' }) => `
  <div class="motion__item" data-motion>
    <div class="motion__row">
      ${copyButton(copy, copy, label)}
      <span class="token-value">${meta}</span>
    </div>
    ${graphic}
    <div class="motion__track"><div class="motion__dot" style="${style}"></div></div>
    <button type="button" class="play-button" data-play>Play</button>
  </div>`;

addSection({
  id: 'animation',
  title: 'Animation',
  lead: 'Durations and easing curves. Press play to preview each one.',
  render: () => {
    const easing = resolve('{animation.easing.standard}');
    const durations = tokensOf(animation, 'animation', 'duration')
      .map(({ path: [, , name], token }) => {
        const property = cssVar('animation', `duration-${name}`);
        return motionItem({
          label: name,
          copy: `var(${property})`,
          meta: token.$value,
          style: `--duration: var(${property}); --easing: ${easing}`
        });
      })
      .join('');
    const easings = tokensOf(animation, 'animation', 'easing')
      .map(({ path: [, , name], token }) => {
        const property = cssVar('animation', `easing-${name}`);
        const graphic = `<svg class="motion__curve" viewBox="0 0 ${CURVE_SIZE} ${CURVE_SIZE}" aria-hidden="true"><path d="${curvePath(token.$value)}" /></svg>`;
        return motionItem({
          label: name,
          copy: `var(${property})`,
          meta: `cubic-bezier(${token.$value.join(', ')})`,
          style: `--duration: var(--${PREFIX}-animation-duration-extra-long2); --easing: var(${property})`,
          graphic
        });
      })
      .join('');
    return `<h3>Duration</h3><div class="motion">${durations}</div><h3>Easing</h3><div class="motion">${easings}</div>`;
  }
});

const refreshThemeValues = () => {
  document.querySelectorAll('[data-theme-value]').forEach(element => {
    element.textContent = readVar(element.dataset.themeValue);
  });
};

const showToast = message => {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), TOAST_DURATION);
};

const handleClick = async ({ target }) => {
  const copyTarget = target.closest('[data-copy]');
  if (copyTarget) {
    const { copy } = copyTarget.dataset;
    try {
      await navigator.clipboard.writeText(copy);
      showToast(`Copied ${copy}`);
    } catch {
      showToast(`Unable to copy ${copy}`);
    }
    return;
  }
  const play = target.closest('[data-play]');
  if (play) {
    const item = play.closest('[data-motion]');
    const playing = item.classList.toggle('is-playing');
    play.textContent = playing ? 'Reset' : 'Play';
  }
};

const setTheme = theme => {
  document.documentElement.dataset.theme = theme;
  const toggle = document.getElementById('theme-toggle');
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  refreshThemeValues();
};

const observeSections = () => {
  const links = new Map([...document.querySelectorAll('#nav a')].map(link => [link.hash.slice(1), link]));
  const observer = new IntersectionObserver(
    entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (!visible) {
        return;
      }
      links.forEach((link, id) => {
        if (id === visible.target.id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );
  document.querySelectorAll('.section').forEach(section => observer.observe(section));
};

const init = () => {
  document.getElementById('nav').innerHTML = sections.map(({ id, title }) => `<a href="#${id}">${title}</a>`).join('');
  document.getElementById('main').innerHTML = sections
    .map(
      ({ id, title, lead, render }) =>
        `<section class="section" id="${id}" aria-labelledby="${id}-title"><h2 id="${id}-title">${title}</h2><p class="lead">${lead}</p>${render()}</section>`
    )
    .join('');

  document.addEventListener('click', handleClick);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  observeSections();
};

init();
