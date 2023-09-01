
import fs from "fs";

import { resolve } from "../path";
import { mkdir } from "../utils";

function copy(src: string, dst: string, transform?: (data: string) => string): void {
    let data = fs.readFileSync(resolve(src));
    if (transform) {
        data = Buffer.from(transform(data.toString()));
    }
    fs.writeFileSync(dst, data);
}

(async function() {
    await mkdir(resolve("output/karma"));

    copy(resolve("packages/quais/dist/quais.esm.js"), resolve("output/karma/quais.esm.js"));
    copy(resolve("packages/tests/dist/tests.esm.js"), resolve("output/karma/tests.esm.js"), (data) => {
        return data.replace(/^(import [^;]* from ')(quais)(';)/, (all, prefix, id, suffix) => {
            return prefix + "./quais.esm.js" + suffix;
        });
    });

    copy(resolve("packages/quais/dist/quais.umd.js"), resolve("output/karma/quais.umd.js"));
    copy(resolve("packages/tests/dist/tests.umd.js"), resolve("output/karma/tests.umd.js"));
})();
