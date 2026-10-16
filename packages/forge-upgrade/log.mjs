import chalk from 'chalk';

export function logInfo(str) {
  console.log(chalk.cyan(`[info] ${str}`));
}

export function logWarn(str) {
  console.log(chalk.yellow(`[warning] ${str}`));
}

export function logError(str) {
  console.log(chalk.red(`[error] ${str}`));
}

export function logSuccess(str) {
  console.log(chalk.green(`[success] ${str}`));
}

export function logBreak() {
  console.log();
}
