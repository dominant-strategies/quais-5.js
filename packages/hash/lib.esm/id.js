import { keccak256 } from "@quais/keccak256";
import { toUtf8Bytes } from "@quais/strings";
export function id(text) {
    return keccak256(toUtf8Bytes(text));
}
//# sourceMappingURL=id.js.map