import { cp, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';
import { getPackageJson } from './build-utils.js';

/**
 * Assembles the package for release by creating the package.json and copying necessary files.
 */
export async function buildPackage({ releaseDir = 'dist/release/@tylertech/forge', cemDir = 'dist/cem' } = {}) {
  await mkdir(releaseDir, { recursive: true });
  await mkdir(join(releaseDir, 'dist'), { recursive: true });

  const { name, description, version, author, license, repository, main, module, typings, exports, dependencies, customElements } = getPackageJson();
  const releasePkg = {
    name,
    description,
    version,
    author,
    license,
    repository,
    main,
    module,
    typings,
    exports,
    dependencies,
    customElements
  };

  await writeFile(join(releaseDir, 'package.json'), JSON.stringify(releasePkg, null, 2));

  await cp('LICENSE', join(releaseDir, 'LICENSE'));
  await cp('README.md', join(releaseDir, 'README.md'));

  await cp(join(cemDir, 'custom-elements.json'), join(releaseDir, 'custom-elements.json'));

  const vscodeFiles = await glob(join(cemDir, 'vscode.*.json'));
  for (const file of vscodeFiles) {
    const filename = file.split('/').pop();
    await cp(file, join(releaseDir, 'dist', filename));
  }

  await copySassSources({ releaseDir });
}

async function copySassSources({ releaseDir }) {
  const sassDir = join(releaseDir, 'sass');
  const sassFiles = await glob('src/lib/**/*.scss');

  for (const file of sassFiles) {
    const relativePath = file.replace('src/lib/', '');
    const destPath = join(sassDir, relativePath);
    await mkdir(join(destPath, '..'), { recursive: true });
    await cp(file, destPath);
  }
}
