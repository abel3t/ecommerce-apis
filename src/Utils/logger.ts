/**
 *
 * @param name {string} The name of Logging
 * @param [args] {*} The arguments to stringify
 */
export function info(name: string, args?: any): void {
  const current = new Date(Date.now()).toISOString();
  if (args) {
    console.info(`>> time: ${current}, name: ${name}, data: ${JSON.stringify(args)}`);
  } else {
    console.info(`>> time: ${current}, name: ${name}`);
  }
}
