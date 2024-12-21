import GameService from "./logic/Services/GameService";
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
const argv: any = yargs(hideBin(process.argv)).argv;

const main = () => {
  const port: number = argv.port ? parseInt(argv.port, 10) : 3000;
  const service = new GameService(port || 3000);
  process.on('SIGINT', async () => {
    console.log("Closing");
    await service.closeServer();
    console.log("Service closed");
  })
}

main();