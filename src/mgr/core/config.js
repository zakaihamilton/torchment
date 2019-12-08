import { makeModule } from '../core/module';
import fs from 'fs';
import _ from 'lodash';

async function getConfig() {
    console.log("getConfig");
    const file = await fs.promises.readFile('./package.json');
    let json = JSON.parse(file);
    const path = './config/' + (json.profile || "default");
    const list = await fs.promises.readdir(path);
    for (const name of list) {
        const subFile = await fs.promises.readFile(path + "/" + name);
        json = _.merge(json, JSON.parse(subFile));
    }
    return json;
}

export default makeModule({
    getConfig
});
