import { makeModule } from '../core/module';
import fs from 'fs';

async function getConfig() {
    console.log("getConfig");
    const file = await fs.promises.readFile('./package.json');
    const json = JSON.parse(file);
    return json;
}

export default makeModule({
    getConfig
});
