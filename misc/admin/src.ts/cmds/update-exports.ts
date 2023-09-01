"use strict";

import fs from "fs";

import { colorify } from "../log";
import { resolve } from "../path";

const sourceQuais = fs.readFileSync(resolve("packages/quais/src.ts/quais.ts")).toString();
const targets = sourceQuais.match(/export\s*{\s*((.|\s)*)}/)[1].trim();

////////////////////
// Begin template
////////////////////

const output = `"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as quais from "./quais";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._quais == null) {
        anyGlobal._quais = quais;
    }
} catch (error) { }

export { quais };

export {
    ${ targets }
} from "./quais";
`;

////////////////////
// End template
////////////////////

console.log(colorify.bold(`Flattening exports...`))

fs.writeFileSync(resolve("packages/quais/src.ts/index.ts"), output);
