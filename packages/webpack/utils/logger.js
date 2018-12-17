'use strict';

// Global import
const chalk = require('chalk');

function write(status, text, verbose) {
  switch (status) {
    case 'task':
      console.log(chalk.green.bold(`\n👍  ${text}\n`));
      break;
    case 'warn':
      console.log(chalk.yellow.bold(`\n⛈  ${text}\n`));
      break;
    case 'error':
      console.log(chalk.red.bold(`\n💀  ${text}\n`));
      break;
    case 'start':
      console.log(chalk.cyan.bold(`\n🔥  ${text}\n`));
      break;
    case 'end':
      console.log(chalk.white.bold(`🎉  ${text}`));
      break;
    case 'info':
    default:
      console.log(chalk.white.bold(`💡  ${text}`));
  }

  // Adds optional verbose output
  if (verbose) {
    if (verbose.constructor === Object) {
      console.dir(verbose, {
        depth: 15
      });
    } else if (verbose.constructor === Array) {
      verbose.forEach(msg => {
        console.log(`\n${msg}`);
      });
    } else {
      console.log(`\n${verbose}`);
    }
  }
}

const start = text => {
  write('start', text);
};
const task = text => {
  write('task', text);
};
const end = text => {
  write('end', text);
};
const info = (text, data) => {
  write('info', text, data);
};
const warn = (text, data) => {
  write('warn', text, data);
};
const error = (text, err) => {
  write('error', text, err);
};

module.exports.logger = {
  start,
  task,
  end,
  info,
  warn,
  error
};
