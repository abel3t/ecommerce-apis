/**
 *
 * @param name {string} The name of Logging
 * @param [args] {Object} The arguments to stringify
 */
function info(name: string, args?: Object): void {
  const current = new Date(Date.now()).toISOString();
  if (args) {
    console.info(`>> time: ${current}, name: ${name}, data: ${JSON.stringify(args)}`);
  } else {
    console.info(`>> time: ${current}, name: ${name}`);
  }
}

function warning(error: Error): void {
  const current = new Date(Date.now()).toISOString();
  console.info(`>> time: ${current}, Error: ${error.message}`);
}

function error(error: Error): void {
  const current = new Date(Date.now()).toISOString();
  console.info(`>> time: ${current}, Error: ${error.message}`);
}

export default {
  info,
  warning,
  error
};