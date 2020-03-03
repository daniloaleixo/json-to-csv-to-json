export function getArgs(usageString: string = '', throwError: boolean = true): Object {
  const args: any = {};
  for (let i = 2; i < process.argv.length; i += 2) {
    if (process.argv[i].indexOf('--') == 0) {
      args[process.argv[i].substring(2)] = process.argv[i + 1];
    } else {
      if (throwError) {
        console.log(usageString);
        process.exit();
      }
    }
  }
  return args;
}